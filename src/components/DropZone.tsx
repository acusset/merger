import React from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  isDragging: boolean;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DropZone({ isDragging, onDragEnter, onDragOver, onDragLeave, onDrop, onFileSelect }: DropZoneProps) {
  return (
    <div
      className="mb-6"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <label
        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-500 hover:bg-indigo-50'
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
          <Upload className="w-12 h-12 text-gray-400 mb-3" />
          <p className="mb-2 text-sm text-gray-600">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PDF files only</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          multiple
          onChange={onFileSelect}
        />
      </label>
    </div>
  );
}
