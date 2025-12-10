import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dokumentasi',
    description: 'Dokumentasi lengkap UNPAM Student Management System - Panduan penggunaan, referensi algoritma, dan fitur aplikasi.',
    openGraph: {
        title: 'Dokumentasi - UNPAM Student Portal',
        description: 'Dokumentasi dan panduan penggunaan sistem manajemen mahasiswa.',
    },
    keywords: ['dokumentasi', 'docs', 'panduan', 'tutorial', 'UNPAM'],
};

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
