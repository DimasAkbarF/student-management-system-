'use client';

import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
    onMenuClick: () => void;
    username?: string;
}

export default function Navbar({ onMenuClick, username = 'Admin' }: NavbarProps) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="navbar">
            {/* Mobile menu button */}
            {/* <button
                onClick={onMenuClick}
                className="btn-ghost btn-icon lg:hidden"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button> */}

            {/* Search bar */}
            <div className="hidden md:flex navbar-search">
                <div className="navbar-search-wrapper">
                    <svg
                        className="navbar-search-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                    <input
                        type="text"
                        placeholder="Search students, courses..."
                        className="navbar-search-input"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                router.push(`/search?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`);
                            }
                        }}
                    />
                </div>
            </div>

            {/* Right side actions */}
            <div className="navbar-actions">
                {/* Notification icon (decorative) */}
                {/* <button className="btn-ghost btn-icon" title="Notifications">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button> */}

                <ThemeToggle />

                <div className="navbar-divider hidden sm:block"></div>

                <div className="navbar-user">
                    <div className="navbar-user-info hidden sm:block">
                       
                    </div>

                  
{/* 
                    <button
                        onClick={handleLogout}
                        className="btn-ghost btn-icon"
                        title="Logout"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button> */}
                </div>
            </div>
        </header>
    );
}
