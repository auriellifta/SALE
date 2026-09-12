import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    SlidersHorizontal,
    Eye,
    Edit3,
    Download,
    ChevronRight,
    Save,
    X,
    CheckCircle2,
    ArrowLeft,
    Users,
    TrendingUp,
    Award,
    AlertTriangle,
    FileText,
    BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LecturerSidebar from '@/components/sale/LecturerSidebar';
import LecturerTopbar from '@/components/sale/LecturerTopbar';

interface StudentGrade {
    no: number;
    nim: string;
    nama: string;
    tugas: number;
    kuis: number;
    uts: number;
    uas: number | null;
    proyek: number;
    catatan?: string;
}

export default function GradebookDosen() {
    const [viewMode, setViewMode] = useState<'main' | 'input'>('main');

    const [selectedCourse, setSelectedCourse] = useState(
        'CS101 - Algoritma & Pemrograman'
    );

    const [selectedClass, setSelectedClass] = useState(
        'Kelas A (Reguler)'
    );

    const [statusFilter, setStatusFilter] = useState<
        'semua' | 'belum' | 'remedial'
    >('semua');

    const [selectedComponent, setSelectedComponent] =
        useState('Tugas 1 (20%)');

    const [toastMessage, setToastMessage] =
        useState<string | null>(null);

    const [bulkValue, setBulkValue] = useState('');

    const [showWeightModal, setShowWeightModal] =
        useState(false);

    const [weights, setWeights] = useState({
        tugas: 20,
        kuis: 15,
        uts: 25,
        uas: 30,
        proyek: 10
    });

    const [students, setStudents] = useState<StudentGrade[]>([
        {
            no: 1,
            nim: '10123001',
            nama: 'Budi Santoso',
            tugas: 85,
            kuis: 90,
            uts: 78.5,
            uas: 82,
            proyek: 88,
            catatan: 'Sangat baik dalam pemahaman logika'
        },
        {
            no: 2,
            nim: '10123002',
            nama: 'Siti Aminah',
            tugas: 92,
            kuis: 88,
            uts: 95,
            uas: 90,
            proyek: 95,
            catatan: 'Konsisten di setiap kuis'
        },
        {
            no: 3,
            nim: '10123003',
            nama: 'Ahmad Wijaya',
            tugas: 70,
            kuis: 65,
            uts: 75,
            uas: 68,
            proyek: 72,
            catatan: ''
        },
        {
            no: 4,
            nim: '10123004',
            nama: 'Dewi Lestari',
            tugas: 60,
            kuis: 55,
            uts: 45,
            uas: 65,
            proyek: 70,
            catatan: 'Memerlukan perbaikan di UTS'
        },
        {
            no: 5,
            nim: '10123005',
            nama: 'Kevin Pratama',
            tugas: 80,
            kuis: 85,
            uts: 82,
            uas: null,
            proyek: 85,
            catatan: 'UAS susulan belum dilaksanakan'
        },
        {
            no: 6,
            nim: '10123006',
            nama: 'Rina Kurniawati',
            tugas: 88,
            kuis: 90,
            uts: 86,
            uas: 89,
            proyek: 92,
            catatan: ''
        },
        {
            no: 7,
            nim: '10123007',
            nama: 'Fajar Nugraha',
            tugas: 55,
            kuis: 50,
            uts: 40,
            uas: 58,
            proyek: 60,
            catatan: 'Disarankan mengikuti remedial'
        },
        {
            no: 8,
            nim: '10123008',
            nama: 'Nadia Putri',
            tugas: 95,
            kuis: 94,
            uts: 92,
            uas: 96,
            proyek: 98,
            catatan: 'Performa luar biasa'
        },
        {
            no: 9,
            nim: '10123009',
            nama: 'Rizky Ramadhan',
            tugas: 75,
            kuis: 70,
            uts: 72,
            uas: 74,
            proyek: 78,
            catatan: ''
        },
        {
            no: 10,
            nim: '10123010',
            nama: 'Indah Permata',
            tugas: 82,
            kuis: 80,
            uts: 84,
            uas: null,
            proyek: 80,
            catatan: ''
        },
        {
            no: 11,
            nim: '10123011',
            nama: 'Dimas Anggara',
            tugas: 78,
            kuis: 75,
            uts: 80,
            uas: 81,
            proyek: 79,
            catatan: ''
        },
        {
            no: 12,
            nim: '10123012',
            nama: 'Anisa Rahma',
            tugas: 90,
            kuis: 92,
            uts: 88,
            uas: 91,
            proyek: 94,
            catatan: 'Aktif dalam pengerjaan proyek'
        }
    ]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    const calculateFinal = (student: StudentGrade) => {
        if (student.uas === null) {
            return {
                finalScore: null,
                grade: 'Pending',
                badgeClass:
                    'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
            };
        }

        const score =
            (student.tugas * weights.tugas +
                student.kuis * weights.kuis +
                student.uts * weights.uts +
                student.uas * weights.uas +
                student.proyek * weights.proyek) /
            100;

        const rounded = score.toFixed(1);

        if (score >= 85) {
            return {
                finalScore: rounded,
                grade: `A (${rounded})`,
                badgeClass:
                    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
            };
        }

        if (score >= 70) {
            return {
                finalScore: rounded,
                grade: `B (${rounded})`,
                badgeClass:
                    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30'
            };
        }

        if (score >= 55) {
            return {
                finalScore: rounded,
                grade: `C (${rounded})`,
                badgeClass:
                    'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30'
            };
        }

        return {
            finalScore: rounded,
            grade: `D (${rounded})`,
            badgeClass:
                'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30'
        };
    };

    const filteredStudents = students.filter((student) => {
        const { grade } = calculateFinal(student);

        if (statusFilter === 'belum') {
            return student.uas === null;
        }

        if (statusFilter === 'remedial') {
            return grade.startsWith('C') || grade.startsWith('D');
        }

        return true;
    });

    const completedStudents = students.filter((s) => s.uas !== null);

    const averageScore =
        completedStudents.length > 0
            ? completedStudents.reduce(
                (acc, s) =>
                    acc + Number(calculateFinal(s).finalScore),
                0
            ) / completedStudents.length
            : 0;

    const highestScore =
        completedStudents.length > 0
            ? Math.max(
                ...completedStudents.map((s) =>
                    Number(calculateFinal(s).finalScore)
                )
            )
            : 0;

    const incompleteCount = students.filter(
        (s) => s.uas === null
    ).length;

    const remedialCount = students.filter((s) => {
        const { grade } = calculateFinal(s);
        return (
            grade.startsWith('C') ||
            grade.startsWith('D')
        );
    }).length;

    const gradeDistribution = {
        A: students.filter((s) =>
            calculateFinal(s).grade.startsWith('A')
        ).length,
        B: students.filter((s) =>
            calculateFinal(s).grade.startsWith('B')
        ).length,
        C: students.filter((s) =>
            calculateFinal(s).grade.startsWith('C')
        ).length,
        D: students.filter((s) =>
            calculateFinal(s).grade.startsWith('D')
        ).length
    };

    const handleApplyBulk = () => {
        const val = parseFloat(bulkValue);

        if (isNaN(val) || val < 0 || val > 100) {
            showToast('Masukkan nilai valid antara 0 - 100');
            return;
        }

        setStudents(
            students.map((s) => ({
                ...s,
                tugas: val
            }))
        );

        showToast(
            `Nilai ${val} diterapkan ke semua mahasiswa!`
        );
    };

    const handleGradeChange = (
        nim: string,
        field: keyof StudentGrade,
        value: string
    ) => {
        const numVal =
            value === '' ? 0 : parseFloat(value);

        setStudents(
            students.map((s) =>
                s.nim === nim
                    ? {
                        ...s,
                        [field]: numVal
                    }
                    : s
            )
        );
    };

    return (
        <>
            <Head title="Gradebook - SALE" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex">

                {/* TOAST */}
                {toastMessage && (
                    <div className="fixed top-5 right-5 z-[60] bg-white text-slate-800 dark:bg-slate-900 dark:text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-200 dark:border-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                        <span>{toastMessage}</span>
                    </div>
                )}

                {/* SIDEBAR */}
                <LecturerSidebar />

                {/* MAIN */}
                <div className="flex-1 flex flex-col min-w-0 md:ml-[280px]">

                    {/* TOPBAR */}
                    <LecturerTopbar />

                    <main className="flex-1 p-5 sm:p-6 md:p-8 space-y-6 mt-16 max-w-7xl w-full mx-auto">

                        {/* BREADCRUMB */}
                        {viewMode === 'input' && (
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                                <button
                                    onClick={() => setViewMode('main')}
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1 cursor-pointer"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    Gradebook
                                </button>

                                <ChevronRight className="h-3.5 w-3.5" />

                                <span className="text-blue-600 dark:text-blue-400">
                                    Input Nilai
                                </span>
                            </div>
                        )}

                        {/* PAGE HEADER */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {viewMode === 'main'
                                        ? 'Gradebook Mahasiswa'
                                        : 'Form Input & Edit Nilai'}
                                </h1>

                                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
                                    {viewMode === 'main'
                                        ? 'Kelola, pantau, dan analisis rekapitulasi nilai akademik mahasiswa dalam satu halaman.'
                                        : 'Masukkan dan perbarui komponen nilai mahasiswa secara terstruktur.'}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5">
                                {viewMode === 'main' ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                showToast(
                                                    'Rubrik penilaian diunduh'
                                                )
                                            }
                                            className="text-xs font-bold bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white rounded-xl px-4 gap-2 shadow-xs cursor-pointer"
                                        >
                                            <Eye className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                                            Rubrik Penilaian
                                        </Button>

                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setViewMode('input')
                                            }
                                            className="text-xs font-bold bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white rounded-xl px-4 gap-2 shadow-xs cursor-pointer"
                                        >
                                            <Edit3 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                                            Edit Nilai
                                        </Button>

                                        <Button
                                            onClick={() =>
                                                setViewMode('input')
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-xs font-bold rounded-xl px-4 py-2.5 shadow-xs gap-2 cursor-pointer"
                                        >
                                            <SlidersHorizontal className="h-4 w-4" />
                                            Input Nilai
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setViewMode('main')
                                        }
                                        className="text-xs font-bold bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white rounded-xl px-4 gap-2 cursor-pointer"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Kembali ke Summary
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* ================= MAIN ================= */}
                        {viewMode === 'main' && (
                            <>
                                {/* STATS */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                                    {/* TOTAL */}
                                    <Card className="bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl shadow-xs">
                                        <CardContent className="p-5">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                        Total Mahasiswa
                                                    </p>

                                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                                                        {students.length}
                                                    </h3>

                                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                                                        Terdaftar di kelas
                                                    </p>
                                                </div>

                                                <div className="h-10 w-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center">
                                                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* AVERAGE */}
                                    <Card className="bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl shadow-xs">
                                        <CardContent className="p-5">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                        Rata-rata Kelas
                                                    </p>

                                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                                                        {averageScore.toFixed(1)}
                                                    </h3>

                                                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                                                        Performa akademik
                                                    </p>
                                                </div>

                                                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center">
                                                    <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* HIGHEST */}
                                    <Card className="bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl shadow-xs">
                                        <CardContent className="p-5">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                        Nilai Tertinggi
                                                    </p>

                                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                                                        {highestScore.toFixed(1)}
                                                    </h3>

                                                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
                                                        Prestasi terbaik
                                                    </p>
                                                </div>

                                                <div className="h-10 w-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 flex items-center justify-center">
                                                    <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* REMEDIAL */}
                                    <Card className="bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl shadow-xs">
                                        <CardContent className="p-5">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                                        Perlu Perbaikan
                                                    </p>

                                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                                                        {remedialCount}
                                                    </h3>

                                                    <p className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold mt-1">
                                                        Perlu perhatian
                                                    </p>
                                                </div>

                                                <div className="h-10 w-10 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 flex items-center justify-center">
                                                    <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* FILTERS */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                    {/* CONTEXT */}
                                    <Card className="bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-xs rounded-2xl p-6 flex flex-col justify-between space-y-5">
                                        <div className="space-y-4">

                                            <div className="flex items-center gap-2 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 font-extrabold text-xs border-b pb-3">
                                                <SlidersHorizontal className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                <span>
                                                    Pilih Konteks Akademik
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                        Mata Kuliah
                                                    </label>

                                                    <select
                                                        value={selectedCourse}
                                                        onChange={(e) =>
                                                            setSelectedCourse(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:[color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
                                                    >
                                                        <option>
                                                            CS101 - Algoritma & Pemrograman
                                                        </option>
                                                        <option>
                                                            IF204 - Basis Data Enterprise
                                                        </option>
                                                        <option>
                                                            SE302 - Rekayasa Perangkat Lunak
                                                        </option>
                                                    </select>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                        Kelas
                                                    </label>

                                                    <select
                                                        value={selectedClass}
                                                        onChange={(e) =>
                                                            setSelectedClass(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:[color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
                                                    >
                                                        <option>
                                                            Kelas A (Reguler)
                                                        </option>
                                                        <option>
                                                            Kelas B (Reguler)
                                                        </option>
                                                        <option>
                                                            Kelas C (Karyawan)
                                                        </option>
                                                    </select>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-2">

                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                Status Penilaian
                                            </label>

                                            <div className="flex flex-wrap items-center gap-2">

                                                <button
                                                    onClick={() =>
                                                        setStatusFilter('semua')
                                                    }
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                                        statusFilter === 'semua'
                                                            ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-xs'
                                                            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                                                    }`}
                                                >
                                                    Semua ({students.length})
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        setStatusFilter('belum')
                                                    }
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                                        statusFilter === 'belum'
                                                            ? 'bg-amber-500 text-white shadow-xs'
                                                            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                                                    }`}
                                                >
                                                    Belum Lengkap ({incompleteCount})
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        setStatusFilter('remedial')
                                                    }
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                                        statusFilter === 'remedial'
                                                            ? 'bg-rose-500 text-white shadow-xs'
                                                            : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                                                    }`}
                                                >
                                                    Perlu Perbaikan ({remedialCount})
                                                </button>

                                            </div>
                                        </div>
                                    </Card>

                                    {/* WEIGHTS */}
                                    <Card className="bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-xs rounded-2xl p-6 flex flex-col justify-between space-y-5">

                                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">

                                            <div className="flex items-center gap-2 font-extrabold text-xs text-slate-900 dark:text-white">
                                                <div className="p-1.5 rounded-lg bg-blue-500/10 dark:bg-blue-500/15">
                                                    <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                </div>

                                                <span>
                                                    Distribusi Bobot Nilai
                                                </span>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    setShowWeightModal(true)
                                                }
                                                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                                            >
                                                Konfigurasi Bobot
                                            </button>
                                        </div>

                                        <div className="space-y-4">

                                            <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full flex overflow-hidden shadow-inner">
                                                <div
                                                    style={{
                                                        width: `${weights.tugas}%`
                                                    }}
                                                    className="bg-blue-500 h-full"
                                                />
                                                <div
                                                    style={{
                                                        width: `${weights.kuis}%`
                                                    }}
                                                    className="bg-indigo-500 h-full"
                                                />
                                                <div
                                                    style={{
                                                        width: `${weights.uts}%`
                                                    }}
                                                    className="bg-purple-500 h-full"
                                                />
                                                <div
                                                    style={{
                                                        width: `${weights.uas}%`
                                                    }}
                                                    className="bg-rose-500 h-full"
                                                />
                                                <div
                                                    style={{
                                                        width: `${weights.proyek}%`
                                                    }}
                                                    className="bg-amber-500 h-full"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-[10px] font-bold text-slate-500 dark:text-slate-400">

                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                                    Tugas ({weights.tugas}%)
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                                                    Kuis ({weights.kuis}%)
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                                                    UTS ({weights.uts}%)
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                                    UAS ({weights.uas}%)
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                                    Proyek ({weights.proyek}%)
                                                </div>

                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* DISTRIBUTION */}
                                <Card className="bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl shadow-xs">
                                    <CardContent className="p-6">

                                        <div className="flex items-center justify-between mb-5">
                                            <div>
                                                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                                    Distribusi Grade Mahasiswa
                                                </h3>

                                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                                                    Persebaran nilai akhir kelas
                                                </p>
                                            </div>

                                            <FileText className="h-5 w-5 text-slate-400" />
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                            {[
                                                {
                                                    label: 'Grade A',
                                                    value: gradeDistribution.A,
                                                    style: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
                                                },
                                                {
                                                    label: 'Grade B',
                                                    value: gradeDistribution.B,
                                                    style: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30'
                                                },
                                                {
                                                    label: 'Grade C',
                                                    value: gradeDistribution.C,
                                                    style: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30'
                                                },
                                                {
                                                    label: 'Grade D',
                                                    value: gradeDistribution.D,
                                                    style: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30'
                                                }
                                            ].map((item) => (
                                                <div
                                                    key={item.label}
                                                    className={`rounded-xl border p-4 ${item.style}`}
                                                >
                                                    <p className="text-[10px] font-bold uppercase tracking-wide">
                                                        {item.label}
                                                    </p>

                                                    <div className="flex items-end justify-between mt-2">
                                                        <span className="text-2xl font-black">
                                                            {item.value}
                                                        </span>

                                                        <span className="text-[10px] font-bold">
                                                            mahasiswa
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </CardContent>
                                </Card>

                                {/* TABLE */}
                                <Card className="bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-xs rounded-2xl overflow-hidden">

                                    <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">

                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                                Rekapitulasi Nilai Kelas A
                                            </h3>

                                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                                                Pantau perkembangan nilai seluruh mahasiswa
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">

                                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                                {filteredStudents.length} Mahasiswa
                                            </span>

                                            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

                                            <button
                                                onClick={() =>
                                                    showToast(
                                                        'Ekspor Rekap Nilai ke Excel Berhasil!'
                                                    )
                                                }
                                                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 p-1.5 rounded-lg hover:bg-blue-500/10 dark:hover:bg-blue-500/15 cursor-pointer transition"
                                                title="Ekspor Excel"
                                            >
                                                <Download className="h-4 w-4" />
                                            </button>

                                        </div>
                                    </div>

                                    <CardContent className="p-0">

                                        <div className="overflow-x-auto">

                                            <table className="w-full text-left text-xs">

                                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 dark:bg-slate-950/60 dark:text-slate-400 dark:border-slate-800 font-bold uppercase tracking-wider text-[10px]">

                                                    <tr>
                                                        <th className="p-4 pl-6 w-12">No</th>
                                                        <th className="p-4">Nama Mahasiswa</th>
                                                        <th className="p-4 text-center">Tugas ({weights.tugas}%)</th>
                                                        <th className="p-4 text-center">Kuis ({weights.kuis}%)</th>
                                                        <th className="p-4 text-center">UTS ({weights.uts}%)</th>
                                                        <th className="p-4 text-center">UAS ({weights.uas}%)</th>
                                                        <th className="p-4 text-center">Proyek ({weights.proyek}%)</th>
                                                        <th className="p-4 pr-6 text-center">Nilai Akhir</th>
                                                    </tr>

                                                </thead>

                                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">

                                                    {filteredStudents.map((s) => {

                                                        const {
                                                            grade,
                                                            badgeClass
                                                        } = calculateFinal(s);

                                                        return (
                                                            <tr
                                                                key={s.nim}
                                                                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition"
                                                            >

                                                                <td className="p-4 pl-6 text-slate-500 dark:text-slate-400 font-bold">
                                                                    {s.no}
                                                                </td>

                                                                <td className="p-4">
                                                                    <div className="font-bold text-slate-900 dark:text-white">
                                                                        {s.nama}
                                                                    </div>

                                                                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                                                                        NIM: {s.nim}
                                                                    </div>
                                                                </td>

                                                                <td className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">
                                                                    {s.tugas.toFixed(1)}
                                                                </td>

                                                                <td className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">
                                                                    {s.kuis.toFixed(1)}
                                                                </td>

                                                                <td className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">
                                                                    {s.uts.toFixed(1)}
                                                                </td>

                                                                <td className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">
                                                                    {s.uas !== null ? (
                                                                        s.uas.toFixed(1)
                                                                    ) : (
                                                                        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30 font-bold">
                                                                            Belum Ada
                                                                        </span>
                                                                    )}
                                                                </td>

                                                                <td className="p-4 text-center font-bold text-slate-700 dark:text-slate-300">
                                                                    {s.proyek.toFixed(1)}
                                                                </td>

                                                                <td className="p-4 pr-6 text-center">
                                                                    <span
                                                                        className={`text-[11px] font-black px-3 py-1 rounded-xl border inline-block min-w-[70px] ${badgeClass}`}
                                                                    >
                                                                        {grade}
                                                                    </span>
                                                                </td>

                                                            </tr>
                                                        );
                                                    })}

                                                </tbody>
                                            </table>

                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {/* ================= INPUT ================= */}
                        {viewMode === 'input' && (
                            <>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                                    {/* PARAMETER */}
                                    <Card className="bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-xs rounded-2xl p-6 space-y-4">

                                        <div className="flex items-center gap-2 font-extrabold text-xs border-b border-slate-200 dark:border-slate-800 pb-3 text-slate-900 dark:text-white">

                                            <SlidersHorizontal className="h-4 w-4 text-blue-600 dark:text-blue-400" />

                                            <span>
                                                Parameter Penilaian Input
                                            </span>

                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                    Mata Kuliah
                                                </label>

                                                <select
                                                    value={selectedCourse}
                                                    onChange={(e) =>
                                                        setSelectedCourse(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:[color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
                                                >
                                                    <option>
                                                        CS101 - Algoritma & Pemrograman
                                                    </option>
                                                    <option>
                                                        IF204 - Basis Data Enterprise
                                                    </option>
                                                </select>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                    Komponen Penilaian
                                                </label>

                                                <select
                                                    value={selectedComponent}
                                                    onChange={(e) =>
                                                        setSelectedComponent(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:[color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
                                                >
                                                    <option>
                                                        Tugas 1 (20%)
                                                    </option>
                                                    <option>
                                                        Kuis 1 (15%)
                                                    </option>
                                                    <option>
                                                        Ujian Tengah Semester (25%)
                                                    </option>
                                                    <option>
                                                        Ujian Akhir Semester (30%)
                                                    </option>
                                                </select>
                                            </div>

                                        </div>

                                        <div className="space-y-1.5">

                                            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                Kelas
                                            </label>

                                            <select
                                                value={selectedClass}
                                                onChange={(e) =>
                                                    setSelectedClass(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:[color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
                                            >
                                                <option>
                                                    Kelas A (Reguler)
                                                </option>
                                                <option>
                                                    Kelas B (Reguler)
                                                </option>
                                            </select>

                                        </div>
                                    </Card>

                                    {/* BULK */}
                                    <Card className="bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-xs rounded-2xl p-6 space-y-4">

                                        <div className="flex items-center gap-2 font-extrabold text-xs border-b border-slate-200 dark:border-slate-800 pb-3 text-slate-900 dark:text-white">
                                            <span>⚡ Aksi Massal (Bulk Action)</span>
                                        </div>

                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                            Masukkan nilai serentak untuk seluruh mahasiswa pada komponen{' '}
                                            <span className="font-bold text-slate-900 dark:text-white">
                                                {selectedComponent}
                                            </span>.
                                        </p>

                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">

                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                placeholder="Nilai (0 - 100)"
                                                value={bulkValue}
                                                onChange={(e) =>
                                                    setBulkValue(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                            />

                                            <Button
                                                onClick={handleApplyBulk}
                                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-xs font-bold rounded-xl px-5 py-2.5 shadow-xs shrink-0 cursor-pointer"
                                            >
                                                Terapkan Semua
                                            </Button>

                                        </div>
                                    </Card>
                                </div>

                                {/* EDIT TABLE */}
                                <Card className="bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-xs rounded-2xl overflow-hidden">

                                    <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">

                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 dark:text-white">
                                                Input Nilai Langsung
                                            </h3>

                                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                                                Edit nilai dan berikan feedback kepada mahasiswa
                                            </p>
                                        </div>

                                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                            {students.length} Mahasiswa
                                        </span>

                                    </div>

                                    <CardContent className="p-0">

                                        <div className="overflow-x-auto">

                                            <table className="w-full text-left text-xs">

                                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 dark:bg-slate-950/60 dark:text-slate-400 dark:border-slate-800 font-bold uppercase tracking-wider text-[10px]">

                                                    <tr>
                                                        <th className="p-4 pl-6 w-12">No</th>
                                                        <th className="p-4 w-64">Nama Mahasiswa</th>
                                                        <th className="p-4 w-36">NIM</th>
                                                        <th className="p-4 w-44 text-center">
                                                            Nilai ({selectedComponent})
                                                        </th>
                                                        <th className="p-4 pr-6">
                                                            Catatan / Feedback Dosen
                                                        </th>
                                                    </tr>

                                                </thead>

                                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">

                                                    {students.map((s) => (
                                                        <tr
                                                            key={s.nim}
                                                            className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition"
                                                        >

                                                            <td className="p-4 pl-6 text-slate-500 dark:text-slate-400 font-bold">
                                                                {s.no}
                                                            </td>

                                                            <td className="p-4 font-bold text-slate-900 dark:text-white">
                                                                {s.nama}
                                                            </td>

                                                            <td className="p-4 text-slate-500 dark:text-slate-400 font-semibold">
                                                                {s.nim}
                                                            </td>

                                                            <td className="p-4 text-center">

                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    max="100"
                                                                    value={s.tugas}
                                                                    onChange={(e) =>
                                                                        handleGradeChange(
                                                                            s.nim,
                                                                            'tugas',
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="w-24 text-center text-xs font-bold py-2 rounded-xl border border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                                                />

                                                            </td>

                                                            <td className="p-4 pr-6">

                                                                <input
                                                                    type="text"
                                                                    placeholder="Tambahkan catatan evaluasi..."
                                                                    value={
                                                                        s.catatan ||
                                                                        ''
                                                                    }
                                                                    onChange={(e) => {
                                                                        const val =
                                                                            e.target.value;

                                                                        setStudents(
                                                                            students.map(
                                                                                (item) =>
                                                                                    item.nim ===
                                                                                        s.nim
                                                                                        ? {
                                                                                            ...item,
                                                                                            catatan:
                                                                                                val
                                                                                        }
                                                                                        : item
                                                                            )
                                                                        );
                                                                    }}
                                                                    className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                                                />

                                                            </td>

                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>

                                        </div>
                                    </CardContent>
                                </Card>

                                {/* BOTTOM ACTIONS */}
                                <div className="flex items-center justify-end gap-3 pt-2">

                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setViewMode('main')
                                        }
                                        className="text-xs font-bold bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white rounded-xl px-5 py-2.5 cursor-pointer"
                                    >
                                        Batalkan
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            setViewMode('main');
                                            showToast(
                                                'Semua perubahan nilai berhasil disimpan!'
                                            );
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-xs font-bold rounded-xl px-6 py-2.5 shadow-xs gap-2 cursor-pointer"
                                    >
                                        <Save className="h-4 w-4" />
                                        Simpan Perubahan Nilai
                                    </Button>

                                </div>
                            </>
                        )}
                    </main>

                    {/* MODAL */}
                    {showWeightModal && (
                        <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">

                            <div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-5 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">

                                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">

                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                        Konfigurasi Bobot Penilaian
                                    </h3>

                                    <button
                                        onClick={() =>
                                            setShowWeightModal(false)
                                        }
                                        className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>

                                </div>

                                <div className="space-y-3 text-xs">

                                    {Object.entries(weights).map(
                                        ([key, val]) => (
                                            <div
                                                key={key}
                                                className="flex items-center justify-between gap-4"
                                            >

                                                <label className="font-bold text-slate-700 dark:text-slate-300 capitalize">
                                                    {key} (%)
                                                </label>

                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={val}
                                                    onChange={(e) =>
                                                        setWeights({
                                                            ...weights,
                                                            [key]:
                                                                parseFloat(
                                                                    e.target.value
                                                                ) || 0
                                                        })
                                                    }
                                                    className="w-24 text-center font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                                />

                                            </div>
                                        )
                                    )}

                                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between font-extrabold">

                                        <span className="text-slate-900 dark:text-white">
                                            Total Bobot:
                                        </span>

                                        <span
                                            className={
                                                Object.values(
                                                    weights
                                                ).reduce(
                                                    (a, b) => a + b,
                                                    0
                                                ) === 100
                                                    ? 'text-emerald-600 dark:text-emerald-400'
                                                    : 'text-rose-600 dark:text-rose-400'
                                            }
                                        >
                                            {Object.values(weights).reduce(
                                                (a, b) => a + b,
                                                0
                                            )}
                                            %
                                        </span>

                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">

                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setShowWeightModal(false)
                                        }
                                        className="text-xs font-bold bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 rounded-xl cursor-pointer"
                                    >
                                        Batal
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            setShowWeightModal(false);
                                            showToast(
                                                'Konfigurasi bobot diperbarui!'
                                            );
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-xs font-bold rounded-xl px-5 cursor-pointer"
                                    >
                                        Simpan Bobot
                                    </Button>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

GradebookDosen.layout = (page: React.ReactNode) => page;