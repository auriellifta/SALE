import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Plus,
    Sparkles,
    Clock,
    Check,
    Edit2,
    RotateCcw,
    Trash2,
    ArrowLeft,
    X,
    Search,
    Filter,
    CheckCircle2,
    Copy,
    Eye,
    Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LecturerSidebar from '@/components/sale/LecturerSidebar';
import LecturerTopbar from '@/components/sale/LecturerTopbar';

interface QuestionOption {
    key: string;
    label: string;
    isCorrect: boolean;
}

interface QuestionItem {
    id: string;
    type: string;
    question: string;
    options: QuestionOption[];
    explanation: string;
}

export default function AssignmentsDosen() {
    const [activeTab, setActiveTab] = useState<'Tugas' | 'Kuis' | 'Draft' | 'Riwayat'>('Tugas');
    const [isAiGeneratorOpen, setIsAiGeneratorOpen] = useState<boolean>(false);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourseFilter, setSelectedCourseFilter] = useState('Semua');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // State Form AI Quiz Generator
    const [selectedCourse, setSelectedCourse] = useState('Struktur Data dan Algoritma');
    const [selectedTopic, setSelectedTopic] = useState('Minggu 4: Tree & Graph');
    const [questionCount, setQuestionCount] = useState('10');
    const [difficulty, setDifficulty] = useState<'Mudah' | 'Sedang' | 'Sulit'>('Mudah');
    const [questionType, setQuestionType] = useState({
        pilihanGanda: true,
        benarSalah: false,
        isianSingkat: false,
    });

    // State AI Questions
    const [questions, setQuestions] = useState<QuestionItem[]>([
        {
            id: 'Q1',
            type: 'Pilihan Ganda',
            question: 'Struktur data Tree yang memiliki maksimal dua child pada setiap nodenya disebut...',
            options: [
                { key: 'A', label: 'Binary Tree', isCorrect: true },
                { key: 'B', label: 'AVL Tree', isCorrect: false },
                { key: 'C', label: 'B-Tree', isCorrect: false },
                { key: 'D', label: 'Red-Black Tree', isCorrect: false },
            ],
            explanation: 'Binary Tree adalah struktur data pohon hirarkis dimana setiap node memiliki paling banyak dua anak (anak kiri dan anak kanan).'
        },
        {
            id: 'Q2',
            type: 'Pilihan Ganda',
            question: 'Manakah dari berikut ini yang BUKAN merupakan cara penelusuran (traversal) pada Binary Tree?',
            options: [
                { key: 'A', label: 'Inorder', isCorrect: false },
                { key: 'B', label: 'Preorder', isCorrect: false },
                { key: 'C', label: 'Outorder', isCorrect: true },
                { key: 'D', label: 'Postorder', isCorrect: false },
            ],
            explanation: 'Traversal umum pada Binary Tree terdiri dari Inorder, Preorder, Postorder, dan Level-order.'
        },
        {
            id: 'Q3',
            type: 'Pilihan Ganda',
            question: 'Berapakah jumlah maksimal node pada Binary Tree dengan kedalaman (height) h = 3?',
            options: [
                { key: 'A', label: '7', isCorrect: true },
                { key: 'B', label: '8', isCorrect: false },
                { key: 'C', label: '15', isCorrect: false },
                { key: 'D', label: '3', isCorrect: false },
            ],
            explanation: 'Jumlah maksimal node pada pohon biner berkedalaman h dirumuskan dengan 2^h - 1 = 2^3 - 1 = 7.'
        }
    ]);

    // Data Dummy Ramai & Lengkap
    const [tugasData, setTugasData] = useState([
        { id: 1, judul: 'Analisis Algoritma Sorting', matkul: 'Struktur Data - Kelas A', deadline: '15 Nov, 23:59', terkumpul: '28/32', status: 'Aktif' },
        { id: 2, judul: 'Implementasi Binary Tree', matkul: 'Struktur Data - Kelas B', deadline: '18 Nov, 23:59', terkumpul: '0/30', status: 'Aktif' },
        { id: 3, judul: 'Perancangan ERD Database Toko Online', matkul: 'Basis Data - Kelas A', deadline: '20 Nov, 23:59', terkumpul: '15/35', status: 'Aktif' },
        { id: 4, judul: 'Studi Kasus Normalisasi 3NF & BCNF', matkul: 'Basis Data - Kelas C', deadline: '22 Nov, 23:59', terkumpul: '32/32', status: 'Aktif' },
        { id: 5, judul: 'Tugas Mandiri Pointers & ADT C++', matkul: 'Struktur Data - Kelas A', deadline: '25 Nov, 23:59', terkumpul: '12/32', status: 'Aktif' },
        { id: 6, judul: 'Laporan Praktikum Graph BFS/DFS', matkul: 'Struktur Data - Kelas B', deadline: '28 Nov, 23:59', terkumpul: '5/30', status: 'Aktif' },
        { id: 7, judul: 'Desain RESTful API Backend Laravel', matkul: 'Pemrograman Web - Kelas A', deadline: '01 Des, 23:59', terkumpul: '0/28', status: 'Aktif' },
        { id: 8, judul: 'Eksplorasi Hashing & Collision Handling', matkul: 'Struktur Data - Kelas A', deadline: '05 Des, 23:59', terkumpul: '0/32', status: 'Aktif' },
    ]);

    const [kuisData, setKuisData] = useState([
        { id: 101, judul: 'Kuis 1: Konsep Dasar Array & Pointer', matkul: 'Struktur Data - Kelas A', deadline: '12 Nov, 14:00', terkumpul: '32/32', status: 'Aktif' },
        { id: 102, judul: 'Kuis 2: Stack & Queue Simulation', matkul: 'Struktur Data - Kelas B', deadline: '19 Nov, 10:00', terkumpul: '18/30', status: 'Aktif' },
        { id: 103, judul: 'Kuis Evaluasi Normalisasi 1NF-BCNF', matkul: 'Basis Data - Kelas B', deadline: '21 Nov, 13:00', terkumpul: '0/34', status: 'Aktif' },
        { id: 104, judul: 'Kuis 3: Hashing & Collision Handling', matkul: 'Struktur Data - Kelas A', deadline: '26 Nov, 15:00', terkumpul: '0/32', status: 'Aktif' },
        { id: 105, judul: 'Kuis Pendahuluan Pemrograman Web', matkul: 'Pemrograman Web - Kelas A', deadline: '30 Nov, 09:00', terkumpul: '10/28', status: 'Aktif' },
    ]);

    const [draftData, setDraftData] = useState([
        { id: 201, judul: 'Implementasi Graph Dijkstra Shortest Path', matkul: 'Struktur Data - Kelas B', deadline: 'Belum Diatur', terkumpul: '0/30', status: 'Draft' },
        { id: 202, judul: 'Proyek Akhir Normalisasi Database Enterprise', matkul: 'Basis Data - Kelas A', deadline: 'Belum Diatur', terkumpul: '0/35', status: 'Draft' },
        { id: 203, judul: 'Kuis Pemrograman Asinkronus JavaScript', matkul: 'Pemrograman Web - Kelas A', deadline: 'Belum Diatur', terkumpul: '0/28', status: 'Draft' },
        { id: 204, judul: 'Tugas Evaluasi Transaksi ACID Basis Data', matkul: 'Basis Data - Kelas C', deadline: 'Belum Diatur', terkumpul: '0/32', status: 'Draft' },
    ]);

    const [riwayatData, setRiwayatData] = useState([
        { id: 301, judul: 'Praktikum 1: Pengenalan Environment C++', matkul: 'Struktur Data - Kelas A', deadline: '01 Okt, 23:59', terkumpul: '32/32', status: 'Selesai' },
        { id: 302, judul: 'Kuis Pendahuluan Logika Algoritma', matkul: 'Struktur Data - Kelas B', deadline: '05 Okt, 10:00', terkumpul: '30/30', status: 'Selesai' },
        { id: 303, judul: 'Tugas Pemodelan Relasional Tabel', matkul: 'Basis Data - Kelas A', deadline: '15 Okt, 23:59', terkumpul: '35/35', status: 'Selesai' },
        { id: 304, judul: 'UTS Teori & Praktikum Lab Komputer', matkul: 'Struktur Data - Kelas A', deadline: '30 Okt, 12:00', terkumpul: '32/32', status: 'Selesai' },
        { id: 305, judul: 'Kuis 0: Review Dasar Pemrograman', matkul: 'Pemrograman Web - Kelas A', deadline: '02 Nov, 14:00', terkumpul: '28/28', status: 'Selesai' },
    ]);

    // Modal Create Task Form State
    const [newTask, setNewTask] = useState({
        judul: '',
        matkul: 'Struktur Data - Kelas A',
        deadline: '',
    });

    const handleCreateTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.judul) return;

        const created = {
            id: Date.now(),
            judul: newTask.judul,
            matkul: newTask.matkul,
            deadline: newTask.deadline || '23:59',
            terkumpul: '0/32',
            status: 'Aktif',
        };

        setTugasData([created, ...tugasData]);
        setShowCreateTaskModal(false);
        setNewTask({ judul: '', matkul: 'Struktur Data - Kelas A', deadline: '' });
        showToast('Tugas baru berhasil ditambahkan!');
    };

    const handleDeleteItem = (id: number) => {
        if (activeTab === 'Tugas') setTugasData(tugasData.filter(i => i.id !== id));
        if (activeTab === 'Kuis') setKuisData(kuisData.filter(i => i.id !== id));
        if (activeTab === 'Draft') setDraftData(draftData.filter(i => i.id !== id));
        if (activeTab === 'Riwayat') setRiwayatData(riwayatData.filter(i => i.id !== id));
        showToast('Item berhasil dihapus');
    };

    const handleOptionSelect = (qId: string, optKey: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                return {
                    ...q,
                    options: q.options.map(o => ({
                        ...o,
                        isCorrect: o.key === optKey
                    }))
                };
            }
            return q;
        }));
        showToast('Kunci jawaban diperbarui');
    };

    const handleDeleteQuestion = (qId: string) => {
        setQuestions(questions.filter(q => q.id !== qId));
        showToast('Soal berhasil dihapus');
    };

    const handleAddQuestion = () => {
        const newId = `Q${questions.length + 1}`;
        const newQ: QuestionItem = {
            id: newId,
            type: 'Pilihan Ganda',
            question: 'Tulis pertanyaan baru di sini...',
            options: [
                { key: 'A', label: 'Opsi A', isCorrect: true },
                { key: 'B', label: 'Opsi B', isCorrect: false },
                { key: 'C', label: 'Opsi C', isCorrect: false },
                { key: 'D', label: 'Opsi D', isCorrect: false },
            ],
            explanation: 'Penjelasan AI untuk soal ini.'
        };
        setQuestions([...questions, newQ]);
        showToast('Soal baru berhasil ditambahkan');
    };

    const getActiveData = () => {
        let currentList = tugasData;
        if (activeTab === 'Kuis') currentList = kuisData;
        if (activeTab === 'Draft') currentList = draftData;
        if (activeTab === 'Riwayat') currentList = riwayatData;

        return currentList.filter(item => {
            const matchesSearch = item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || item.matkul.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCourse = selectedCourseFilter === 'Semua' || item.matkul.includes(selectedCourseFilter);
            return matchesSearch && matchesCourse;
        });
    };

    return (
        <>
            <Head title="Assignments & Quizzes - SALE" />

            <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex">
                
                {/* TOAST NOTIFICATION */}
                {toastMessage && (
                    <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>{toastMessage}</span>
                    </div>
                )}

                {/* SIDEBAR */}
                <LecturerSidebar />

                {/* MAIN WRAPPER */}
                <div className="flex-1 flex flex-col min-w-0 md:ml-[280px]">
                    <LecturerTopbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

                    <main className="flex-1 p-6 md:p-8 space-y-6 mt-16 max-w-7xl w-full">
                        {isAiGeneratorOpen ? (
                            /* TAMPILAN 1: AI QUIZ GENERATOR */
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setIsAiGeneratorOpen(false)}
                                                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition cursor-pointer"
                                            >
                                                <ArrowLeft className="h-5 w-5" />
                                            </button>
                                            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                                AI Quiz Generator
                                            </h1>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-8">
                                            Buat kuis interaktif dengan bantuan AI berdasarkan materi kuliah Anda.
                                        </p>
                                    </div>

                                    <Button
                                        onClick={handleAddQuestion}
                                        variant="outline"
                                        className="text-xs font-bold rounded-xl px-4 gap-1.5 cursor-pointer border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700"
                                    >
                                        <Plus className="h-4 w-4" /> Tambah Soal Manual
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                                    {/* KOLOM KIRI: FORM KONFIGURASI */}
                                    <Card className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl p-6 space-y-5">
                                        <h3 className="text-sm font-bold border-b border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white pb-3">
                                            Konfigurasi Soal
                                        </h3>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">1. Pilih Mata Kuliah</label>
                                            <select
                                                value={selectedCourse}
                                                onChange={(e) => setSelectedCourse(e.target.value)}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 dark:bg-slate-950 dark:border-slate-700 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            >
                                                <option>Struktur Data dan Algoritma</option>
                                                <option>Basis Data Enterprise</option>
                                                <option>Pemrograman Web Lanjut</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">2. Pilih Materi</label>
                                            <select
                                                value={selectedTopic}
                                                onChange={(e) => setSelectedTopic(e.target.value)}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 dark:bg-slate-950 dark:border-slate-700 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            >
                                                <option>Minggu 4: Tree & Graph</option>
                                                <option>Minggu 8: Normalisasi Database</option>
                                                <option>Minggu 11: Hashing & Hash Tables</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">3. Jumlah Soal</label>
                                            <input
                                                type="number"
                                                value={questionCount}
                                                onChange={(e) => setQuestionCount(e.target.value)}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 dark:bg-slate-950 dark:border-slate-700 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">4. Tingkat Kesulitan</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {(['Mudah', 'Sedang', 'Sulit'] as const).map((level) => (
                                                    <button
                                                        key={level}
                                                        onClick={() => setDifficulty(level)}
                                                        className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                                                            difficulty === level
                                                                ? 'bg-blue-600 text-white border-blue-600'
                                                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                                                        }`}
                                                    >
                                                        {level}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">5. Jenis Soal</label>
                                            <div className="space-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                <label className="flex items-center gap-2.5 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={questionType.pilihanGanda}
                                                        onChange={(e) => setQuestionType({ ...questionType, pilihanGanda: e.target.checked })}
                                                        className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span>Pilihan Ganda</span>
                                                </label>
                                                <label className="flex items-center gap-2.5 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={questionType.benarSalah}
                                                        onChange={(e) => setQuestionType({ ...questionType, benarSalah: e.target.checked })}
                                                        className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span>Benar/Salah</span>
                                                </label>
                                                <label className="flex items-center gap-2.5 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={questionType.isianSingkat}
                                                        onChange={(e) => setQuestionType({ ...questionType, isianSingkat: e.target.checked })}
                                                        className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <span>Isian Singkat</span>
                                                </label>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => showToast('AI Regenerasi Soal Selesai!')}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl gap-2 shadow-xs cursor-pointer"
                                        >
                                            <Sparkles className="h-4 w-4" /> Generate Soal
                                        </Button>
                                    </Card>

                                    {/* KOLOM KANAN: LIST SOAL */}
                                    <div className="lg:col-span-2 space-y-4">
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 border border-blue-100 dark:border-blue-900/50 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-600 text-white rounded-xl shrink-0">
                                                    <Sparkles className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-bold text-blue-950 dark:text-blue-400">
                                                        AI Berhasil Menghasilkan {questions.length} Soal
                                                    </h4>
                                                    <p className="text-[11px] text-blue-700 dark:text-slate-300 mt-0.5">
                                                        Soal disesuaikan dengan tingkat pemahaman dasar ({difficulty}) untuk {selectedTopic}.
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => showToast('Disalin ke Clipboard!')}
                                                className="p-2 rounded-xl border bg-white border-blue-100 text-blue-600 hover:bg-blue-50 dark:bg-slate-800 dark:border-slate-700 dark:text-blue-400 dark:hover:bg-slate-700 transition cursor-pointer"
                                                title="Salin Semua Soal"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {questions.map((q) => (
                                            <Card key={q.id} className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl p-5 space-y-4">
                                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-extrabold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md">
                                                            {q.id}
                                                        </span>
                                                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 px-2.5 py-0.5 rounded-full border">
                                                            {q.type}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-slate-400">
                                                        <button onClick={() => showToast(`Edit soal ${q.id}`)} className="hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer">
                                                            <Edit2 className="h-3.5 w-3.5" />
                                                        </button>
                                                        <button onClick={() => showToast(`Regenerasi soal ${q.id}`)} className="hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer">
                                                            <RotateCcw className="h-3.5 w-3.5" />
                                                        </button>
                                                        <button onClick={() => handleDeleteQuestion(q.id)} className="hover:text-red-500 p-1 cursor-pointer">
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <textarea
                                                    value={q.question}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setQuestions(questions.map(item => item.id === q.id ? { ...item, question: val } : item));
                                                    }}
                                                    className="w-full text-xs font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none leading-relaxed"
                                                    rows={2}
                                                />

                                                <div className="space-y-2">
                                                    {q.options.map((opt) => (
                                                        <div
                                                            key={opt.key}
                                                            onClick={() => handleOptionSelect(q.id, opt.key)}
                                                            className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition cursor-pointer ${
                                                                opt.isCorrect
                                                                    ? 'bg-blue-50/70 border-blue-400 text-blue-900 font-bold dark:bg-blue-500/10 dark:border-blue-500/40 dark:text-blue-300'
                                                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/50'
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-slate-400 font-bold">{opt.key}</span>
                                                                <span>{opt.label}</span>
                                                            </div>
                                                            {opt.isCorrect && (
                                                                <div className="h-4 w-4 bg-blue-600 text-white rounded-full flex items-center justify-center">
                                                                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="bg-slate-50 border-slate-100 text-slate-600 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 p-3.5 rounded-xl border text-[11px] space-y-1">
                                                    <div className="font-bold text-slate-800 dark:text-white flex items-center gap-1">
                                                        <span>📍 Penjelasan AI</span>
                                                    </div>
                                                    <p className="leading-relaxed">{q.explanation}</p>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* TAMPILAN 2: DAFTAR TUGAS & KUIS */
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                            Tugas & Kuis
                                        </h1>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            Kelola evaluasi dan penilaian mahasiswa secara real-time.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Button
                                            onClick={() => setIsAiGeneratorOpen(true)}
                                            variant="outline"
                                            className="text-xs font-bold rounded-xl px-4 py-2.5 shadow-xs gap-2 cursor-pointer border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700"
                                        >
                                            <Sparkles className="h-4 w-4" /> Buat Kuis dengan AI
                                        </Button>
                                        <Button
                                            onClick={() => setShowCreateTaskModal(true)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-4 py-2.5 shadow-xs gap-2 cursor-pointer"
                                        >
                                            <Plus className="h-4 w-4" /> Buat Tugas
                                        </Button>
                                    </div>
                                </div>

                                {/* SEARCH & FILTER BAR */}
                                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs p-4">
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-3">

                                        {/* SEARCH (Tanpa ikon bulat di kiri, teks placeholder aman) */}
                                        <div className="relative flex-1 min-w-0">
                                            <input
                                                type="text"
                                                placeholder="Cari tugas, kuis, atau mata kuliah..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full h-10 text-xs pl-4 pr-10 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 dark:bg-slate-950 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
                                            />

                                            {searchQuery && (
                                                <button
                                                    type="button"
                                                    onClick={() => setSearchQuery('')}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                                                    title="Hapus pencarian"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>

                                        {/* FILTER */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 whitespace-nowrap">
                                                <Filter className="h-4 w-4" />
                                                <span className="hidden sm:inline">Mata Kuliah</span>
                                            </div>

                                            <select
                                                value={selectedCourseFilter}
                                                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                                                className="h-10 min-w-[190px] text-xs font-semibold px-3 rounded-xl border border-slate-200 bg-white text-slate-800 dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition cursor-pointer"
                                            >
                                                <option value="Semua">Semua Mata Kuliah</option>
                                                <option value="Struktur Data">Struktur Data</option>
                                                <option value="Basis Data">Basis Data</option>
                                                <option value="Pemrograman Web">Pemrograman Web</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* HASIL FILTER */}
                                    {(searchQuery || selectedCourseFilter !== 'Semua') && (
                                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                                            <p className="text-[11px] text-slate-400">
                                                Menampilkan hasil untuk
                                                {searchQuery && (
                                                    <span className="font-bold text-slate-600 dark:text-slate-300">
                                                        {' '}“{searchQuery}”
                                                    </span>
                                                )}
                                                {selectedCourseFilter !== 'Semua' && (
                                                    <span className="font-bold text-slate-600 dark:text-slate-300">
                                                        {' '}• {selectedCourseFilter}
                                                    </span>
                                                )}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setSelectedCourseFilter('Semua');
                                                }}
                                                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition cursor-pointer"
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* TAB NAVIGATION */}
                                <div className="border-b border-slate-200 dark:border-slate-800 flex gap-8 text-xs font-bold">
                                    {(['Tugas', 'Kuis', 'Draft', 'Riwayat'] as const).map((tab) => {
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
                                                {tab} ({
                                                    tab === 'Tugas' ? tugasData.length :
                                                    tab === 'Kuis' ? kuisData.length :
                                                    tab === 'Draft' ? draftData.length : riwayatData.length
                                                })
                                                {isActive && (
                                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* TABEL DATA */}
                                <Card className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs">
                                                <thead className="bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-800 font-bold uppercase tracking-wider border-b text-[10px]">
                                                    <tr>
                                                        <th className="p-4 pl-6">JUDUL</th>
                                                        <th className="p-4">MATA KULIAH</th>
                                                        <th className="p-4">BATAS WAKTU</th>
                                                        <th className="p-4 text-center">PENGUMPULAN</th>
                                                        <th className="p-4 text-center">STATUS</th>
                                                        <th className="p-4 pr-6 text-right">AKSI</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-slate-800 dark:text-slate-300 font-medium">
                                                    {getActiveData().length > 0 ? (
                                                        getActiveData().map((row) => (
                                                            <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                                <td className="p-4 pl-6 font-bold text-slate-900 dark:text-white">{row.judul}</td>
                                                                <td className="p-4 text-slate-400 font-medium">{row.matkul}</td>
                                                                <td className="p-4 text-rose-500 font-semibold inline-flex items-center gap-1.5 mt-2">
                                                                    <Clock className="h-3.5 w-3.5" />
                                                                    {row.deadline}
                                                                </td>
                                                                <td className="p-4 text-center">
                                                                    <span className="bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 text-xs font-bold px-3 py-1 rounded-md border">
                                                                        {row.terkumpul}
                                                                    </span>
                                                                </td>
                                                                <td className="p-4 text-center">
                                                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                                                        row.status === 'Aktif'
                                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                                                                            : row.status === 'Draft'
                                                                            ? 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                                                                            : 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
                                                                    }`}>
                                                                        {row.status === 'Aktif' && '• '}
                                                                        {row.status}
                                                                    </span>
                                                                </td>
                                                                <td className="p-4 pr-6 text-right space-x-2">
                                                                    <button
                                                                        onClick={() => showToast(`Membuka detail ${row.judul}`)}
                                                                        className="text-slate-400 hover:text-blue-500 p-1 cursor-pointer"
                                                                        title="Lihat"
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteItem(row.id)}
                                                                        className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                                                                        title="Hapus"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">
                                                                Tidak ada data tugas atau kuis yang ditemukan.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </main>

                    {/* MODAL BUAT TUGAS BARU */}
                    {showCreateTaskModal && (
                        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                            <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl w-full max-w-md shadow-2xl p-6 space-y-5 animate-in zoom-in-95 border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                    <h3 className="text-base font-black">Buat Tugas Baru</h3>
                                    <button
                                        onClick={() => setShowCreateTaskModal(false)}
                                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <form onSubmit={handleCreateTask} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Judul Tugas</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Contoh: Analisis Rekursif Lanjut"
                                            value={newTask.judul}
                                            onChange={(e) => setNewTask({ ...newTask, judul: e.target.value })}
                                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mata Kuliah</label>
                                        <select
                                            value={newTask.matkul}
                                            onChange={(e) => setNewTask({ ...newTask, matkul: e.target.value })}
                                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        >
                                            <option>Struktur Data - Kelas A</option>
                                            <option>Struktur Data - Kelas B</option>
                                            <option>Basis Data - Kelas A</option>
                                            <option>Basis Data - Kelas C</option>
                                            <option>Pemrograman Web - Kelas A</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Batas Waktu (Deadline)</label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: 30 Nov, 23:59"
                                            value={newTask.deadline}
                                            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 dark:bg-slate-950 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>

                                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setShowCreateTaskModal(false)}
                                            className="text-xs font-bold rounded-xl cursor-pointer border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-5 cursor-pointer shadow-xs"
                                        >
                                            Simpan Tugas
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

AssignmentsDosen.layout = (page: React.ReactNode) => page;