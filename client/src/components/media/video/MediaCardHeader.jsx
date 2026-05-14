import FileIcon from "./FileIcon";

import MediaBadges from "./MediaBadges";

const MediaCardHeader = ({ fileName, fileSize, isGif, darkMode }) => {
  return (
    <div
      className="
        flex
        items-start

        gap-2.5
        sm:gap-4

        mb-3.5
      "
    >
      <FileIcon isGif={isGif} />

      <div className="flex-1 min-w-0">
        {/* File Name */}
        <p
          className={`
            text-[12px]
            sm:text-[14px]

            font-semibold

            leading-5
            sm:leading-6

            break-all

            ${darkMode ? "text-white/90" : "text-black/80"}
          `}
        >
          {fileName}
        </p>

        <MediaBadges isGif={isGif} fileSize={fileSize} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default MediaCardHeader;
