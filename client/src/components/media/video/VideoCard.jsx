import React, { useMemo, useCallback } from "react";

import { motion } from "framer-motion";

import MediaCardHeader from "./MediaCardHeader";

import DownloadButton from "./DownloadButton";

const VideoCard = ({ video, darkMode }) => {
  const fileName = useMemo(() => {
    return video.mediaInfo?.fileName || "Unknown File";
  }, [video]);

  const fileSize = useMemo(() => {
    return video.mediaInfo?.size || "Unknown";
  }, [video]);

  const mimeType = useMemo(() => {
    return video.mediaInfo?.mimeType || "";
  }, [video]);

  const isGif = useMemo(() => {
    return mimeType.includes("gif") || fileName.toLowerCase().endsWith(".gif");
  }, [mimeType, fileName]);

  const handleDownload = useCallback(() => {
    window.open(`http://localhost:5000/api/telegram/download/${video.id}`);
  }, [video.id]);

  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group w-full"
    >
      <div
        className={`
          rounded-2xl
          overflow-hidden

          border

          transition-all
          duration-300

          ${
            darkMode
              ? `
                bg-[#0d1117]
                border-white/[0.08]
                hover:border-white/[0.15]
              `
              : `
                bg-white
                border-black/[0.08]
                hover:border-black/[0.12]
                shadow-sm
              `
          }
        `}
      >
        {/* Top Gradient */}
        <div
          className={`
            h-[2px]

            ${
              isGif
                ? `
                  bg-gradient-to-r
                  from-violet-500/80
                  via-violet-500/20
                  to-transparent
                `
                : `
                  bg-gradient-to-r
                  from-blue-500/80
                  via-blue-500/20
                  to-transparent
                `
            }
          `}
        />

        {/* Body */}
        <div
          className="
            p-3.5
            sm:p-5
          "
        >
          <MediaCardHeader
            fileName={fileName}
            fileSize={fileSize}
            isGif={isGif}
            darkMode={darkMode}
          />

          {/* Divider */}
          <div
            className={`
              h-px
              mb-3.5

              ${darkMode ? "bg-white/[0.05]" : "bg-black/[0.05]"}
            `}
          />

          <DownloadButton isGif={isGif} handleDownload={handleDownload} />
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(VideoCard);
