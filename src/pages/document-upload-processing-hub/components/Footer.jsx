import React from 'react';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                width="16"
                height="16"
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
            <div className="text-sm text-muted-foreground">
              © {currentYear} SoF Event Extractor. All rights reserved.
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground maritime-transition-micro"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground maritime-transition-micro"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground maritime-transition-micro"
            >
              Support
            </a>
          </div>

          {/* Project Attribution */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Anchor" size={16} />
            <span>Maritime Document Processing Platform</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Designed for maritime professionals • Secure document processing • AI-powered event extraction
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;