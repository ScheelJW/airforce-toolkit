// components/Header.js

import React from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

// This is the NavBar portion plus the hero/heading section
const Header = ({ onLoginClick, onRegisterClick }) => {
  return (
    <>
      {/* NavBar */}
      <nav className="flex justify-between items-center px-4 py-4 bg-gray-900 text-white shadow-lg">
        <div className="flex items-center space-x-2">
          <MilitaryTechIcon className="text-blue-500 text-3xl" />
          <span className="font-bold text-xl">Air Force Toolkit</span>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={onLoginClick}
            className="bg-blue-700 hover:bg-blue-800 py-1 px-4 rounded-full transition"
          >
            Login
          </button>
          <button
            onClick={onRegisterClick}
            className="border border-blue-700 hover:border-blue-800 py-1 px-4 rounded-full transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero / Heading Section */}
      <header className="relative text-center py-10 flex flex-col items-center overflow-hidden px-2 bg-gradient-to-b from-blue-900 to-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-blue-800 to-indigo-900 opacity-50 blur-xl rounded-full w-72 h-72 -translate-y-20" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-white z-10 drop-shadow-lg">
          Air Force Toolkit
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 z-10 text-center leading-snug max-w-xl">
          Empowering Airmen and Guardians with cutting-edge tools
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold text-white z-10 mt-4">
          Select an App
        </h2>
      </header>
    </>
  );
};

export default Header;
