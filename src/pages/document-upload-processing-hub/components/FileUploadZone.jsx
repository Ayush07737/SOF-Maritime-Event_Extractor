import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SampleDatasetSelector from './SampleDatasetSelector';

const FileUploadZone = ({ 
  onFileSelect,
  onSampleSelect,
  isUploading = false, 
  uploadProgress = 0,
  className = '' 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
      setDragOver(true);
    } else if (e?.type === "dragleave") {
      setDragOver(false);
      // Only set dragActive to false if we're leaving the drop zone entirely
      const rect = e?.currentTarget?.getBoundingClientRect();
      const x = e?.clientX;
      const y = e?.clientY;
      if (x < rect?.left || x > rect?.right || y < rect?.top || y > rect?.bottom) {
        setDragActive(false);
      }
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    setDragOver(false);

    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      const file = e?.dataTransfer?.files?.[0];
      validateAndSelectFile(file);
    }
  }, []);

  const validateAndSelectFile = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!allowedTypes?.includes(file?.type)) {
      alert('Please upload a PDF or Word document (.pdf, .docx, .doc)');
      return;
    }

    if (file?.size > maxSize) {
      alert('File size must be less than 50MB');
      return;
    }

    onFileSelect?.(file);
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      validateAndSelectFile(e?.target?.files?.[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  const handleSampleDatasetSelect = (dataset) => {
    onSampleSelect?.(dataset);
  };

  const getUploadZoneClasses = () => {
    let classes = `
      relative border-2 border-dashed rounded-xl p-8 lg:p-12 text-center maritime-transition-state
      ${isUploading ? 'pointer-events-none' : 'cursor-pointer'}
    `;

    if (isUploading) {
      classes += ' border-primary bg-primary/5';
    } else if (dragOver) {
      classes += ' border-secondary bg-secondary/10 scale-102';
    } else if (dragActive) {
      classes += ' border-primary bg-primary/5';
    } else {
      classes += ' border-border hover:border-primary hover:bg-primary/5';
    }

    return classes;
  };

  return (
    <div className={className}>
      <div
        className={getUploadZoneClasses()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!isUploading ? openFileDialog : undefined}
      >
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleFileInput}
          className="hidden"
          disabled={isUploading}
        />

        {/* Upload Content */}
        {!isUploading ? (
          <div className="space-y-8">
            {/* Upload Icon */}
            <div className="flex justify-center">
              <div className={`
                w-20 h-20 rounded-full flex items-center justify-center maritime-transition-state
                ${dragOver 
                  ? 'bg-secondary text-secondary-foreground animate-pulse' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                <Icon 
                  name={dragOver ? "Download" : "Upload"} 
                  size={32} 
                />
              </div>
            </div>

            {/* Upload Text */}
            <div className="space-y-3">
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                {dragOver ? 'Drop your document here' : 'Upload Statement of Facts'}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Drag and drop your PDF or Word document, or browse to upload. 
                You can also try our sample datasets to see the platform in action.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Main Upload Button */}
              <div className="flex justify-center">
                <Button
                  variant="default"
                  size="lg"
                  iconName="FolderOpen"
                  iconPosition="left"
                  className="maritime-transition-micro hover:maritime-shadow-interactive hover:scale-105"
                >
                  Browse Files
                </Button>
              </div>

              {/* Divider */}
              <div className="flex items-center space-x-4 max-w-xs mx-auto">
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-sm text-muted-foreground font-medium">OR</span>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              {/* Sample Dataset Selector */}
              <div className="max-w-xs mx-auto">
                <SampleDatasetSelector 
                  onSampleSelect={handleSampleDatasetSelect}
                />
              </div>
            </div>

            {/* File Requirements */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} />
                  <span>PDF, DOCX, DOC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="HardDrive" size={16} />
                  <span>Max 50MB</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} />
                  <span>Secure Processing</span>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="text-xs text-muted-foreground max-w-lg mx-auto">
                <p>
                  🚢 Supports all maritime document formats • ⚡ Real-time processing • 
                  📊 Structured event extraction • 🔒 Enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Upload Progress */
          <div className="space-y-6">
            {/* Progress Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon 
                  name="Upload" 
                  size={32} 
                  className="text-primary animate-pulse" 
                />
              </div>
            </div>
            
            {/* Progress Text */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Processing Document...
              </h3>
              <p className="text-muted-foreground">
                Analyzing maritime events and extracting timeline data
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2 max-w-md mx-auto">
              <div className="flex justify-between items-center text-sm">
                <span className="text-foreground font-medium">Progress</span>
                <span className="text-muted-foreground">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="h-3 bg-gradient-to-r from-primary to-secondary rounded-full maritime-transition-state"
                  style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Drag Overlay */}
        {dragOver && (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <Icon name="Download" size={48} className="text-secondary mx-auto mb-3 animate-bounce" />
              <p className="text-lg font-semibold text-secondary">
                Release to upload
              </p>
              <p className="text-sm text-secondary/80">
                We'll extract all maritime events automatically
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadZone;