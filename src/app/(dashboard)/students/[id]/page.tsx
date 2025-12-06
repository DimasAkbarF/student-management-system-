'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/Card';
import { ConfirmModal } from '@/components/Modal';
import { IStudent } from '@/models/Student';

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [student, setStudent] = useState<IStudent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetch(`/api/students/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setStudent(data.data);
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) router.push('/students');
        } finally {
            setIsDeleting(false);
            setShowDelete(false);
        }
    };

    const getGpaClass = (gpa: number) => {
        if (gpa >= 3.5) return { text: 'Excellent', color: 'badge-success' };
        if (gpa >= 3.0) return { text: 'Good', color: 'badge-primary' };
        if (gpa >= 2.5) return { text: 'Satisfactory', color: 'badge-warning' };
        return { text: 'Needs Improvement', color: 'badge-danger' };
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="spinner" />
            </div>
        );
    }

    if (!student) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-[var(--color-text)]">Student not found</h2>
                <Link href="/students" className="btn btn-primary mt-4">Back to Students</Link>
            </div>
        );
    }

    const gpaInfo = getGpaClass(student.gpa);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <Link href="/students" className="text-[var(--color-primary)] hover:underline flex items-center gap-1 text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Students
                </Link>
            </div>

            {/* Header Card */}
            <Card className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                        {student.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-[var(--color-text)]">{student.name}</h1>
                        <p className="text-[var(--color-text-muted)]">{student.department}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="badge badge-primary">NIM: {student.nim}</span>
                            <span className={`badge ${gpaInfo.color}`}>{gpaInfo.text}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/students/edit/${id}`} className="btn btn-primary">Edit</Link>
                        <button onClick={() => setShowDelete(true)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <h3 className="font-semibold text-[var(--color-text)] mb-4">Personal Information</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                            <span className="text-[var(--color-text-muted)]">NIM</span>
                            <span className="font-medium">{student.nim}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                            <span className="text-[var(--color-text-muted)]">Full Name</span>
                            <span className="font-medium">{student.name}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                            <span className="text-[var(--color-text-muted)]">Age</span>
                            <span className="font-medium">{student.age} years</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-[var(--color-text-muted)]">Department</span>
                            <span className="font-medium">{student.department}</span>
                        </div>
                    </div>
                </Card>

                <Card>
                    <h3 className="font-semibold text-[var(--color-text)] mb-4">Academic Information</h3>
                    <div className="text-center py-6">
                        <div className="text-5xl font-bold text-[var(--color-primary)]">{student.gpa.toFixed(2)}</div>
                        <p className="text-[var(--color-text-muted)] mt-2">Grade Point Average</p>
                        <span className={`badge ${gpaInfo.color} mt-3`}>{gpaInfo.text}</span>
                    </div>
                    <div className="space-y-3 mt-4 pt-4 border-t border-[var(--color-border)]">
                        <div className="flex justify-between py-2">
                            <span className="text-[var(--color-text-muted)]">Created</span>
                            <span className="font-medium text-sm">{student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-[var(--color-text-muted)]">Last Updated</span>
                            <span className="font-medium text-sm">{student.updatedAt ? new Date(student.updatedAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={showDelete}
                onClose={() => setShowDelete(false)}
                onConfirm={handleDelete}
                title="Delete Student"
                message={`Are you sure you want to delete ${student.name}? This action cannot be undone.`}
                confirmText="Delete"
                isLoading={isDeleting}
            />
        </div>
    );
}
