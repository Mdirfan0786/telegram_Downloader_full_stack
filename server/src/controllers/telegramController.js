import { client } from "../config/telegramClient.js";

// Connect to Telegram
export const connectTelegram = async (req, res) => {
  try {
    await client.connect();

    const me = await client.getMe();

    res.json({
      success: true,
      message: "Telegram Connected Successfully",

      user: {
        id: me.id,

        firstName: me.firstName,

        username: me.username,

        phone: me.phone,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Get Saved Messages
export const getSavedMessages = async (req, res) => {
  try {
    await client.connect();

    const messages = await client.getMessages("me", {
      limit: 50,
    });

    const formattedMessages = messages.map((msg) => {
      let mediaInfo = null;

      if (msg.media?.document) {
        const document = msg.media.document;

        const fileNameAttribute = document.attributes.find(
          (attr) => attr.fileName,
        );

        mediaInfo = {
          fileName: fileNameAttribute?.fileName || "Unknown",

          mimeType: document.mimeType,

          size: document.size
            ? (document.size / 1024 / 1024).toFixed(2) + " MB"
            : "Unknown",
        };
      }

      return {
        id: msg.id,

        message: msg.message,

        hasMedia: !!msg.media,

        mediaInfo,
      };
    });

    res.json({
      success: true,

      count: formattedMessages.length,

      messages: formattedMessages,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// Download Video
export const downloadVideo = async (req, res) => {
  try {
    await client.connect();

    const { messageId } = req.params;

    const messages = await client.getMessages("me", {
      ids: Number(messageId),
    });

    const message = messages[0];

    if (!message || !message.media) {
      return res.status(404).json({
        success: false,

        message: "Media not found",
      });
    }

    const document = message.media.document;

    const fileNameAttribute = document.attributes.find((attr) => attr.fileName);

    // Original filename
    const originalFileName = fileNameAttribute?.fileName || "video.mp4";

    // Safe filename for headers/browser
    const safeFileName = originalFileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");

    // Headers
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeFileName}"`,
    );

    res.setHeader(
      "Content-Type",
      document.mimeType || "application/octet-stream",
    );

    // Download media
    await client.downloadMedia(message, {
      outputFile: res,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// MD IRFAN
const hi = () => {
  console.log("Md Irfan");
};
