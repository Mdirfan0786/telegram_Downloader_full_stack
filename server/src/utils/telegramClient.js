import { TelegramClient } from "telegram";

import { StringSession } from "telegram/sessions/index.js";

import { apiId, apiHash } from "../config/telegram.js";

export const createTelegramClient = (stringSession) => {
  return new TelegramClient(new StringSession(stringSession), apiId, apiHash, {
    connectionRetries: 5,
  });
};
