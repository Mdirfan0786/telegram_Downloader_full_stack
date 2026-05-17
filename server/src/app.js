import express from "express";

import cors from "cors";

import telegramRoutes from "./routes/telegramRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/telegram", telegramRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Telegram Downloader API Running",
  });
});

export default app;
