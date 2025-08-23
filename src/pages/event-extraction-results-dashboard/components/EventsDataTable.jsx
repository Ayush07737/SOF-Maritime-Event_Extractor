import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const EventsDataTable = ({ 
  events = [],
  onSort = null,
  sortConfig = { key: null, direction: 'asc' },
  className = ''
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const sortedEvents = useMemo(() => {
    if (!sortConfig?.key) return events;

    return [...events]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'startTime' || sortConfig?.key === 'endTime') {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        return sortConfig?.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig?.direction === 'asc' 
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      }

      return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [events, sortConfig]);

  const handleSort = (key) => {
    if (onSort) {
      const direction = sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
      onSort({ key, direction });
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })?.format(new Date(dateString));
    } catch (error) {
      return dateString;
    }
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground opacity-50" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-primary" />
      : <Icon name="ArrowDown" size={16} className="text-primary" />;
  };

  if (events?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg maritime-shadow-card ${className}`}>
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="FileX" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Events Found
          </h3>
          <p className="text-muted-foreground max-w-md">
            No events were extracted from the processed document. Please try uploading a different Statement of Facts document.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg maritime-shadow-card overflow-hidden ${className}`}>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 sticky top-0 z-10">
            <tr>
              <th className="text-left p-4 font-semibold text-foreground border-b border-border">
                <button
                  onClick={() => handleSort('event')}
                  className="flex items-center space-x-2 hover:text-primary maritime-transition-micro"
                >
                  <span>Event</span>
                  {getSortIcon('event')}
                </button>
              </th>
              <th className="text-left p-4 font-semibold text-foreground border-b border-border">
                <button
                  onClick={() => handleSort('startTime')}
                  className="flex items-center space-x-2 hover:text-primary maritime-transition-micro"
                >
                  <span>Start Time</span>
                  {getSortIcon('startTime')}
                </button>
              </th>
              <th className="text-left p-4 font-semibold text-foreground border-b border-border">
                <button
                  onClick={() => handleSort('endTime')}
                  className="flex items-center space-x-2 hover:text-primary maritime-transition-micro"
                >
                  <span>End Time</span>
                  {getSortIcon('endTime')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedEvents?.map((event, index) => (
              <tr
                key={event?.id || index}
                className={`
                  border-b border-border last:border-b-0 maritime-transition-micro
                  ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}
                  ${hoveredRow === index ? 'bg-primary/5' : ''}
                  hover:bg-primary/5
                `}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="p-4 text-foreground">
                  <div className="font-medium">{event?.event}</div>
                </td>
                <td className="p-4 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>{formatDateTime(event?.startTime)}</span>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>{formatDateTime(event?.endTime)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {sortedEvents?.map((event, index) => (
          <div
            key={event?.id || index}
            className="bg-background border border-border rounded-lg p-4 maritime-shadow-card"
          >
            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Event</div>
                <div className="font-medium text-foreground">{event?.event}</div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Start Time</div>
                  <div className="flex items-center space-x-2 text-sm text-foreground">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span>{formatDateTime(event?.startTime)}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">End Time</div>
                  <div className="flex items-center space-x-2 text-sm text-foreground">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span>{formatDateTime(event?.endTime)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsDataTable;