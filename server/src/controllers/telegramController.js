import { client } from "../config/telegram.js";

// Connect Telegram
export const connectTelegram = async (req, res) => {
  try {
    // Ensure Telegram connection
    if (!client.connected) {
      await client.connect();
    }

    const me = await client.getMe();

    if (!me) {
      return res.status(401).json({
        success: false,
        message: "Telegram client not connected",
      });
    }

    res.status(200).json({
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
    console.error("Connect Telegram Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to connect Telegram",
    });
  }
};

// Get Saved Messages
export const getSavedMessages = async (req, res) => {
  try {
    // Ensure Telegram connection
    if (!client.connected) {
      await client.connect();
    }

    console.log("Fetching saved messages...");

    const messages = await client.getMessages("me", {
      limit: 50,
    });

    console.log(`Fetched ${messages.length} messages`);

    const formattedMessages = messages.map((msg) => {
      let mediaInfo = null;

      // Check media document
      if (msg.media?.document) {
        const document = msg.media.document;

        const fileNameAttribute = document.attributes.find(
          (attr) => attr.fileName,
        );

        mediaInfo = {
          fileName: fileNameAttribute?.fileName || "Unknown File",

          mimeType: document.mimeType || "Unknown",

          size: document.size
            ? `${(document.size / 1024 / 1024).toFixed(2)} MB`
            : "Unknown",

          // Raw bytes for frontend progress
          sizeBytes: Number(document.size) || 0,
        };
      }

      return {
        id: msg.id,

        message: msg.message || "",

        date: msg.date,

        hasMedia: !!msg.media,

        mediaInfo,
      };
    });

    res.status(200).json({
      success: true,

      count: formattedMessages.length,

      messages: formattedMessages,
    });
  } catch (error) {
    console.error("Get Saved Messages Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch messages",
    });
  }
};

// Download Video / Media
export const downloadVideo = async (req, res) => {
  try {
    const { messageId } = req.params;

    // Validate message ID
    if (!messageId || isNaN(messageId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    // Fetch message
    const messages = await client.getMessages("me", {
      ids: Number(messageId),
    });

    const message = messages[0];

    // Check message exists
    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Check media exists
    if (!message.media?.document) {
      return res.status(404).json({
        success: false,
        message: "No downloadable media found",
      });
    }

    const document = message.media.document;

    // Get filename
    const fileNameAttribute = document.attributes.find((attr) => attr.fileName);

    // Original filename
    const originalFileName =
      fileNameAttribute?.fileName || `telebox_${Date.now()}.mp4`;

    // Safe filename
    const safeFileName = originalFileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");

    // File info
    const mimeType = document.mimeType || "application/octet-stream";

    const fileSize = document.size ? Number(document.size) : null;

    // Headers
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeFileName}"`,
    );

    res.setHeader("Content-Type", mimeType);

    if (fileSize) {
      res.setHeader("Content-Length", fileSize);
    }

    // Allow frontend to access headers
    res.setHeader("Access-Control-Expose-Headers", "Content-Length");

    console.log(`\nStarting Download: ${safeFileName}`);

    // Stream directly to browser
    await client.downloadMedia(message, {
      outputFile: res,

      // Parallel workers
      workers: 8,

      // Download progress
      progressCallback: (downloaded, total) => {
        const progress = total
          ? ((Number(downloaded) / Number(total)) * 100).toFixed(1)
          : "?";

        process.stdout.write(`\rDownloading: ${progress}%`);
      },
    });

    console.log(`\nDownload Completed: ${safeFileName}`);
  } catch (error) {
    console.error("\nDownload Error:", error);

    // Prevent multiple responses
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: error.message || "Download failed",
      });
    }
  }
};
