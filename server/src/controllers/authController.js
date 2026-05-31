import { TelegramClient, Api } from "telegram";

import { StringSession } from "telegram/sessions/index.js";

import User from "../models/userModel.js";

import generateToken from "../utils/generateToken.js";

import { apiId, apiHash } from "../config/telegram.js";

// Temporary login sessions
const loginSessions = {};

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    // Validate phone
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Create Telegram client
    const client = new TelegramClient(new StringSession(""), apiId, apiHash, {
      connectionRetries: 5,
    });

    // Connect client
    await client.connect();

    // Send OTP
    const result = await client.sendCode(
      {
        apiId,
        apiHash,
      },
      phone,
    );

    // Store temporary session
    loginSessions[phone] = {
      client,

      phoneCodeHash: result.phoneCodeHash,
    };

    res.status(200).json({
      success: true,

      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log("Send OTP Error:", error);

    res.status(500).json({
      success: false,

      message: error.message || "Failed to send OTP",
    });
  }
};

// Verify OTP Login + Optional 2FA Password
export const verifyLogin = async (req, res) => {
  try {
    const { phone, otp, password } = req.body;

    // Validate fields
    if (!phone || !otp) {
      return res.status(400).json({
        success: false,

        message: "Phone and OTP are required",
      });
    }

    // Get temporary session
    const sessionData = loginSessions[phone];

    if (!sessionData) {
      return res.status(400).json({
        success: false,

        message: "Session expired",
      });
    }

    const { client, phoneCodeHash } = sessionData;

    try {
      // Verify OTP
      await client.invoke(
        new Api.auth.SignIn({
          phoneNumber: phone,

          phoneCodeHash,

          phoneCode: otp,
        }),
      );
    } catch (error) {
      // Telegram account has 2FA enabled
      if (error.errorMessage === "SESSION_PASSWORD_NEEDED") {
        // Password not sent yet
        if (!password) {
          return res.status(200).json({
            success: false,

            needPassword: true,

            message: "2FA password required",
          });
        }

        // Verify 2FA password
        await client.signInWithPassword(
          {
            apiId,
            apiHash,
          },
          {
            password: async () => password,

            onError: (err) => {
              throw err;
            },
          },
        );
      } else {
        throw error;
      }
    }

    // Verify Telegram authorization
    const me = await client.getMe();

    if (!me) {
      return res.status(401).json({
        success: false,

        message: "Telegram authorization failed",
      });
    }

    // Generate session string
    const stringSession = client.session.save();

    // Save or update user
    let user = await User.findOne({
      phone,
    });

    if (!user) {
      user = await User.create({
        phone,

        stringSession,
      });
    } else {
      user.stringSession = stringSession;

      await user.save();
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Remove temporary session
    delete loginSessions[phone];

    res.status(200).json({
      success: true,

      message: "Login successful",

      token,

      user: {
        id: user._id,

        phone: user.phone,
      },
    });
  } catch (error) {
    console.log("Verify Login Error:", error);

    res.status(500).json({
      success: false,

      message: error.message || "Login failed",
    });
  }
};

// Get Current User
export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,

      user: req.user,
    });
  } catch (error) {
    console.log("Get Me Error:", error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
