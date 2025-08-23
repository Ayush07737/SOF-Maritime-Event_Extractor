import React from 'react';
import Icon from '../../../components/AppIcon';

const DocumentSummaryCard = ({ 
  documentName = '',
  processedAt = null,
  totalEvents = 0,
  processingTime = 0,
  className = ''
}) => {
  const formatProcessingTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatDateTime = (date) => {
    if (!date) return 'Unknown';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 maritime-shadow-card ${className}`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Document Info */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground mb-1 truncate">
              {documentName || 'Processed Document'}
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} />
                <span>Processed {formatDateTime(processedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} />
                <span>Processing time: {formatProcessingTime(processingTime)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {totalEvents?.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {totalEvents === 1 ? 'Event' : 'Events'} Extracted
            </div>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-full">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentSummaryCard;