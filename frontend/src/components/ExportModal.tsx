import React, { useState } from 'react';
import { useCV } from '../contexts/CVContext';
import { exportToPDF, exportToMarkdown } from '../utils/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { cvData } = useCV();
  const [exporting, setExporting] = useState<'pdf' | 'markdown' | null>(null);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const handlePDFExport = async () => {
    try {
      setExporting('pdf');
      setExportStatus('idle');
      
      const pdfBlob = await exportToPDF(cvData);
      const url = URL.createObjectURL(pdfBlob);
      setDownloadUrl(url);
      setExportStatus('success');
      
      // Auto-download the PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cvData.personalInfo.fullName || 'CV'}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('PDF export error:', error);
      setExportStatus('error');
    } finally {
      setExporting(null);
    }
  };

  const handleMarkdownExport = async () => {
    try {
      setExporting('markdown');
      setExportStatus('idle');
      
      const markdownContent = exportToMarkdown(cvData);
      const blob = new Blob([markdownContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setExportStatus('success');
      
      // Auto-download the Markdown
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cvData.personalInfo.fullName || 'CV'}_${new Date().toISOString().split('T')[0]}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Markdown export error:', error);
      setExportStatus('error');
    } finally {
      setExporting(null);
    }
  };

  const handleDownloadAgain = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${cvData.personalInfo.fullName || 'CV'}_${new Date().toISOString().split('T')[0]}.${exporting === 'pdf' ? 'pdf' : 'md'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleClose = () => {
    setExporting(null);
    setExportStatus('idle');
    setDownloadUrl('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Export Your CV
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {exportStatus === 'idle' && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Choose your preferred export format. Your CV will be downloaded automatically.
            </p>
            
            {/* PDF Export */}
            <button
              onClick={handlePDFExport}
              disabled={exporting !== null}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-phoenix-600 text-white rounded-lg hover:bg-phoenix-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {exporting === 'pdf' ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating PDF...</span>
                </div>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                  </svg>
                  <span>Export as PDF</span>
                </>
              )}
            </button>

            {/* Markdown Export */}
            <button
              onClick={handleMarkdownExport}
              disabled={exporting !== null}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {exporting === 'markdown' ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating Markdown...</span>
                </div>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  <span>Export as Markdown</span>
                </>
              )}
            </button>

            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              💡 PDF is optimized for ATS systems. Markdown is great for version control and editing.
            </div>
          </div>
        )}

        {exportStatus === 'success' && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Export Successful! 🎉
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your CV has been downloaded successfully.
            </p>
            <div className="space-y-2">
              <button
                onClick={handleDownloadAgain}
                className="w-full px-4 py-2 bg-phoenix-600 text-white rounded-lg hover:bg-phoenix-700 transition-colors"
              >
                Download Again
              </button>
              <button
                onClick={handleClose}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {exportStatus === 'error' && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Export Failed
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Something went wrong. Please try again.
            </p>
            <button
              onClick={() => setExportStatus('idle')}
              className="w-full px-4 py-2 bg-phoenix-600 text-white rounded-lg hover:bg-phoenix-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportModal;
