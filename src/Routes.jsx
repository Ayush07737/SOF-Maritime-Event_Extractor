import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EventExtractionResultsDashboard from './pages/event-extraction-results-dashboard';
import DocumentUploadProcessingHub from './pages/document-upload-processing-hub';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DocumentUploadProcessingHub />} />
        <Route path="/event-extraction-results-dashboard" element={<EventExtractionResultsDashboard />} />
        <Route path="/document-upload-processing-hub" element={<DocumentUploadProcessingHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
