import FooterBrand from "./FooterBrand";

import FooterCenter from "./FooterCenter";

import FooterStatus from "./FooterStatus";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`
        relative
        z-20

        mt-12
        sm:mt-16

        border-t

        transition-colors
        duration-300

        ${
          darkMode
            ? `
              bg-[#080c14]
              border-white/[0.05]
            `
            : `
              bg-[#f5f7fb]
              border-black/[0.06]
            `
        }
      `}
    >
      {/* Top Glow */}
      <div
        className={`
          absolute
          top-0
          left-1/2
          -translate-x-1/2

          w-[260px]
          sm:w-[400px]

          h-[90px]
          sm:h-[120px]

          blur-3xl

          pointer-events-none

          ${darkMode ? "bg-blue-500/5" : "bg-blue-500/10"}
        `}
      />

      <div
        className="
          relative
          z-10

          max-w-[1200px]
          mx-auto

          px-3
          sm:px-6
          lg:px-8

          py-6
          sm:py-8
        "
      >
        {/* Top */}
        <div
          className="
            flex
            flex-col
            md:flex-row

            items-center
            justify-between

            gap-6
            sm:gap-8
          "
        >
          <FooterBrand darkMode={darkMode} />

          <FooterCenter darkMode={darkMode} />

          <FooterStatus darkMode={darkMode} />
        </div>

        {/* Bottom */}
        <div
          className={`
            mt-6
            sm:mt-8

            pt-4
            sm:pt-5

            border-t

            text-center

            ${darkMode ? "border-white/[0.04]" : "border-black/[0.06]"}
          `}
        >
          <p
            className={`
              text-[10px]
              sm:text-[11px]

              ${darkMode ? "text-white/15" : "text-black/40"}
            `}
          >
            © 2025 TeleBox — Telegram Media Manager
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
