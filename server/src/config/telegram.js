import { TelegramClient } from "telegram";

import { StringSession } from "telegram/sessions/index.js";

import dotenv from "dotenv";

dotenv.config();

export const apiId = Number(process.env.API_ID);

export const apiHash = process.env.API_HASH;

export const createTelegramClient = (sessionString) => {
  return new TelegramClient(new StringSession(sessionString), apiId, apiHash, {
    connectionRetries: 5,
  });
};
