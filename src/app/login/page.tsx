'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--color-background)]">
            {/* Theme toggle in corner */}
            <div className="fixed top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--color-text)]">Student Management</h1>
                    <p className="text-[var(--color-text-muted)] mt-2">Sign in to your account</p>
                </div>

                {/* Login Card */}
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="toast toast-error mb-4">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label className="label" htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                className="input"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label className="label" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-6"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[var(--color-border)] text-center">
                        <p className="text-sm text-[var(--color-text-muted)]">
                            Default credentials: <span className="font-medium">admin / admin123</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
