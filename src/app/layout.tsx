import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

// Optimized font loading with subset and display swap
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

// Base URL for SEO
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://student-app-coral.vercel.app';

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "UNPAM Student Management System - Sistem Informasi Mahasiswa",
    template: "%s | UNPAM Student Portal"
  },
  description: "Sistem Manajemen Mahasiswa UNPAM (Universitas Pamulang) - Platform lengkap untuk mengelola data mahasiswa dengan fitur CRUD, pencarian canggih menggunakan Binary Search dan Linear Search, serta pengurutan dengan Merge Sort, Quick Sort, dan algoritma lainnya.",
  keywords: [
    "UNPAM",
    "Universitas Pamulang",
    "Student Management System",
    "Sistem Informasi Mahasiswa",
    "Data Mahasiswa",
    "Teknik Informatika",
    "Portal Mahasiswa",
    "Academic Management",
    "Student Portal Indonesia",
    "Manajemen Akademik"
  ],
  authors: [
    { name: "Dimas Akbar", url: baseUrl }
  ],
  creator: "Universitas Pamulang",
  publisher: "UNPAM - Universitas Pamulang",

  // Canonical URL
  alternates: {
    canonical: baseUrl,
  },

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: baseUrl,
    siteName: "UNPAM Student Portal",
    title: "UNPAM Student Management System",
    description: "Sistem Manajemen Mahasiswa UNPAM dengan fitur lengkap untuk pengelolaan data akademik, pencarian, dan pengurutan menggunakan berbagai algoritma.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "UNPAM Student Management System",
        type: 'image/png',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "UNPAM Student Management System",
    description: "Sistem Manajemen Mahasiswa UNPAM dengan fitur lengkap untuk pengelolaan data akademik.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@unpam",
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // Manifest
  manifest: "/manifest.json",

  // App info
  applicationName: "UNPAM Student Portal",
  category: "Education",

  // Verification (add your actual verification codes)
  verification: {
    google: "your-google-verification-code",
  },
};

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563EB' },
    { media: '(prefers-color-scheme: dark)', color: '#3B82F6' },
  ],
  colorScheme: 'light dark',
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'UNPAM Student Management System',
  description: 'Sistem Manajemen Mahasiswa UNPAM - Platform lengkap untuk mengelola data mahasiswa dengan fitur CRUD, pencarian, dan pengurutan.',
  url: baseUrl,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'IDR',
  },
  author: {
    '@type': 'Organization',
    name: 'Universitas Pamulang',
    url: 'https://unpam.ac.id',
  },
  provider: {
    '@type': 'Organization',
    name: 'UNPAM',
  },
  publisher: {
    '@type': 'EducationalOrganization',
    name: 'Universitas Pamulang',
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/unpam-logo.png`,
    },
  },
  inLanguage: 'id-ID',
  isAccessibleForFree: true,
  featureList: [
    'Student Data Management',
    'CRUD Operations',
    'Advanced Search Algorithms',
    'Sorting Algorithms',
    'Data Import/Export',
    'Dark Mode Support',
  ],
};

// Organization Schema for SEO
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Universitas Pamulang',
  alternateName: 'UNPAM',
  url: 'https://unpam.ac.id',
  logo: `${baseUrl}/unpam-logo.png`,
  sameAs: [
    'https://instagram.com/unikiepamulang',
    'https://facebook.com/unpam.ac.id',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Theme script to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;var th=t||(d?'dark':'light');if(th==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`
          }}
        />

        {/* Preconnect only for critical origins actually used */}
        <link rel="dns-prefetch" href="https://cloud.mongodb.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
