import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { SAMPLE_DATASETS } from '../../../utils/sampleDatasets';

const SampleDatasetSelector = ({ onSampleSelect, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(null);

  const handleDatasetSelect = (dataset) => {
    setSelectedDataset(dataset);
    setIsOpen(false);
    onSampleSelect?.(dataset);
  };

  const getVesselTypeIcon = (type) => {
    const iconMap = {
      'Bulk Carrier': 'Ship',
      'Oil Tanker': 'Droplets', 
      'Container Ship': 'Package',
      'Chemical Tanker': 'Beaker',
      'LNG Tanker': 'Flame',
      'Ro-Ro Vessel': 'Car',
      'General Cargo': 'Package2',
      'Reefer Ship': 'Snowflake',
      'Heavy Lift Vessel': 'Crane'
    };
    return iconMap?.[type] || 'Ship';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Selector Button */}
      <Button
        variant="outline"
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between maritime-transition-micro hover:maritime-shadow-interactive"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Database" size={18} />
          <span>Try Sample Dataset</span>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="maritime-transition-micro"
        />
      </Button>
      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-border rounded-lg maritime-shadow-modal max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-border">
              <h3 className="font-semibold text-foreground text-sm">
                Choose Sample Dataset
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Select a maritime document sample to demonstrate extraction capabilities
              </p>
            </div>
            
            <div className="p-2 space-y-1">
              {SAMPLE_DATASETS?.map((dataset) => (
                <button
                  key={dataset?.id}
                  onClick={() => handleDatasetSelect(dataset)}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted maritime-transition-micro group"
                >
                  <div className="flex items-start space-x-3">
                    {/* Vessel Icon */}
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 maritime-transition-micro">
                      <Icon 
                        name={getVesselTypeIcon(dataset?.type)} 
                        size={18} 
                        className="text-primary"
                      />
                    </div>
                    
                    {/* Dataset Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {dataset?.vessel}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {dataset?.port} • {dataset?.type}
                          </p>
                        </div>
                        
                        {/* File Stats */}
                        <div className="flex-shrink-0 text-right ml-2">
                          <p className="text-xs font-medium text-foreground">
                            {dataset?.eventsCount} events
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {dataset?.fileSize}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {dataset?.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border bg-muted/50">
              <p className="text-xs text-muted-foreground text-center">
                These samples demonstrate real-world maritime document processing
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SampleDatasetSelector;