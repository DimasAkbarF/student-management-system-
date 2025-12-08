'use client';

import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
    variant?: 'default' | 'gradient' | 'outline';
}

export default function Card({ children, className = '', title, subtitle, icon, variant = 'default' }: CardProps) {
    const baseClasses = 'rounded-xl transition-all duration-200';

    const variantClasses = {
        default: 'card',
        gradient: 'stats-card',
        outline: 'border border-[var(--color-border)] bg-transparent p-6'
    };

    return (
        <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {(title || icon) && (
                <div className="flex items-start justify-between mb-5">
                    <div>
                        {title && (
                            <h3 className={`text-base font-semibold ${variant === 'gradient' ? 'text-white' : 'text-[var(--color-text)]'}`}>
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className={`text-sm mt-1.5 ${variant === 'gradient' ? 'text-white/75' : 'text-[var(--color-text-muted)]'}`}>
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {icon && (
                        <div className={`p-2.5 rounded-xl ${variant === 'gradient' ? 'bg-white/20' : 'bg-[var(--color-surface)]'}`}>
                            {icon}
                        </div>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}

// Stats Card component for dashboard
interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: ReactNode;
    trend?: { value: number; isPositive: boolean };
    color?: 'blue' | 'green' | 'purple' | 'orange';
}

export function StatsCard({ title, value, subtitle, icon, trend, color = 'blue' }: StatsCardProps) {
    const colorClasses = {
        blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/10',
        green: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/10',
        purple: 'text-violet-500 bg-violet-50 dark:bg-violet-900/10',
        orange: 'text-amber-500 bg-amber-50 dark:bg-amber-900/10'
    };

    return (
        <div className="card hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[var(--color-text-secondary)] text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold mt-2 text-[var(--color-text)] tracking-tight">{value}</p>
                    {subtitle && <p className="text-[var(--color-text-muted)] text-sm mt-1">{subtitle}</p>}
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
                    {icon}
                </div>
            </div>

            {trend && (
                <div className="mt-4 flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">vs last month</span>
                </div>
            )}
        </div>
    );
}
