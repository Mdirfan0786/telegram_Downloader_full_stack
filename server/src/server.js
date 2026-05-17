import dotenv from "dotenv";

import app from "./app.js";

import { client } from "./config/telegram.js";

import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect MongoDB
    await connectDB();

    // Connect Telegram
    await client.connect();

    // Verify Telegram auth
    const me = await client.getMe();

    console.log(`Telegram Connected: ${me.firstName}`);

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup Error:", error);
  }
}

startServer();
