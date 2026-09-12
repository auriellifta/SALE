import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { FileSpreadsheet, CheckCircle2, Filter, Search, Award, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface CpmkItem {
    id: number;
    code: string;
    courseName: string;
    cpmkCode: string;
    description: string;
    targetPercentage: number;
    achievedPercentage: number;
    status: 'Tercapai' | 'Perlu Evaluasi';
}

export default function CpmkAchievement() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [selectedStatus, setSelectedStatus] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');

    const [cpmkList, setCpmkList] = useState<CpmkItem[]>([
        { id: 1, code: 'IF101', courseName: 'Pemrograman Web', cpmkCode: 'CPMK-1', description: 'Mampu membangun aplikasi web berbasis MVC', targetPercentage: 75.0, achievedPercentage: 82.4, status: 'Tercapai' },
        { id: 2, code: 'IF101', courseName: 'Pemrograman Web', cpmkCode: 'CPMK-2', description: 'Mampu menerapkan keamanan autentikasi modern', targetPercentage: 75.0, achievedPercentage: 71.2, status: 'Perlu Evaluasi' },
        { id: 3, code: 'IF102', courseName: 'Basis Data Lanjut', cpmkCode: 'CPMK-1', description: 'Mampu merancang query kompleks dan indexing', targetPercentage: 75.0, achievedPercentage: 78.5, status: 'Tercapai' },
        { id: 4, code: 'SI201', courseName: 'Analisis Perancangan Sistem', cpmkCode: 'CPMK-1', description: 'Mampu membuat UML Diagram dan SRS dokumen', targetPercentage: 75.0, achievedPercentage: 80.0, status: 'Tercapai' },
    ]);

    const handleExport = () => {
        showToast('Laporan pencapaian CPMK berhasil di-export ke format Excel (.xlsx)!');
    };

    const filteredCpmk = cpmkList.filter(item => {
        const matchesSearch = item.courseName.toLowerCase().includes(searchQuery.toLowerCase()) || item.code.toLowerCase().includes(searchQuery.toLowerCase()) || item.cpmkCode.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'Semua' || item.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const achievedCount = cpmkList.filter(i => i.status === 'Tercapai').length;
    const avgAchievement = cpmkList.reduce((sum, i) => sum + i.achievedPercentage, 0) / cpmkList.length;

    return (
        <AdminLayout>
            <Head title="CPMK Achievement - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">CPMK Achievement Report</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Laporan evaluasi ketercapaian Capaian Pembelajaran Mata Kuliah (CPMK) mahasiswa secara komprehensif.
                        </p>
                    </div>
                    <Button
                        onClick={handleExport}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl gap-2 cursor-pointer shadow-sm"
                    >
                        <FileSpreadsheet className="h-4 w-4" /> Export Laporan CPMK Excel
                    </Button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Rata-rata Capaian Sistem</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{avgAchievement.toFixed(1)}%</h3>
                        </div>
                        <Target className="h-6 w-6 text-blue-700 dark:text-blue-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">CPMK Tercapai</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{achievedCount} / {cpmkList.length} Target</h3>
                        </div>
                        <Award className="h-6 w-6 text-emerald-700 dark:text-emerald-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Evaluasi Kurikulum</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">Standar OBE</h3>
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
                                placeholder="Cari mata kuliah atau kode CPMK..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Filter className="h-4 w-4 text-slate-500" />
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer w-full sm:w-auto"
                            >
                                <option value="Semua">Semua Status</option>
                                <option value="Tercapai">Tercapai</option>
                                <option value="Perlu Evaluasi">Perlu Evaluasi</option>
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
                                        <th className="p-4">Kode CPMK</th>
                                        <th className="p-4">Deskripsi CPMK</th>
                                        <th className="p-4">Target (%)</th>
                                        <th className="p-4">Capaian Aktual (%)</th>
                                        <th className="p-4 pr-6">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {filteredCpmk.length > 0 ? (
                                        filteredCpmk.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                <td className="p-4 pl-6 font-bold text-blue-600 dark:text-blue-400">{item.code}</td>
                                                <td className="p-4 font-bold text-slate-900 dark:text-white">{item.courseName}</td>
                                                <td className="p-4 font-mono font-bold text-slate-700 dark:text-slate-300">{item.cpmkCode}</td>
                                                <td className="p-4 text-slate-500 dark:text-slate-400 max-w-xs">{item.description}</td>
                                                <td className="p-4 text-slate-700 dark:text-slate-300">{item.targetPercentage}%</td>
                                                <td className="p-4 font-bold text-blue-600 dark:text-blue-400">{item.achievedPercentage}%</td>
                                                <td className="p-4 pr-6">
                                                    <span
                                                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                                                            item.status === 'Tercapai'
                                                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/65 dark:text-emerald-400'
                                                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/65 dark:text-amber-400'
                                                        }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-slate-500 font-medium">
                                                Tidak ada data pencapaian CPMK yang ditemukan.
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