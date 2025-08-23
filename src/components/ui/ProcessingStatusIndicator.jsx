import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ProcessingStatusIndicator = ({ 
  status = 'idle', 
  progress = 0, 
  fileName = '', 
  onCancel,
  isSample = false,
  sampleInfo = null
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'uploading':
        return {
          icon: 'Upload',
          title: isSample ? 'Loading Sample Dataset...' : 'Uploading Document...',
          description: isSample 
            ? `Processing sample data for ${sampleInfo?.vessel || 'vessel'}`
            : 'Please wait while we upload your file',
          color: 'primary',
          showProgress: true
        };
      case 'processing':
        return {
          icon: 'Zap',
          title: isSample ? 'Extracting Sample Events...' : 'Processing Document...',
          description: isSample 
            ? `Analyzing ${sampleInfo?.events || 0} maritime events from ${sampleInfo?.port || 'port'}`
            : 'Analyzing maritime events and extracting timeline data',
          color: 'secondary',
          showProgress: true
        };
      case 'completed':
        return {
          icon: 'CheckCircle',
          title: isSample ? 'Sample Data Ready!' : 'Processing Complete!',
          description: isSample 
            ? `Successfully processed sample dataset for ${sampleInfo?.vessel || 'vessel'}`
            : 'Document has been successfully processed',
          color: 'success',
          showProgress: false
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          title: 'Processing Failed',
          description: 'There was an error processing your document',
          color: 'destructive',
          showProgress: false
        };
      default:
        return {
          icon: 'FileText',
          title: 'Ready to Process',
          description: 'Upload a document to begin processing',
          color: 'muted',
          showProgress: false
        };
    }
  };

  const config = getStatusConfig();

  const getProgressBarClasses = () => {
    const baseClasses = "h-3 rounded-full maritime-transition-state";
    switch (config?.color) {
      case 'primary':
        return `${baseClasses} bg-gradient-to-r from-primary to-primary/80`;
      case 'secondary':
        return `${baseClasses} bg-gradient-to-r from-secondary to-secondary/80`;
      case 'success':
        return `${baseClasses} bg-gradient-to-r from-success to-success/80`;
      default:
        return `${baseClasses} bg-muted-foreground`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 maritime-shadow-card">
      <div className="flex items-start space-x-4">
        {/* Status Icon */}
        <div className={`
          flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
          ${config?.color === 'primary' ? 'bg-primary/10 text-primary' : 
            config?.color === 'secondary' ? 'bg-secondary/10 text-secondary' : 
            config?.color === 'success' ? 'bg-success/10 text-success' : 
            config?.color === 'destructive'? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'}
          ${status === 'processing' ? 'animate-pulse' : ''}
        `}>
          <Icon 
            name={config?.icon} 
            size={24} 
            className={status === 'processing' ? 'animate-spin' : ''}
          />
        </div>

        {/* Status Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {config?.title}
              </h3>
              <p className="text-muted-foreground mb-3">
                {config?.description}
              </p>
              
              {/* File Info */}
              {fileName && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                  <Icon name="FileText" size={16} />
                  <span className="truncate">{fileName}</span>
                  {isSample && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                      Sample Dataset
                    </span>
                  )}
                </div>
              )}

              {/* Sample Additional Info */}
              {isSample && sampleInfo && (
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Ship" size={14} />
                    <span>{sampleInfo?.vessel}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{sampleInfo?.port}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{sampleInfo?.events} events</span>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              {config?.showProgress && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-foreground font-medium">Progress</span>
                    <span className="text-muted-foreground">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className={getProgressBarClasses()}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cancel Button */}
            {onCancel && status === 'uploading' && (
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                className="flex-shrink-0 ml-4"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatusIndicator;