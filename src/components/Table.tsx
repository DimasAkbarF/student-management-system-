'use client';

import { ReactNode } from 'react';

interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => ReactNode;
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
    isLoading?: boolean;
}

export default function Table<T extends { id: number | string }>({
    data, columns, onRowClick, emptyMessage = 'No data available', isLoading = false
}: TableProps<T>) {
    if (isLoading) {
        return (
            <div className="table-container">
                <div className="p-12 text-center">
                    <div className="spinner mx-auto mb-4" />
                    <p className="text-[var(--color-text-muted)] text-sm">Loading data...</p>
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="table-container">
                <div className="empty-state">
                    <svg className="empty-state-icon mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="text-[var(--color-text)] font-medium mb-2">No Data Found</h3>
                    <p className="text-[var(--color-text-muted)] text-sm">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="table-container shadow-sm">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={String(col.key)} className={col.className}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            onClick={() => onRowClick?.(item)}
                            className={onRowClick ? 'cursor-pointer' : ''}
                        >
                            {columns.map((col) => (
                                <td key={String(col.key)} className={col.className}>
                                    {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
