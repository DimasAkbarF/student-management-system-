'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.error || 'Login failed');
                return;
            }

            router.push('/dashboard');
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main
            className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-background)]"
            role="main"
            aria-label="Login page"
        >
            {/* Theme toggle in corner */}
            <div className="fixed top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md">
                {/* Logo and Title Section - Logo above text */}
                <header className="text-center mb-8">
                    {/* UNPAM Logo - Optimized with Next.js Image */}
                    <div className="flex justify-center mb-6">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/id/6/62/UNPAM_logo1.png"
                            alt="Logo Universitas Pamulang - UNPAM"
                            width={100}
                            height={100}
                            className="object-contain"
                            priority
                            fetchPriority="high"
                        />
                    </div>
                    {/* Title and Subtitle */}
                    <h1 className="text-2xl font-bold text-[var(--color-text)]">Student Management</h1>
                    <p className="text-[var(--color-text-muted)] mt-2">Sign in to your account</p>
                </header>

                {/* Login Card */}
                <article className="card" aria-label="Login form">
                    <form onSubmit={handleSubmit} aria-label="Sign in form">
                        {error && (
                            <div className="toast toast-error mb-4" role="alert" aria-live="polite">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label className="label" htmlFor="username">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="input"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                                aria-required="true"
                            />
                        </div>

                        <div className="form-group">
                            <label className="label" htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                aria-required="true"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-6"
                            disabled={isLoading}
                            aria-busy={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner" aria-hidden="true" />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <footer className="mt-6 pt-6 border-t border-[var(--color-border)] text-center">
                        <p className="text-xs text-[var(--color-text-muted)]">
                            © 2025 Student Management System
                        </p>
                    </footer>
                </article>
            </div>
        </main>
    );
}
