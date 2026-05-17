import express from "express";

import { sendOtp, verifyLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);

router.post("/verify-login", verifyLogin);

export default router;
