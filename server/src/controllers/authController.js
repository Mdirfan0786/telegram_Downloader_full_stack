import { TelegramClient } from "telegram";

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

    // Create temporary Telegram client
    const client = new TelegramClient(new StringSession(""), apiId, apiHash, {
      connectionRetries: 5,
    });

    // Connect client
    await client.connect();

    // Send OTP
    await client.sendCode(
      {
        apiId,
        apiHash,
      },
      phone,
    );

    // Store temporary session
    loginSessions[phone] = client;

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

// Verify Login (OTP + Optional 2FA Password)
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

    // Get temporary Telegram client
    const client = loginSessions[phone];

    if (!client) {
      return res.status(400).json({
        success: false,
        message: "Session expired",
      });
    }

    // Telegram login flow
    await client.start({
      phoneNumber: async () => phone,

      phoneCode: async () => otp,

      password: async () => password || "",

      onError: (err) => {
        throw err;
      },
    });

    // Generate Telegram session string
    const stringSession = client.session.save();

    // Save or update user
    let user = await User.findOne({ phone });

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

    // Cleanup temporary session
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
