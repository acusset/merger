import { AlertCircle, Download } from 'lucide-react';
import { DropZone } from './components/DropZone';
import { FileList } from './components/FileList';
import { usePDFMerger } from './hooks/usePDFMerger';

export default function PDFMerger() {
  const {
    files,
    merging,
    error,
    isDragging,
    handleFileSelect,
    removeFile,
    moveFile,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    mergePDFs,
    clearFiles,
  } = usePDFMerger();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">PDF Merger</h1>
            <p className="text-gray-600">Combine multiple PDF files into one</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <DropZone
            isDragging={isDragging}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileSelect={handleFileSelect}
          />

          {files.length > 0 && (
            <FileList files={files} onRemove={removeFile} onMove={moveFile} />
          )}

          <div className="flex gap-3">
            <button
              onClick={mergePDFs}
              disabled={files.length < 2 || merging}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {merging ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Merging...</span>
                </>
              ) : (
                <>
                  <Download size={20} />
                  <span>Merge PDFs</span>
                </>
              )}
            </button>
            {files.length > 0 && (
              <button
                onClick={clearFiles}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
