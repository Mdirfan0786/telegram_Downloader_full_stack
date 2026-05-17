import { TelegramClient } from "telegram";

import { StringSession } from "telegram/sessions/index.js";

import input from "input";

import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const apiId = Number(process.env.API_ID);

const apiHash = process.env.API_HASH;

const stringSession = new StringSession("");

(async () => {
  console.log("Starting Telegram Login...\n");

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await input.text("Enter phone number: "),

    password: async () => await input.text("Enter 2FA password (if any): "),

    phoneCode: async () => await input.text("Enter OTP code: "),

    onError: (err) => console.log(err),
  });

  console.log("\nLogin Successful ✅");

  console.log("\nSESSION STRING:\n");

  console.log(client.session.save());
})();
