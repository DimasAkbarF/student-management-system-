import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Masuk ke UNPAM Student Management System - Portal manajemen data mahasiswa Universitas Pamulang.',
    openGraph: {
        title: 'Login - UNPAM Student Portal',
        description: 'Halaman login untuk mengakses sistem manajemen mahasiswa UNPAM.',
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: '/login',
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
