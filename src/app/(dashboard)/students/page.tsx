'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Table from '@/components/Table';
import { ConfirmModal } from '@/components/Modal';
import Modal from '@/components/Modal';
import FileUploader from '@/components/FileUploader';
import { IStudent } from '@/models/Student';
import { getInitials, getAvatarColor } from '@/utils/avatar';

export default function StudentsPage() {
    const router = useRouter();
    const [students, setStudents] = useState<IStudent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteAll, setShowDeleteAll] = useState(false);
    const [isDeletingAll, setIsDeletingAll] = useState(false);
    const [showImport, setShowImport] = useState(false);
    const [importData, setImportData] = useState<Record<string, unknown>[] | null>(null);
    const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
    const [isImporting, setIsImporting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const fetchStudents = useCallback(async () => {
        try {
            const res = await fetch('/api/students');
            const data = await res.json();
            if (data.success) setStudents(data.data);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/students/${deleteId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setStudents(prev => prev.filter(s => s.id !== deleteId));
                setMessage({ type: 'success', text: 'Student deleted successfully' });
            } else {
                setMessage({ type: 'error', text: data.error });
            }
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    const handleDeleteAll = async () => {
        setIsDeletingAll(true);
        try {
            const res = await fetch('/api/students/delete-all', { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setStudents([]);
                setMessage({ type: 'success', text: data.message });
            } else {
                setMessage({ type: 'error', text: data.error });
            }
        } finally {
            setIsDeletingAll(false);
            setShowDeleteAll(false);
        }
    };

    const handleExport = () => {
        window.open('/api/students/export', '_blank');
    };

    const handleImport = async () => {
        if (!importData) return;
        setIsImporting(true);
        try {
            const res = await fetch('/api/students/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: importData, replace: importMode === 'replace' })
            });
            const result = await res.json();
            if (result.success) {
                setMessage({ type: 'success', text: result.message });
                fetchStudents();
            } else {
                setMessage({ type: 'error', text: result.error });
            }
        } finally {
            setIsImporting(false);
            setShowImport(false);
            setImportData(null);
        }
    };

    // Avatar component for table
    const StudentAvatar = ({ name }: { name: string }) => {
        const initials = getInitials(name);
        const { gradient } = getAvatarColor(name);
        return (
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xs font-medium shrink-0`}>
                {initials}
            </div>
        );
    };

    const columns = [
        {
            key: 'avatar',
            header: '',
            className: 'w-12',
            render: (s: IStudent) => <StudentAvatar name={s.name} />
        },
        {
            key: 'name',
            header: 'Name',
            render: (s: IStudent) => (
                <span className="font-medium text-[var(--color-text)]">{s.name}</span>
            )
        },
        { key: 'nim', header: 'NIM' },
        { key: 'department', header: 'Department' },
        { key: 'age', header: 'Age', className: 'text-center' },
        {
            key: 'gpa',
            header: 'GPA',
            render: (s: IStudent) => (
                <span className={`badge ${s.gpa >= 3.5 ? 'badge-success' : s.gpa >= 2.5 ? 'badge-warning' : 'badge-danger'}`}>
                    {s.gpa.toFixed(2)}
                </span>
            )
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (s: IStudent) => (
                <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); router.push(`/students/${s.id}`); }} className="btn btn-ghost btn-icon" title="View">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); router.push(`/students/edit/${s.id}`); }} className="btn btn-ghost btn-icon" title="Edit">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setDeleteId(s.id); }} className="btn btn-ghost btn-icon text-[var(--color-danger)]" title="Delete">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div>
            {/* Header */}
            <div className="dashboard-header text-center flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-center">
                    <h1>Students</h1>
                    <p>Manage your student records ({students.length} total)</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {students.length > 0 && (
                        <button onClick={() => setShowDeleteAll(true)} className="btn btn-danger">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            Remove All
                        </button>
                    )}
                    <button onClick={() => setShowImport(true)} className="btn btn-secondary">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        Import
                    </button>
                    <button onClick={handleExport} className="btn btn-secondary">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Export
                    </button>
                    <Link href="/students/add" className="btn btn-primary">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        <span>Add Student</span>
                    </Link>
                </div>
            </div>

            {/* Message */}
            {message.text && (
                <div className={`toast ${message.type === 'success' ? 'toast-success' : 'toast-error'} mb-6`}>
                    {message.text}
                    <button onClick={() => setMessage({ type: '', text: '' })} className="ml-auto p-1 hover:opacity-70 transition-opacity">×</button>
                </div>
            )}

            {/* Table */}
            <section className="dashboard-section">
                <Table
                    data={students}
                    columns={columns}
                    isLoading={isLoading}
                    emptyMessage="No students found. Add your first student!"
                    onRowClick={(s) => router.push(`/students/${s.id}`)}
                />
            </section>

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Student"
                message="Are you sure you want to delete this student? This action cannot be undone."
                confirmText="Delete"
                isLoading={isDeleting}
            />

            {/* Delete All Confirmation */}
            <ConfirmModal
                isOpen={showDeleteAll}
                onClose={() => setShowDeleteAll(false)}
                onConfirm={handleDeleteAll}
                title="Delete All Students"
                message={`Are you sure you want to delete ALL ${students.length} students? This will free up database storage but cannot be undone.`}
                confirmText="Delete All"
                isLoading={isDeletingAll}
            />

            {/* Import Modal */}
            <Modal isOpen={showImport} onClose={() => { setShowImport(false); setImportData(null); }} title="Import Students" size="lg"
                footer={
                    <>
                        <button onClick={() => { setShowImport(false); setImportData(null); }} className="btn btn-secondary">Cancel</button>
                        <button onClick={handleImport} className="btn btn-primary" disabled={!importData || isImporting}>
                            {isImporting ? <span className="spinner" /> : 'Import'}
                        </button>
                    </>
                }
            >
                <FileUploader onFileSelect={(data) => setImportData(data as Record<string, unknown>[])} />
                <div className="mt-5">
                    <label className="label">Import Mode</label>
                    <div className="flex gap-5 mt-2">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <input type="radio" checked={importMode === 'append'} onChange={() => setImportMode('append')} className="w-4 h-4 accent-[var(--color-primary)]" />
                            <span className="text-sm text-[var(--color-text-secondary)]">Append to existing</span>
                        </label>
                        <label className="flex items-center gap-2.5 cursor-pointer">
                            <input type="radio" checked={importMode === 'replace'} onChange={() => setImportMode('replace')} className="w-4 h-4 accent-[var(--color-primary)]" />
                            <span className="text-sm text-[var(--color-text-secondary)]">Replace all</span>
                        </label>
                    </div>
                </div>
                {importData && Array.isArray(importData) && (
                    <div className="mt-5 p-4 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
                        <p className="text-sm text-[var(--color-text-muted)]">
                            Found <strong className="text-[var(--color-text)]">{importData.length}</strong> students in file
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
