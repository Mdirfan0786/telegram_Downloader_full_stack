const HeroBadge = ({ darkMode }) => {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-2
        bg-blue-500/10
        border
        border-blue-500/20
        px-4
        py-1.5
        rounded-full
        mb-3
      "
    >
      <span
        className="
          w-1.5
          h-1.5
          rounded-full
          bg-blue-500
        "
      />

      <span
        className={`
          text-[10px]
          font-bold
          tracking-[0.18em]
          uppercase
          ${darkMode ? "text-blue-200/70" : "text-blue-600"}
        `}
      >
        Cloud Media Hub
      </span>
    </div>
  );
};

export default HeroBadge;
