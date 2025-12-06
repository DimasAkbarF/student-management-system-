'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check localStorage first
        const stored = localStorage.getItem('theme') as Theme | null;
        if (stored) {
            setThemeState(stored);
            document.documentElement.classList.toggle('dark', stored === 'dark');
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setThemeState(prefersDark ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', prefersDark);
        }
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Always provide context, even before mount
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    // Return default values if context is not available (SSR safety)
    if (context === undefined) {
        return {
            theme: 'light',
            toggleTheme: () => { },
            setTheme: () => { }
        };
    }
    return context;
}
