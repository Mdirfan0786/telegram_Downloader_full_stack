const FooterCenter = ({ darkMode }) => {
  return (
    <div
      className="
        hidden
        lg:flex

        items-center
        gap-4
      "
    >
      <div
        className={`
          w-14
          h-px

          ${darkMode ? "bg-white/10" : "bg-black/10"}
        `}
      />

      <span
        className={`
          text-[10px]

          uppercase
          tracking-[0.3em]

          ${darkMode ? "text-white/15" : "text-black/40"}
        `}
      >
        Cinematic Experience
      </span>

      <div
        className={`
          w-14
          h-px

          ${darkMode ? "bg-white/10" : "bg-black/10"}
        `}
      />
    </div>
  );
};

export default FooterCenter;
