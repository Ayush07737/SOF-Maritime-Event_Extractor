import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ExportActionBar from '../../components/ui/ExportActionBar';
import DocumentSummaryCard from './components/DocumentSummaryCard';
import FilterPanel from './components/FilterPanel';
import EventsDataTable from './components/EventsDataTable';
import EmptyResultsState from './components/EmptyResultsState';
import { documentService } from '../../services/documentService';
import Icon from '../../components/AppIcon';

const EventExtractionResultsDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState(null);
  const [documentInfo, setDocumentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get document ID from navigation state
  const documentId = location?.state?.documentId;
  const isSample = location?.state?.isSample;
  const sampleDataset = location?.state?.sampleDataset;

  // Load document and events data
  useEffect(() => {
    if (!documentId) {
      setError('No document selected');
      setLoading(false);
      return;
    }

    loadDocumentData();
  }, [documentId]);

  const loadDocumentData = async () => {
    try {
      setLoading(true);
      setError(null);

      const { document, events } = await documentService?.getDocumentWithEvents(documentId);
      
      setDocumentInfo({
        id: document?.id,
        name: document?.original_file_name,
        processedAt: document?.processing_completed_at || document?.created_at,
        processingTime: document?.processing_duration_seconds,
        status: document?.status,
        isSample: document?.is_sample,
        eventsCount: document?.events_count || 0
      });

      // Transform events for display
      const transformedEvents = events?.map(event => ({
        id: event?.id,
        event: event?.event_description,
        eventType: event?.event_type,
        startTime: event?.start_time,
        endTime: event?.end_time,
        vesselName: event?.vessel_name,
        portName: event?.port_name
      })) || [];

      setAllEvents(transformedEvents);
      setFilteredEvents(transformedEvents);
    } catch (error) {
      console.error('Failed to load document data:', error);
      setError(error?.message || 'Failed to load document data');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
    
    const sortedEvents = [...filteredEvents]?.sort((a, b) => {
      const aValue = a?.[newSortConfig?.key];
      const bValue = b?.[newSortConfig?.key];
      
      if (aValue < bValue) {
        return newSortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return newSortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredEvents(sortedEvents);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...allEvents];

    // Search term filter
    if (filters?.searchTerm) {
      const term = filters?.searchTerm?.toLowerCase();
      filtered = filtered?.filter(event =>
        event?.event?.toLowerCase()?.includes(term) ||
        event?.vesselName?.toLowerCase()?.includes(term) ||
        event?.portName?.toLowerCase()?.includes(term)
      );
    }

    // Event type filter
    if (filters?.eventType) {
      filtered = filtered?.filter(event =>
        event?.eventType === filters?.eventType
      );
    }

    // Date range filters
    if (filters?.startDate) {
      filtered = filtered?.filter(event => {
        const eventDate = new Date(event.startTime);
        const filterDate = new Date(filters.startDate);
        return eventDate >= filterDate;
      });
    }

    if (filters?.endDate) {
      filtered = filtered?.filter(event => {
        const eventDate = new Date(event.endTime);
        const filterDate = new Date(filters.endDate);
        return eventDate <= filterDate;
      });
    }

    setFilteredEvents(filtered);
  };

  const handleClearFilters = () => {
    setFilteredEvents(allEvents);
  };

  const handleExportJSON = async () => {
    setIsExporting(true);
    setExportType('json');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const exportData = {
        document: {
          id: documentInfo?.id,
          name: documentInfo?.name,
          processedAt: documentInfo?.processedAt,
          totalEvents: filteredEvents?.length,
          processingTime: documentInfo?.processingTime
        },
        extractedEvents: filteredEvents?.map(event => ({
          event: event?.event,
          eventType: event?.eventType,
          startTime: event?.startTime,
          endTime: event?.endTime,
          vesselName: event?.vesselName,
          portName: event?.portName
        })),
        exportedAt: new Date()?.toISOString(),
        totalEvents: filteredEvents?.length,
        metadata: {
          exportFormat: 'JSON',
          platform: 'Maritime Document Processor',
          version: '1.0'
        }
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `maritime_events_${documentInfo?.name?.replace(/\.[^/.]+$/, '')}_${new Date()?.toISOString()?.split('T')?.[0]}.json`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('JSON export failed:', error);
      setError('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    setExportType('csv');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const csvHeaders = ['Event', 'Event Type', 'Start Time', 'End Time', 'Vessel Name', 'Port Name'];
      const csvRows = filteredEvents?.map(event => [
        `"${event?.event?.replace(/"/g, '""') || ''}"`,
        `"${event?.eventType || ''}"`,
        `"${event?.startTime || ''}"`,
        `"${event?.endTime || ''}"`,
        `"${event?.vesselName || ''}"`,
        `"${event?.portName || ''}"`
      ]);

      const csvContent = [
        csvHeaders?.join(','),
        ...csvRows?.map(row => row?.join(','))
      ]?.join('\n');

      const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `maritime_events_${documentInfo?.name?.replace(/\.[^/.]+$/, '')}_${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
      document.body?.appendChild(link);
      link?.click();
      document.body?.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('CSV export failed:', error);
      setError('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const handleUploadNew = () => {
    navigate('/document-upload-processing-hub');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">
            Loading document data...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !documentInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 lg:px-6 py-16 text-center">
            <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-8">
              <Icon name="AlertCircle" size={48} className="mx-auto mb-6 text-destructive" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Error Loading Document
              </h2>
              <p className="text-muted-foreground mb-6">
                {error}
              </p>
              <button
                onClick={handleUploadNew}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Icon name="Upload" size={16} className="mr-2 inline" />
                Upload New Document
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const hasResults = filteredEvents?.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={20} className="text-destructive" />
                <p className="text-destructive text-sm">{error}</p>
              </div>
            </div>
          )}

          {hasResults ? (
            <div className="space-y-6">
              {/* Document Summary */}
              <DocumentSummaryCard
                documentName={documentInfo?.name}
                processedAt={documentInfo?.processedAt}
                totalEvents={filteredEvents?.length}
                processingTime={documentInfo?.processingTime}
                isLoading={loading}
                isSample={documentInfo?.isample || isSample}
              />

              {/* Export Action Bar */}
              <ExportActionBar
                onExportJSON={handleExportJSON}
                onExportCSV={handleExportCSV}
                isExporting={isExporting}
                exportType={exportType}
                resultCount={filteredEvents?.length}
              />

              {/* Filter Panel */}
              <FilterPanel
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                isCollapsed={isFilterCollapsed}
                onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
                totalEvents={allEvents?.length}
                filteredEvents={filteredEvents?.length}
              />

              {/* Events Data Table */}
              <EventsDataTable
                events={filteredEvents}
                onSort={handleSort}
                sortConfig={sortConfig}
                isLoading={loading}
              />
            </div>
          ) : (
            <EmptyResultsState onUploadNew={handleUploadNew} />
          )}
        </div>
      </main>
    </div>
  );
};

export default EventExtractionResultsDashboard;