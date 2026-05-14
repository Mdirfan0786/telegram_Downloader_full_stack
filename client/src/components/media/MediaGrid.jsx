import { motion } from "framer-motion";

import VideoCard from "./video/VideoCard";

const MediaGrid = ({ videos, darkMode }) => {
  return (
    <div
      className="
        grid
        grid-cols-1

        sm:grid-cols-2
        xl:grid-cols-3

        gap-3
        sm:gap-4

        pb-6
        sm:pb-8
      "
    >
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.45,
            delay: (index % 6) * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <VideoCard video={video} darkMode={darkMode} />
        </motion.div>
      ))}
    </div>
  );
};

export default MediaGrid;
