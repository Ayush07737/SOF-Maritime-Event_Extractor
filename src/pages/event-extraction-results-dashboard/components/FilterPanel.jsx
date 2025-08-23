import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  onFilterChange = null,
  onClearFilters = null,
  isCollapsed = true,
  onToggleCollapse = null,
  className = ''
}) => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    startDate: '',
    endDate: '',
    eventType: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      searchTerm: '',
      startDate: '',
      endDate: '',
      eventType: ''
    };
    setFilters(clearedFilters);
    
    if (onClearFilters) {
      onClearFilters();
    }
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className={`bg-card border border-border rounded-lg maritime-shadow-card ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">
            Filter Events
          </h3>
          {hasActiveFilters && (
            <div className="flex items-center space-x-2 px-2 py-1 bg-primary/10 text-primary rounded-full">
              <Icon name="CheckCircle" size={14} />
              <span className="text-xs font-medium">Active</span>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          iconName={isCollapsed ? 'ChevronDown' : 'ChevronUp'}
          iconPosition="right"
          className="text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? 'Show Filters' : 'Hide Filters'}
        </Button>
      </div>
      {/* Filter Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Term */}
            <div>
              <Input
                label="Search Events"
                type="search"
                placeholder="Search in event descriptions..."
                value={filters?.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
                className="w-full"
              />
            </div>

            {/* Event Type Filter */}
            <div>
              <Input
                label="Event Type"
                type="text"
                placeholder="e.g., Arrival, Departure..."
                value={filters?.eventType}
                onChange={(e) => handleFilterChange('eventType', e?.target?.value)}
                className="w-full"
              />
            </div>

            {/* Start Date */}
            <div>
              <Input
                label="From Date"
                type="date"
                value={filters?.startDate}
                onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
                className="w-full"
              />
            </div>

            {/* End Date */}
            <div>
              <Input
                label="To Date"
                type="date"
                value={filters?.endDate}
                onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {hasActiveFilters ? 'Filters applied to results' : 'No active filters'}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;