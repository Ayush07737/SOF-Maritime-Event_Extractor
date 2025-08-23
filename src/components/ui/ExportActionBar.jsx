import React, { useState } from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const ExportActionBar = ({ 
  onExportJSON = null,
  onExportCSV = null,
  isExporting = false,
  exportType = null,
  resultCount = 0,
  className = ''
}) => {
  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleExport = async (type) => {
    setShowExportOptions(false);
    
    if (type === 'json' && onExportJSON) {
      await onExportJSON();
    } else if (type === 'csv' && onExportCSV) {
      await onExportCSV();
    }
  };

  const getExportButtonText = () => {
    if (isExporting) {
      return exportType === 'json' ? 'Exporting JSON...' : 'Exporting CSV...';
    }
    return 'Export Results';
  };

  const getExportIcon = () => {
    if (isExporting) {
      return exportType === 'json' ? 'FileJson' : 'FileSpreadsheet';
    }
    return 'Download';
  };

  return (
    <div className={`flex items-center justify-between bg-card border border-border rounded-lg p-4 maritime-shadow-card ${className}`}>
      {/* Results Summary */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {resultCount} {resultCount === 1 ? 'Event' : 'Events'} Extracted
          </span>
        </div>
        
        {resultCount > 0 && (
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">
              Processing Complete
            </span>
          </div>
        )}
      </div>

      {/* Export Actions */}
      <div className="flex items-center space-x-3">
        {resultCount > 0 && (
          <>
            {/* Quick Export Buttons - Desktop */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('csv')}
                disabled={isExporting}
                loading={isExporting && exportType === 'csv'}
                iconName="FileSpreadsheet"
                iconPosition="left"
                className="maritime-transition-micro hover:maritime-shadow-interactive"
              >
                Export CSV
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('json')}
                disabled={isExporting}
                loading={isExporting && exportType === 'json'}
                iconName="FileJson"
                iconPosition="left"
                className="maritime-transition-micro hover:maritime-shadow-interactive"
              >
                Export JSON
              </Button>
            </div>

            {/* Export Dropdown - Mobile */}
            <div className="sm:hidden relative">
              <Button
                variant="default"
                size="sm"
                onClick={() => setShowExportOptions(!showExportOptions)}
                disabled={isExporting}
                loading={isExporting}
                iconName={getExportIcon()}
                iconPosition="left"
                className="maritime-transition-micro"
              >
                {getExportButtonText()}
              </Button>

              {showExportOptions && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md maritime-shadow-modal z-200 animate-fade-in">
                  <div className="py-2">
                    <button
                      onClick={() => handleExport('csv')}
                      className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted maritime-transition-micro"
                    >
                      <Icon name="FileSpreadsheet" size={16} className="mr-3" />
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExport('json')}
                      className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted maritime-transition-micro"
                    >
                      <Icon name="FileJson" size={16} className="mr-3" />
                      Export as JSON
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* No Results State */}
        {resultCount === 0 && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm">
              No events to export
            </span>
          </div>
        )}
      </div>

      {/* Click outside handler for mobile dropdown */}
      {showExportOptions && (
        <div 
          className="fixed inset-0 z-100"
          onClick={() => setShowExportOptions(false)}
        />
      )}
    </div>
  );
};

export default ExportActionBar;