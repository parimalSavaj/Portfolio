import React from "react";
import { personalInfo } from "../../lib/data";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

const Header = () => {
  const { scrollToSection, scrollToTop } = useSmoothScroll({ offset: 80 });

  return (
    <header className="sticky top-0 z-50 bg-aurora-night/95 backdrop-blur-sm border-b border-aurora-purple/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              onClick={scrollToTop}
              className="text-xl font-bold text-aurora-text hover:text-aurora-purple transition-colors duration-300 cursor-pointer"
            >
              {personalInfo.name}
            </h1>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {[
                { name: "About", id: "about" },
                { name: "Projects", id: "projects" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-aurora-muted hover:text-aurora-text px-3 py-2 text-sm font-medium transition-colors duration-300 group"
                >
                  {item.name}
                  {/* Animated underline */}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-aurora-purple to-aurora-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-aurora-muted hover:text-aurora-text p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
