import React, { useState } from "react";
import Liciera from "./Liceria.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-yellow-500 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center rounded-lg">
        <div className="flex items-center">
          <img src={Liciera} alt="Logo" className="w-30 h-24 mr-2 rounded-lg" />
        </div>

        <nav className="hidden md:flex space-x-8 ">
          <a
            href="/"
            className="text-white hover:text-white transition-colors text-2xl bg-customPurple rounded-lg "
          >
            Home
          </a>
          <a
            href="/pricing"
            className="text-white hover:text-white transition-colors text-2xl bg-customPurple rounded-lg "
          >
            Pricing
          </a>
          <a
            href="/about"
            className="text-white hover:text-white transition-colors text-2xl bg-customPurple rounded-lg "
          >
            About
          </a>
          <a
            href="/safe-books"
            className="text-white hover:text-white transition-colors text-2xl bg-customPurple rounded-lg "
          >
            Safe Books
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 focus:outline-none focus:text-blue-600"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-md py-4">
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            <a
              href="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="/pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Pricing
            </a>
            <a
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <a
              href="/safe-books"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Safe Books
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
