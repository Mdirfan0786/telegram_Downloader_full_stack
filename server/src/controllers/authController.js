import { TelegramClient } from "telegram";

import { StringSession } from "telegram/sessions/index.js";

import User from "../models/userModel.js";

import { apiId, apiHash } from "../config/telegram.js";

// Temporary login sessions
const loginSessions = {};

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    const client = new TelegramClient(new StringSession(""), apiId, apiHash, {
      connectionRetries: 5,
    });

    await client.connect();

    await client.sendCode(
      {
        apiId,
        apiHash,
      },
      phone,
    );

    // Store temporary client
    loginSessions[phone] = client;

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify OTP + Password
export const verifyLogin = async (req, res) => {
  try {
    const { phone, otp, password } = req.body;

    const client = loginSessions[phone];

    if (!client) {
      return res.status(400).json({
        success: false,
        message: "Session expired",
      });
    }

    // Full Telegram login flow
    await client.start({
      phoneNumber: async () => phone,

      phoneCode: async () => otp,

      password: async () => password || "",

      onError: (err) => {
        throw err;
      },
    });

    // Save session
    const stringSession = client.session.save();

    // Save user
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

    res.json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
