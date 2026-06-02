import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export function usePDFMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const addPdfFiles = (incoming: File[]) => {
    const pdfFiles = incoming.filter(f => f.type === 'application/pdf');
    if (pdfFiles.length !== incoming.length) {
      setError('Only PDF files are allowed');
      setTimeout(() => setError(''), 3000);
    }
    if (pdfFiles.length > 0) {
      setFiles(prev => [...prev, ...pdfFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addPdfFiles(Array.from(e.target.files));
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= files.length) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    addPdfFiles(Array.from(e.dataTransfer.files));
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files to merge');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setMerging(true);
    setError('');

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to merge PDFs. Please try again.');
      console.error(err);
    } finally {
      setMerging(false);
    }
  };

  return {
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
    clearFiles: () => setFiles([]),
  };
}
