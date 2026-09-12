import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    FileCheck,
    Users,
    Clock,
    Sparkles,
    Filter,
    FilePlus,
    HelpCircle as QuizIcon,
    Edit3,
    Megaphone,
    X,
    CheckCircle2,
    Send,
    ChevronRight,
    FilePen,
    TriangleAlert,
    Building2,
    Layers,
    GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface PendingValidation {
    id: number;
    initial: string;
    name: string;
    color: string;
    task: string;
    program: string;
    submitted: string;
}

export default function AdminDashboard() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [selectedProgramFilter, setSelectedProgramFilter] = useState('Semua');
    const [pendingValidations, setPendingValidations] = useState<PendingValidation[]>([
        { id: 1, initial: 'BS', name: 'Dr. Budi Santoso, M.Kom.', color: 'bg-blue-600 text-white', task: 'Validasi RPS & RKA', program: 'S1 Teknik Informatika', submitted: 'Kemarin, 14:30' },
        { id: 2, initial: 'AS', name: 'Ani Surya, M.T.', color: 'bg-amber-600 text-white', task: 'Pengajuan Kurikulum MBKM', program: 'S1 Sistem Informasi', submitted: 'Hari ini, 09:15' },
        { id: 3, initial: 'CW', name: 'Citra Wijaya, Ph.D.', color: 'bg-indigo-600 text-white', task: 'Validasi Jadwal Kuliah', program: 'S1 Teknik Elektro', submitted: 'Hari ini, 11:00' },
    ]);

    const [selectedValidationItem, setSelectedValidationItem] = useState<PendingValidation | null>(null);
    const [approvalNotes, setApprovalNotes] = useState('');

    const [showBroadcastModal, setShowBroadcastModal] = useState(false);
    const [broadcastData, setBroadcastData] = useState({
        targetAudience: 'Semua Sivitas Akademika',
        title: '',
        content: '',
    });

    const stats = [
        { title: 'Total Program Studi', value: '6', icon: Building2, color: 'text-blue-700 dark:text-blue-400', link: '/admin/academic/study-programs', borderAccent: 'border-l-blue-600' },
        { title: 'Total Mahasiswa Aktif', value: '1,450', icon: GraduationCap, color: 'text-indigo-700 dark:text-indigo-400', link: '/admin/users/students', borderAccent: 'border-l-indigo-600' },
        { title: 'Validasi Pending', value: '18', icon: FilePen, color: 'text-amber-700 dark:text-amber-400', link: '/admin/academic/import', borderAccent: 'border-l-amber-500' },
        { title: 'Sistem Alert', value: '2', icon: TriangleAlert, color: 'text-rose-600 dark:text-rose-400', link: '/admin/notifications', borderAccent: 'border-l-rose-500' },
    ];

    const activeFaculties = [
        { code: 'IF', name: 'S1 Teknik Informatika', students: 450, progress: 85, schedule: 'Fakultas Teknik • Gedung A' },
        { code: 'SI', name: 'S1 Sistem Informasi', students: 380, progress: 80, schedule: 'Fakultas Teknik • Gedung A' },
        { code: 'TE', name: 'S1 Teknik Elektro', students: 240, progress: 70, schedule: 'Fakultas Teknik • Gedung B' },
        { code: 'TS', name: 'S1 Teknik Sipil', students: 380, progress: 90, schedule: 'Fakultas Teknik • Gedung C' },
    ];

    const handleApproveValidation = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedValidationItem) return;
        setPendingValidations(pendingValidations.filter(item => item.id !== selectedValidationItem.id));
        showToast(`Pengajuan dari ${selectedValidationItem.name} berhasil disetujui!`);
        setSelectedValidationItem(null);
        setApprovalNotes('');
    };

    const handleSendBroadcast = (e: React.FormEvent) => {
        e.preventDefault();
        if (!broadcastData.title || !broadcastData.content) return;
        showToast(`Pengumuman sistem "${broadcastData.title}" berhasil disiarkan!`);
        setShowBroadcastModal(false);
        setBroadcastData({ targetAudience: 'Semua Sivitas Akademika', title: '', content: '' });
    };

    const filteredPendingValidations = pendingValidations.filter(item => {
        if (selectedProgramFilter === 'Semua') return true;
        return item.program === selectedProgramFilter;
    });

    return (
        <AdminLayout>
            <Head title="Admin Dashboard - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                Selamat datang kembali, Administrator
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Berikut ringkasan sistem ekosistem akademik SALE secara keseluruhan. Semester Ganjil 2026/2027
                            </p>
                        </div>

                        {/* STATS CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {stats.map((stat, i) => (
                                <Link key={i} href={stat.link}>
                                    <div className={`bg-white dark:bg-slate-900 shadow-xs rounded-2xl hover:shadow-md transition cursor-pointer border border-slate-200/80 dark:border-slate-800 border-l-4 ${stat.borderAccent} overflow-hidden p-5 flex items-center justify-between`}>
                                        <div>
                                            <p className={`text-[11px] font-bold uppercase tracking-wider ${stat.color}`}>
                                                {stat.title}
                                            </p>
                                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{stat.value}</h3>
                                        </div>
                                        <stat.icon className={`h-6 w-6 ${stat.color} opacity-80`} />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* PROGRAM STUDI UTAMA & SYSTEM INSIGHT */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Program Studi Fakultas Teknik</h3>
                                    <Link href="/admin/academic/study-programs" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                        Kelola Prodi <ChevronRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {activeFaculties.map((c, i) => (
                                        <Card key={i} className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-blue-500/50 transition">
                                            <CardContent className="p-5 space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-2.5 py-1 rounded-md">
                                                        {c.code}
                                                    </span>
                                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                        <Users className="h-3.5 w-3.5" /> {c.students} Mahasiswa
                                                    </span>
                                                </div>

                                                <div>
                                                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{c.name}</h4>
                                                    <div className="mt-3 space-y-1.5">
                                                        <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                                            <span>Ketercapaian Kurikulum</span>
                                                            <span>{c.progress}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${c.progress}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
                                                    <Clock className="h-3.5 w-3.5 text-slate-400" /> {c.schedule}
                                                </p>

                                                <Link href="/admin/academic/study-programs" className="block w-full">
                                                    <Button variant="outline" className="w-full text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 cursor-pointer">
                                                        Detail Program Studi
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Card className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-blue-950/40 dark:to-indigo-950/30 border-blue-200/80 dark:border-blue-900/50 shadow-xs rounded-2xl relative overflow-hidden">
                                    <CardContent className="p-5 space-y-3">
                                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                                            <Sparkles className="h-4 w-4" />
                                            <span>System Security & Performance</span>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                            "Seluruh layanan basis data dan sinkronisasi SIAKAD berjalan normal. Beban server stabil pada kapasitas <span className="font-semibold text-slate-900 dark:text-white">32%</span> minggu ini."
                                        </p>
                                        <Button
                                            onClick={() => {
                                                setShowBroadcastModal(true);
                                                setBroadcastData(prev => ({ ...prev, title: 'Pemeliharaan Sistem Terjadwal' }));
                                            }}
                                            size="sm"
                                            variant="outline"
                                            className="text-xs font-semibold border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                                        >
                                            Broadcast Sistem
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                                    <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
                                        <CardTitle className="text-sm font-bold text-slate-900 dark:text-white">Ekosistem Overview</CardTitle>
                                        <Link href="/admin/reports/academic" className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                            Laporan
                                        </Link>
                                    </CardHeader>
                                    <CardContent className="p-5 pt-0 space-y-4">
                                        {[
                                            { label: 'Server Uptime', val: '99.9%', percent: 99.9, color: 'bg-blue-600' },
                                            { label: 'Storage Database', val: '64%', percent: 64, color: 'bg-indigo-600' },
                                            { label: 'Aktivitas Dosen', val: '91%', percent: 91, color: 'bg-emerald-500' },
                                            { label: 'Mahasiswa Registrasi', val: '98%', percent: 98, color: 'bg-blue-400' },
                                        ].map((item, idx) => (
                                            <div key={idx} className="space-y-1">
                                                <div className="flex justify-between text-xs font-semibold">
                                                    <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
                                                    <span className="font-bold text-slate-900 dark:text-white">{item.val}</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* TABEL VALIDASI & QUICK ACTIONS ADMIN */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                            <Card className="lg:col-span-2 bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                                <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Validasi & Pengajuan Pending</CardTitle>
                                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">({filteredPendingValidations.length})</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                                        <select
                                            value={selectedProgramFilter}
                                            onChange={(e) => setSelectedProgramFilter(e.target.value)}
                                            className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
                                        >
                                            <option value="Semua">Semua Prodi</option>
                                            <option value="S1 Teknik Informatika">S1 Teknik Informatika</option>
                                            <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                                            <option value="S1 Teknik Elektro">S1 Teknik Elektro</option>
                                        </select>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                                                <tr>
                                                    <th className="p-4 pl-6">Dosen / Pemohon</th>
                                                    <th className="p-4">Perihal</th>
                                                    <th className="p-4">Program Studi</th>
                                                    <th className="p-4">Diajukan</th>
                                                    <th className="p-4">Status</th>
                                                    <th className="p-4 pr-6 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                                {filteredPendingValidations.length > 0 ? (
                                                    filteredPendingValidations.map((row) => (
                                                        <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                            <td className="p-4 pl-6 flex items-center gap-3">
                                                                <div className={`w-8 h-8 rounded-full ${row.color} flex items-center justify-center font-bold text-xs`}>
                                                                    {row.initial}
                                                                </div>
                                                                <span className="font-bold text-slate-900 dark:text-white">{row.name}</span>
                                                            </td>
                                                            <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{row.task}</td>
                                                            <td className="p-4 text-slate-500 dark:text-slate-400">{row.program}</td>
                                                            <td className="p-4 text-slate-500 dark:text-slate-400">{row.submitted}</td>
                                                            <td className="p-4">
                                                                <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/65 dark:text-amber-400 dark:border dark:border-amber-900/50 text-[10px] font-bold px-2.5 py-1 rounded-md">
                                                                    Menunggu Validasi
                                                                </span>
                                                            </td>
                                                            <td className="p-4 pr-6 text-right">
                                                                <button
                                                                    onClick={() => setSelectedValidationItem(row)}
                                                                    className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition cursor-pointer"
                                                                >
                                                                    Tinjau & Setujui
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={6} className="p-6 text-center text-slate-500 dark:text-slate-400 font-medium">
                                                            Tidak ada antrean validasi saat ini!
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                                <CardHeader className="p-5 pb-3">
                                    <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Admin Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="p-5 pt-0 space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link href="/admin/users/students">
                                            <Button variant="outline" className="w-full h-20 flex-col gap-2 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                                                <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                Tambah Mahasiswa
                                            </Button>
                                        </Link>
                                        <Link href="/admin/users/lecturers">
                                            <Button variant="outline" className="w-full h-20 flex-col gap-2 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                                                <Users className="h-5 w-5 text-indigo-500" />
                                                Tambah Dosen
                                            </Button>
                                        </Link>
                                        <Link href="/admin/academic/courses">
                                            <Button variant="outline" className="w-full h-20 flex-col gap-2 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                                                <BookOpen className="h-5 w-5 text-amber-500" />
                                                Kelola Kurikulum
                                            </Button>
                                        </Link>
                                        <Link href="/admin/academic/import">
                                            <Button variant="outline" className="w-full h-20 flex-col gap-2 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                                                <FilePlus className="h-5 w-5 text-emerald-500" />
                                                Import Data Excel
                                            </Button>
                                        </Link>
                                    </div>

                                    <Button
                                        onClick={() => setShowBroadcastModal(true)}
                                        variant="outline"
                                        className="w-full h-12 gap-2 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer"
                                    >
                                        <Megaphone className="h-4 w-4 text-purple-500" />
                                        Kirim Broadcast Sistem
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
            </div>

            {selectedValidationItem && (
                    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-5 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Validasi Administratif</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{selectedValidationItem.name} — {selectedValidationItem.task}</p>
                                </div>
                                <button onClick={() => setSelectedValidationItem(null)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleApproveValidation} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Catatan Persetujuan (Opsional)</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Berikan instruksi atau catatan tambahan..."
                                        value={approvalNotes}
                                        onChange={(e) => setApprovalNotes(e.target.value)}
                                        className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setSelectedValidationItem(null)}
                                        className="text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 cursor-pointer"
                                    >
                                        Tutup
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-5 cursor-pointer"
                                    >
                                        Setujui Pengajuan
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showBroadcastModal && (
                    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-5 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                <div className="flex items-center gap-2">
                                    <Megaphone className="h-5 w-5 text-purple-500" />
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Buat Pengumuman Sistem</h3>
                                </div>
                                <button onClick={() => setShowBroadcastModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSendBroadcast} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Audiens</label>
                                    <select
                                        value={broadcastData.targetAudience}
                                        onChange={(e) => setBroadcastData({ ...broadcastData, targetAudience: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold focus:outline-none text-slate-900 dark:text-white cursor-pointer"
                                    >
                                        <option>Semua Sivitas Akademika</option>
                                        <option>Khusus Mahasiswa</option>
                                        <option>Khusus Dosen & Pengajar</option>
                                        <option>Fakultas Teknik</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Judul Pengumuman</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: Pemeliharaan Server Akademik"
                                        value={broadcastData.title}
                                        onChange={(e) => setBroadcastData({ ...broadcastData, title: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Isi Pengumuman</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Tuliskan detail pesan broadcast..."
                                        value={broadcastData.content}
                                        onChange={(e) => setBroadcastData({ ...broadcastData, content: e.target.value })}
                                        className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowBroadcastModal(false)}
                                        className="text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 cursor-pointer"
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-5 gap-1.5 cursor-pointer"
                                    >
                                        <Send className="h-3.5 w-3.5" /> Kirim Broadcast
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </AdminLayout>
    );
}