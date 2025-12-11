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

// Base URL for SEO - ensuring https
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://student-app-coral.vercel.app';

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "UNPAM Student Management System",
    template: "%s | UNPAM Student Portal"
  },
  description: "Sistem Manajemen Mahasiswa UNPAM (Universitas Pamulang) - Platform lengkap untuk mengelola data mahasiswa, akademik, dan nilai. Fitur pencarian canggih dan pengurutan data.",
  keywords: [
    "UNPAM", "Universitas Pamulang", "Student Management System",
    "Sistem Informasi Mahasiswa", "Data Mahasiswa", "Portal Akademik",
    "SIAKAD UNPAM", "Mahasiswa UNPAM", "Teknik Informatika"
  ],
  authors: [{ name: "Dimas Akbar" }, { name: "Universitas Pamulang", url: "https://unpam.ac.id" }],
  creator: "Universitas Pamulang",
  publisher: "Universitas Pamulang",
  applicationName: "UNPAM Student Portal",

  // Robots - Aggressively Allow Indexing
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

  // Canonical URL
  alternates: {
    canonical: './',
  },

  // Open Graph - Enhanced
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: baseUrl,
    siteName: "UNPAM Student Portal",
    title: "UNPAM Student Management System",
    description: "Sistem Manajemen Mahasiswa UNPAM. Kelola data mahasiswa, nilai, dan administrasi dengan mudah dan cepat.",
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: "UNPAM Student Management Dashboard",
    }],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "UNPAM Student Management System",
    description: "Sistem Manajemen Mahasiswa UNPAM. Platform akademik modern.",
    images: ['/og-image.png'],
    creator: "@unpam",
  },

  // Icons & Manifest
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',

  // Verification default (placeholders removed to avoid errors if invalid, or kept generic)
  verification: {
    other: {
      "me": ["dimas@example.com"],
    },
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
        {/* Preconnect to critical origins for faster resource loading */}
        <link rel="preconnect" href="https://upload.wikimedia.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />

        {/* Theme script - inline for instant execution (prevents FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;var th=t||(d?'dark':'light');if(th==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`
          }}
        />

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
