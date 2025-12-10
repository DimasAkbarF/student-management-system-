import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pengurutan Mahasiswa',
    description: 'Urutkan data mahasiswa UNPAM menggunakan berbagai algoritma sorting - Merge Sort, Bubble Sort, Insertion Sort, Selection Sort, dan Shell Sort dengan visualisasi kompleksitas.',
    openGraph: {
        title: 'Pengurutan Mahasiswa - UNPAM Student Portal',
        description: 'Fitur pengurutan data mahasiswa dengan berbagai algoritma sorting.',
    },
    keywords: ['pengurutan', 'sorting', 'merge sort', 'bubble sort', 'algoritma', 'UNPAM'],
};

export default function SortLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
