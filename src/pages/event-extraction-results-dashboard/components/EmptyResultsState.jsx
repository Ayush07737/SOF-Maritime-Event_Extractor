import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyResultsState = ({ 
  onUploadNew = null,
  className = ''
}) => {
  return (
    <div className={`bg-card border border-border rounded-lg maritime-shadow-card ${className}`}>
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="FileSearch" size={40} className="text-muted-foreground" />
        </div>

        {/* Content */}
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          No Results Available
        </h2>
        <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
          There are no extracted events to display. Upload a Statement of Facts document to begin processing and view maritime event data.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button
            variant="default"
            onClick={onUploadNew}
            iconName="Upload"
            iconPosition="left"
            className="maritime-transition-micro hover:maritime-shadow-interactive"
          >
            Upload Document
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location?.reload()}
            iconName="RefreshCw"
            iconPosition="left"
            className="maritime-transition-micro"
          >
            Refresh Page
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg max-w-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground text-left">
              <p className="font-medium text-foreground mb-1">Supported Formats:</p>
              <p>Upload PDF or DOCX Statement of Facts documents for automatic event extraction and timeline analysis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyResultsState;