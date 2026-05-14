import express from "express";

import cors from "cors";

import telegramRoutes from "./routes/telegramRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/telegram", telegramRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Telegram Downloader API Running",
  });
});

export default app;
