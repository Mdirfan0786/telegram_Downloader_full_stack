import { Search } from "lucide-react";

import ThemeToggle from "../../theme/ThemeToggle";

const NavbarActions = ({ darkMode, setDarkMode }) => {
  return (
    <div
      className="
        flex
        items-center

        gap-2
      "
    >
      {/* Mobile Search */}
      <button
        className={`
          md:hidden

          w-[34px]
          h-[34px]

          rounded-xl

          border

          flex
          items-center
          justify-center

          ${
            darkMode
              ? `
                border-white/[0.08]
                bg-white/[0.03]
                text-white/40
              `
              : `
                border-black/[0.08]
                bg-black/[0.03]
                text-black/50
              `
          }
        `}
      >
        <Search size={14} />
      </button>

      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default NavbarActions;
