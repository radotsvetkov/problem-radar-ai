import { Button } from "@/components/ui/button";
import { RadarIcon, MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  isAuthenticated?: boolean;
}

export const Navigation = ({ isAuthenticated = false }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = isAuthenticated
    ? [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Search", href: "/search" },
        { name: "Alerts", href: "/alerts" },
        { name: "Profile", href: "/profile" }
      ]
    : [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "About", href: "#about" }
      ];

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <RadarIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">
                ProblemRadar AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="hero" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Sign Out
                </Button>
              ) : (
                <div className="space-y-2 pt-4">
                  <Link to="/login" className="block">
                    <Button variant="ghost" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" className="block">
                    <Button variant="hero" size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};