'use client';

import { useEffect, useState } from 'react';

/**
 * Component that automatically seeds the database on first visit
 * This runs once when the app loads and there's no data
 */
export default function DatabaseInit() {
    const [status, setStatus] = useState<'checking' | 'seeding' | 'done' | 'error'>('checking');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const initDatabase = async () => {
            try {
                // Check if database needs seeding
                const checkRes = await fetch('/api/seed');
                const checkData = await checkRes.json();

                if (checkData.success && checkData.data.needsSeed) {
                    setStatus('seeding');
                    setMessage('Initializing database...');

                    // Seed the database
                    const seedRes = await fetch('/api/seed', { method: 'POST' });
                    const seedData = await seedRes.json();

                    if (seedData.success) {
                        setMessage(`Added ${seedData.data.studentsAdded} students`);
                        setTimeout(() => setStatus('done'), 2000);
                    } else {
                        setStatus('error');
                        setMessage(seedData.error);
                    }
                } else {
                    setStatus('done');
                }
            } catch {
                // Database might not be connected yet, that's okay
                setStatus('done');
            }
        };

        initDatabase();
    }, []);

    // Don't render anything if done or checking
    if (status === 'done' || status === 'checking') {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-slideUp">
            <div className={`p-4 rounded-xl shadow-lg ${status === 'seeding'
                    ? 'bg-blue-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                <div className="flex items-center gap-3">
                    {status === 'seeding' && (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    <span className="text-sm font-medium">{message}</span>
                </div>
            </div>
        </div>
    );
}
