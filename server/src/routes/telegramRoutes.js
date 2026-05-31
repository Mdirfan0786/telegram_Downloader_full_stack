import express from "express";

import {
  connectTelegram,
  getSavedMessages,
  downloadVideo,
} from "../controllers/telegramController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Connect Telegram
router.get("/connect", protect, connectTelegram);

// Get Saved Messages
router.get("/saved-messages", protect, getSavedMessages);

// Download Media
router.get("/download/:messageId", protect, downloadVideo);

export default router;
