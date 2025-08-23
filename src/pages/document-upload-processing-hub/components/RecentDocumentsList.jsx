import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentDocumentsList = ({ 
  documents = [], 
  onViewResults,
  className = '' 
}) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          label: 'Completed'
        };
      case 'processing':
        return {
          icon: 'Loader2',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          label: 'Processing'
        };
      case 'failed':
        return {
          icon: 'AlertCircle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          label: 'Failed'
        };
      default:
        return {
          icon: 'Clock',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          label: 'Pending'
        };
    }
  };

  if (documents?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg p-8 text-center maritime-shadow-card ${className}`}>
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="FileText" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No Recent Documents
        </h3>
        <p className="text-muted-foreground">
          Upload your first Statement of Facts document to get started
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg maritime-shadow-card ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Recent Documents
          </h2>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span className="text-sm">
              {documents?.length} {documents?.length === 1 ? 'document' : 'documents'}
            </span>
          </div>
        </div>
      </div>
      {/* Documents List */}
      <div className="divide-y divide-border">
        {documents?.map((doc) => {
          const statusConfig = getStatusConfig(doc?.status);
          
          return (
            <div key={doc?.id} className="p-6 hover:bg-muted/50 maritime-transition-micro">
              <div className="flex items-start justify-between space-x-4">
                {/* Document Info */}
                <div className="flex items-start space-x-4 flex-1 min-w-0">
                  {/* File Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon 
                      name={doc?.type === 'pdf' ? 'FileText' : 'FileType'} 
                      size={20} 
                      className="text-primary" 
                    />
                  </div>

                  {/* Document Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground truncate mb-1">
                      {doc?.name}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span>{formatFileSize(doc?.size)}</span>
                      <span>•</span>
                      <span>{formatDate(doc?.uploadedAt)}</span>
                      {doc?.eventsExtracted && (
                        <>
                          <span>•</span>
                          <span className="text-success font-medium">
                            {doc?.eventsExtracted} events extracted
                          </span>
                        </>
                      )}
                    </div>

                    {/* Status Badge */}
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${statusConfig?.bgColor} ${statusConfig?.color}`}>
                      <Icon 
                        name={statusConfig?.icon} 
                        size={12} 
                        className={doc?.status === 'processing' ? 'animate-spin' : ''} 
                      />
                      <span>{statusConfig?.label}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex items-center space-x-2">
                  {doc?.status === 'completed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      onClick={() => onViewResults(doc?.id)}
                      className="maritime-transition-micro hover:maritime-shadow-interactive"
                    >
                      View Results
                    </Button>
                  )}
                  
                  {doc?.status === 'failed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="RotateCcw"
                      iconPosition="left"
                      className="maritime-transition-micro hover:maritime-shadow-interactive"
                    >
                      Retry
                    </Button>
                  )}

                  {/* More Options */}
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="MoreVertical"
                    className="text-muted-foreground hover:text-foreground"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* View All Link */}
      {documents?.length >= 5 && (
        <div className="p-6 border-t border-border text-center">
          <Button
            variant="ghost"
            iconName="ArrowRight"
            iconPosition="right"
            className="text-primary hover:text-primary/80"
          >
            View All Documents
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentDocumentsList;