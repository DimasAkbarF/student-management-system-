'use client';

import { useState, ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { UserProvider, useUser } from '@/context/UserContext';

// Eagerly load critical components
import Navbar from '@/components/Navbar';

// Lazy load non-critical components for faster LCP
const Sidebar = dynamic(() => import('@/components/Sidebar'), {
    ssr: false,
    loading: () => <div className="sidebar" style={{ width: 280 }} />
});

const DatabaseInit = dynamic(() => import('@/components/DatabaseInit'), {
    ssr: false,
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <UserProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </UserProvider>
    );
}

function DashboardLayoutContent({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <Suspense fallback={null}>
                <DatabaseInit />
            </Suspense>
            <Suspense fallback={<div className="sidebar" style={{ width: 280 }} />}>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </Suspense>
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="main-content">
                <div className="main-content-inner">
                    {children}
                </div>
            </main>
        </div>
    );
}
