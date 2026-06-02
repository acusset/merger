import { FileText, X } from 'lucide-react';

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
  onMove: (index: number, direction: -1 | 1) => void;
}

export function FileList({ files, onRemove, onMove }: FileListProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Files to merge ({files.length})
      </h2>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <FileText className="text-red-500" size={24} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => onMove(index, -1)}
                disabled={index === 0}
                className="p-1 text-gray-500 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move up"
              >
                ↑
              </button>
              <button
                onClick={() => onMove(index, 1)}
                disabled={index === files.length - 1}
                className="p-1 text-gray-500 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move down"
              >
                ↓
              </button>
              <button
                onClick={() => onRemove(index)}
                className="p-1 text-red-500 hover:text-red-700"
                title="Remove"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
