import NavbarBrand from "./NavbarBrand";

import NavbarActions from "./NavbarActions";

import SearchBar from "../../search/SearchBar";

const Navbar = ({ searchQuery, setSearchQuery, darkMode, setDarkMode }) => {
  return (
    <nav
      className={`
        fixed
        top-0
        left-0
        right-0

        z-50

        flex
        items-center
        justify-between

        px-3
        sm:px-6
        lg:px-8

        h-[52px]
        sm:h-[60px]

        backdrop-blur-xl

        border-b

        transition-all
        duration-300

        ${
          darkMode
            ? `
              bg-[#080c14]/85
              border-white/[0.06]
            `
            : `
              bg-white/80
              border-black/[0.06]
            `
        }
      `}
    >
      {/* LEFT */}
      <NavbarBrand darkMode={darkMode} />

      {/* CENTER */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
      />

      {/* RIGHT */}
      <NavbarActions darkMode={darkMode} setDarkMode={setDarkMode} />
    </nav>
  );
};

export default Navbar;
