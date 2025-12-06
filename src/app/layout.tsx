import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "UNPAM Student Management System",
    template: "%s | UNPAM Student Portal"
  },
  description: "Sistem Manajemen Mahasiswa UNPAM - Kelola data mahasiswa dengan fitur CRUD, pencarian, dan pengurutan menggunakan berbagai algoritma.",
  keywords: [
    "UNPAM",
    "Universitas Pamulang",
    "Student Management",
    "Sistem Informasi Mahasiswa",
    "Data Mahasiswa",
    "Teknik Informatika"
  ],
  authors: [{ name: "UNPAM" }],
  creator: "Universitas Pamulang",
  publisher: "UNPAM",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://student-app.vercel.app",
    siteName: "UNPAM Student Portal",
    title: "UNPAM Student Management System",
    description: "Sistem Manajemen Mahasiswa UNPAM dengan fitur lengkap untuk pengelolaan data akademik.",
    images: [
      {
        url: "/unpam-logo.png",
        width: 512,
        height: 512,
        alt: "UNPAM Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UNPAM Student Management System",
    description: "Sistem Manajemen Mahasiswa UNPAM dengan fitur lengkap.",
    images: ["/unpam-logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/unpam-logo.png",
  },
  manifest: "/manifest.json",
};

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563EB' },
    { media: '(prefers-color-scheme: dark)', color: '#3B82F6' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for MongoDB */}
        <link rel="dns-prefetch" href="https://cloud.mongodb.com" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
