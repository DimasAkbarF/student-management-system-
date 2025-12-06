'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/Card';
import { RegexPatterns, ValidationMessages } from '@/utils/regex';

export default function AddStudentPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ nim: '', name: '', department: '', age: '', gpa: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!RegexPatterns.nim.test(formData.nim)) newErrors.nim = ValidationMessages.nim;
        if (!RegexPatterns.name.test(formData.name)) newErrors.name = ValidationMessages.name;
        if (!RegexPatterns.department.test(formData.department)) newErrors.department = 'Department must be 2-100 letters';
        if (!RegexPatterns.age.test(formData.age)) newErrors.age = ValidationMessages.age;
        const gpa = parseFloat(formData.gpa);
        if (isNaN(gpa) || gpa < 0 || gpa > 4) newErrors.gpa = ValidationMessages.gpa;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');
        if (!validate()) return;
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    age: parseInt(formData.age),
                    gpa: parseFloat(formData.gpa)
                })
            });
            const data = await res.json();
            if (data.success) {
                router.push('/students');
            } else {
                setSubmitError(data.error);
            }
        } catch {
            setSubmitError('Failed to add student');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/students" className="text-[var(--color-primary)] hover:underline flex items-center gap-1 text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Students
                </Link>
                <h1 className="text-2xl font-bold text-[var(--color-text)] mt-2">Add New Student</h1>
                <p className="text-[var(--color-text-muted)] mt-1">Fill in the details below</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit}>
                    {submitError && (
                        <div className="toast toast-error mb-4">{submitError}</div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="label">NIM *</label>
                            <input type="text" className={`input ${errors.nim ? 'error' : ''}`} placeholder="e.g., 2023001001"
                                value={formData.nim} onChange={(e) => handleChange('nim', e.target.value)} />
                            {errors.nim && <p className="form-error">{errors.nim}</p>}
                        </div>

                        <div className="form-group">
                            <label className="label">Full Name *</label>
                            <input type="text" className={`input ${errors.name ? 'error' : ''}`} placeholder="e.g., John Doe"
                                value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                            {errors.name && <p className="form-error">{errors.name}</p>}
                        </div>

                        <div className="form-group md:col-span-2">
                            <label className="label">Department *</label>
                            <input type="text" className={`input ${errors.department ? 'error' : ''}`} placeholder="e.g., Computer Science"
                                value={formData.department} onChange={(e) => handleChange('department', e.target.value)} />
                            {errors.department && <p className="form-error">{errors.department}</p>}
                        </div>

                        <div className="form-group">
                            <label className="label">Age *</label>
                            <input type="number" className={`input ${errors.age ? 'error' : ''}`} placeholder="17-60"
                                value={formData.age} onChange={(e) => handleChange('age', e.target.value)} min={17} max={60} />
                            {errors.age && <p className="form-error">{errors.age}</p>}
                        </div>

                        <div className="form-group">
                            <label className="label">GPA *</label>
                            <input type="number" step="0.01" className={`input ${errors.gpa ? 'error' : ''}`} placeholder="0.00 - 4.00"
                                value={formData.gpa} onChange={(e) => handleChange('gpa', e.target.value)} min={0} max={4} />
                            {errors.gpa && <p className="form-error">{errors.gpa}</p>}
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-6 border-t border-[var(--color-border)]">
                        <Link href="/students" className="btn btn-secondary">Cancel</Link>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? <><span className="spinner" /> Adding...</> : 'Add Student'}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
