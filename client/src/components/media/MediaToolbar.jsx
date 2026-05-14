import MediaFilters from "./MediaFilters";

const MediaToolbar = ({
  darkMode,
  activeFilter,
  setActiveFilter,
  setVisibleCount,
}) => {
  return (
    <div
      className="
        flex
        flex-col
        sm:flex-row

        sm:items-center
        sm:justify-between

        gap-3

        mt-5
        mb-4
      "
    >
      {/* Section Label */}
      <div
        className="
          flex
          items-center

          gap-2.5
        "
      >
        <div
          className="
            w-5
            h-px

            bg-white/10
          "
        />

        <span
          className={`
            text-[9px]
            sm:text-[10px]

            font-extrabold

            tracking-[0.24em]

            uppercase

            ${darkMode ? "text-white/20" : "text-black/40"}
          `}
        >
          Media Library
        </span>

        <div
          className="
            w-5
            h-px

            bg-white/10
          "
        />
      </div>

      {/* Filters */}
      <MediaFilters
        darkMode={darkMode}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setVisibleCount={setVisibleCount}
      />
    </div>
  );
};

export default MediaToolbar;
