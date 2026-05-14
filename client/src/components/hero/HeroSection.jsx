import { motion } from "framer-motion";

import HeroBadge from "./HeroBadge";

import MediaStats from "../media/MediaStats";

const HeroSection = ({ darkMode, videos, totalVideos, totalGifs }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        py-1
        sm:py-4

        flex
        flex-col
        lg:flex-row

        lg:items-end
        lg:justify-between

        gap-4
        sm:gap-7
      "
    >
      {/* LEFT */}
      <div>
        <HeroBadge darkMode={darkMode} />

        {/* Heading */}
        <h1
          className={`
            text-[26px]
            leading-[1.1]

            sm:text-[34px]
            lg:text-[42px]

            font-bold

            tracking-[-0.03em]

            ${darkMode ? "text-white" : "text-black"}
          `}
        >
          Your Telegram Media
          <br />
          <span
            className="
              bg-gradient-to-r
              from-blue-400
              to-violet-400

              bg-clip-text
              text-transparent
            "
          >
            In One Place
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`
            mt-2.5

            text-[13px]
            sm:text-[15px]

            font-light

            leading-6

            max-w-[420px]

            ${darkMode ? "text-white/35" : "text-black/50"}
          `}
        >
          Cinematic access to your saved videos and media — all synced and
          organised.
        </p>
      </div>

      {/* RIGHT STATS */}
      <MediaStats
        videos={videos}
        totalVideos={totalVideos}
        totalGifs={totalGifs}
        darkMode={darkMode}
      />
    </motion.div>
  );
};

export default HeroSection;
