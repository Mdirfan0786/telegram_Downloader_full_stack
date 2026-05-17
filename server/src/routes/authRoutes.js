import express from "express";

import { getMe, sendOtp, verifyLogin } from "../controllers/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send-otp", sendOtp);

router.post("/verify-login", verifyLogin);

router.get("/me", protect, getMe);

export default router;
