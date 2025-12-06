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
    // Refined gradient colors - softer and more elegant
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        green: 'from-emerald-500 to-emerald-600',
        purple: 'from-violet-500 to-violet-600',
        orange: 'from-amber-500 to-orange-500'
    };

    // Subtle shadow colors matching the card
    const shadowClasses = {
        blue: 'shadow-blue-500/20',
        green: 'shadow-emerald-500/20',
        purple: 'shadow-violet-500/20',
        orange: 'shadow-amber-500/20'
    };

    return (
        <div className={`rounded-2xl p-6 text-white bg-gradient-to-br ${colorClasses[color]} relative overflow-hidden shadow-xl ${shadowClasses[color]} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10">
                <div className="flex items-center justify-between">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        {icon}
                    </div>
                    {trend && (
                        <span className={`text-sm font-semibold px-2.5 py-1 rounded-full ${trend.isPositive ? 'bg-green-400/30 text-green-100' : 'bg-red-400/30 text-red-100'}`}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                        </span>
                    )}
                </div>
                <div className="mt-5">
                    <p className="text-white/85 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold mt-1.5 tracking-tight">{value}</p>
                    {subtitle && <p className="text-white/65 text-sm mt-1.5">{subtitle}</p>}
                </div>
            </div>
        </div>
    );
}
