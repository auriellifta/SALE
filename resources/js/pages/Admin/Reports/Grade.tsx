import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { FileSpreadsheet, CheckCircle2, Filter, Search, Award, TrendingUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface GradeReportItem {
    id: number;
    code: string;
    courseName: string;
    studyProgram: string;
    enrolledCount: number;
    avgScore: number;
    letterA: number;
    letterBC: number;
}

export default function GradeReport() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [selectedProgram, setSelectedProgram] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');

    const [grades, setGrades] = useState<GradeReportItem[]>([
        { id: 1, code: 'IF101', courseName: 'Pemrograman Web', studyProgram: 'S1 Teknik Informatika', enrolledCount: 70, avgScore: 82.5, letterA: 35, letterBC: 35 },
        { id: 2, code: 'IF102', courseName: 'Basis Data Lanjut', studyProgram: 'S1 Teknik Informatika', enrolledCount: 65, avgScore: 78.0, letterA: 25, letterBC: 40 },
        { id: 3, code: 'SI201', courseName: 'Analisis Perancangan Sistem', studyProgram: 'S1 Sistem Informasi', enrolledCount: 55, avgScore: 80.2, letterA: 28, letterBC: 27 },
        { id: 4, code: 'TE301', courseName: 'Jaringan Komputer', studyProgram: 'S1 Teknik Elektro', enrolledCount: 50, avgScore: 76.5, letterA: 18, letterBC: 32 },
    ]);

    const handleExport = () => {
        showToast('Laporan nilai berhasil di-export ke format Excel (.xlsx)!');
    };

    const filteredGrades = grades.filter(grade => {
        const matchesSearch = grade.courseName.toLowerCase().includes(searchQuery.toLowerCase()) || grade.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesProgram = selectedProgram === 'Semua' || grade.studyProgram === selectedProgram;
        return matchesSearch && matchesProgram;
    });

    const overallAvg = grades.reduce((sum, g) => sum + g.avgScore, 0) / grades.length;
    const totalEnrolled = grades.reduce((sum, g) => sum + g.enrolledCount, 0);

    return (
        <AdminLayout>
            <Head title="Grade Report - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Grade Report</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Laporan rekapitulasi nilai rata-rata dan distribusi pencapaian akademik per mata kuliah.
                        </p>
                    </div>
                    <Button
                        onClick={handleExport}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl gap-2 cursor-pointer shadow-sm"
                    >
                        <FileSpreadsheet className="h-4 w-4" /> Export Laporan Nilai Excel
                    </Button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Rata-rata Nilai Sistem</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{overallAvg.toFixed(1)} / 100</h3>
                        </div>
                        <Award className="h-6 w-6 text-blue-700 dark:text-blue-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Total Penilaian Masuk</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalEnrolled} Mhs</h3>
                        </div>
                        <TrendingUp className="h-6 w-6 text-emerald-700 dark:text-emerald-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Mata Kuliah Dievaluasi</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{grades.length} MK</h3>
                        </div>
                        <BookOpen className="h-6 w-6 text-indigo-700 dark:text-indigo-400 opacity-80" />
                    </div>
                </div>

                {/* SEARCH & FILTER BAR */}
                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari nama atau kode mata kuliah..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Filter className="h-4 w-4 text-slate-500" />
                            <select
                                value={selectedProgram}
                                onChange={(e) => setSelectedProgram(e.target.value)}
                                className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer w-full sm:w-auto"
                            >
                                <option value="Semua">Semua Program Studi</option>
                                <option value="S1 Teknik Informatika">S1 Teknik Informatika</option>
                                <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                                <option value="S1 Teknik Elektro">S1 Teknik Elektro</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* TABLE */}
                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        <th className="p-4 pl-6">Kode MK</th>
                                        <th className="p-4">Nama Mata Kuliah</th>
                                        <th className="p-4">Program Studi</th>
                                        <th className="p-4">Peserta</th>
                                        <th className="p-4">Nilai A (≥ 80)</th>
                                        <th className="p-4">Nilai B/C</th>
                                        <th className="p-4 pr-6 text-right">Rata-rata Nilai</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {filteredGrades.length > 0 ? (
                                        filteredGrades.map((grade) => (
                                            <tr key={grade.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                <td className="p-4 pl-6 font-bold text-blue-600 dark:text-blue-400">{grade.code}</td>
                                                <td className="p-4 font-bold text-slate-900 dark:text-white">{grade.courseName}</td>
                                                <td className="p-4 text-slate-500 dark:text-slate-400">{grade.studyProgram}</td>
                                                <td className="p-4 text-slate-700 dark:text-slate-300">{grade.enrolledCount} Mhs</td>
                                                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-semibold">{grade.letterA} Mhs</td>
                                                <td className="p-4 text-slate-600 dark:text-slate-300">{grade.letterBC} Mhs</td>
                                                <td className="p-4 pr-6 text-right font-bold text-blue-600 dark:text-blue-400">{grade.avgScore.toFixed(1)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-slate-500 font-medium">
                                                Tidak ada data laporan nilai yang ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}