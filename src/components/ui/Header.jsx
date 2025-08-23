import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Upload',
      path: '/document-upload-processing-hub',
      icon: 'Upload'
    },
    {
      label: 'Results',
      path: '/event-extraction-results-dashboard',
      icon: 'BarChart3'
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex items-center cursor-pointer maritime-transition-micro hover:opacity-80"
              onClick={() => handleNavigation('/document-upload-processing-hub')}
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary-foreground"
                >
                  <path
                    d="M3 12L5 10L12 17L19 10L21 12L12 21L3 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M3 6L5 4L12 11L19 4L21 6L12 15L3 6Z"
                    fill="currentColor"
                    opacity="0.6"
                  />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-foreground">
                  SoF Event Extractor
                </h1>
                <p className="text-sm text-muted-foreground -mt-1">
                  Maritime Document Processing
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  flex items-center px-4 py-2 rounded-md text-sm font-medium maritime-transition-micro
                  ${isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground maritime-shadow-interactive'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className="mr-2" 
                />
                {item?.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon 
                name={isMobileMenuOpen ? 'X' : 'Menu'} 
                size={20} 
              />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card animate-slide-in-from-top">
            <nav className="px-4 py-3 space-y-1">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`
                    flex items-center w-full px-3 py-3 rounded-md text-sm font-medium maritime-transition-micro
                    ${isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground maritime-shadow-interactive'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className="mr-3" 
                  />
                  {item?.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;