import FILTERS from "../../constants/filters";

const MediaFilters = ({
  darkMode,
  activeFilter,
  setActiveFilter,
  setVisibleCount,
}) => {
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    // Reset Infinite Scroll
    setVisibleCount(6);
  };

  return (
    <div
      className="
        flex
        flex-wrap

        gap-2
      "
    >
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterChange(filter)}
          className={`
            text-[11px]
            font-medium

            px-4
            py-2

            rounded-xl

            border

            transition-all
            duration-200

            ${
              activeFilter === filter
                ? `
                  border-blue-500/30
                  bg-blue-500/10
                  text-blue-400
                `
                : darkMode
                  ? `
                    border-white/[0.07]
                    bg-white/[0.02]
                    text-white/30
                  `
                  : `
                    border-black/[0.06]
                    bg-black/[0.03]
                    text-black/50
                  `
            }
          `}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default MediaFilters;
