const FooterStatus = ({ darkMode }) => {
  return (
    <div
      className="
        flex
        flex-col

        items-center
        md:items-end
      "
    >
      <span
        className={`
          text-[11px]

          ${darkMode ? "text-white/25" : "text-black/50"}
        `}
      >
        Built for personal use
      </span>

      <div
        className="
          mt-2

          flex
          items-center

          gap-2
        "
      >
        <div
          className="
            w-1.5
            h-1.5

            rounded-full

            bg-emerald-400

            animate-pulse
          "
        />

        <span
          className={`
            text-[10px]

            uppercase
            tracking-[0.18em]

            ${darkMode ? "text-white/15" : "text-black/40"}
          `}
        >
          System Online
        </span>
      </div>
    </div>
  );
};

export default FooterStatus;
