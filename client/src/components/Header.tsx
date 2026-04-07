import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const basePath = "/ganesh";

  const navItems = [
    // { name: "Home", path: "/" },
    { name: "What We Do", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Resources", path: "/resources" },
    { name: "Products", path: "/products" },
  ];

  const isActive = (path: string) => location.pathname === basePath + path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* ---------- Logo ---------- */}
        <Link to="/" className="flex items-center">
          <img
            src="/img/logo/t-imoexo-logo.png"
            alt="T-IMOEXO International"
            className="h-10 sm:h-12 w-auto"
          />
        </Link>

        {/* ---------- Desktop Navigation ---------- */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative font-medium ${isActive(item.path)
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* ---------- Contact Button + Menu Icon (Always Visible) ---------- */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="rounded-lg text-lg lg:text-base px-3.5 py-2 bg-blue-900 hover:bg-blue-700 text-white shadow-lg"
          >
            Contact
          </Link>

          {/* ---------- Mobile Menu Button ---------- */}
          <button
            className="lg:hidden flex items-center justify-center text-gray-800 rounded-md p-2 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-blue-600" />
            ) : (
              <Menu className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* ---------- Mobile Navigation Menu ---------- */}
      {isMenuOpen && (
        <nav className="lg:hidden mt-4 space-y-3 border-t border-gray-200 pt-4 pb-4 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 rounded-lg font-medium ${isActive(item.path)
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
