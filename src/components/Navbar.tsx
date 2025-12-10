'use client';

import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
    onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    const router = useRouter();


    return (
        <header className="navbar">
            {/* Mobile menu button */}
            <button
                onClick={onMenuClick}
                className="btn-ghost btn-icon lg:hidden"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

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

            {/* Spacer to push theme toggle to the right */}
            <div className="flex-1"></div>

            {/* Right side actions - Theme toggle only */}
            <div className="navbar-actions ml-auto">
                <ThemeToggle />
            </div>
        </header>
    );
}
