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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LecturerSidebar from '@/components/sale/LecturerSidebar';
import LecturerTopbar from '@/components/sale/LecturerTopbar';

interface PendingGrade {
    id: number;
    initial: string;
    name: string;
    color: string;
    task: string;
    course: string;
    submitted: string;
}

export default function DashboardDosen() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [selectedCourseFilter, setSelectedCourseFilter] = useState('Semua');
    const [pendingGrades, setPendingGrades] = useState<PendingGrade[]>([
        { id: 1, initial: 'BS', name: 'Budi Santoso', color: 'bg-blue-600 text-white', task: 'Proyek Akhir Web', course: 'Pemrograman Web', submitted: 'Kemarin, 14:30' },
        { id: 2, initial: 'AS', name: 'Ani Surya', color: 'bg-amber-600 text-white', task: 'Tugas ERD', course: 'Basis Data', submitted: 'Hari ini, 09:15' },
        { id: 3, initial: 'CW', name: 'Citra Wijaya', color: 'bg-indigo-600 text-white', task: 'Laporan Ray Tracing', course: 'Grafika Komputer', submitted: 'Hari ini, 11:00' },
    ]);

    const [selectedGradeItem, setSelectedGradeItem] = useState<PendingGrade | null>(null);
    const [gradeScore, setGradeScore] = useState('');
    const [gradeFeedback, setGradeFeedback] = useState('');

    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
    const [announcementData, setAnnouncementData] = useState({
        targetCourse: 'Pemrograman Web',
        title: '',
        content: '',
    });

    const stats = [
        { title: 'Total Kelas', value: '4', icon: BookOpen, color: 'text-blue-700 dark:text-blue-400', link: '/dosen/courses', borderAccent: 'border-l-blue-600' },
        { title: 'Mahasiswa Aktif', value: '126', icon: Users, color: 'text-indigo-700 dark:text-indigo-400', link: '/dosen/attendance', borderAccent: 'border-l-indigo-600' },
        { title: 'Tugas Perlu Dinilai', value: '18', icon: FilePen, color: 'text-amber-700 dark:text-amber-400', link: '/dosen/assignments', borderAccent: 'border-l-amber-500' },
        { title: 'Perlu Perhatian', value: '7', icon: TriangleAlert, color: 'text-rose-600 dark:text-rose-400', link: '/dosen/analytics', borderAccent: 'border-l-rose-500' },
    ];

    const classes = [
        { code: 'CS101', name: 'Pemrograman Web', students: 32, progress: 60, schedule: 'Sel, 10:00 AM (Ruang 301)' },
        { code: 'CS202', name: 'Basis Data', students: 45, progress: 45, schedule: 'Rab, 13:00 PM (Lab C)' },
        { code: 'CS305', name: 'Grafika Komputer', students: 24, progress: 30, schedule: 'Kam, 08:00 AM (Lab A)' },
        { code: 'CS401', name: 'Kecerdasan Buatan', students: 25, progress: 75, schedule: 'Jum, 14:00 PM (Ruang 202)' },
    ];

    const handleSubmitQuickGrade = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedGradeItem || !gradeScore) return;
        setPendingGrades(pendingGrades.filter(item => item.id !== selectedGradeItem.id));
        showToast(`Nilai ${gradeScore} berhasil disimpan untuk ${selectedGradeItem.name}!`);
        setSelectedGradeItem(null);
        setGradeScore('');
        setGradeFeedback('');
    };

    const handleSendAnnouncement = (e: React.FormEvent) => {
        e.preventDefault();
        if (!announcementData.title || !announcementData.content) return;
        showToast(`Pengumuman "${announcementData.title}" berhasil dikirim ke ${announcementData.targetCourse}!`);
        setShowAnnouncementModal(false);
        setAnnouncementData({ targetCourse: 'Pemrograman Web', title: '', content: '' });
    };

    const filteredPendingGrades = pendingGrades.filter(item => {
        if (selectedCourseFilter === 'Semua') return true;
        return item.course === selectedCourseFilter;
    });

    return (
        <>
            <Head title="Dashboard Dosen - SALE" />

            <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex">
                {toastMessage && (
                    <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>{toastMessage}</span>
                    </div>
                )}

                <LecturerSidebar />

                <div className="flex-1 flex flex-col min-w-0 md:ml-[280px]">
                    <LecturerTopbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

                    <main className="flex-1 p-6 md:p-8 space-y-8 mt-16 max-w-7xl w-full">
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                Selamat datang kembali, Devanovita Chelsea
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Berikut ringkasan aktivitas pembelajaran Anda hari ini. Semester Ganjil 2026/2027
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

                        {/* KELAS SAYA & AI INSIGHT */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Kelas Saya</h3>
                                    <Link href="/dosen/courses" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                        Lihat Semua <ChevronRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {classes.map((c, i) => (
                                        <Card key={i} className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl hover:border-blue-500/50 transition">
                                            <CardContent className="p-5 space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-2.5 py-1 rounded-md">
                                                        {c.code}
                                                    </span>
                                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                        <Users className="h-3.5 w-3.5" /> {c.students}
                                                    </span>
                                                </div>

                                                <div>
                                                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{c.name}</h4>
                                                    <div className="mt-3 space-y-1.5">
                                                        <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                                            <span>Progress</span>
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

                                                <Link href="/dosen/courses" className="block w-full">
                                                    <Button variant="outline" className="w-full text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 cursor-pointer">
                                                        Lihat Kelas
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
                                            <span>AI Insight</span>
                                        </div>
                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                            "Berdasarkan aktivitas pembelajaran minggu ini, terdapat peningkatan ketidakhadiran pada kelas <span className="font-semibold text-slate-900 dark:text-white">Basis Data</span>. Disarankan untuk mengirimkan pengingat materi ke forum diskusi."
                                        </p>
                                        <Button
                                            onClick={() => {
                                                setShowAnnouncementModal(true);
                                                setAnnouncementData(prev => ({ ...prev, targetCourse: 'Basis Data', title: 'Pengingat Kehadiran & Materi Kuliah' }));
                                            }}
                                            size="sm"
                                            variant="outline"
                                            className="text-xs font-semibold border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                                        >
                                            Tindak Lanjuti
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                                    <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
                                        <CardTitle className="text-sm font-bold text-slate-900 dark:text-white">Class Analytics Snapshot</CardTitle>
                                        <Link href="/dosen/analytics" className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                            Detail
                                        </Link>
                                    </CardHeader>
                                    <CardContent className="p-5 pt-0 space-y-4">
                                        {[
                                            { label: 'Average Grade', val: '82.5%', percent: 82.5, color: 'bg-blue-600' },
                                            { label: 'Completion Rate', val: '91%', percent: 91, color: 'bg-blue-600' },
                                            { label: 'Attendance', val: '88%', percent: 88, color: 'bg-amber-500' },
                                            { label: 'Forum Participation', val: '45%', percent: 45, color: 'bg-blue-400' },
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

                        {/* TABEL TUGAS & QUICK ACTIONS */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                            <Card className="lg:col-span-2 bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                                <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Tugas yang Perlu Dinilai</CardTitle>
                                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">({filteredPendingGrades.length})</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                                        <select
                                            value={selectedCourseFilter}
                                            onChange={(e) => setSelectedCourseFilter(e.target.value)}
                                            className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
                                        >
                                            <option value="Semua">Semua Matkul</option>
                                            <option value="Pemrograman Web">Pemrograman Web</option>
                                            <option value="Basis Data">Basis Data</option>
                                            <option value="Grafika Komputer">Grafika Komputer</option>
                                            <option value="Kecerdasan Buatan">Kecerdasan Buatan</option>
                                        </select>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-xs">
                                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                                                <tr>
                                                    <th className="p-4 pl-6">Mahasiswa</th>
                                                    <th className="p-4">Tugas</th>
                                                    <th className="p-4">Mata Kuliah</th>
                                                    <th className="p-4">Dikumpulkan</th>
                                                    <th className="p-4">Status</th>
                                                    <th className="p-4 pr-6 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                                {filteredPendingGrades.length > 0 ? (
                                                    filteredPendingGrades.map((row) => (
                                                        <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                            <td className="p-4 pl-6 flex items-center gap-3">
                                                                <div className={`w-8 h-8 rounded-full ${row.color} flex items-center justify-center font-bold text-xs`}>
                                                                    {row.initial}
                                                                </div>
                                                                <span className="font-bold text-slate-900 dark:text-white">{row.name}</span>
                                                            </td>
                                                            <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{row.task}</td>
                                                            <td className="p-4 text-slate-500 dark:text-slate-400">{row.course}</td>
                                                            <td className="p-4 text-slate-500 dark:text-slate-400">{row.submitted}</td>
                                                            <td className="p-4">
                                                                <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/65 dark:text-amber-400 dark:border dark:border-amber-900/50 text-[10px] font-bold px-2.5 py-1 rounded-md">
                                                                    Belum Dinilai
                                                                </span>
                                                            </td>
                                                            <td className="p-4 pr-6 text-right">
                                                                <button
                                                                    onClick={() => setSelectedGradeItem(row)}
                                                                    className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition cursor-pointer"
                                                                >
                                                                    Nilai Sekarang
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={6} className="p-6 text-center text-slate-500 dark:text-slate-400 font-medium">
                                                            Semua tugas pada kategori ini sudah selesai dinilai!
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
                                    <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="p-5 pt-0 space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link href="/dosen/materials">
                                            <Button variant="outline" className="w-full h-20 flex-col gap-2 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                                                <FilePlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                Tambah Materi
                                            </Button>
                                        </Link>
                                        <Link href="/dosen/assignments">
                                            <Button variant="outline" className="w-full h-20 flex-col gap-2 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                                                <FileCheck className="h-5 w-5 text-indigo-500" />
                                                Buat Tugas
                                            </Button>
                                        </Link>
                                        <Link href="/dosen/assignments">
                                            <Button variant="outline" className="w-full h-20 flex-col gap-2 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                                                <QuizIcon className="h-5 w-5 text-amber-500" />
                                                Buat Kuis
                                            </Button>
                                        </Link>
                                        <Link href="/dosen/gradebook">
                                            <Button variant="outline" className="w-full h-20 flex-col gap-2 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer">
                                                <Edit3 className="h-5 w-5 text-emerald-500" />
                                                Input Nilai
                                            </Button>
                                        </Link>
                                    </div>

                                    <Button
                                        onClick={() => setShowAnnouncementModal(true)}
                                        variant="outline"
                                        className="w-full h-12 gap-2 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer"
                                    >
                                        <Megaphone className="h-4 w-4 text-purple-500" />
                                        Buat Pengumuman
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>

                {selectedGradeItem && (
                    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-5 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Penilaian Cepat</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{selectedGradeItem.name} — {selectedGradeItem.task}</p>
                                </div>
                                <button onClick={() => setSelectedGradeItem(null)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitQuickGrade} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nilai (0 - 100)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        max="100"
                                        placeholder="Masukkan nilai angka..."
                                        value={gradeScore}
                                        onChange={(e) => setGradeScore(e.target.value)}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Catatan / Feedback (Opsional)</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Tambahkan masukan konstruktif untuk mahasiswa..."
                                        value={gradeFeedback}
                                        onChange={(e) => setGradeFeedback(e.target.value)}
                                        className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setSelectedGradeItem(null)}
                                        className="text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 cursor-pointer"
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-5 cursor-pointer"
                                    >
                                        Simpan Nilai
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showAnnouncementModal && (
                    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl p-6 space-y-5 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                                <div className="flex items-center gap-2">
                                    <Megaphone className="h-5 w-5 text-purple-500" />
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Buat Pengumuman Baru</h3>
                                </div>
                                <button onClick={() => setShowAnnouncementModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSendAnnouncement} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mata Kuliah Tujuan</label>
                                    <select
                                        value={announcementData.targetCourse}
                                        onChange={(e) => setAnnouncementData({ ...announcementData, targetCourse: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold focus:outline-none text-slate-900 dark:text-white cursor-pointer"
                                    >
                                        <option>Pemrograman Web</option>
                                        <option>Basis Data</option>
                                        <option>Grafika Komputer</option>
                                        <option>Kecerdasan Buatan</option>
                                        <option>Semua Kelas</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Judul Pengumuman</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: Perubahan Jadwal Praktikum Lab C"
                                        value={announcementData.title}
                                        onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Isi Pengumuman</label>
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Tuliskan detail pengumuman untuk mahasiswa..."
                                        value={announcementData.content}
                                        onChange={(e) => setAnnouncementData({ ...announcementData, content: e.target.value })}
                                        className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowAnnouncementModal(false)}
                                        className="text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 cursor-pointer"
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-5 gap-1.5 cursor-pointer"
                                    >
                                        <Send className="h-3.5 w-3.5" /> Kirim Pengumuman
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

DashboardDosen.layout = (page: React.ReactNode) => page;