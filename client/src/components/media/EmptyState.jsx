import { motion } from "framer-motion";

const EmptyState = ({ darkMode }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        flex
        flex-col
        items-center
        justify-center

        py-28
        sm:py-32

        text-center
      "
    >
      {/* Icon Glow */}
      <div
        className={`
          relative

          w-[90px]
          h-[90px]

          rounded-full

          flex
          items-center
          justify-center

          border

          ${
            darkMode
              ? `
                bg-white/[0.03]
                border-white/[0.06]
              `
              : `
                bg-black/[0.03]
                border-black/[0.06]
              `
          }
        `}
      >
        {/* Inner Circle */}
        <div
          className="
            w-[52px]
            h-[52px]

            rounded-full

            bg-gradient-to-br
            from-blue-500
            to-violet-500

            opacity-80
          "
        />

        {/* Glow */}
        <div
          className="
            absolute
            inset-0

            rounded-full

            bg-blue-500/10

            blur-2xl
          "
        />
      </div>

      {/* Title */}
      <h3
        className={`
          mt-8

          text-[18px]
          sm:text-[22px]

          font-semibold

          ${darkMode ? "text-white/90" : "text-black/80"}
        `}
      >
        No Media Found
      </h3>

      {/* Subtitle */}
      <p
        className={`
          mt-3

          max-w-[420px]

          text-sm
          sm:text-[15px]

          leading-7

          ${darkMode ? "text-white/35" : "text-black/45"}
        `}
      >
        Try changing your search keyword or media filter to explore more content
        from your Telegram library.
      </p>
    </motion.div>
  );
};

export default EmptyState;
