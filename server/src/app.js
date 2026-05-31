import express from "express";

import cors from "cors";

import telegramRoutes from "./routes/telegramRoutes.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/telegram", telegramRoutes);

// Health Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,

    message: "TeleBox API Running",
  });
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: "Route not found",
  });
});

export default app;
