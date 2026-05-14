import { FileVideo } from "lucide-react";

const FileIcon = ({ isGif }) => {
  return (
    <div
      className={`
        w-[40px]
        h-[40px]

        sm:w-[44px]
        sm:h-[44px]

        rounded-xl

        flex
        items-center
        justify-center

        border

        shrink-0

        ${
          isGif
            ? `
              bg-violet-500/10
              border-violet-500/20
            `
            : `
              bg-blue-500/10
              border-blue-500/20
            `
        }
      `}
    >
      <FileVideo
        size={18}
        className={isGif ? "text-violet-400" : "text-blue-400"}
      />
    </div>
  );
};

export default FileIcon;
