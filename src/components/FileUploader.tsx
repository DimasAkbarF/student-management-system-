'use client';

import { useCallback, useState } from 'react';

interface FileUploaderProps {
    onFileSelect: (data: unknown, filename: string) => void;
    accept?: string;
    label?: string;
}

export default function FileUploader({ onFileSelect, accept = '.json', label = 'Upload JSON File' }: FileUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');
    const [filename, setFilename] = useState('');

    const handleFile = useCallback((file: File) => {
        setError('');
        if (!file.name.endsWith('.json')) {
            setError('Please upload a JSON file');
            return;
        }
        setFilename(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string);
                onFileSelect(data, file.name);
            } catch {
                setError('Invalid JSON format');
            }
        };
        reader.readAsText(file);
    }, [onFileSelect]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    return (
        <div>
            <label className="label">{label}</label>
            <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all
          ${isDragging ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-[var(--color-border)]'}
          hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
            >
                <svg className="w-12 h-12 mx-auto text-[var(--color-text-muted)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-[var(--color-text-muted)] mb-2">
                    Drag and drop your file here, or
                </p>
                <label className="btn btn-primary cursor-pointer">
                    Browse Files
                    <input
                        type="file"
                        accept={accept}
                        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                        className="hidden"
                    />
                </label>
                {filename && <p className="text-sm text-[var(--color-success)] mt-3">Selected: {filename}</p>}
                {error && <p className="text-sm text-[var(--color-danger)] mt-3">{error}</p>}
            </div>
        </div>
    );
}
