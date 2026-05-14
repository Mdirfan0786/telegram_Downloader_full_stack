import express from "express";

import {
  connectTelegram,
  getSavedMessages,
  downloadVideo,
} from "../controllers/telegramController.js";

const router = express.Router();

router.get("/connect", connectTelegram);

router.get("/saved-messages", getSavedMessages);

router.get("/download/:messageId", downloadVideo);

export default router;
