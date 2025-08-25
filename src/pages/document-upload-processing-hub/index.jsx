import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProcessingStatusIndicator from '../../components/ui/ProcessingStatusIndicator';
import HeroSection from './components/HeroSection';
import FileUploadZone from './components/FileUploadZone';
import RecentDocumentsList from './components/RecentDocumentsList';
import UploadStatsCard from './components/UploadStatsCard';
import Footer from './components/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { documentService } from '../../services/documentService';

const DocumentUploadProcessingHub = () => {
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [selectedSampleData, setSelectedSampleData] = useState(null);
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalEvents: 0,
    successRate: 95,
    avgProcessingTime: '2.1 minutes',
    topPorts: ['Hamburg', 'Rotterdam', 'Singapore', 'Houston']
  });
  const [currentDocumentId, setCurrentDocumentId] = useState(null);
  const [error, setError] = useState(null);

  // Load documents on mount
  useEffect(() => {
    loadUserDocuments();
    loadUserStats();
  }, []);

  const loadUserDocuments = async () => {
    try {
      const documents = await documentService?.getUserDocuments();
      if (!documents) return;
      
      // Transform documents to match the expected format
      const transformedDocs = documents?.map(doc => ({
        id: doc?.id,
        name: doc?.original_file_name,
        type: doc?.file_type,
        size: doc?.file_size,
        uploadedAt: doc?.created_at,
        status: doc?.status,
        eventsExtracted: doc?.events_count,
        vessel: doc?.sample_dataset_id ? 'Sample Vessel' : 'Unknown Vessel',
        port: doc?.sample_dataset_id ? 'Sample Port' : 'Unknown Port',
        processingTime: doc?.processing_duration_seconds
      })) || [];
      
      setRecentDocuments(transformedDocs);
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const loadUserStats = async () => {
    try {
      const documents = await documentService?.getUserDocuments(user?.id);
      const completedDocs = documents?.filter(doc => doc?.status === 'completed') || [];
      const totalEvents = completedDocs?.reduce((sum, doc) => sum + (doc?.events_count || 0), 0);
      const successRate = documents?.length > 0 
        ? Math.round((completedDocs?.length / documents?.length) * 100) 
        : 95;

      setStats({
        totalDocuments: documents?.length || 0,
        totalEvents,
        successRate,
        avgProcessingTime: '2.1 minutes',
        topPorts: ['Hamburg', 'Rotterdam', 'Singapore', 'Houston']
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  // Handle sample dataset selection
  const handleSampleDatasetSelect = async (dataset) => {
    try {
      setError(null);
      setSelectedSampleData(dataset);
      setUploadStatus('uploading');
      setUploadProgress(0);
      setCurrentFile({
        name: `${dataset?.title}.pdf`,
        size: parseFloat(dataset?.fileSize?.replace(/[^0-9.]/g, '')) * 1024 * 1024,
        type: 'application/pdf'
      });

      // Start processing sample
      const document = await documentService?.processSampleDataset(dataset?.id, user?.id);
      setCurrentDocumentId(document?.id);

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(uploadInterval);
            setTimeout(() => {
              setUploadStatus('processing');
              setProcessingProgress(0);
              startProcessingProgress();
            }, 300);
            return 100;
          }
          return prev + Math.random() * 25;
        });
      }, 150);
    } catch (error) {
      console.error('Sample processing error:', error);
      setError(error?.message);
      setUploadStatus('idle');
    }
  };

  // Handle file upload
  const handleFileSelect = async (file) => {
    try {
      setError(null);
      setCurrentFile(file);
      setSelectedSampleData(null);
      setUploadStatus('uploading');
      setUploadProgress(0);

      // Start upload
      const document = await documentService?.uploadDocument(file, user?.id);
      setCurrentDocumentId(document?.id);

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(uploadInterval);
            setTimeout(() => {
              setUploadStatus('processing');
              setProcessingProgress(0);
              startProcessingProgress();
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error?.message);
      setUploadStatus('idle');
    }
  };

  // Start processing progress simulation
  const startProcessingProgress = () => {
    const processingInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(processingInterval);
          setTimeout(() => {
            setUploadStatus('completed');
            // Auto-navigate to results after 2 seconds
            setTimeout(() => {
              navigate('/event-extraction-results-dashboard', {
                state: { 
                  documentId: currentDocumentId,
                  isSample: !!selectedSampleData,
                  sampleDataset: selectedSampleData 
                }
              });
            }, 2000);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 250);
  };

  // Handle cancel upload
  const handleCancelUpload = () => {
    setUploadStatus('idle');
    setUploadProgress(0);
    setProcessingProgress(0);
    setCurrentFile(null);
    setSelectedSampleData(null);
    setCurrentDocumentId(null);
    setError(null);
  };

  // Handle view results
  const handleViewResults = (documentId) => {
    navigate('/event-extraction-results-dashboard', { 
      state: { documentId } 
    });
  };

  // Handle demo sign in
  const handleDemoSignIn = async () => {
    try {
      await signInDemo();
    } catch (error) {
      setError('Demo sign in failed. Please try again.');
    }
  };

  // Get current progress based on status
  const getCurrentProgress = () => {
    if (uploadStatus === 'uploading') return uploadProgress;
    if (uploadStatus === 'processing') return processingProgress;
    return 100;
  };

  // Main component content starts here

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 lg:py-16">
          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={20} className="text-destructive" />
                <p className="text-destructive font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Processing Status */}
          {uploadStatus !== 'idle' && (
            <div className="mb-8">
              <ProcessingStatusIndicator
                status={uploadStatus}
                progress={getCurrentProgress()}
                fileName={currentFile?.name}
                onCancel={uploadStatus === 'uploading' ? handleCancelUpload : null}
                isSample={!!selectedSampleData}
                sampleInfo={selectedSampleData ? {
                  vessel: selectedSampleData?.vessel,
                  port: selectedSampleData?.port,
                  events: selectedSampleData?.eventsCount
                } : null}
              />
            </div>
          )}

          {/* Main Upload Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Upload Zone */}
            <div className="lg:col-span-2">
              <FileUploadZone
                onFileSelect={handleFileSelect}
                onSampleSelect={handleSampleDatasetSelect}
                isUploading={uploadStatus === 'uploading'}
                uploadProgress={uploadProgress}
              />
            </div>

            {/* Stats Card */}
            <div className="lg:col-span-1">
              <UploadStatsCard
                totalDocuments={stats?.totalDocuments}
                totalEvents={stats?.totalEvents}
                successRate={stats?.successRate}
                avgProcessingTime={stats?.avgProcessingTime}
                topPorts={stats?.topPorts}
              />
            </div>
          </div>

          {/* Recent Documents */}
          {recentDocuments?.length > 0 && (
            <div className="mb-12">
              <RecentDocumentsList
                documents={recentDocuments}
                onViewResults={handleViewResults}
              />
            </div>
          )}

          {/* Enhanced Feature Cards with Maritime Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI-Powered Extraction */}
            <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-6 maritime-shadow-card hover:maritime-shadow-interactive maritime-transition-state">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Zap" size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                AI-Powered Extraction
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Advanced algorithms automatically identify and extract timestamped events from Statement of Facts documents with high accuracy.
              </p>
            </div>

            {/* Structured Timeline */}
            <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-6 maritime-shadow-card hover:maritime-shadow-interactive maritime-transition-state">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Clock" size={24} className="text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Structured Timeline
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Events are organized chronologically with precise timestamps, making it easy to track vessel operations and cargo activities.
              </p>
            </div>

            {/* Export Capabilities */}
            <div className="bg-gradient-to-br from-card to-card/80 border border-border rounded-xl p-6 maritime-shadow-card hover:maritime-shadow-interactive maritime-transition-state">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Download" size={24} className="text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Multiple Export Formats
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Export extracted data in JSON or CSV formats for seamless integration with your existing maritime management systems.
              </p>
            </div>
          </div>

          {/* Platform Benefits Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Why Maritime Professionals Choose Our Platform
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Streamline your document processing workflow and eliminate manual event extraction from Statement of Facts
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Processing Time Reduced', value: '85%', icon: 'Timer' },
                { label: 'Accuracy Rate', value: `${stats?.successRate}%`, icon: 'Target' },
                { label: 'Documents Processed', value: `${stats?.totalDocuments}+`, icon: 'FileText' },
                { label: 'Maritime Events Extracted', value: `${stats?.totalEvents}+`, icon: 'Anchor' }
              ]?.map((stat, index) => (
                <div key={index} className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name={stat?.icon} size={20} className="text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
                  <div className="text-sm text-muted-foreground">{stat?.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentUploadProcessingHub;