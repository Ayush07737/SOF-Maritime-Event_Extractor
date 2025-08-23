import React from 'react';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
      {/* Background Maritime Illustrations */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="absolute top-10 left-10 w-32 h-32 text-primary-foreground"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M20 80 L50 20 L80 80 L50 60 Z" />
          <circle cx="50" cy="40" r="3" />
        </svg>
        <svg
          className="absolute bottom-10 right-10 w-24 h-24 text-primary-foreground"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M10 50 Q50 10 90 50 Q50 90 10 50" />
          <circle cx="30" cy="50" r="2" />
          <circle cx="70" cy="50" r="2" />
        </svg>
        <svg
          className="absolute top-1/2 left-1/4 w-20 h-20 text-primary-foreground transform -translate-y-1/2"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <rect x="20" y="40" width="60" height="20" rx="10" />
          <circle cx="30" cy="30" r="5" />
          <circle cx="70" cy="30" r="5" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-16 lg:py-24">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
            SoF Event Extractor
          </h1>
          
          {/* Tagline */}
          <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-4 max-w-3xl mx-auto">
            Streamline Maritime Document Analysis
          </p>
          
          {/* Description */}
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            Upload PDF or Word Statement of Facts documents and automatically extract timestamped events 
            with our advanced AI-powered processing engine designed for maritime professionals.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8 text-primary-foreground/90">
            <div className="flex items-center space-x-2">
              <Icon name="Upload" size={20} />
              <span className="text-sm lg:text-base font-medium">Drag & Drop Upload</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={20} />
              <span className="text-sm lg:text-base font-medium">AI-Powered Extraction</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={20} />
              <span className="text-sm lg:text-base font-medium">Multiple Export Formats</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-8 lg:h-12 text-background"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;