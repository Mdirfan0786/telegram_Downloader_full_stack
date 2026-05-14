import { useState } from "react";

import Navbar from "./components/layout/navbar/Navbar";

import Footer from "./components/layout/footer/footer";

import Home from "./pages/Home";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`
        min-h-screen
        transition-all
        duration-300

        ${darkMode ? "bg-[#080c14] text-white" : "bg-[#f5f7fb] text-black"}
      `}
    >
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main */}
      <Home searchQuery={searchQuery} darkMode={darkMode} />

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
