import { client } from "../config/telegramClient.js";

// Connect Telegram
export const connectTelegram = async (req, res) => {
  try {
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
    const messages = await client.getMessages("me", { limit: 50 });

    const formattedMessages = messages.map((msg) => {
      let mediaInfo = null;

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
          // raw bytes for progress calculation on frontend
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

// Download Video — Direct stream to browser (no disk save = faster)
export const downloadVideo = async (req, res) => {
  try {
    const { messageId } = req.params;

    if (!messageId || isNaN(messageId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const messages = await client.getMessages("me", {
      ids: Number(messageId),
    });

    const message = messages[0];

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (!message.media?.document) {
      return res.status(404).json({
        success: false,
        message: "No downloadable media found",
      });
    }

    const document = message.media.document;

    const fileNameAttribute = document.attributes.find((attr) => attr.fileName);
    const originalFileName =
      fileNameAttribute?.fileName || `telebox_${Date.now()}.mp4`;
    const safeFileName = originalFileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");

    const mimeType = document.mimeType || "application/octet-stream";
    const fileSize = document.size ? Number(document.size) : null;

    // Set headers
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeFileName}"`,
    );
    res.setHeader("Content-Type", mimeType);
    if (fileSize) res.setHeader("Content-Length", fileSize);
    // Allow frontend to read Content-Length for progress tracking
    res.setHeader("Access-Control-Expose-Headers", "Content-Length");

    console.log(
      `\nStreaming: ${safeFileName} (${fileSize ? (fileSize / 1024 / 1024).toFixed(2) + " MB" : "unknown size"})`,
    );

    // Stream directly to browser — fastest possible
    // workers: 16 = max parallel chunk downloads from Telegram
    const buffer = await client.downloadMedia(message, {
      workers: 16,
      progressCallback: (downloaded, total) => {
        const pct = total
          ? ((Number(downloaded) / Number(total)) * 100).toFixed(1)
          : "?";
        process.stdout.write(`\rDownloading: ${pct}%`);
      },
    });

    console.log(`\nDone: ${safeFileName}`);

    // Send buffer directly
    res.end(buffer);
  } catch (error) {
    console.error("\nDownload Error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: error.message || "Download failed",
      });
    }
  }
};
