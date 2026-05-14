import { motion } from "framer-motion";

const FooterBrand = ({ darkMode }) => {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{
          scale: 1.05,
          rotate: 4,
        }}
        className="
          w-11
          h-11

          rounded-2xl

          bg-gradient-to-br
          from-blue-500
          to-violet-600

          flex
          items-center
          justify-center

          shadow-lg
          shadow-blue-500/20
        "
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <div>
        <h2
          className={`
            text-[15px]
            font-bold

            ${darkMode ? "text-white" : "text-black"}
          `}
        >
          TeleBox
        </h2>

        <p
          className={`
            mt-1

            text-[11px]

            uppercase
            tracking-[0.18em]

            ${darkMode ? "text-white/20" : "text-black/40"}
          `}
        >
          Personal Media Cloud
        </p>
      </div>
    </div>
  );
};

export default FooterBrand;
