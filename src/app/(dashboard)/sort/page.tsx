'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from '@/components/Card';
import Table from '@/components/Table';
import { IStudent } from '@/models/Student';

type SortAlgorithm = 'insertion' | 'bubble' | 'selection' | 'merge' | 'shell';
type SortField = 'nim' | 'name' | 'department' | 'age' | 'gpa';
type SortOrder = 'asc' | 'desc';

const algorithms: { value: SortAlgorithm; label: string; complexity: string }[] = [
    { value: 'insertion', label: 'Insertion Sort', complexity: 'O(n²)' },
    { value: 'bubble', label: 'Bubble Sort', complexity: 'O(n²)' },
    { value: 'selection', label: 'Selection Sort', complexity: 'O(n²)' },
    { value: 'merge', label: 'Merge Sort', complexity: 'O(n log n)' },
    { value: 'shell', label: 'Shell Sort', complexity: 'O(n^(3/2))' }
];

const sortFields: { value: SortField; label: string }[] = [
    { value: 'nim', label: 'NIM' },
    { value: 'name', label: 'Name' },
    { value: 'department', label: 'Department' },
    { value: 'age', label: 'Age' },
    { value: 'gpa', label: 'GPA' }
];

export default function SortPage() {
    const [students, setStudents] = useState<IStudent[]>([]);
    const [sorted, setSorted] = useState<IStudent[]>([]);
    const [algorithm, setAlgorithm] = useState<SortAlgorithm>('insertion');
    const [field, setField] = useState<SortField>('name');
    const [order, setOrder] = useState<SortOrder>('asc');
    const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0 });
    const [hasSorted, setHasSorted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch('/api/students')
            .then(res => res.json())
            .then(data => {
                if (data.success) setStudents(data.data);
            });
    }, []);

    const compare = useCallback((a: IStudent, b: IStudent): number => {
        let aVal: string | number = a[field];
        let bVal: string | number = b[field];
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        const result = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return order === 'asc' ? result : -result;
    }, [field, order]);

    const performSort = useCallback(() => {
        setIsLoading(true);
        const startTime = performance.now();
        let comparisons = 0;
        let swaps = 0;
        const arr = [...students];

        const swap = (i: number, j: number) => { [arr[i], arr[j]] = [arr[j], arr[i]]; swaps++; };

        switch (algorithm) {
            case 'insertion':
                for (let i = 1; i < arr.length; i++) {
                    const key = arr[i];
                    let j = i - 1;
                    while (j >= 0 && (comparisons++, compare(arr[j], key) > 0)) {
                        arr[j + 1] = arr[j]; swaps++; j--;
                    }
                    arr[j + 1] = key;
                }
                break;

            case 'bubble':
                for (let i = 0; i < arr.length - 1; i++) {
                    for (let j = 0; j < arr.length - i - 1; j++) {
                        comparisons++;
                        if (compare(arr[j], arr[j + 1]) > 0) swap(j, j + 1);
                    }
                }
                break;

            case 'selection':
                for (let i = 0; i < arr.length - 1; i++) {
                    let minIdx = i;
                    for (let j = i + 1; j < arr.length; j++) {
                        comparisons++;
                        if (compare(arr[j], arr[minIdx]) < 0) minIdx = j;
                    }
                    if (minIdx !== i) swap(i, minIdx);
                }
                break;

            case 'merge': {
                const merge = (left: IStudent[], right: IStudent[]): IStudent[] => {
                    const result: IStudent[] = [];
                    while (left.length && right.length) {
                        comparisons++;
                        result.push(compare(left[0], right[0]) <= 0 ? left.shift()! : right.shift()!);
                    }
                    return [...result, ...left, ...right];
                };
                const sort = (a: IStudent[]): IStudent[] => {
                    if (a.length <= 1) return a;
                    const mid = Math.floor(a.length / 2);
                    return merge(sort(a.slice(0, mid)), sort(a.slice(mid)));
                };
                const mergedResult = sort(arr);
                arr.length = 0;
                arr.push(...mergedResult);
                break;
            }

            case 'shell':
                for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
                    for (let i = gap; i < arr.length; i++) {
                        const temp = arr[i];
                        let j = i;
                        while (j >= gap && (comparisons++, compare(arr[j - gap], temp) > 0)) {
                            arr[j] = arr[j - gap]; swaps++; j -= gap;
                        }
                        arr[j] = temp;
                    }
                }
                break;
        }

        const endTime = performance.now();
        setSorted(arr);
        setStats({ comparisons, swaps, time: endTime - startTime });
        setHasSorted(true);
        setIsLoading(false);
    }, [students, algorithm, compare]);

    const columns = [
        { key: 'nim', header: 'NIM' },
        { key: 'name', header: 'Name' },
        { key: 'department', header: 'Department' },
        { key: 'age', header: 'Age' },
        { key: 'gpa', header: 'GPA', render: (s: IStudent) => s.gpa.toFixed(2) }
    ];

    return (
        <div>
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-[var(--color-text)]">Sort Students</h1>
                <p className="text-[var(--color-text-muted)] mt-1">Sort students using different algorithms</p>
            </div>

            {/* Sort Options */}
            <Card className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="label">Sort Field</label>
                        <select className="select" value={field} onChange={(e) => setField(e.target.value as SortField)}>
                            {sortFields.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Order</label>
                        <select className="select" value={order} onChange={(e) => setOrder(e.target.value as SortOrder)}>
                            <option value="asc">Ascending (A-Z, 0-9)</option>
                            <option value="desc">Descending (Z-A, 9-0)</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Algorithm</label>
                        <select className="select" value={algorithm} onChange={(e) => setAlgorithm(e.target.value as SortAlgorithm)}>
                            {algorithms.map(a => <option key={a.value} value={a.value}>{a.label} - {a.complexity}</option>)}
                        </select>
                    </div>
                </div>
                <button onClick={performSort} className="btn btn-primary mt-4" disabled={isLoading || students.length === 0}>
                    {isLoading ? <><span className="spinner" /> Sorting...</> : 'Sort Data'}
                </button>
            </Card>

            {/* Algorithm Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {algorithms.map(a => (
                    <div
                        key={a.value}
                        onClick={() => setAlgorithm(a.value)}
                        className={`card cursor-pointer transition-all ${algorithm === a.value ? 'ring-2 ring-[var(--color-primary)]' : ''
                            }`}
                    >
                        <h4 className="font-medium text-[var(--color-text)]">{a.label}</h4>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">{a.complexity}</p>
                    </div>
                ))}
            </div>

            {/* Results */}
            {hasSorted && (
                <Card>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <h3 className="font-semibold text-[var(--color-text)]">Sorted Results</h3>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <span className="badge badge-primary">Comparisons: {stats.comparisons}</span>
                            <span className="badge badge-success">Swaps: {stats.swaps}</span>
                            <span className="badge badge-warning">Time: {stats.time.toFixed(2)}ms</span>
                        </div>
                    </div>
                    <Table data={sorted} columns={columns} />
                </Card>
            )}
        </div>
    );
}
