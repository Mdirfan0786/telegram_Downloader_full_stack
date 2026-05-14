const NavbarBrand = ({ darkMode }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo */}
      <div
        className="
          w-8
          h-8

          rounded-xl

          bg-gradient-to-br
          from-blue-500
          to-violet-600

          flex
          items-center
          justify-center
        "
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span
          className={`
            font-bold
            tracking-tight

            text-[14px]
            sm:text-[15px]

            ${darkMode ? "text-white" : "text-black"}
          `}
        >
          TeleBox
        </span>

        <span
          className={`
            text-[9px]

            uppercase
            tracking-[0.18em]

            mt-1

            ${darkMode ? "text-white/30" : "text-black/40"}
          `}
        >
          Media Cloud
        </span>
      </div>
    </div>
  );
};

export default NavbarBrand;
