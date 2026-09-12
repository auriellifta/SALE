import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { FileSpreadsheet, CheckCircle2, Filter, Search, Building2, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface StudyProgramReportItem {
    id: number;
    code: string;
    programName: string;
    faculty: string;
    accreditation: string;
    totalStudents: number;
    totalLecturers: number;
    avgGpa: number;
}

export default function StudyProgramReport() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [selectedAccreditation, setSelectedAccreditation] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');

    const [programs, setPrograms] = useState<StudyProgramReportItem[]>([
        { id: 1, code: 'IF', programName: 'S1 Teknik Informatika', faculty: 'Fakultas Teknik', accreditation: 'Unggul', totalStudents: 450, totalLecturers: 18, avgGpa: 3.45 },
        { id: 2, code: 'SI', programName: 'S1 Sistem Informasi', faculty: 'Fakultas Teknik', accreditation: 'B', totalStudents: 380, totalLecturers: 15, avgGpa: 3.38 },
        { id: 3, code: 'TE', programName: 'S1 Teknik Elektro', faculty: 'Fakultas Teknik', accreditation: 'Baik Sekali', totalStudents: 310, totalLecturers: 14, avgGpa: 3.25 },
        { id: 4, code: 'TS', programName: 'S1 Teknik Sipil', faculty: 'Fakultas Teknik', accreditation: 'B', totalStudents: 310, totalLecturers: 12, avgGpa: 3.30 },
    ]);

    const handleExport = () => {
        showToast('Laporan per Program Studi berhasil di-export ke format Excel (.xlsx)!');
    };

    const filteredPrograms = programs.filter(item => {
        const matchesSearch = item.programName.toLowerCase().includes(searchQuery.toLowerCase()) || item.faculty.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAccreditation = selectedAccreditation === 'Semua' || item.accreditation === selectedAccreditation;
        return matchesSearch && matchesAccreditation;
    });

    const totalStudentsAll = programs.reduce((sum, p) => sum + p.totalStudents, 0);
    const totalLecturersAll = programs.reduce((sum, p) => sum + p.totalLecturers, 0);

    return (
        <AdminLayout>
            <Head title="Report by Study Program - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Report by Study Program</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Laporan rekapitulasi data mahasiswa, dosen, dan rata-rata prestasi akademik dikelompokkan per Program Studi.
                        </p>
                    </div>
                    <Button
                        onClick={handleExport}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl gap-2 cursor-pointer shadow-sm"
                    >
                        <FileSpreadsheet className="h-4 w-4" /> Export Laporan Prodi Excel
                    </Button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Program Studi</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{programs.length} Prodi</h3>
                        </div>
                        <Building2 className="h-6 w-6 text-blue-700 dark:text-blue-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Total Mahasiswa Terdaftar</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalStudentsAll.toLocaleString('id-ID')}</h3>
                        </div>
                        <GraduationCap className="h-6 w-6 text-emerald-700 dark:text-emerald-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Total Dosen Pengampu</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalLecturersAll} Dosen</h3>
                        </div>
                        <Users className="h-6 w-6 text-indigo-700 dark:text-indigo-400 opacity-80" />
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
                                value={selectedAccreditation}
                                onChange={(e) => setSelectedAccreditation(e.target.value)}
                                className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer w-full sm:w-auto"
                            >
                                <option value="Semua">Semua Akreditasi</option>
                                <option value="Unggul">Unggul</option>
                                <option value="Baik Sekali">Baik Sekali</option>
                                <option value="B">B</option>
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
                                        <th className="p-4 pl-6">Kode</th>
                                        <th className="p-4">Program Studi</th>
                                        <th className="p-4">Fakultas</th>
                                        <th className="p-4">Akreditasi</th>
                                        <th className="p-4">Mahasiswa</th>
                                        <th className="p-4">Dosen</th>
                                        <th className="p-4 pr-6 text-right">Rata-rata IPK</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {filteredPrograms.length > 0 ? (
                                        filteredPrograms.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                <td className="p-4 pl-6 font-bold text-blue-600 dark:text-blue-400">{item.code}</td>
                                                <td className="p-4 font-bold text-slate-900 dark:text-white">{item.programName}</td>
                                                <td className="p-4 text-slate-500 dark:text-slate-400">{item.faculty}</td>
                                                <td className="p-4">
                                                    <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 px-2.5 py-1 rounded-md text-[10px] font-bold">
                                                        {item.accreditation}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-slate-700 dark:text-slate-300">{item.totalStudents} Mhs</td>
                                                <td className="p-4 text-slate-700 dark:text-slate-300">{item.totalLecturers} Dosen</td>
                                                <td className="p-4 pr-6 text-right font-bold text-blue-600 dark:text-blue-400">{item.avgGpa.toFixed(2)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-slate-500 font-medium">
                                                Tidak ada data laporan program studi yang ditemukan.
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