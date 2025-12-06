'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/Card';
import Table from '@/components/Table';
import { IStudent } from '@/models/Student';

type SearchAlgorithm = 'linear' | 'binary' | 'sequential';
type SearchField = 'name' | 'nim' | 'department';

const algorithms: { value: SearchAlgorithm; label: string; description: string }[] = [
    { value: 'linear', label: 'Linear Search', description: 'O(n) - Searches each element sequentially' },
    { value: 'binary', label: 'Binary Search', description: 'O(log n) - Requires sorted data, exact match' },
    { value: 'sequential', label: 'Sequential Search', description: 'O(n) - Similar to linear, finds all matches' }
];

const fields: { value: SearchField; label: string }[] = [
    { value: 'name', label: 'Name' },
    { value: 'nim', label: 'NIM' },
    { value: 'department', label: 'Department' }
];

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center"><span className="spinner" /></div>}>
            <SearchContent />
        </Suspense>
    );
}

function SearchContent() {
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [algorithm, setAlgorithm] = useState<SearchAlgorithm>('linear');
    const [field, setField] = useState<SearchField>('name');
    const [students, setStudents] = useState<IStudent[]>([]);
    const [results, setResults] = useState<IStudent[]>([]);
    const [stats, setStats] = useState({ comparisons: 0, time: 0 });
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch('/api/students')
            .then(res => res.json())
            .then(data => {
                if (data.success) setStudents(data.data);
            });
    }, []);

    const performSearch = useCallback(() => {
        if (!query.trim()) {
            setResults([]);
            setHasSearched(false);
            return;
        }

        setIsLoading(true);
        const startTime = performance.now();
        let comparisons = 0;
        const queryLower = query.toLowerCase();
        let searchResults: IStudent[] = [];

        if (algorithm === 'binary') {
            // Binary search - requires sorted data, exact match
            const sorted = [...students].sort((a, b) =>
                String(a[field]).toLowerCase().localeCompare(String(b[field]).toLowerCase())
            );
            let left = 0, right = sorted.length - 1;
            while (left <= right) {
                comparisons++;
                const mid = Math.floor((left + right) / 2);
                const value = String(sorted[mid][field]).toLowerCase();
                if (value === queryLower) {
                    searchResults.push(sorted[mid]);
                    break;
                } else if (value < queryLower) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        } else {
            // Linear and Sequential search
            for (const student of students) {
                comparisons++;
                const value = String(student[field]).toLowerCase();
                if (value.includes(queryLower)) {
                    searchResults.push(student);
                }
            }
        }

        const endTime = performance.now();
        setResults(searchResults);
        setStats({ comparisons, time: endTime - startTime });
        setHasSearched(true);
        setIsLoading(false);
    }, [query, algorithm, field, students]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch();
    };

    const columns = [
        { key: 'nim', header: 'NIM' },
        { key: 'name', header: 'Name' },
        { key: 'department', header: 'Department' },
        { key: 'age', header: 'Age' },
        { key: 'gpa', header: 'GPA', render: (s: IStudent) => s.gpa.toFixed(2) }
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[var(--color-text)]">Search Students</h1>
                <p className="text-[var(--color-text-muted)] mt-1">Find students using different search algorithms</p>
            </div>

            {/* Search Form */}
            <Card className="mb-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <label className="label">Search Query</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter search term..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="label">Search Field</label>
                            <select className="select" value={field} onChange={(e) => setField(e.target.value as SearchField)}>
                                {fields.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="label">Algorithm</label>
                            <select className="select" value={algorithm} onChange={(e) => setAlgorithm(e.target.value as SearchAlgorithm)}>
                                {algorithms.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-4" disabled={isLoading}>
                        {isLoading ? <><span className="spinner" /> Searching...</> : 'Search'}
                    </button>
                </form>
            </Card>

            {/* Algorithm Info */}
            <Card className="mb-6">
                <h3 className="font-semibold text-[var(--color-text)] mb-3">Algorithm Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {algorithms.map(a => (
                        <div
                            key={a.value}
                            className={`p-4 rounded-lg border-2 transition-all ${algorithm === a.value
                                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                                : 'border-transparent bg-[var(--color-background)]'
                                }`}
                        >
                            <h4 className="font-medium text-[var(--color-text)]">{a.label}</h4>
                            <p className="text-sm text-[var(--color-text-muted)] mt-1">{a.description}</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Results */}
            {hasSearched && (
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-[var(--color-text)]">
                            Results ({results.length} found)
                        </h3>
                        <div className="flex gap-4 text-sm text-[var(--color-text-muted)]">
                            <span>Comparisons: <strong>{stats.comparisons}</strong></span>
                            <span>Time: <strong>{stats.time.toFixed(2)}ms</strong></span>
                        </div>
                    </div>
                    <Table
                        data={results}
                        columns={columns}
                        emptyMessage="No students found matching your search"
                    />
                </Card>
            )}
        </div>
    );
}
