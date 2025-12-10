import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pencarian Mahasiswa',
    description: 'Cari data mahasiswa UNPAM menggunakan algoritma pencarian canggih - Linear Search, Binary Search, dan Sequential Search dengan perbandingan kompleksitas waktu.',
    openGraph: {
        title: 'Pencarian Mahasiswa - UNPAM Student Portal',
        description: 'Fitur pencarian data mahasiswa dengan berbagai algoritma.',
    },
    keywords: ['pencarian', 'search', 'linear search', 'binary search', 'algoritma', 'UNPAM'],
};

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
