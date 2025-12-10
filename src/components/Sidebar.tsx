'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface User {
    username: string;
}

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/students', label: 'Students', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { href: '/search', label: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { href: '/sort', label: 'Sort', icon: 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12' },
    { href: '/docs', label: 'Documentation', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Get user from cookie
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
            return null;
        };

        const username = getCookie('username');
        if (username) {
            setUser({ username: decodeURIComponent(username) });
        }
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const getInitials = (name: string) => {
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={onClose}
                    role="presentation"
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`sidebar ${isOpen ? 'open' : ''}`}
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Logo Section */}
                <div className="sidebar-logo">
                    <Link href="/dashboard" className="sidebar-logo-link" aria-label="Go to dashboard">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/id/6/62/UNPAM_logo1.png"
                            alt="Logo UNPAM - Universitas Pamulang"
                            width={56}
                            height={56}
                            className="sidebar-logo-image"
                            priority
                        />
                        <div className="sidebar-logo-text">
                            {/* Using div instead of h1 - h1 should only appear once per page in main content */}
                            <div className="text-lg font-bold" role="heading" aria-level={2}>STUDENT</div>
                            <p>Data Management</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav" aria-label="Primary navigation">
                    <ul className="sidebar-nav-list" role="list">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                            return (
                                <li key={item.href} role="listitem">
                                    <Link
                                        href={item.href}
                                        className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                                        onClick={onClose}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                                        </svg>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Profile Section */}
                <div className="sidebar-user" role="contentinfo" aria-label="User profile">
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-avatar" aria-hidden="true">
                            {user ? getInitials(user.username) : 'U'}
                        </div>
                        <div className="sidebar-user-details">
                            <span className="sidebar-user-name">{user?.username || 'User'}</span>
                            <span className="sidebar-user-role">Administrator</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="sidebar-logout-btn"
                        title="Logout"
                        aria-label="Logout from application"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </aside>
        </>
    );
}