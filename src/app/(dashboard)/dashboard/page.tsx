'use client';

import { useEffect, useState } from 'react';
import { StatsCard } from '@/components/Card';
import Card from '@/components/Card';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

interface Stats {
    total: number;
    avgGpa: number;
    departments: string[];
}

const complexityData = [
    { algo: 'Linear Search', time: 'O(n)', space: 'O(1)', category: 'Search' },
    { algo: 'Binary Search', time: 'O(log n)', space: 'O(1)', category: 'Search' },
    { algo: 'Sequential Search', time: 'O(n)', space: 'O(1)', category: 'Search' },
    { algo: 'Insertion Sort', time: 'O(n²)', space: 'O(1)', category: 'Sort' },
    { algo: 'Merge Sort', time: 'O(n log n)', space: 'O(n)', category: 'Sort' },
    { algo: 'Bubble Sort', time: 'O(n²)', space: 'O(1)', category: 'Sort' },
    { algo: 'Selection Sort', time: 'O(n²)', space: 'O(1)', category: 'Sort' },
    { algo: 'Shell Sort', time: 'O(n^(3/2))', space: 'O(1)', category: 'Sort' },
];

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/students/stats')
            .then(res => res.json())
            .then(data => {
                if (data.success) setStats(data.data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const { user } = useUser();

    return (
        <main className="dashboard" role="main" aria-label="Dashboard utama">
            {/* Header Section */}
            <header className="dashboard-header animate-in delay-0 text-center">
                <h1>Halo, {user?.username || 'Admin'}! 👋</h1>
                <p>Welcome back! Here&apos;s an overview of your student management system.</p>
            </header>


            {/* Stats Grid */}
            <section className="dashboard-section animate-in delay-100">
                <div className="stats-grid">
                    <StatsCard
                        title="Total Students"
                        value={isLoading ? '...' : stats?.total || 0}
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                        color="blue"
                    />
                    <StatsCard
                        title="Average GPA"
                        value={isLoading ? '...' : stats?.avgGpa?.toFixed(2) || '0.00'}
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        color="green"
                    />
                    <StatsCard
                        title="Departments"
                        value={isLoading ? '...' : stats?.departments?.length || 0}
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                        color="purple"
                    />
                    <StatsCard
                        title="Algorithms"
                        value="8"
                        subtitle="Search + Sort"
                        icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
                        color="orange"
                    />
                </div>
            </section>

            {/* Quick Actions & Departments */}
            <section className="dashboard-section animate-in delay-200">
                <div className="section-grid">
                    <Card title="Quick Actions">
                        <div className="quick-actions-grid">
                            <Link href="/students/add" className="quick-action-btn quick-action-btn-primary">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Student
                            </Link>
                            <Link href="/students" className="quick-action-btn quick-action-btn-secondary">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                View All
                            </Link>
                            <Link href="/search" className="quick-action-btn quick-action-btn-secondary">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </Link>
                            <Link href="/sort" className="quick-action-btn quick-action-btn-secondary">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                </svg>
                                Sort
                            </Link>
                        </div>
                    </Card>

                    <Card title="Departments">
                        {isLoading ? (
                            <div className="flex justify-center py-6"><span className="spinner" /></div>
                        ) : stats?.departments?.length ? (
                            <div className="departments-container">
                                {stats.departments.map((dept, i) => (
                                    <span key={i} className="department-badge">{dept}</span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-[var(--color-text-muted)] py-4">No departments found</p>
                        )}
                    </Card>
                </div>
            </section>

            {/* Time Complexity Panel */}
            <section className="dashboard-section animate-in delay-300">
                <Card
                    title="Algorithm Time Complexity"
                    subtitle="Reference for search and sort algorithms"
                >
                    <div className="overflow-x-auto algorithm-table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Algorithm</th>
                                    <th>Category</th>
                                    <th>Time Complexity</th>
                                    <th>Space Complexity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complexityData.map((item, i) => (
                                    <tr key={i}>
                                        <td className="font-medium">{item.algo}</td>
                                        <td>
                                            <span className={`badge ${item.category === 'Search' ? 'badge-primary' : 'badge-success'}`}>
                                                {item.category}
                                            </span>
                                        </td>
                                        <td><code>{item.time}</code></td>
                                        <td><code>{item.space}</code></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>
        </main>
    );
}
