import { TelegramClient } from "telegram";

import { StringSession } from "telegram/sessions/index.js";

import dotenv from "dotenv";

dotenv.config();

const apiId = Number(process.env.API_ID);

const apiHash = process.env.API_HASH;

const stringSession = new StringSession(process.env.STRING_SESSION);

export const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});
