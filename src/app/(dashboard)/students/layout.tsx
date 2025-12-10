import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Daftar Mahasiswa',
    description: 'Kelola daftar mahasiswa UNPAM - Tambah, edit, hapus, import/export data mahasiswa dengan fitur CRUD lengkap.',
    openGraph: {
        title: 'Daftar Mahasiswa - UNPAM Student Portal',
        description: 'Manajemen data mahasiswa UNPAM dengan fitur lengkap.',
    },
    keywords: ['daftar mahasiswa', 'student list', 'UNPAM', 'CRUD', 'manajemen data'],
};

export default function StudentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
