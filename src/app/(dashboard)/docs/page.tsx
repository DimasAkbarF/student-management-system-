'use client';

import Card from '@/components/Card';

/**
 * Documentation Page
 * Comprehensive guide for Student Management System features
 */

// Feature categories with detailed explanations
const featureCategories = [
    {
        id: 'overview',
        title: '📋 Overview',
        description: 'Pengantar aplikasi Student Management System',
        content: [
            {
                subtitle: 'Apa itu Student Management System?',
                text: 'Aplikasi web modern berbasis Next.js 16 untuk mengelola data mahasiswa dengan fitur CRUD lengkap, implementasi berbagai algoritma pencarian dan pengurutan, serta validasi input menggunakan Regular Expression.'
            },
            {
                subtitle: 'Tech Stack',
                items: ['Next.js 16 (App Router)', 'TypeScript', 'MongoDB Atlas', 'Tailwind CSS', 'Mongoose ODM']
            }
        ]
    },
    {
        id: 'crud',
        title: '📝 CRUD Operations',
        description: 'Create, Read, Update, Delete data mahasiswa',
        content: [
            { term: 'Create (Add)', desc: 'Menambah data mahasiswa baru dengan form validasi. Setiap input divalidasi menggunakan Regex sebelum disimpan ke database.', complexity: 'O(1)' },
            { term: 'Read (View)', desc: 'Menampilkan data mahasiswa dalam bentuk tabel atau detail view. Mendukung pagination dan filtering.', complexity: 'O(n)' },
            { term: 'Update (Edit)', desc: 'Mengubah data mahasiswa yang sudah ada. Form otomatis terisi dengan data lama untuk kemudahan editing.', complexity: 'O(1)' },
            { term: 'Delete', desc: 'Menghapus data mahasiswa dengan konfirmasi modal untuk mencegah penghapusan tidak sengaja.', complexity: 'O(1)' },
            { term: 'Remove All', desc: 'Fitur bulk delete untuk menghapus semua data sekaligus. Berguna untuk reset database atau membersihkan storage.', complexity: 'O(n)' },
        ]
    },
    {
        id: 'search',
        title: '🔍 Search Algorithms',
        description: 'Algoritma pencarian data dengan analisis kompleksitas',
        content: [
            {
                term: 'Linear Search',
                desc: 'Algoritma pencarian paling sederhana. Memeriksa setiap elemen secara berurutan dari awal hingga akhir array sampai menemukan target atau mencapai akhir.',
                complexity: 'O(n)',
                best: 'O(1)',
                worst: 'O(n)',
                useCase: 'Data tidak terurut, dataset kecil'
            },
            {
                term: 'Binary Search',
                desc: 'Algoritma pencarian efisien yang bekerja dengan membagi array menjadi dua bagian secara rekursif. Memerlukan array yang sudah terurut.',
                complexity: 'O(log n)',
                best: 'O(1)',
                worst: 'O(log n)',
                useCase: 'Data sudah terurut, dataset besar, pencarian exact match'
            },
            {
                term: 'Sequential Search',
                desc: 'Variasi dari linear search yang mencari data secara sekuensial. Cocok untuk pencarian multiple matches dalam data tidak terurut.',
                complexity: 'O(n)',
                best: 'O(1)',
                worst: 'O(n)',
                useCase: 'Pencarian pattern matching, multiple results'
            },
        ]
    },
    {
        id: 'sort',
        title: '📊 Sort Algorithms',
        description: 'Algoritma pengurutan dengan perbandingan performa',
        content: [
            {
                term: 'Ascending (ASC)',
                desc: 'Mengurutkan data dari nilai terkecil ke terbesar. Contoh: A→Z, 0→9, GPA rendah→tinggi.',
                type: 'order'
            },
            {
                term: 'Descending (DESC)',
                desc: 'Mengurutkan data dari nilai terbesar ke terkecil. Contoh: Z→A, 9→0, GPA tinggi→rendah.',
                type: 'order'
            },
            {
                term: 'Bubble Sort',
                desc: 'Algoritma sederhana yang membandingkan dan menukar elemen berdekatan secara berulang. Mudah dipahami tapi tidak efisien untuk data besar.',
                complexity: 'O(n²)',
                best: 'O(n)',
                worst: 'O(n²)',
                stable: true
            },
            {
                term: 'Insertion Sort',
                desc: 'Membangun array terurut dengan menyisipkan elemen satu per satu ke posisi yang tepat. Efisien untuk data hampir terurut.',
                complexity: 'O(n²)',
                best: 'O(n)',
                worst: 'O(n²)',
                stable: true
            },
            {
                term: 'Selection Sort',
                desc: 'Memilih elemen terkecil/terbesar dari bagian tidak terurut dan menempatkannya di posisi yang benar. Jumlah swap minimal.',
                complexity: 'O(n²)',
                best: 'O(n²)',
                worst: 'O(n²)',
                stable: false
            },
            {
                term: 'Merge Sort',
                desc: 'Algoritma divide-and-conquer yang membagi array, mengurutkan sub-array, lalu menggabungkannya. Sangat efisien dan stabil.',
                complexity: 'O(n log n)',
                best: 'O(n log n)',
                worst: 'O(n log n)',
                stable: true
            },
            {
                term: 'Shell Sort',
                desc: 'Pengembangan insertion sort dengan gap yang semakin mengecil. Lebih cepat dari insertion sort untuk data besar.',
                complexity: 'O(n^(3/2))',
                best: 'O(n log n)',
                worst: 'O(n²)',
                stable: false
            },
        ]
    },
    {
        id: 'validation',
        title: '✅ Input Validation (Regex)',
        description: 'Validasi input menggunakan Regular Expression',
        content: [
            { term: 'NIM', pattern: '/^[0-9]{10,12}$/', desc: 'Hanya angka, panjang 10-12 digit', example: '241011400248' },
            { term: 'Name', pattern: '/^[A-Za-z ]{2,100}$/', desc: 'Hanya huruf dan spasi, 2-100 karakter', example: 'Dimas Akbar Faturohman' },
            { term: 'Age', pattern: '/^(1[7-9]|[2-5][0-9]|60)$/', desc: 'Rentang 17-60 tahun', example: '21' },
            { term: 'GPA', pattern: '0.00 - 4.00', desc: 'Nilai desimal antara 0 sampai 4', example: '3.75' },
            { term: 'Department', pattern: '/^[A-Za-z &\\-]{2,100}$/', desc: 'Huruf, spasi, ampersand, dash', example: 'Teknik Informatika' },
        ]
    },
    {
        id: 'oop',
        title: '🏗️ OOP Implementation',
        description: 'Konsep Object-Oriented Programming yang diimplementasikan',
        content: [
            { term: 'Class', desc: 'Student class dengan constructor, methods, dan static methods untuk blueprint objek mahasiswa.' },
            { term: 'Encapsulation', desc: 'Private fields (#id, #nim, #name) dengan getter/setter untuk melindungi data dari akses langsung.' },
            { term: 'Inheritance', desc: 'ValidationError extends Error - custom exception class yang mewarisi Error bawaan JavaScript.' },
            { term: 'Polymorphism', desc: 'Method overriding pada toString() dan toJSON() untuk format output yang berbeda.' },
        ]
    },
    {
        id: 'error',
        title: '⚠️ Error Handling',
        description: 'Penanganan error menggunakan Try-Catch-Exception',
        content: [
            { term: 'Try Block', desc: 'Membungkus kode yang berpotensi error, seperti operasi database atau validasi input.' },
            { term: 'Catch Block', desc: 'Menangkap error dan memberikan response yang sesuai (400, 401, 404, 500).' },
            { term: 'ValidationError', desc: 'Custom exception class untuk error validasi input dengan pesan yang jelas.' },
            { term: 'Finally Block', desc: 'Cleanup operations yang selalu dijalankan, seperti reset loading state.' },
        ]
    },
    {
        id: 'file',
        title: '📁 File I/O',
        description: 'Import dan Export data mahasiswa',
        content: [
            { term: 'Import JSON', desc: 'Upload file JSON untuk memasukkan data mahasiswa secara bulk. Mendukung mode append atau replace.' },
            { term: 'Export JSON', desc: 'Download semua data mahasiswa dalam format JSON untuk backup atau transfer data.' },
            { term: 'Data Format', desc: 'Struktur: { nim, name, department, age, gpa, createdAt, updatedAt }' },
        ]
    }
];

