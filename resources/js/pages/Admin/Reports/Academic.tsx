import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { BarChart3, FileSpreadsheet, Download, CheckCircle2, Filter, Search, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface AcademicReportItem {
    id: number;
    studyProgram: string;
    totalStudents: number;
    activeStudents: number;
    graduatedCount: number;
    avgGpa: number;
}

export default function AcademicReport() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [selectedYear, setSelectedYear] = useState('2026/2027');
    const [searchQuery, setSearchQuery] = useState('');

    const [reports, setReports] = useState<AcademicReportItem[]>([
        { id: 1, studyProgram: 'S1 Teknik Informatika', totalStudents: 450, activeStudents: 420, graduatedCount: 30, avgGpa: 3.45 },
        { id: 2, studyProgram: 'S1 Sistem Informasi', totalStudents: 380, activeStudents: 360, graduatedCount: 20, avgGpa: 3.38 },
        { id: 3, studyProgram: 'S1 Teknik Elektro', totalStudents: 310, activeStudents: 290, graduatedCount: 20, avgGpa: 3.25 },
        { id: 4, studyProgram: 'S1 Teknik Sipil', totalStudents: 310, activeStudents: 295, graduatedCount: 15, avgGpa: 3.30 },
    ]);

    const handleExport = () => {
        showToast('Laporan akademik berhasil di-export ke format Excel (.xlsx)!');
    };

    const filteredReports = reports.filter(r => 
        r.studyProgram.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalAllStudents = reports.reduce((sum, r) => sum + r.totalStudents, 0);
    const totalActiveStudents = reports.reduce((sum, r) => sum + r.activeStudents, 0);
    const totalGraduated = reports.reduce((sum, r) => sum + r.graduatedCount, 0);

    return (
        <AdminLayout>
            <Head title="Academic Report - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Academic Report</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Laporan rekapitulasi data akademik, jumlah mahasiswa aktif, dan rata-rata IPK per program studi.
                        </p>
                    </div>
                    <Button
                        onClick={handleExport}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl gap-2 cursor-pointer shadow-sm"
                    >
                        <FileSpreadsheet className="h-4 w-4" /> Export Laporan Excel
                    </Button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Mahasiswa Terdaftar</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalAllStudents.toLocaleString('id-ID')}</h3>
                        </div>
                        <GraduationCap className="h-6 w-6 text-blue-700 dark:text-blue-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Mahasiswa Aktif</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalActiveStudents.toLocaleString('id-ID')}</h3>
                        </div>
                        <BarChart3 className="h-6 w-6 text-emerald-700 dark:text-emerald-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Total Kelulusan Periode Ini</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalGraduated} Mhs</h3>
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
                                placeholder="Cari nama program studi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Filter className="h-4 w-4 text-slate-500" />
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer w-full sm:w-auto"
                            >
                                <option value="2026/2027">Tahun Akademik 2026/2027</option>
                                <option value="2025/2026">Tahun Akademik 2025/2026</option>
                                <option value="2024/2025">Tahun Akademik 2024/2025</option>
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
                                        <th className="p-4 pl-6">Program Studi</th>
                                        <th className="p-4">Total Mahasiswa</th>
                                        <th className="p-4">Mahasiswa Aktif</th>
                                        <th className="p-4">Kelulusan</th>
                                        <th className="p-4 pr-6 text-right">Rata-rata IPK</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {filteredReports.length > 0 ? (
                                        filteredReports.map((report) => (
                                            <tr key={report.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                <td className="p-4 pl-6 font-bold text-slate-900 dark:text-white">{report.studyProgram}</td>
                                                <td className="p-4 text-slate-700 dark:text-slate-300">{report.totalStudents} Orang</td>
                                                <td className="p-4 text-emerald-600 dark:text-emerald-400 font-semibold">{report.activeStudents} Aktif</td>
                                                <td className="p-4 text-slate-500 dark:text-slate-400">{report.graduatedCount} Lulus</td>
                                                <td className="p-4 pr-6 text-right font-bold text-blue-600 dark:text-blue-400">{report.avgGpa.toFixed(2)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                                                Tidak ada data laporan yang ditemukan.
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