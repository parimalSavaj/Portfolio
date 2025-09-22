import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { personalInfo } from "../../lib/data";
import { blogCategories } from "../../lib/blogData";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

const Header = () => {
  const { scrollToSection } = useSmoothScroll({ offset: 80 });
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're on the home page
  const isHomePage = location.pathname === "/";

  // Smart navigation function
  const handleNavigation = (sectionId: string) => {
    if (isHomePage) {
      // If on home page, scroll to section
      scrollToSection(sectionId);
    } else {
      // If on other pages, navigate to home with hash
      navigate(`/#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  // Handle hash navigation when arriving at home page
  useEffect(() => {
    if (isHomePage && location.hash) {
      const sectionId = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        scrollToSection(sectionId);
      }, 100); // Small delay to ensure page is loaded
      return () => clearTimeout(timer);
    }
  }, [location, isHomePage, scrollToSection]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsBlogDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-aurora-night/95 backdrop-blur-sm border-b border-aurora-purple/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsBlogDropdownOpen(false);
              }}
            >
              <h1 className="text-xl font-bold text-aurora-text hover:text-aurora-purple transition-colors duration-300 cursor-pointer">
                {personalInfo.name}
              </h1>
            </Link>
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
                  onClick={() => handleNavigation(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 group ${
                    isHomePage && location.hash === `#${item.id}`
                      ? "text-aurora-purple"
                      : "text-aurora-muted hover:text-aurora-text"
                  }`}
                >
                  {item.name}
                  {/* Animated underline */}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-aurora-purple to-aurora-blue transform transition-transform duration-300 origin-center ${
                      isHomePage && location.hash === `#${item.id}`
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </button>
              ))}

              {/* Blog Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsBlogDropdownOpen(!isBlogDropdownOpen)}
                  onMouseEnter={() => setIsBlogDropdownOpen(true)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 group flex items-center ${
                    location.pathname.startsWith("/blog")
                      ? "text-aurora-purple"
                      : "text-aurora-muted hover:text-aurora-text"
                  }`}
                >
                  Blog
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                      isBlogDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  {/* Animated underline */}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-aurora-purple to-aurora-blue transform transition-transform duration-300 origin-center ${
                      location.pathname.startsWith("/blog")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </button>

                {/* Dropdown Menu */}
                {isBlogDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-aurora-night/95 backdrop-blur-sm border border-aurora-purple/20 rounded-lg shadow-lg overflow-hidden z-50"
                    onMouseLeave={() => setIsBlogDropdownOpen(false)}
                  >
                    <div className="py-2">
                      <Link
                        to="/blog"
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          location.pathname === "/blog"
                            ? "text-aurora-purple bg-aurora-purple/10"
                            : "text-aurora-muted hover:text-aurora-text hover:bg-aurora-purple/10"
                        }`}
                        onClick={() => setIsBlogDropdownOpen(false)}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">📝</span>
                          <div>
                            <div className="font-medium">All Posts</div>
                            <div className="text-xs text-aurora-muted/70">
                              Browse all articles
                            </div>
                          </div>
                        </div>
                      </Link>
                      <hr className="my-2 border-aurora-purple/20" />
                      {blogCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/blog/${category.slug}`}
                          className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                            location.pathname === `/blog/${category.slug}`
                              ? "text-aurora-purple bg-aurora-purple/10"
                              : "text-aurora-muted hover:text-aurora-text hover:bg-aurora-purple/10"
                          }`}
                          onClick={() => setIsBlogDropdownOpen(false)}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{category.icon}</span>
                            <div>
                              <div className="font-medium">{category.name}</div>
                              <div className="text-xs text-aurora-muted/70">
                                {category.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-aurora-muted hover:text-aurora-text p-2"
            >
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
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-aurora-night/95 backdrop-blur-sm border-t border-aurora-purple/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { name: "About", id: "about" },
                { name: "Projects", id: "projects" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.id)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    isHomePage && location.hash === `#${item.id}`
                      ? "text-aurora-purple bg-aurora-purple/10"
                      : "text-aurora-muted hover:text-aurora-text hover:bg-aurora-purple/10"
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* Mobile Blog Section */}
              <div className="pt-2">
                <Link
                  to="/blog"
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    location.pathname === "/blog"
                      ? "text-aurora-purple bg-aurora-purple/10"
                      : "text-aurora-muted hover:text-aurora-text hover:bg-aurora-purple/10"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📝 All Blog Posts
                </Link>
                <div className="pl-4 space-y-1">
                  {blogCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/blog/${category.slug}`}
                      className={`block px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                        location.pathname === `/blog/${category.slug}`
                          ? "text-aurora-purple bg-aurora-purple/10"
                          : "text-aurora-muted hover:text-aurora-text hover:bg-aurora-purple/10"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.icon} {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
