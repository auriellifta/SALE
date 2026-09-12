import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Calendar, CheckCircle2, Clock, Plus, X, Pencil, PlayCircle, Search, Filter, CalendarDays, BookOpenCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface AcademicPeriodItem {
    id: number;
    code: string;
    name: string;
    academicYear: string;
    phase: string;
    startDate: string;
    endDate: string;
    krsStatus: string;
    status: 'Aktif' | 'Nonaktif';
}

export default function AcademicPeriod() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Semua');

    const [periods, setPeriods] = useState<AcademicPeriodItem[]>([
        { 
            id: 1, 
            code: '20261', 
            name: 'Semester Ganjil', 
            academicYear: '2026/2027', 
            phase: 'Perkuliahan Minggu ke-4', 
            startDate: '01 Sep 2026', 
            endDate: '15 Feb 2027', 
            krsStatus: 'Ditutup (98% Terisi)',
            status: 'Aktif' 
        },
        { 
            id: 2, 
            code: '20252', 
            name: 'Semester Genap', 
            academicYear: '2025/2026', 
            phase: 'Evaluasi & Yudisium', 
            startDate: '01 Mar 2026', 
            endDate: '15 Aug 2026', 
            krsStatus: 'Selesai',
            status: 'Nonaktif' 
        },
        { 
            id: 3, 
            code: '20251', 
            name: 'Semester Ganjil', 
            academicYear: '2025/2026', 
            phase: 'Evaluasi & Yudisium', 
            startDate: '01 Sep 2025', 
            endDate: '15 Feb 2026', 
            krsStatus: 'Selesai',
            status: 'Nonaktif' 
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingPeriod, setEditingPeriod] = useState<AcademicPeriodItem | null>(null);
    const [form, setForm] = useState({
        code: '',
        name: 'Semester Ganjil',
        academicYear: '2026/2027',
        phase: 'Masa Pengisian KRS',
        startDate: '',
        endDate: '',
        krsStatus: 'Dibuka',
    });

    const openAddModal = () => {
        setEditingPeriod(null);
        setForm({ code: '', name: 'Semester Ganjil', academicYear: '2026/2027', phase: 'Masa Pengisian KRS', startDate: '', endDate: '', krsStatus: 'Dibuka' });
        setShowModal(true);
    };

    const openEditModal = (period: AcademicPeriodItem) => {
        setEditingPeriod(period);
        setForm({
            code: period.code,
            name: period.name,
            academicYear: period.academicYear,
            phase: period.phase,
            startDate: period.startDate,
            endDate: period.endDate,
            krsStatus: period.krsStatus,
        });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.code || !form.academicYear || !form.startDate || !form.endDate) return;

        if (editingPeriod) {
            setPeriods(
                periods.map((p) =>
                    p.id === editingPeriod.id
                        ? {
                              ...p,
                              code: form.code,
                              name: form.name,
                              academicYear: form.academicYear,
                              phase: form.phase,
                              startDate: form.startDate,
                              endDate: form.endDate,
                              krsStatus: form.krsStatus,
                          }
                        : p
                )
            );
            showToast(`Periode akademik "${form.name} ${form.academicYear}" berhasil diperbarui!`);
        } else {
            setPeriods([
                ...periods,
                {
                    id: Date.now(),
                    code: form.code,
                    name: form.name,
                    academicYear: form.academicYear,
                    phase: form.phase,
                    startDate: form.startDate,
                    endDate: form.endDate,
                    krsStatus: form.krsStatus,
                    status: 'Nonaktif',
                },
            ]);
            showToast(`Periode akademik "${form.name} ${form.academicYear}" berhasil ditambahkan!`);
        }
        setShowModal(false);
    };

    const setActivePeriod = (period: AcademicPeriodItem) => {
        setPeriods(
            periods.map((p) => ({
                ...p,
                status: p.id === period.id ? 'Aktif' : 'Nonaktif',
            }))
        );
        showToast(`Periode aktif diubah ke ${period.name} ${period.academicYear}.`);
    };

    const filteredPeriods = periods.filter(period => {
        const matchesSearch = period.academicYear.toLowerCase().includes(searchQuery.toLowerCase()) || period.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'Semua' || period.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const activePeriod = periods.find((p) => p.status === 'Aktif');

    return (
        <AdminLayout>
            <Head title="Academic Period - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Academic Period</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Kelola tahun ajaran, fase kalender akademik, dan kontrol status aktif semester di sistem SALE.
                        </p>
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl gap-1.5 cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5" /> Tambah Periode
                    </Button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Semester Aktif Saat Ini</p>
                            <h3 className="text-xl font-black mt-1 text-slate-900 dark:text-white">
                                {activePeriod ? `${activePeriod.name} ${activePeriod.academicYear}` : 'Tidak Ada'}
                            </h3>
                        </div>
                        <Calendar className="h-6 w-6 text-blue-700 dark:text-blue-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Fase Akademik Berjalan</p>
                            <h3 className="text-xl font-black mt-1 text-slate-900 dark:text-white">{activePeriod ? activePeriod.phase : '-'}</h3>
                        </div>
                        <CalendarDays className="h-6 w-6 text-indigo-700 dark:text-indigo-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Total Periode Terdaftar</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{periods.length}</h3>
                        </div>
                        <Clock className="h-6 w-6 text-emerald-700 dark:text-emerald-400 opacity-80" />
                    </div>
                </div>

                {/* SEARCH & FILTER BAR */}
                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari tahun ajaran (contoh: 2026)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Filter className="h-4 w-4 text-slate-500" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer w-full sm:w-auto"
                            >
                                <option value="Semua">Semua Status</option>
                                <option value="Aktif">Aktif</option>
                                <option value="Nonaktif">Nonaktif</option>
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
                                        <th className="p-4 pl-6 whitespace-nowrap">Kode</th>
                                        <th className="p-4">Nama Semester</th>
                                        <th className="p-4">Tahun Akademik</th>
                                        <th className="p-4">Fase Akademik</th>
                                        <th className="p-4">Rentang Waktu</th>
                                        <th className="p-4">Status KRS</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 pr-6 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {filteredPeriods.length > 0 ? (
                                        filteredPeriods.map((period) => (
                                            <tr key={period.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                <td className="p-4 pl-6 whitespace-nowrap">
                                                    <span className="inline-block text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-2.5 py-1 rounded-md tracking-wider">
                                                        {period.code}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">{period.name}</td>
                                                <td className="p-4 text-slate-700 dark:text-slate-300 font-semibold">{period.academicYear}</td>
                                                <td className="p-4 text-slate-500 dark:text-slate-400">
                                                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md text-[11px] font-medium">
                                                        {period.phase}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                                    {period.startDate} — {period.endDate}
                                                </td>
                                                <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">
                                                    {period.krsStatus}
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    <span
                                                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                                                            period.status === 'Aktif'
                                                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/65 dark:text-emerald-400'
                                                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                                        }`}
                                                    >
                                                        {period.status === 'Aktif' ? 'Semester Aktif' : 'Nonaktif'}
                                                    </span>
                                                </td>
                                                <td className="p-4 pr-6 whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-3">
                                                        {period.status !== 'Aktif' && (
                                                            <button
                                                                onClick={() => setActivePeriod(period)}
                                                                className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                            >
                                                                <PlayCircle className="h-3.5 w-3.5" /> Aktifkan
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => openEditModal(period)}
                                                            className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" /> Edit
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="p-8 text-center text-slate-500 font-medium">
                                                Tidak ada periode akademik yang cocok dengan pencarian.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* MODAL PERIODE AKADEMIK */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-5 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                {editingPeriod ? 'Edit Periode Akademik' : 'Tambah Periode Akademik Baru'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Kode Periode</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: 20271"
                                        value={form.code}
                                        onChange={(e) => setForm({ ...form, code: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tahun Akademik</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: 2026/2027"
                                        value={form.academicYear}
                                        onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nama Semester</label>
                                    <select
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                                    >
                                        <option value="Semester Ganjil">Semester Ganjil</option>
                                        <option value="Semester Genap">Semester Genap</option>
                                        <option value="Semester Pendek">Semester Pendek</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Fase Akademik Saat Ini</label>
                                    <select
                                        value={form.phase}
                                        onChange={(e) => setForm({ ...form, phase: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                                    >
                                        <option value="Masa Pengisian KRS">Masa Pengisian KRS</option>
                                        <option value="Perkuliahan Berjalan">Perkuliahan Berjalan</option>
                                        <option value="Ujian Tengah Semester (UTS)">Ujian Tengah Semester (UTS)</option>
                                        <option value="Ujian Akhir Semester (UAS)">Ujian Akhir Semester (UAS)</option>
                                        <option value="Evaluasi & Yudisium">Evaluasi & Yudisium</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tanggal Mulai</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: 01 Sep 2026"
                                        value={form.startDate}
                                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tanggal Selesai</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: 15 Feb 2027"
                                        value={form.endDate}
                                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Status Pengisian KRS</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Dibuka / Ditutup / Proses Perwalian"
                                    value={form.krsStatus}
                                    onChange={(e) => setForm({ ...form, krsStatus: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowModal(false)}
                                    className="text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 cursor-pointer"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-5 cursor-pointer"
                                >
                                    {editingPeriod ? 'Simpan Perubahan' : 'Tambah Periode'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}