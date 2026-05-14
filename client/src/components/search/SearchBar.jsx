import { Search, X } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery, darkMode }) => {
  return (
    <div
      className="
        hidden
        md:flex

        flex-1
        justify-center

        px-10
      "
    >
      <div
        className={`
          w-full
          max-w-[420px]

          flex
          items-center

          gap-3

          px-4
          h-[42px]

          rounded-2xl

          border

          transition-all
          duration-300

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
        <Search
          size={16}
          className={darkMode ? "text-white/30" : "text-black/40"}
        />

        <input
          type="text"
          placeholder="Search media..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`
            flex-1

            bg-transparent
            outline-none

            text-sm

            ${
              darkMode
                ? `
                  text-white
                  placeholder:text-white/25
                `
                : `
                  text-black
                  placeholder:text-black/30
                `
            }
          `}
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="
              text-white/30
              hover:text-white

              transition-all
            "
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
