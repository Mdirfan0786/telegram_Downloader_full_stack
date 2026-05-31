import { TelegramClient } from "telegram";

import { StringSession } from "telegram/sessions/index.js";

import { apiId, apiHash } from "../config/telegram.js";

const createTelegramClient = async (stringSession) => {
  const client = new TelegramClient(
    new StringSession(stringSession),
    apiId,
    apiHash,
    {
      connectionRetries: 5,
    },
  );

  await client.connect();

  return client;
};

export default createTelegramClient;
