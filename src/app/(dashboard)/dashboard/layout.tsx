import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Dashboard utama UNPAM Student Management System - Lihat statistik mahasiswa, rata-rata IPK, jumlah departemen, dan referensi algoritma pencarian serta pengurutan.',
    openGraph: {
        title: 'Dashboard - UNPAM Student Portal',
        description: 'Dashboard utama untuk mengelola data mahasiswa UNPAM dengan statistik real-time.',
    },
    keywords: ['dashboard', 'student management', 'UNPAM', 'statistik mahasiswa', 'IPK'],
};

export default function DashboardPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
