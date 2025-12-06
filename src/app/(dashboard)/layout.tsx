'use client';

import { useState, ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import DatabaseInit from '@/components/DatabaseInit';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <DatabaseInit />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="main-content">
                <div className="main-content-inner">
                    {children}
                </div>
            </main>
        </div>
    );
}