// Time complexity comparison data
const complexityTable = [
    { algorithm: 'Linear Search', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
    { algorithm: 'Binary Search', best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
    { algorithm: 'Bubble Sort', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    { algorithm: 'Insertion Sort', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    { algorithm: 'Selection Sort', best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    { algorithm: 'Merge Sort', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
    { algorithm: 'Shell Sort', best: 'O(n log n)', average: 'O(n^(4/3))', worst: 'O(n²)', space: 'O(1)' },
];

export default function DocsPage() {
    return (
        <div>
            {/* Header */}
            <div className="dashboard-header">
                <h1>📚 Documentation</h1>
                <p>Panduan lengkap fitur dan implementasi Student Management System</p>
            </div>

            {/* Table of Contents */}
            <section className="dashboard-section">
                <Card>
                    <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">📑 Daftar Isi</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {featureCategories.map((cat) => (
                            <a
                                key={cat.id}
                                href={`#${cat.id}`}
                                className="p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-border-subtle)] transition-all text-center"
                            >
                                <span className="text-sm font-medium text-[var(--color-text)]">{cat.title}</span>
                            </a>
                        ))}
                    </div>
                </Card>
            </section>

            {/* Quick Stats */}
            <section className="dashboard-section">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="text-center">
                        <div className="text-3xl font-bold text-[var(--color-primary)]">5</div>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">CRUD Operations</p>
                    </Card>
                    <Card className="text-center">
                        <div className="text-3xl font-bold text-[var(--color-success)]">3</div>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">Search Algorithms</p>
                    </Card>
                    <Card className="text-center">
                        <div className="text-3xl font-bold text-[var(--color-warning)]">5</div>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">Sort Algorithms</p>
                    </Card>
                    <Card className="text-center">
                        <div className="text-3xl font-bold text-[var(--color-danger)]">5</div>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">Regex Validations</p>
                    </Card>
                </div>
            </section>

            {/* Feature Sections */}
            {featureCategories.map((category) => (
                <section key={category.id} id={category.id} className="dashboard-section scroll-mt-20">
                    <Card>
                        <div className="border-b border-[var(--color-border)] pb-4 mb-4">
                            <h2 className="text-xl font-bold text-[var(--color-text)]">{category.title}</h2>
                            <p className="text-[var(--color-text-muted)] text-sm mt-1">{category.description}</p>
                        </div>

                        {/* Overview type */}
                        {category.id === 'overview' && (
                            <div className="space-y-4">
                                {category.content.map((item, idx) => (
                                    <div key={idx} className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                                        <h4 className="font-semibold text-[var(--color-text)] mb-2">{item.subtitle}</h4>
                                        {item.text && <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.text}</p>}
                                        {item.items && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {item.items.map((tech, i) => (
                                                    <span key={i} className="badge badge-primary">{tech}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* CRUD type */}
                        {category.id === 'crud' && (
                            <div className="space-y-3">
                                {category.content.map((item, idx) => (
                                    <div key={idx} className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-[var(--color-text)]">{item.term}</h4>
                                            <code className="text-xs px-2 py-1 rounded bg-[var(--color-card)] text-[var(--color-primary)]">{item.complexity}</code>
                                        </div>
                                        <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Search type */}
                        {category.id === 'search' && (
                            <div className="space-y-4">
                                {category.content.map((item, idx) => (
                                    <div key={idx} className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-[var(--color-text)]">{item.term}</h4>
                                            <code className="text-xs px-2 py-1 rounded bg-[var(--color-card)] text-[var(--color-success)]">{item.complexity}</code>
                                        </div>
                                        <p className="text-sm text-[var(--color-text-muted)] mb-3">{item.desc}</p>
                                        <div className="grid grid-cols-3 gap-2 text-xs">
                                            <div className="p-2 rounded bg-[var(--color-card)] text-center">
                                                <span className="text-[var(--color-text-muted)]">Best: </span>
                                                <span className="font-mono text-[var(--color-success)]">{item.best}</span>
                                            </div>
                                            <div className="p-2 rounded bg-[var(--color-card)] text-center">
                                                <span className="text-[var(--color-text-muted)]">Worst: </span>
                                                <span className="font-mono text-[var(--color-danger)]">{item.worst}</span>
                                            </div>
                                            <div className="p-2 rounded bg-[var(--color-card)] text-center">
                                                <span className="text-[var(--color-text-muted)]">Use: </span>
                                                <span className="text-[var(--color-text)]">{item.useCase}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Sort type */}
                        {category.id === 'sort' && (
                            <div className="space-y-3">
                                {category.content.map((item, idx) => (
                                    <div key={idx} className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-[var(--color-text)]">{item.term}</h4>
                                            {item.complexity && (
                                                <code className="text-xs px-2 py-1 rounded bg-[var(--color-card)] text-[var(--color-warning)]">{item.complexity}</code>
                                            )}
                                            {item.type === 'order' && (
                                                <span className="badge badge-primary text-xs">Order Type</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                                        {item.best && (
                                            <div className="flex gap-4 mt-3 text-xs">
                                                <span><span className="text-[var(--color-text-muted)]">Best:</span> <span className="font-mono text-[var(--color-success)]">{item.best}</span></span>
                                                <span><span className="text-[var(--color-text-muted)]">Worst:</span> <span className="font-mono text-[var(--color-danger)]">{item.worst}</span></span>
                                                <span><span className="text-[var(--color-text-muted)]">Stable:</span> <span className={item.stable ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}>{item.stable ? 'Yes' : 'No'}</span></span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Validation type */}
                        {category.id === 'validation' && (
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Field</th>
                                            <th>Pattern</th>
                                            <th>Deskripsi</th>
                                            <th>Contoh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {category.content.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="font-medium">{item.term}</td>
                                                <td><code className="text-xs bg-[var(--color-surface)] px-2 py-1 rounded">{item.pattern}</code></td>
                                                <td className="text-sm text-[var(--color-text-muted)]">{item.desc}</td>
                                                <td className="font-mono text-sm text-[var(--color-primary)]">{item.example}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* OOP, Error, File type */}
                        {['oop', 'error', 'file'].includes(category.id) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {category.content.map((item, idx) => (
                                    <div key={idx} className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                                        <h4 className="font-semibold text-[var(--color-text)] mb-2 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></span>
                                            {item.term}
                                        </h4>
                                        <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </section>
            ))}

            {/* Time Complexity Comparison Table */}
            <section className="dashboard-section">
                <Card>
                    <div className="border-b border-[var(--color-border)] pb-4 mb-4">
                        <h2 className="text-xl font-bold text-[var(--color-text)]">⏱️ Time Complexity Comparison</h2>
                        <p className="text-[var(--color-text-muted)] text-sm mt-1">Perbandingan kompleksitas waktu seluruh algoritma</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Algorithm</th>
                                    <th className="text-center">Best Case</th>
                                    <th className="text-center">Average Case</th>
                                    <th className="text-center">Worst Case</th>
                                    <th className="text-center">Space</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complexityTable.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="font-medium">{row.algorithm}</td>
                                        <td className="text-center font-mono text-[var(--color-success)]">{row.best}</td>
                                        <td className="text-center font-mono text-[var(--color-warning)]">{row.average}</td>
                                        <td className="text-center font-mono text-[var(--color-danger)]">{row.worst}</td>
                                        <td className="text-center font-mono text-[var(--color-info)]">{row.space}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            {/* Footer */}
            <section className="dashboard-section">
                <div className="text-center text-sm text-[var(--color-text-muted)] py-4">
                    <p>Student Management System v1.0.0</p>
                    <p className="mt-1">Built with Next.js, TypeScript, MongoDB</p>
                </div>
            </section>
        </div>
    );
}
