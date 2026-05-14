import { HardDrive } from "lucide-react";

const MediaBadges = ({ isGif, fileSize, darkMode }) => {
  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-2
        mt-3
      "
    >
      {/* Type */}
      <span
        className={`
          text-[10px]
          font-bold

          px-2.5
          py-1

          rounded-lg
          border

          ${
            isGif
              ? `
                bg-violet-500/10
                border-violet-500/20
                text-violet-400
              `
              : `
                bg-blue-500/10
                border-blue-500/20
                text-blue-400
              `
          }
        `}
      >
        {isGif ? "GIF" : "MP4"}
      </span>

      {/* Size */}
      <span
        className={`
          flex
          items-center
          gap-1.5

          text-[10px]

          px-2.5
          py-1

          rounded-lg
          border

          ${
            darkMode
              ? `
                bg-white/[0.03]
                border-white/[0.06]
                text-white/30
              `
              : `
                bg-black/[0.03]
                border-black/[0.06]
                text-black/40
              `
          }
        `}
      >
        <HardDrive size={9} />

        {fileSize}
      </span>
    </div>
  );
};

export default MediaBadges;
