import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Plus,
    Sparkles,
    FileDown,
    Download,
    PieChart,
    ListTodo,
    Flag,
    CheckCircle2,
    Filter,
    ChevronRight,
    ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LecturerSidebar from '@/components/sale/LecturerSidebar';
import LecturerTopbar from '@/components/sale/LecturerTopbar';

export default function CurriculumDosen() {
    const [activeTab, setActiveTab] = useState<'RPS' | 'CPL' | 'CPMK' | 'Pemetaan' | 'Metode Penilaian'>('RPS');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const rpsList = [
        { code: 'IF204', name: 'RPS Basis Data', semester: 'Ganjil 2026/2027', status: 'Disetujui', revisi: 'Rev-02' },
        { code: 'IF301', name: 'RPS Kecerdasan Buatan', semester: 'Ganjil 2026/2027', status: 'Draf', revisi: 'Rev-00' },
        { code: 'CS101', name: 'RPS Pemrograman Web', semester: 'Ganjil 2026/2027', status: 'Disetujui', revisi: 'Rev-01' },
        { code: 'SE202', name: 'RPS Rekayasa Perangkat Lunak', semester: 'Genap 2025/2026', status: 'Disetujui', revisi: 'Rev-03' },
        { code: 'IF405', name: 'RPS Keamanan Informasi', semester: 'Ganjil 2026/2027', status: 'Revisi Pembimbing', revisi: 'Rev-01' },
        { code: 'CS302', name: 'RPS Pemrograman Berorientasi Objek', semester: 'Genap 2025/2026', status: 'Disetujui', revisi: 'Rev-02' },
        { code: 'IF102', name: 'RPS Algoritma dan Pemrograman', semester: 'Ganjil 2026/2027', status: 'Disetujui', revisi: 'Rev-04' },
    ];

    const cplData = [
        { code: 'CPL-01', desc: 'Mahasiswa mampu menerapkan konsep dasar matematika, sains, dan ilmu komputer untuk menyelesaikan masalah komputasi kompleks.', status: 'Terpetakan' },
        { code: 'CPL-02', desc: 'Mahasiswa memiliki kemampuan berpikir kritis, analitis, dan sistematis dalam pengembangan arsitektur sistem informasi.', status: 'Terpetakan' },
        { code: 'CPL-03', desc: 'Mahasiswa mampu merancang, mengimplementasikan, dan mengevaluasi sistem berbasis komputer sesuai kebutuhan industri.', status: 'Terpetakan' },
        { code: 'CPL-04', desc: 'Mahasiswa mampu mengelola proyek perangkat lunak dengan menerapkan standar etika profesi dan kerja sama tim.', status: 'Terpetakan' },
        { code: 'CPL-05', desc: 'Mahasiswa mampu melakukan pemetaan dan mitigasi risiko keamanan pada infrastruktur jaringan enterprise.', status: 'Belum Penuh' },
    ];

    const cpmkData = [
        { code: 'CPMK-01', desc: 'Mahasiswa mampu menjelaskan arsitektur sistem basis data modern dan konsep dasar ADT.', cplMapped: 'CPL-01' },
        { code: 'CPMK-02', desc: 'Mahasiswa mampu melakukan normalisasi database hingga bentuk 3NF/BCNF dan pemodelan relasional.', cplMapped: 'CPL-02' },
        { code: 'CPMK-03', desc: 'Mahasiswa mampu mengimplementasikan indeks, penanganan transaksi, dan optimasi query terstruktur.', cplMapped: 'CPL-03' },
        { code: 'CPMK-04', desc: 'Mahasiswa mampu merancang API RESTful dan mengintegrasikannya dengan basis data relasional.', cplMapped: 'CPL-03' },
        { code: 'CPMK-05', desc: 'Mahasiswa mampu mendokumentasikan hasil pengujian performa query basis data secara sistematis.', cplMapped: 'CPL-04' },
    ];

    const pemetaanMingguan = [
        { minggu: '1', title: 'Pengenalan Struktur Data & ADT', sub: 'Konsep Dasar ADT, Array, Pointer, dan Memori Dynamic', cpmk: ['CPMK-01'], penilaian: 'Kuis Pendahuluan', isHeader: false },
        { minggu: '2-3', title: 'Linked List & Pointer Implementation', sub: 'Single, Double, dan Circular Linked List Operations', cpmk: ['CPMK-01', 'CPMK-02'], penilaian: 'Tugas Mandiri 1', isHeader: false },
        { minggu: '4-5', title: 'Stack & Queue Data Structures', sub: 'Array/Pointer Implementation, LIFO, FIFO, and Applications', cpmk: ['CPMK-02'], penilaian: 'Praktikum Lab 1', isHeader: false },
        { minggu: '6-7', title: 'Tree & Binary Search Tree (BST)', sub: 'Tree Traversal, AVL Tree, Red-Black Tree, B-Tree', cpmk: ['CPMK-02', 'CPMK-03'], penilaian: 'Tugas Kelompok 1', isHeader: false },
        { minggu: '8', title: 'Ujian Tengah Semester (UTS)', sub: 'Evaluasi Materi Minggu 1 s.d. 7', cpmk: ['CPMK-01', 'CPMK-02', 'CPMK-03'], penilaian: 'Ujian Tertulis Essay', isHeader: true },
        { minggu: '9-10', title: 'Graph Theory & Algoritma Lintasan Terpendek', sub: 'Representation Graph, BFS, DFS, Dijkstra, Floyd-Warshall', cpmk: ['CPMK-03'], penilaian: 'Kuis 2', isHeader: false },
        { minggu: '11-12', title: 'Algoritma Hashing & Hash Tables', sub: 'Hash Functions, Collision Resolution (Chaining & Open Addressing)', cpmk: ['CPMK-03', 'CPMK-04'], penilaian: 'Praktikum Lab 2', isHeader: false },
        { minggu: '13-14', title: 'Desain Basis Data Lanjut & Normalisasi', sub: 'Boyce-Codd Normal Form (BCNF), 4NF, dan Transaksi ACID', cpmk: ['CPMK-04'], penilaian: 'Tugas Mandiri 2', isHeader: false },
        { minggu: '15', title: 'Optimasi Query & Indexing Enterprise', sub: 'B-Tree Indexing, Query Execution Plan, dan Benchmarking', cpmk: ['CPMK-04', 'CPMK-05'], penilaian: 'Presentasi Proyek', isHeader: false },
        { minggu: '16', title: 'Ujian Akhir Semester (UAS)', sub: 'Evaluasi Komprehensif Semester Ganjil', cpmk: ['CPMK-01', 'CPMK-02', 'CPMK-03', 'CPMK-04', 'CPMK-05'], penilaian: 'Studi Kasus Komprehensif', isHeader: true }
    ];

    const metodePenilaianList = [
        { jenis: 'Tugas Mandiri 1', bobot: '10%', cpmk: [{ code: 'CPMK-01', color: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800' }], deskripsi: 'Laporan Analisis Kebutuhan Struktur Data' },
        { jenis: 'Kuis 1 (Pendahuluan)', bobot: '5%', cpmk: [{ code: 'CPMK-01', color: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800' }], deskripsi: 'Pilihan Ganda Concept Assessment' },
        { jenis: 'Praktikum Lab 1', bobot: '10%', cpmk: [{ code: 'CPMK-02', color: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800' }], deskripsi: 'Implementasi Stack & Queue C++' },
        { jenis: 'Ujian Tengah Semester (UTS)', bobot: '25%', cpmk: [{ code: 'CPMK-01', color: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800' }, { code: 'CPMK-02', color: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800' }], deskripsi: 'Ujian Tertulis & Pemecahan Kasus Algorithm' },
        { jenis: 'Tugas Mandiri 2', bobot: '10%', cpmk: [{ code: 'CPMK-03', color: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' }], deskripsi: 'Studi Kasus Graph & Hashing Algorithm' },
        { jenis: 'Praktikum Lab 2', bobot: '10%', cpmk: [{ code: 'CPMK-04', color: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' }], deskripsi: 'Integrasi Database Relasional API' },
        { jenis: 'Proyek Akhir Semester', bobot: '15%', cpmk: [{ code: 'CPMK-03', color: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' }, { code: 'CPMK-04', color: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' }], deskripsi: 'Implementasi App Enterprise & Normalisasi 3NF' },
        { jenis: 'Ujian Akhir Semester (UAS)', bobot: '15%', cpmk: [{ code: 'CPMK-04', color: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' }, { code: 'CPMK-05', color: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' }], deskripsi: 'Studi Kasus Komprehensif Lanjut' }
    ];

    return (
        <>
            <Head title="Manajemen Kurikulum - SALE" />

            <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex">
                
                {toastMessage && (
                    <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>{toastMessage}</span>
                    </div>
                )}

                <LecturerSidebar />

                <div className="flex-1 flex flex-col min-w-0 md:ml-[280px]">
                    <LecturerTopbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

                    <main className="flex-1 p-6 md:p-8 space-y-6 mt-16 max-w-7xl w-full">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                            <span>Manajemen Kurikulum</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-blue-600 dark:text-blue-400 font-bold">{activeTab}</span>
                        </div>

                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="max-w-2xl">
                                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Manajemen Kurikulum
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                    Kelola Rencana Pembelajaran Semester (RPS) dan petakan Capaian Pembelajaran Lulusan (CPL) ke CPMK secara komprehensif.
                                </p>
                            </div>

                            {activeTab === 'Metode Penilaian' && (
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-4 py-2.5 shadow-xs gap-2 shrink-0 cursor-pointer">
                                    <Plus className="h-4 w-4" /> Tambah Metode Penilaian
                                </Button>
                            )}
                        </div>

                        {/* TAB NAVIGATION */}
                        <div className="border-b border-slate-200 dark:border-slate-800 flex gap-8 text-xs font-bold">
                            {(['RPS', 'CPL', 'CPMK', 'Pemetaan', 'Metode Penilaian'] as const).map((tab) => {
                                const isActive = activeTab === tab;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 transition-all relative cursor-pointer ${
                                            isActive
                                                ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                        }`}
                                    >
                                        {tab}
                                        {isActive && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* TAB 1: RPS */}
                        {activeTab === 'RPS' && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Dokumen Rencana Pembelajaran Semester (RPS)</h3>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl px-4 gap-1.5 shadow-xs cursor-pointer">
                                        <Plus className="h-4 w-4" /> Buat RPS Baru
                                    </Button>
                                </div>
                                <Card className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl overflow-hidden">
                                    <CardContent className="p-0">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                                                <tr>
                                                    <th className="p-4 pl-6">Kode MK</th>
                                                    <th className="p-4">Nama Dokumen RPS</th>
                                                    <th className="p-4">Semester</th>
                                                    <th className="p-4 text-center">Status RPS</th>
                                                    <th className="p-4 text-center">Revisi</th>
                                                    <th className="p-4 pr-6 text-center">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                                                {rpsList.map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                        <td className="p-4 pl-6 font-bold text-blue-600 dark:text-blue-400">{row.code}</td>
                                                        <td className="p-4 font-bold text-slate-900 dark:text-white">{row.name}</td>
                                                        <td className="p-4 text-slate-400">{row.semester}</td>
                                                        <td className="p-4 text-center">
                                                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                                                                row.status === 'Disetujui' 
                                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' 
                                                                    : 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                                                            }`}>
                                                                {row.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-center text-slate-400">{row.revisi}</td>
                                                        <td className="p-4 pr-6 text-center space-x-2">
                                                            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold rounded-lg cursor-pointer border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                                                Edit
                                                            </Button>
                                                            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold rounded-lg cursor-pointer text-blue-600 dark:text-blue-400 border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                                                <FileDown className="h-3.5 w-3.5 mr-1" /> PDF
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* TAB 2: CPL */}
                        {activeTab === 'CPL' && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Daftar Capaian Pembelajaran Lulusan (CPL)</h3>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl px-4 gap-1.5 shadow-xs cursor-pointer">
                                        <Plus className="h-4 w-4" /> Tambah CPL
                                    </Button>
                                </div>
                                <Card className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl overflow-hidden">
                                    <CardContent className="p-0">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                                                <tr>
                                                    <th className="p-4 pl-6 w-28">Kode</th>
                                                    <th className="p-4">Deskripsi Capaian</th>
                                                    <th className="p-4 w-36 text-center">Status</th>
                                                    <th className="p-4 pr-6 w-24 text-center">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                                                {cplData.map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                        <td className="p-4 pl-6 font-bold text-blue-600 dark:text-blue-400">{row.code}</td>
                                                        <td className="p-4 text-slate-700 dark:text-slate-300 leading-relaxed">{row.desc}</td>
                                                        <td className="p-4 text-center">
                                                            <span className="bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full border">
                                                                {row.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 pr-6 text-center">
                                                            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold rounded-lg cursor-pointer border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                                                Edit
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* TAB 3: CPMK */}
                        {activeTab === 'CPMK' && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Capaian Pembelajaran Mata Kuliah (CPMK)</h3>
                                    <Button size="sm" variant="outline" className="text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-xl px-4 gap-1.5 cursor-pointer border-blue-200 dark:border-slate-700">
                                        <Plus className="h-4 w-4" /> Tambah CPMK
                                    </Button>
                                </div>
                                <Card className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl overflow-hidden">
                                    <CardContent className="p-0">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                                                <tr>
                                                    <th className="p-4 pl-6 w-28">Kode</th>
                                                    <th className="p-4">Deskripsi CPMK</th>
                                                    <th className="p-4 w-36 text-center">Pemetaan CPL</th>
                                                    <th className="p-4 pr-6 w-24 text-center">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                                                {cpmkData.map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                        <td className="p-4 pl-6 font-bold text-blue-600 dark:text-blue-400">{row.code}</td>
                                                        <td className="p-4 text-slate-700 dark:text-slate-300 leading-relaxed">{row.desc}</td>
                                                        <td className="p-4 text-center">
                                                            <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md">
                                                                {row.cplMapped}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 pr-6 text-center">
                                                            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-semibold rounded-lg cursor-pointer border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                                                                Edit
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* TAB 4: PEMETAAN */}
                        {activeTab === 'Pemetaan' && (
                            <div className="space-y-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                            Pemetaan CPMK ke Materi Mingguan
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                                            Mata Kuliah: Struktur Data dan Algoritma (CS201)
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button variant="outline" size="sm" className="h-9 text-xs font-bold rounded-xl gap-2 px-4 shadow-xs cursor-pointer border-slate-200 dark:border-slate-700">
                                            <Download className="h-4 w-4 text-slate-400" /> Ekspor RPS
                                        </Button>
                                        <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl gap-2 px-4 shadow-xs cursor-pointer">
                                            <Plus className="h-4 w-4" /> Tambah Minggu
                                        </Button>
                                    </div>
                                </div>
                                <Card className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl overflow-hidden">
                                    <CardContent className="p-0">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                                                <tr>
                                                    <th className="p-4 pl-6 w-20">Minggu</th>
                                                    <th className="p-4">Topik & Materi</th>
                                                    <th className="p-4">CPMK Terkait</th>
                                                    <th className="p-4">Metode Penilaian</th>
                                                    <th className="p-4 pr-6 text-right w-32">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                                                {pemetaanMingguan.map((row, idx) => (
                                                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                        <td className={`p-4 pl-6 font-bold ${row.isHeader ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                                            {row.minggu}
                                                        </td>
                                                        <td className="p-4">
                                                            <div className={`font-bold ${row.isHeader ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                                                {row.title}
                                                            </div>
                                                            {row.sub && (
                                                                <div className="text-[11px] text-slate-400 mt-0.5">
                                                                    {row.sub}
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                                {row.cpmk.map((c, i) => (
                                                                    <span key={i} className="bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border">
                                                                        {c}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">
                                                            {row.penilaian}
                                                        </td>
                                                        <td className="p-4 pr-6 text-right">
                                                            <button className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-xs cursor-pointer">
                                                                Edit Pemetaan
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* TAB 5: METODE PENILAIAN */}
                        {activeTab === 'Metode Penilaian' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start pb-12">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-white dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 border border-blue-100 dark:border-blue-900/50 p-5 rounded-2xl relative overflow-hidden shadow-xs">
                                        <Sparkles className="absolute -right-3 -top-3 w-32 h-32 text-blue-500/10 pointer-events-none" />
                                        <div className="flex items-start gap-3 relative z-10">
                                            <div className="p-2 bg-blue-600 text-white rounded-xl shrink-0 shadow-xs">
                                                <Sparkles className="h-4 w-4" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-bold text-blue-950 dark:text-blue-400">Rekomendasi AI</h4>
                                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                                    Komposisi penilaian untuk <span className="font-semibold text-slate-800 dark:text-white">CPMK-02</span> sudah mencukupi, namun <span className="font-semibold text-slate-800 dark:text-white">CPMK-03</span> memerlukan instrumen penilaian formatif tambahan.
                                                </p>
                                                <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline transition inline-flex items-center gap-1 pt-2 cursor-pointer">
                                                    <span>Lihat Detail Analisis</span>
                                                    <ArrowRight className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <Card className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl overflow-hidden">
                                        <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
                                            <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Daftar Metode Penilaian</CardTitle>
                                            <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer border-slate-200 dark:border-slate-700">
                                                <Filter className="h-4 w-4" />
                                            </Button>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-xs">
                                                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 text-[10px]">
                                                        <tr>
                                                            <th className="p-4 pl-6">Jenis Penilaian</th>
                                                            <th className="p-4">Bobot (%)</th>
                                                            <th className="p-4">CPMK Terkait</th>
                                                            <th className="p-4">Deskripsi / Instrumen</th>
                                                            <th className="p-4 pr-6 text-right">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                                                        {metodePenilaianList.map((row, idx) => (
                                                            <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                                <td className="p-4 pl-6 font-bold text-slate-900 dark:text-white">{row.jenis}</td>
                                                                <td className="p-4 text-blue-600 dark:text-blue-400 font-semibold">{row.bobot}</td>
                                                                <td className="p-4">
                                                                    <div className="flex flex-col gap-1 items-start">
                                                                        {row.cpmk.map((c, i) => (
                                                                            <span key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded border ${c.color}`}>
                                                                                {c.code}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </td>
                                                                <td className="p-4 text-slate-400">{row.deskripsi}</td>
                                                                <td className="p-4 pr-6 text-right">
                                                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-xs cursor-pointer">
                                                                        Edit
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    <tfoot className="bg-blue-50/40 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 font-bold">
                                                        <tr>
                                                            <td className="p-4 pl-6 text-slate-900 dark:text-white">Total</td>
                                                            <td className="p-4 text-blue-600 dark:text-blue-400 font-extrabold text-sm">100%</td>
                                                            <td colSpan={3}></td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="space-y-4">
                                    <Card className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl">
                                        <CardContent className="p-5 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL BOBOT</p>
                                                <div className="flex items-baseline gap-2 mt-1">
                                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">100%</h3>
                                                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
                                                        <CheckCircle2 className="h-3 w-3" /> Valid
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-100 dark:border-blue-500/20">
                                                <PieChart className="h-6 w-6" />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl">
                                        <CardContent className="p-5 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">JUMLAH INSTRUMEN</p>
                                                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">8</h3>
                                                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Item Penilaian</p>
                                            </div>
                                            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
                                                <ListTodo className="h-6 w-6" />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl">
                                        <CardContent className="p-5 flex items-center justify-between">
                                            <div className="w-full pr-3">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CPMK TERCOVER</p>
                                                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">5/5</h3>
                                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
                                                    <div className="h-full bg-amber-500 rounded-full w-full"></div>
                                                </div>
                                                <p className="text-[10px] text-slate-400 font-medium mt-2">Semua target capaian terpantau.</p>
                                            </div>
                                            <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl shrink-0 border border-amber-100 dark:border-amber-500/20">
                                                <Flag className="h-6 w-6" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}

CurriculumDosen.layout = (page: React.ReactNode) => page;