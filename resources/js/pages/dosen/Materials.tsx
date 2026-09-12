import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Eye,
    Edit3,
    Calendar,
    Video,
    Link2,
    FileSpreadsheet,
    ChevronRight,
    Flag,
    HelpCircle as HelpIcon,
    FileCheck2,
    MessageSquarePlus,
    X,
    UploadCloud,
    FilePlus2,
    Sparkles,
    CheckCircle2,
    FileText,
    BookOpen,
    Layers,
    Download,
    Share2,
    Clock,
    FolderPlus,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LecturerSidebar from '@/components/sale/LecturerSidebar';
import LecturerTopbar from '@/components/sale/LecturerTopbar';

export default function MaterialsDosen() {
    const [selectedWeek, setSelectedWeek] = useState<number>(1);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Daftar 16 Minggu Perkuliahan
    const weeksList = [
        { id: 1, label: 'Minggu 1', topic: 'Pengenalan Struktur Data & ADT' },
        { id: 2, label: 'Minggu 2', topic: 'Array & Pointer Concept' },
        { id: 3, label: 'Minggu 3', topic: 'Single Linked List Operations' },
        { id: 4, label: 'Minggu 4', topic: 'Double & Circular Linked List' },
        { id: 5, label: 'Minggu 5', topic: 'Stack & Queue ADT Implementation' },
        { id: 6, label: 'Minggu 6', topic: 'Tree & Binary Search Tree (BST)' },
        { id: 7, label: 'Minggu 7', topic: 'AVL Tree & Balancing Factor' },
        { id: 8, label: 'Minggu 8', topic: 'Normalisasi Database & UTS' },
        { id: 9, label: 'Minggu 9', topic: 'Graph Theory & Representation' },
        { id: 10, label: 'Minggu 10', topic: 'Shortest Path & Dijkstra Algorithm' },
        { id: 11, label: 'Minggu 11', topic: 'Hashing & Hash Tables' },
        { id: 12, label: 'Minggu 12', topic: 'Advanced Relational Database' },
        { id: 13, label: 'Minggu 13', topic: 'BCNF & Transaction Management' },
        { id: 14, label: 'Minggu 14', topic: 'Query Optimization & Indexing' },
        { id: 15, label: 'Minggu 15', topic: 'NoSQL & Big Data Introduction' },
        { id: 16, label: 'Minggu 16', topic: 'Evaluasi Komprehensif & UAS' },
    ];

    // Data Konten Materi
    const weeksDataContent: Record<number, {
        title: string;
        publishedDate: string;
        description: string;
        learningObjective: string;
        subTopics: string[];
        materials: Array<{
            type: 'pdf' | 'pptx' | 'video' | 'link';
            title: string;
            meta: string;
            iconBg: string;
            isNew?: boolean;
        }>;
    }> = {
        1: {
            title: 'Minggu 1 — Pengenalan Struktur Data & ADT',
            publishedDate: 'Sep 02, 2026',
            description: 'Pengenalan mendalam tentang konsep dasar tipe data abstrak (Abstract Data Type), manajemen memori komputer, serta perbandingan struktur data statis dan dinamis dalam pemecahan masalah komputasi.',
            learningObjective: 'Mahasiswa mampu memahami perbedaan mendasar tipe data primitif dan non-primitif serta merancang spesifikasi struktur data sederhana menggunakan konsep ADT.',
            subTopics: [
                'Definisi dan Signifikansi Struktur Data dalam Software Engineering',
                'Konsep Abstract Data Type (ADT) dan Enkapsulasi Data',
                'Analisis Kompleksitas Waktu dan Ruang (Big-O Notation Dasar)',
                'Manajemen Memori Alokasi Statis vs Dinamis'
            ],
            materials: [
                { type: 'pdf', title: 'Modul 1 - Komprehensif Dasar Struktur Data & ADT.pdf', meta: '3.4 MB • Diperbarui 3 minggu lalu', iconBg: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/50' },
                { type: 'pptx', title: 'Slide Presentasi Kuliah 1 - Konsep ADT & Big-O.pptx', meta: '5.2 MB • 38 Slides', iconBg: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50' },
                { type: 'video', title: 'Rekaman Kuliah Interaktif - Sesi Pengantar ADT', meta: 'Video HD • 52:10 mins', iconBg: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50' },
                { type: 'link', title: 'Interactive Visualizer: Memory & Data Structures', meta: 'External Resource • visualgo.net', iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-900/50' }
            ]
        },
        8: {
            title: 'Minggu 8 — Normalisasi Database & Evaluasi Tengah Semester (UTS)',
            publishedDate: 'Oct 24, 2026',
            description: 'Mempelajari teknik dekomposisi tabel relasional tingkat lanjut untuk meminimalkan redundansi, menghindari anomali penyisipan/penghapusan, dan menerapkan kaidah bentuk normal dari 1NF hingga Boyce-Codd Normal Form (BCNF).',
            learningObjective: 'Mahasiswa mampu menganalisis anomali basis data pada skema buruk serta mentransformasikannya ke dalam bentuk Third Normal Form (3NF) secara akurat.',
            subTopics: [
                'Anomali Data (Insertion, Update, Deletion Anomalies)',
                'Functional Dependency (Ketergantungan Fungsional)',
                'First, Second, dan Third Normal Form (1NF, 2NF, 3NF)',
                'Boyce-Codd Normal Form (BCNF) dan Studi Kasus Enterprise'
            ],
            materials: [
                { type: 'video', title: '[Live Session] Pembahasan Kisi-Kisi UTS & Normalisasi', meta: 'MP4 • 1.2 GB • Baru diunggah', iconBg: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50', isNew: true },
                { type: 'pdf', title: 'Modul 8 - Panduan Lengkap Teori Normalisasi Database.pdf', meta: '4.1 MB • Diperbarui kemarin', iconBg: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/50' },
                { type: 'pptx', title: 'Slide Eksklusif - Studi Kasus 3NF & BCNF.pptx', meta: '6.8 MB • 45 Slides', iconBg: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50' },
                { type: 'link', title: 'Live Lab: Database Normalization Playground', meta: 'External Resource • dbdiagram.io', iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-900/50' }
            ]
        }
    };

    const activeContent = weeksDataContent[selectedWeek] || {
        title: `Minggu ${selectedWeek} — Topik Lanjutan Perkuliahan`,
        publishedDate: 'Terjadwal Sesuai Kalender Akademik',
        description: `Modul dan bahan ajar komprehensif untuk sesi pertemuan minggu ke-${selectedWeek}. Mencakup materi teoretis, lembar kerja praktikum, serta referensi bacaan wajib bagi mahasiswa.`,
        learningObjective: `Mahasiswa mampu menguasai konsep inti, mengimplementasikan algoritma terkait, serta menyelesaikan studi kasus pada topik minggu ke-${selectedWeek}.`,
        subTopics: [
            'Pengantar dan Konsep Teoretis Utama',
            'Studi Kasus dan Implementasi Kode Program',
            'Analisis Kompleksitas dan Efisiensi Algoritma',
            'Sesi Diskusi dan Latihan Mandiri Mahasiswa'
        ],
        materials: [
            { type: 'pdf', title: `Modul Utama Pertemuan Minggu ${selectedWeek}.pdf`, meta: '2.4 MB • Versi Standar Dosen', iconBg: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/50' },
            { type: 'pptx', title: `Slide Presentasi Sesi ${selectedWeek}.pptx`, meta: '3.1 MB • 25 Slides', iconBg: 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50' },
            { type: 'video', title: `Rekaman Video Pembelajaran Minggu ${selectedWeek}`, meta: 'Video • 40:00 mins', iconBg: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50' }
        ]
    };

    return (
        <>
            <Head title="Materi & Modul Mingguan - SALE" />

            <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex">
                
                {/* TOAST NOTIFICATION */}
                {toastMessage && (
                    <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>{toastMessage}</span>
                    </div>
                )}

                {/* SIDEBAR */}
                <LecturerSidebar />

                {/* MAIN WRAPPER */}
                <div className="flex-1 flex flex-col min-w-0 md:ml-[280px]">
                    <LecturerTopbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden mt-16">
                        
                        {/* SUB-SIDEBAR KIRI: LIST MINGGU */}
                        <div className="w-full md:w-80 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col shrink-0 h-auto md:h-[calc(100vh-4rem)] overflow-y-auto">
                            <div className="p-5 border-b border-slate-100 dark:border-slate-800 space-y-1 bg-slate-50/50 dark:bg-slate-900/50">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                                        Navigasi Modul
                                    </h3>
                                    <span className="text-[10px] font-extrabold bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-100 dark:border-blue-500/20">
                                        16 Sesi
                                    </span>
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                                    Struktur Data & Algoritma
                                </h4>
                            </div>

                            <div className="p-3 space-y-1">
                                {weeksList.map((week) => {
                                    const isSelected = selectedWeek === week.id;
                                    return (
                                        <button
                                            key={week.id}
                                            onClick={() => setSelectedWeek(week.id)}
                                            className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                                                isSelected
                                                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                                                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400'
                                            }`}
                                        >
                                            <div className="truncate pr-2">
                                                <div className={`text-[10px] font-extrabold uppercase tracking-wider ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                                                    {week.label}
                                                </div>
                                                <div className={`text-xs truncate font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                                                    {week.topic}
                                                </div>
                                            </div>
                                            <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? 'text-white translate-x-0.5' : 'text-slate-300 dark:text-slate-700'}`} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CONTENT AREA KANAN */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-slate-100/60 dark:bg-slate-950">
                            
                            {/* TOP STATUS BAR */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
                                <div className="flex items-center gap-3">
                                    <span className="bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 border text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Published & Active
                                    </span>
                                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" /> {activeContent.publishedDate}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={() => showToast('Membuka pratinjau mode siswa...')} className="h-9 text-xs font-bold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 gap-1.5 px-3 shadow-xs cursor-pointer">
                                        <Eye className="h-4 w-4 text-blue-500" /> Pratinjau
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => showToast('Membuka editor materi...')} className="h-9 text-xs font-bold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 gap-1.5 px-3 shadow-xs cursor-pointer">
                                        <Edit3 className="h-4 w-4 text-amber-500" /> Edit Sesi
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => showToast('Mengunduh seluruh bundel materi...')} className="h-9 w-9 rounded-xl border-slate-200 text-slate-400 hover:text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer" title="Download Bundel">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* HERO TITLE CARD */}
                            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-xs space-y-3 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
                                <div className="flex items-center gap-2 text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                    <BookOpen className="h-4 w-4" /> Sesi Pertemuan Ke-{selectedWeek}
                                </div>
                                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {activeContent.title}
                                </h1>
                                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                                    {activeContent.description}
                                </p>
                            </div>

                            {/* DUA KOLOM: TUJUAN & SUB-TOPIK */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                
                                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between border-l-4 border-l-blue-600">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-extrabold text-xs uppercase tracking-wider">
                                            <Flag className="h-4 w-4" /> Capaian Pembelajaran
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {activeContent.learningObjective}
                                        </p>
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                                        <span>Target Ketercapaian Kelas</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Terverifikasi</span>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between border-l-4 border-l-indigo-600">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
                                            <Layers className="h-4 w-4" /> Pokok Bahasan Utama
                                        </div>
                                        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                                            {activeContent.subTopics.map((topic, i) => (
                                                <li key={i} className="flex items-start gap-2.5">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                                                    <span className="font-medium">{topic}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-semibold flex items-center justify-between">
                                        <span>Metode: Teori & Praktikum Lab</span>
                                        <span className="text-blue-600 dark:text-blue-400 font-bold">SKS Aktif</span>
                                    </div>
                                </div>

                            </div>

                            {/* SECTION: BAHAN KAJIAN & MATERI */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">Bahan Kajian & Dokumen Materi</h3>
                                        <p className="text-xs text-slate-400 mt-0.5">Berkas modul, slide presentasi, video rekaman, dan tautan pendukung sesi ini.</p>
                                    </div>
                                    <Button size="sm" onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-4 h-9 shadow-xs gap-1.5 cursor-pointer">
                                        <FilePlus2 className="h-4 w-4" /> Tambah Materi
                                    </Button>
                                </div>

                                {/* FORM TAMBAH MATERI */}
                                {showAddForm && (
                                    <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-blue-300 dark:border-blue-500/30 rounded-2xl p-6 space-y-4 relative shadow-lg animate-in fade-in slide-in-from-top-2">
                                        <button
                                            onClick={() => setShowAddForm(false)}
                                            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>

                                        <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-extrabold text-sm">
                                            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                                                <FolderPlus className="h-4 w-4" />
                                            </div>
                                            <span>Form Unggah Bahan Ajar Sesi {selectedWeek}</span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Judul Materi</label>
                                                <input
                                                    type="text"
                                                    placeholder="Contoh: Modul Praktikum Bagian 2"
                                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Tautan Eksternal (Opsional)</label>
                                                <input
                                                    type="text"
                                                    placeholder="https://..."
                                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
                                            <div className="w-full md:w-auto flex-1 bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 border-dashed rounded-xl p-4 flex items-center justify-center gap-2.5 text-xs cursor-pointer transition">
                                                <UploadCloud className="h-5 w-5 text-blue-500" />
                                                <span>Klik atau seret berkas ke sini (PDF, PPTX, MP4)</span>
                                            </div>

                                            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
                                                <Button variant="ghost" onClick={() => setShowAddForm(false)} className="text-xs font-bold text-slate-500 cursor-pointer">
                                                    Batal
                                                </Button>
                                                <Button onClick={() => { setShowAddForm(false); showToast('Materi berhasil dipublikasikan!'); }} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-5 py-2.5 shadow-xs cursor-pointer">
                                                    Simpan Materi
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* GRID KARTU MATERI */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activeContent.materials.map((mat, idx) => (
                                        <Card key={idx} className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl hover:border-blue-500/50 transition relative overflow-hidden group">
                                            {mat.isNew && (
                                                <span className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-bl-lg tracking-wider">
                                                    BARU
                                                </span>
                                            )}
                                            <CardContent className="p-4 flex items-start gap-4">
                                                <div className={`p-3.5 rounded-2xl shrink-0 border ${mat.iconBg}`}>
                                                    {mat.type === 'pdf' && <FileText className="h-5 w-5" />}
                                                    {mat.type === 'pptx' && <FileSpreadsheet className="h-5 w-5" />}
                                                    {mat.type === 'video' && <Video className="h-5 w-5" />}
                                                    {mat.type === 'link' && <Link2 className="h-5 w-5" />}
                                                </div>

                                                <div className="min-w-0 flex-1 space-y-1">
                                                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                                                        {mat.title}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400 font-medium truncate">
                                                        {mat.meta}
                                                    </p>
                                                    <div className="pt-2 flex items-center gap-3 text-[11px] font-bold">
                                                        <button onClick={() => showToast(`Mengunduh file: ${mat.title}`)} className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer">
                                                            <Download className="h-3 w-3" /> Unduh
                                                        </button>
                                                        <span className="text-slate-300 dark:text-slate-700">•</span>
                                                        <button onClick={() => showToast(`Tautan berhasil disalin`)} className="text-slate-500 dark:text-slate-400 hover:underline inline-flex items-center gap-1 cursor-pointer">
                                                            <Share2 className="h-3 w-3" /> Bagikan
                                                        </button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* BANNER AI TEACHING ASSISTANT */}
                            <div className="bg-gradient-to-br from-indigo-50/90 via-blue-50/60 to-white dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/50 p-6 md:p-8 rounded-2xl space-y-5 shadow-xs relative overflow-hidden">
                                <Sparkles className="absolute -right-6 -bottom-6 w-48 h-48 text-blue-500/10 pointer-events-none" />

                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-sm">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-slate-900 dark:text-white">AI Teaching Assistant Studio</h3>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Otomatisasi pembuatan draf materi dan evaluasi berbasis LLM.</p>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl relative z-10">
                                    Gunakan asisten cerdas untuk memproses modul pertemuan ke-<strong className="text-blue-600 dark:text-blue-400">{selectedWeek}</strong>. Pilih aksi cepat di bawah untuk menghasilkan konten pembelajaran seketika.
                                </p>

                                <div className="flex flex-wrap items-center gap-3 pt-1 relative z-10">
                                    <Button
                                        onClick={() => showToast('AI sukses merangkum poin utama materi!')}
                                        variant="outline"
                                        size="sm"
                                        className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 text-xs font-bold rounded-xl px-4 h-10 shadow-xs gap-2 cursor-pointer transition"
                                    >
                                        <FileCheck2 className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Ringkas Materi
                                    </Button>
                                    <Button
                                        onClick={() => showToast('AI berhasil membuat 10 draf soal kuis!')}
                                        variant="outline"
                                        size="sm"
                                        className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 text-xs font-bold rounded-xl px-4 h-10 shadow-xs gap-2 cursor-pointer transition"
                                    >
                                        <HelpIcon className="h-4 w-4 text-amber-500" /> Buat Soal Kuis
                                    </Button>
                                    <Button
                                        onClick={() => showToast('AI sukses membuat skenario topik diskusi!')}
                                        variant="outline"
                                        size="sm"
                                        className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 text-xs font-bold rounded-xl px-4 h-10 shadow-xs gap-2 cursor-pointer transition"
                                    >
                                        <MessageSquarePlus className="h-4 w-4 text-indigo-500" /> Buat Topik Diskusi
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

MaterialsDosen.layout = (page: React.ReactNode) => page;