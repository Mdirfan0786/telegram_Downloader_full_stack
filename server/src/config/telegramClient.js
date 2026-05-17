import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";

dotenv.config();

const apiId = Number(process.env.API_ID);

const apiHash = process.env.API_HASH;

const stringSession = new StringSession(process.env.STRING_SESSION);

export const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,

  // Auto reconnect
  autoReconnect: true,

  // Use IPv4
  useIPV6: false,
});

// Connect once on server startup
(async () => {
  try {
    await client.connect();

    console.log("✅ Telegram Client Connected");
  } catch (error) {
    console.error("❌ Telegram Connect Failed:", error.message);
  }
})();
