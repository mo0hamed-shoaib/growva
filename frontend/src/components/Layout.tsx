import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { to: '/', label: 'Home', 'aria-label': 'Go to home page' },
    { to: '/builder', label: 'CV Builder', 'aria-label': 'Go to CV builder' },
    { to: '/about', label: 'About', 'aria-label': 'Go to about page' },
    { to: '/contact', label: 'Contact', 'aria-label': 'Go to contact page' },
  ];

  const isActiveRoute = (path: string) => location.pathname === path;

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header 
        className="border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm sticky top-0 z-50"
        role="banner"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 focus-ring rounded-lg p-1"
              aria-label="Go to home page"
            >
              <img 
                src="/logo.png" 
                alt="Growva Phoenix Logo" 
                className="w-8 h-8 rounded-lg"
                width="32"
                height="32"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Growva
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav 
              className="hidden md:flex items-center space-x-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {navigationItems.map((item) => (
                <Link 
                  key={item.to}
                  to={item.to} 
                  className={`nav-item focus-ring ${
                    isActiveRoute(item.to)
                      ? 'nav-item-active'
                      : 'nav-item-inactive'
                  }`}
                  aria-label={item['aria-label']}
                  aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Theme Toggle and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden btn-touch-secondary p-2 focus-ring"
                onClick={handleMobileMenuToggle}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <nav 
              id="mobile-menu"
              className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors focus-ring ${
                      isActiveRoute(item.to)
                        ? 'bg-phoenix-100 dark:bg-phoenix-900/20 text-phoenix-700 dark:text-phoenix-300'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={handleMobileMenuClose}
                    aria-label={item['aria-label']}
                    aria-current={isActiveRoute(item.to) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1" role="main">
        {children}
      </main>

      {/* Footer */}
      <footer 
        className="border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
        role="contentinfo"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="Growva Phoenix Logo" 
                className="w-6 h-6 rounded-md"
                width="24"
                height="24"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 Growva. Built with ❤️ for job seekers.
              </span>
            </div>
            
            <nav 
              className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400"
              role="navigation"
              aria-label="Footer navigation"
            >
              <Link 
                to="/privacy" 
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors focus-ring rounded px-1"
                aria-label="Go to privacy policy"
              >
                Privacy
              </Link>
              <Link 
                to="/terms" 
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors focus-ring rounded px-1"
                aria-label="Go to terms of service"
              >
                Terms
              </Link>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors focus-ring rounded px-1"
                aria-label="Visit our GitHub repository (opens in new tab)"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </footer>

      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-phoenix-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>
    </div>
  );
};

export default Layout;
