'use client';

import Card from '@/components/Card';

/**
 * Documentation Page
 * Comprehensive guide for Student Management System
 */

export default function DocsPage() {
    return (
        <div>
            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-[var(--color-text)]">Documentation</h1>
                <p className="text-[var(--color-text-muted)] mt-1">Panduan lengkap fitur dan cara penggunaan Student Management System</p>
            </div>

            {/* Quick Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {[
                    { id: 'getting-started', label: 'Getting Started' },
                    { id: 'students', label: 'Students' },
                    { id: 'search', label: 'Search' },
                    { id: 'sort', label: 'Sort' },
                    { id: 'algorithms', label: 'Algorithms' },
                    { id: 'tech', label: 'Tech Stack' }
                ].map(item => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="card cursor-pointer transition-all hover:ring-2 hover:ring-[var(--color-primary)] text-center py-3"
                    >
                        <span className="font-medium text-[var(--color-text)] text-sm">{item.label}</span>
                    </a>
                ))}
            </div>

            {/* Getting Started */}
            <section id="getting-started" className="dashboard-section scroll-mt-20">
                <Card>
                    <h3 className="font-semibold text-[var(--color-text)] mb-4">Getting Started</h3>

                    <div className="mb-6">
                        <h4 className="font-medium text-[var(--color-text)] mb-2">Tentang Aplikasi</h4>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                            Student Management System adalah aplikasi web modern untuk mengelola data mahasiswa dengan fitur CRUD lengkap, berbagai algoritma pencarian dan pengurutan, serta validasi input menggunakan Regular Expression.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium text-[var(--color-text)] mb-3">Menu Navigasi</h4>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Menu</th>
                                        <th>Fungsi</th>
                                        <th>Akses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-medium">Dashboard</td>
                                        <td className="text-[var(--color-text-muted)]">Ringkasan statistik dan akses cepat ke semua fitur</td>
                                        <td><span className="badge badge-success">Public</span></td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Students</td>
                                        <td className="text-[var(--color-text-muted)]">Kelola data mahasiswa (tambah, lihat, edit, hapus)</td>
                                        <td><span className="badge badge-success">Public</span></td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Search</td>
                                        <td className="text-[var(--color-text-muted)]">Cari data dengan berbagai algoritma pencarian</td>
                                        <td><span className="badge badge-success">Public</span></td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium">Sort</td>
                                        <td className="text-[var(--color-text-muted)]">Urutkan data dengan berbagai algoritma sorting</td>
                                        <td><span className="badge badge-success">Public</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Students CRUD */}
            <section id="students" className="dashboard-section scroll-mt-20">
                <Card>
                    <h3 className="font-semibold text-[var(--color-text)] mb-4">Kelola Mahasiswa (CRUD)</h3>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Operasi</th>
                                    <th>Langkah-langkah</th>
                                    <th>Complexity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium">Create</td>
                                    <td className="text-[var(--color-text-muted)]">Students &rarr; Add Student &rarr; Isi form &rarr; Save</td>
                                    <td><code>O(1)</code></td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Read</td>
                                    <td className="text-[var(--color-text-muted)]">Students &rarr; Klik baris untuk detail</td>
                                    <td><code>O(n)</code></td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Update</td>
                                    <td className="text-[var(--color-text-muted)]">Students &rarr; Klik Edit &rarr; Ubah data &rarr; Save</td>
                                    <td><code>O(1)</code></td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Delete</td>
                                    <td className="text-[var(--color-text-muted)]">Students &rarr; Klik Delete &rarr; Konfirmasi</td>
                                    <td><code>O(1)</code></td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Delete All</td>
                                    <td className="text-[var(--color-text-muted)]">Students &rarr; Remove All &rarr; Konfirmasi</td>
                                    <td><code>O(n)</code></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            {/* Search */}
            <section id="search" className="dashboard-section scroll-mt-20">
                <Card>
                    <h3 className="font-semibold text-[var(--color-text)] mb-4">Pencarian Mahasiswa</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h4 className="font-medium text-[var(--color-text)] mb-2">Cara Penggunaan</h4>
                            <ol className="text-sm text-[var(--color-text-muted)] space-y-1 list-decimal list-inside">
                                <li>Buka menu <code>Search</code></li>
                                <li>Masukkan kata kunci pencarian</li>
                                <li>Pilih field (Name, NIM, Department)</li>
                                <li>Pilih algoritma pencarian</li>
                                <li>Klik <code>Search</code></li>
                            </ol>
                        </div>
                        <div>
                            <h4 className="font-medium text-[var(--color-text)] mb-2">Hasil Pencarian</h4>
                            <p className="text-sm text-[var(--color-text-muted)]">
                                Sistem akan menampilkan hasil pencarian beserta statistik: jumlah comparison, waktu eksekusi, dan jumlah hasil yang ditemukan.
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Algoritma</th>
                                    <th>Complexity</th>
                                    <th>Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium">Linear Search</td>
                                    <td><code>O(n)</code></td>
                                    <td className="text-[var(--color-text-muted)]">Mencari dari awal sampai akhir, cocok untuk data tidak terurut</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Binary Search</td>
                                    <td><code>O(log n)</code></td>
                                    <td className="text-[var(--color-text-muted)]">Membagi data jadi 2, memerlukan data terurut, hanya exact match</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Sequential Search</td>
                                    <td><code>O(n)</code></td>
                                    <td className="text-[var(--color-text-muted)]">Mencari semua data yang cocok dengan pattern</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            {/* Sort */}
            <section id="sort" className="dashboard-section scroll-mt-20">
                <Card>
                    <h3 className="font-semibold text-[var(--color-text)] mb-4">Pengurutan Mahasiswa</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h4 className="font-medium text-[var(--color-text)] mb-2">Cara Penggunaan</h4>
                            <ol className="text-sm text-[var(--color-text-muted)] space-y-1 list-decimal list-inside">
                                <li>Buka menu <code>Sort</code></li>
                                <li>Pilih field untuk diurutkan</li>
                                <li>Pilih order (Ascending/Descending)</li>
                                <li>Pilih algoritma sorting</li>
                                <li>Klik <code>Sort Data</code></li>
                            </ol>
                        </div>
                        <div>
                            <h4 className="font-medium text-[var(--color-text)] mb-2">Hasil Pengurutan</h4>
                            <p className="text-sm text-[var(--color-text-muted)]">
                                Sistem akan menampilkan data terurut beserta statistik: jumlah comparison, jumlah swap, dan waktu eksekusi algoritma.
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Algoritma</th>
                                    <th>Complexity</th>
                                    <th>Stable</th>
                                    <th>Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium">Bubble Sort</td>
                                    <td><code>O(n2)</code></td>
                                    <td><span className="badge badge-success">Yes</span></td>
                                    <td className="text-[var(--color-text-muted)]">Sederhana, cocok untuk data kecil</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Insertion Sort</td>
                                    <td><code>O(n2)</code></td>
                                    <td><span className="badge badge-success">Yes</span></td>
                                    <td className="text-[var(--color-text-muted)]">Efisien untuk data hampir terurut</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Selection Sort</td>
                                    <td><code>O(n2)</code></td>
                                    <td><span className="badge badge-danger">No</span></td>
                                    <td className="text-[var(--color-text-muted)]">Jumlah swap minimal</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Merge Sort</td>
                                    <td><code>O(n log n)</code></td>
                                    <td><span className="badge badge-success">Yes</span></td>
                                    <td className="text-[var(--color-text-muted)]">Divide-conquer, sangat efisien</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Shell Sort</td>
                                    <td><code>O(n3/2)</code></td>
                                    <td><span className="badge badge-danger">No</span></td>
                                    <td className="text-[var(--color-text-muted)]">Improvement dari insertion sort</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            {/* Algorithms Complexity */}
            <section id="algorithms" className="dashboard-section scroll-mt-20">
                <Card>
                    <h3 className="font-semibold text-[var(--color-text)] mb-4">Time Complexity Reference</h3>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Algorithm</th>
                                    <th className="text-center">Best</th>
                                    <th className="text-center">Average</th>
                                    <th className="text-center">Worst</th>
                                    <th className="text-center">Space</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { algo: 'Linear Search', best: 'O(1)', avg: 'O(n)', worst: 'O(n)', space: 'O(1)' },
                                    { algo: 'Binary Search', best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
                                    { algo: 'Bubble Sort', best: 'O(n)', avg: 'O(n2)', worst: 'O(n2)', space: 'O(1)' },
                                    { algo: 'Insertion Sort', best: 'O(n)', avg: 'O(n2)', worst: 'O(n2)', space: 'O(1)' },
                                    { algo: 'Selection Sort', best: 'O(n2)', avg: 'O(n2)', worst: 'O(n2)', space: 'O(1)' },
                                    { algo: 'Merge Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
                                    { algo: 'Shell Sort', best: 'O(n log n)', avg: 'O(n4/3)', worst: 'O(n2)', space: 'O(1)' }
                                ].map((item, i) => (
                                    <tr key={i}>
                                        <td className="font-medium">{item.algo}</td>
                                        <td className="text-center"><code className="text-[var(--color-success)]">{item.best}</code></td>
                                        <td className="text-center"><code className="text-[var(--color-warning)]">{item.avg}</code></td>
                                        <td className="text-center"><code className="text-[var(--color-danger)]">{item.worst}</code></td>
                                        <td className="text-center"><code>{item.space}</code></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            {/* Tech Stack */}
            <section id="tech" className="dashboard-section scroll-mt-20">
                <Card>
                    <h3 className="font-semibold text-[var(--color-text)] mb-4">Tech Stack</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                            <h4 className="font-medium text-[var(--color-text)] mb-3">Frontend</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS'].map(tech => (
                                    <span key={tech} className="badge badge-primary">{tech}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                            <h4 className="font-medium text-[var(--color-text)] mb-3">Backend</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Next.js API Routes', 'MongoDB Atlas', 'Mongoose ODM'].map(tech => (
                                    <span key={tech} className="badge badge-success">{tech}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                            <h4 className="font-medium text-[var(--color-text)] mb-3">OOP Concepts</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Class', 'Encapsulation', 'Inheritance', 'Polymorphism'].map(concept => (
                                    <span key={concept} className="badge badge-warning">{concept}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
                            <h4 className="font-medium text-[var(--color-text)] mb-3">Features</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Import/Export JSON', 'Regex Validation', 'Error Handling'].map(feat => (
                                    <span key={feat} className="badge badge-primary">{feat}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Footer */}
            {/* <div className="text-center text-sm text-[var(--color-text-muted)] py-6">
                <p>Student Data Management v1.0.0</p>
                <p className="mt-1">Built with Next.js, TypeScript, MongoDB</p>
            </div> */}
        </div>
    );
}
