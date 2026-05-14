import { motion } from "framer-motion";

import { Download } from "lucide-react";

const DownloadButton = ({ isGif, handleDownload }) => {
  return (
    <motion.button
      whileTap={{
        scale: 0.97,
      }}
      onClick={handleDownload}
      className={`
        w-full

        flex
        items-center
        justify-center

        gap-2

        py-2.5
        sm:py-3

        rounded-xl

        text-[12px]
        sm:text-[13px]

        font-semibold

        text-white

        transition-all
        duration-300

        ${
          isGif
            ? `
              bg-violet-600
              hover:bg-violet-500
            `
            : `
              bg-blue-600
              hover:bg-blue-500
            `
        }
      `}
    >
      <Download size={13} />
      Download
    </motion.button>
  );
};

export default DownloadButton;
