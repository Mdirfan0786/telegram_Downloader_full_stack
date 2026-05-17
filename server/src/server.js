import dotenv from "dotenv";
import app from "./app.js";

import { client } from "./config/telegramClient.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect Telegram FIRST
    await client.connect();

    // Verify auth
    const me = await client.getMe();

    console.log(` Telegram Connected: ${me.firstName}`);

    // Start Express
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup Error:", error);
  }
}

startServer();
