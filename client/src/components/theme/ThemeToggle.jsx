import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`
        w-[34px]
        h-[34px]

        rounded-xl

        border

        flex
        items-center
        justify-center

        transition-all
        duration-300

        ${
          darkMode
            ? `
              border-white/[0.08]
              bg-white/[0.03]
              text-yellow-300
            `
            : `
              border-black/[0.08]
              bg-black/[0.03]
              text-black/60
            `
        }
      `}
    >
      {darkMode ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
};

export default ThemeToggle;
