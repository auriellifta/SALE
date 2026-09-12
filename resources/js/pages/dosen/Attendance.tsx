import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Calendar,
    Clock,
    MapPin,
    AlertTriangle,
    Edit3,
    CheckCircle2,
    TrendingUp,
    ChevronDown,
    Sparkles,
    BarChart3,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import LecturerSidebar from '@/components/sale/LecturerSidebar';
import LecturerTopbar from '@/components/sale/LecturerTopbar';

interface StudentAttendance {
    id: number;
    name: string;
    nim: string;
    status: 'H' | 'I' | 'S' | 'A';
}

interface MeetingDetail {
    date: string;
    time: string;
    room: string;
    topic: string;
    students: StudentAttendance[];
}

export default function AttendanceDosen() {
    // State Filter Mata Kuliah
    const [selectedCourse, setSelectedCourse] = useState('CS101 - Pengantar Ilmu Komputer (Kelas A)');
    const [showCourseDropdown, setShowCourseDropdown] = useState(false);

    // State Pertemuan Aktif (1 s.d. 9)
    const [activeMeeting, setActiveMeeting] = useState<number>(1);

    // State Toast Notification
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // State Modal Edit / Catat Kehadiran
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalCatat, setShowModalCatat] = useState(false);

    // Daftar Mata Kuliah Dosen
    const coursesList = [
        'CS101 - Pengantar Ilmu Komputer (Kelas A)',
        'IF204 - Basis Data (Kelas B)',
        'IF301 - Kecerdasan Buatan (Kelas A)',
        'SE202 - Rekayasa Perangkat Lunak (Kelas C)'
    ];

    // Data Detail Setiap Pertemuan
    const meetingsData: Record<number, MeetingDetail> = {
        1: {
            date: '12 Sep 2026',
            time: '08:00 - 10:30',
            room: 'Ruang A201',
            topic: 'Pengenalan Konsep Dasar',
            students: [
                { id: 1, name: 'Ahmad Alkatiri', nim: '21098765', status: 'H' },
                { id: 2, name: 'Budi Santoso', nim: '21098766', status: 'S' },
                { id: 3, name: 'Citra Dewi', nim: '21098767', status: 'H' },
                { id: 4, name: 'Deni Saputra', nim: '21098768', status: 'A' },
                { id: 5, name: 'Eka Putri', nim: '21098769', status: 'H' },
                { id: 6, name: 'Fajar Hidayat', nim: '21098770', status: 'H' },
                { id: 7, name: 'Gita Ayu', nim: '21098771', status: 'H' },
                { id: 8, name: 'Hadi Pratama', nim: '21098772', status: 'H' },
            ]
        },
        2: {
            date: '19 Sep 2026',
            time: '08:00 - 10:30',
            room: 'Ruang A201',
            topic: 'Algoritma & Flowchart Lanjutan',
            students: [
                { id: 1, name: 'Ahmad Alkatiri', nim: '21098765', status: 'H' },
                { id: 2, name: 'Budi Santoso', nim: '21098766', status: 'H' },
                { id: 3, name: 'Citra Dewi', nim: '21098767', status: 'H' },
                { id: 4, name: 'Deni Saputra', nim: '21098768', status: 'H' },
                { id: 5, name: 'Eka Putri', nim: '21098769', status: 'I' },
                { id: 6, name: 'Fajar Hidayat', nim: '21098770', status: 'H' },
                { id: 7, name: 'Gita Ayu', nim: '21098771', status: 'H' },
                { id: 8, name: 'Hadi Pratama', nim: '21098772', status: 'S' },
            ]
        },
        3: {
            date: '26 Sep 2026',
            time: '08:00 - 10:30',
            room: 'Ruang A201',
            topic: 'Tipe Data & Variabel dalam Pemrograman',
            students: [
                { id: 1, name: 'Ahmad Alkatiri', nim: '21098765', status: 'H' },
                { id: 2, name: 'Budi Santoso', nim: '21098766', status: 'H' },
                { id: 3, name: 'Citra Dewi', nim: '21098767', status: 'S' },
                { id: 4, name: 'Deni Saputra', nim: '21098768', status: 'H' },
                { id: 5, name: 'Eka Putri', nim: '21098769', status: 'H' },
                { id: 6, name: 'Fajar Hidayat', nim: '21098770', status: 'A' },
                { id: 7, name: 'Gita Ayu', nim: '21098771', status: 'H' },
                { id: 8, name: 'Hadi Pratama', nim: '21098772', status: 'H' },
            ]
        },
        4: {
            date: '03 Oct 2026',
            time: '08:00 - 10:30',
            room: 'Ruang A201',
            topic: 'Struktur Kontrol Percabangan (If/Else & Switch)',
            students: [
                { id: 1, name: 'Ahmad Alkatiri', nim: '21098765', status: 'I' },
                { id: 2, name: 'Budi Santoso', nim: '21098766', status: 'H' },
                { id: 3, name: 'Citra Dewi', nim: '21098767', status: 'H' },
                { id: 4, name: 'Deni Saputra', nim: '21098768', status: 'S' },
                { id: 5, name: 'Eka Putri', nim: '21098769', status: 'H' },
                { id: 6, name: 'Fajar Hidayat', nim: '21098770', status: 'H' },
                { id: 7, name: 'Gita Ayu', nim: '21098771', status: 'A' },
                { id: 8, name: 'Hadi Pratama', nim: '21098772', status: 'H' },
            ]
        },
        5: {
            date: '10 Oct 2026',
            time: '08:00 - 10:30',
            room: 'Ruang A201',
            topic: 'Perulangan Looping (For, While, Do-While)',
            students: [
                { id: 1, name: 'Ahmad Alkatiri', nim: '21098765', status: 'H' },
                { id: 2, name: 'Budi Santoso', nim: '21098766', status: 'H' },
                { id: 3, name: 'Citra Dewi', nim: '21098767', status: 'H' },
                { id: 4, name: 'Deni Saputra', nim: '21098768', status: 'H' },
                { id: 5, name: 'Eka Putri', nim: '21098769', status: 'H' },
                { id: 6, name: 'Fajar Hidayat', nim: '21098770', status: 'H' },
                { id: 7, name: 'Gita Ayu', nim: '21098771', status: 'H' },
                { id: 8, name: 'Hadi Pratama', nim: '21098772', status: 'H' },
            ]
        },
        6: {
            date: '17 Oct 2026',
            time: '08:00 - 10:30',
            room: 'Ruang A201',
            topic: 'Array 1 Dimensi & Multi Dimensi',
            students: [
                { id: 1, name: 'Ahmad Alkatiri', nim: '21098765', status: 'H' },
                { id: 2, name: 'Budi Santoso', nim: '21098766', status: 'H' },
                { id: 3, name: 'Citra Dewi', nim: '21098767', status: 'S' },
                { id: 4, name: 'Deni Saputra', nim: '21098768', status: 'H' },
                { id: 5, name: 'Eka Putri', nim: '21098769', status: 'H' },
                { id: 6, name: 'Fajar Hidayat', nim: '21098770', status: 'H' },
                { id: 7, name: 'Gita Ayu', nim: '21098771', status: 'H' },
                { id: 8, name: 'Hadi Pratama', nim: '21098772', status: 'H' },
            ]
        },
        7: {
            date: '24 Oct 2026',
            time: '08:00 - 10:30',
            room: 'Ruang A201',
            topic: 'Modular Programming & Functions',
            students: [
                { id: 1, name: 'Ahmad Alkatiri', nim: '21098765', status: 'H' },
                { id: 2, name: 'Budi Santoso', nim: '21098766', status: 'H' },
                { id: 3, name: 'Citra Dewi', nim: '21098767', status: 'H' },
                { id: 4, name: 'Deni Saputra', nim: '21098768', status: 'H' },
                { id: 5, name: 'Eka Putri', nim: '21098769', status: 'H' },
                { id: 6, name: 'Fajar Hidayat', nim: '21098770', status: 'H' },
                { id: 7, name: 'Gita Ayu', nim: '21098771', status: 'H' },
                { id: 8, name: 'Hadi Pratama', nim: '21098772', status: 'H' },
            ]
        },
        8: {
            date: '31 Oct 2026',
            time: '08:00 - 10:30',
            room: 'Ruang A201',
            topic: 'Ujian Tengah Semester (UTS)',
            students: [
                { id: 1, name: 'Ahmad Alkatiri', nim: '21098765', status: 'H' },
                { id: 2, name: 'Budi Santoso', nim: '21098766', status: 'H' },
                { id: 3, name: 'Citra Dewi', nim: '21098767', status: 'H' },
                { id: 4, name: 'Deni Saputra', nim: '21098768', status: 'A' },
                { id: 5, name: 'Eka Putri', nim: '21098769', status: 'H' },
                { id: 6, name: 'Fajar Hidayat', nim: '21098770', status: 'H' },
                { id: 7, name: 'Gita Ayu', nim: '21098771', status: 'H' },
                { id: 8, name: 'Hadi Pratama', nim: '21098772', status: 'H' },
            ]
        },
        9: {
            date: '07 Nov 2026',
            time: '08:00 - 10:30',
            room: 'Ruang A201',
            topic: 'Pointer Dasar & Alokasi Memori',
            students: [
                { id: 1, name: 'Ahmad Alkatiri', nim: '21098765', status: 'H' },
                { id: 2, name: 'Budi Santoso', nim: '21098766', status: 'H' },
                { id: 3, name: 'Citra Dewi', nim: '21098767', status: 'H' },
                { id: 4, name: 'Deni Saputra', nim: '21098768', status: 'H' },
                { id: 5, name: 'Eka Putri', nim: '21098769', status: 'H' },
                { id: 6, name: 'Fajar Hidayat', nim: '21098770', status: 'H' },
                { id: 7, name: 'Gita Ayu', nim: '21098771', status: 'H' },
                { id: 8, name: 'Hadi Pratama', nim: '21098772', status: 'H' },
            ]
        }
    };

    const currentMeeting = meetingsData[activeMeeting] || meetingsData[1];

    // State untuk mencatat status kehadiran secara interaktif per mahasiswa
    const [attendanceState, setAttendanceState] = useState<Record<number, 'H' | 'I' | 'S' | 'A'>>(
        () => Object.fromEntries(currentMeeting.students.map(s => [s.id, s.status]))
    );

    const handleMeetingChange = (mId: number) => {
        setActiveMeeting(mId);
        const newMeetingData = meetingsData[mId] || meetingsData[1];
        setAttendanceState(Object.fromEntries(newMeetingData.students.map(s => [s.id, s.status])));
    };

    const handleStatusChange = (studentId: number, status: 'H' | 'I' | 'S' | 'A') => {
        setAttendanceState(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    // Hitung total ringkasan status di footer
    const totalHadir = Object.values(attendanceState).filter(s => s === 'H').length + 27;
    const totalIzin = Object.values(attendanceState).filter(s => s === 'I').length;
    const totalSakit = Object.values(attendanceState).filter(s => s === 'S').length;
    const totalAlpa = Object.values(attendanceState).filter(s => s === 'A').length;

    return (
        <>
            <Head title="Kehadiran Mahasiswa - SALE" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex">
                
                {/* TOAST NOTIFICATION */}
                {toastMessage && (
                    <div className="fixed top-5 right-5 z-[60] bg-white text-slate-800 dark:bg-slate-900 dark:text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                        <span>{toastMessage}</span>
                    </div>
                )}

                {/* SIDEBAR DOSEN */}
                <LecturerSidebar />

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 flex flex-col min-w-0 md:ml-[280px]">
                    
                    {/* TOP NAVBAR */}
                    <LecturerTopbar />

                    <main className="flex-1 p-5 sm:p-6 md:p-8 space-y-6 mt-16 max-w-7xl w-full mx-auto">
                        
                        {/* HEADER & ACTION BUTTONS */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Kehadiran Mahasiswa
                                </h1>
                                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
                                    Kelola, pantau, dan verifikasi data kehadiran mahasiswa secara real-time pada setiap sesi pertemuan kuliah.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={() => setShowModalEdit(true)}
                                    variant="outline"
                                    className="h-10 text-xs font-bold rounded-xl gap-2 px-4 shadow-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                                >
                                    <Edit3 className="h-4 w-4 text-slate-500 dark:text-slate-400" /> Sinkronisasi / Edit
                                </Button>
                                <Button
                                    onClick={() => setShowModalCatat(true)}
                                    className="h-10 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-xs font-bold rounded-xl gap-2 px-4 shadow-xs cursor-pointer"
                                >
                                    <CheckCircle2 className="h-4 w-4" /> Catat Pertemuan Baru
                                </Button>
                            </div>
                        </div>

                        {/* MATA KULIAH SELECTOR DROPDOWN */}
                        <div className="relative">
                            <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                                Pilih Mata Kuliah Aktif
                            </label>
                            <div
                                onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                                className="w-full bg-white border border-slate-200 text-slate-800 dark:bg-slate-900 dark:border-slate-700 dark:text-white rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer shadow-xs transition hover:border-blue-500 dark:hover:border-blue-500"
                            >
                                <span className="text-xs font-bold">{selectedCourse}</span>
                                <ChevronDown className="h-4 w-4 text-slate-400" />
                            </div>

                            {showCourseDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-white rounded-xl shadow-xl z-20 overflow-hidden">
                                    {coursesList.map((course, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                setSelectedCourse(course);
                                                setShowCourseDropdown(false);
                                            }}
                                            className={`px-4 py-3 text-xs font-semibold cursor-pointer transition ${
                                                selectedCourse === course 
                                                    ? 'bg-blue-50 text-blue-700 font-bold dark:bg-blue-500/15 dark:text-blue-300' 
                                                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                                            }`}
                                        >
                                            {course}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* STATS CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs rounded-2xl p-5 relative overflow-hidden flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        Rata-rata Kehadiran Kelas
                                    </p>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">92%</h3>
                                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold pt-1">
                                        <TrendingUp className="h-3.5 w-3.5" />
                                        <span>+2% dari minggu lalu</span>
                                    </div>
                                </div>
                                <div className="p-3.5 bg-blue-500/10 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                                    <BarChart3 className="h-6 w-6" />
                                </div>
                            </Card>

                            <Card className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs rounded-2xl p-5 relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            Perhatian Khusus (&lt; 75%)
                                        </p>
                                        <div className="flex items-baseline gap-2">
                                            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">3</h3>
                                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Mahasiswa</span>
                                        </div>
                                    </div>
                                    <div className="p-3.5 bg-rose-500/10 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 rounded-2xl">
                                        <AlertTriangle className="h-6 w-6" />
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 mt-3">
                                    <button onClick={() => showToast('Melihat detail Budi Santoso')} className="bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full transition cursor-pointer">
                                        Budi Santoso (60%)
                                    </button>
                                    <button onClick={() => showToast('Melihat detail Siti Aminah')} className="bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full transition cursor-pointer">
                                        Siti Aminah (70%)
                                    </button>
                                    <button onClick={() => showToast('Melihat detail Joko Widodo')} className="bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full transition cursor-pointer">
                                        Joko Widodo (72%)
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {/* AI INSIGHT BANNER */}
                        <div className="bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-white dark:from-blue-500/10 dark:via-slate-900 dark:to-slate-900 border border-blue-100 dark:border-blue-500/30 p-5 rounded-2xl flex items-start gap-4 shadow-xs relative overflow-hidden">
                            <Sparkles className="absolute -right-3 -bottom-3 w-32 h-32 text-blue-200/10 dark:text-blue-400/10 pointer-events-none" />
                            <div className="p-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-xl shrink-0 shadow-xs relative z-10">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <div className="space-y-1 relative z-10">
                                <h4 className="text-xs font-bold text-blue-950 dark:text-blue-400">AI Analytics Insight</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    Tingkat kehadiran cenderung menurun pada pertemuan ke-4 dan ke-8. Disarankan untuk menambahkan kuis interaktif di awal sesi guna mendongkrak ketepatan waktu kehadiran mahasiswa.
                                </p>
                            </div>
                        </div>

                        {/* TAB PERTEMUAN */}
                        <Card className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs rounded-2xl overflow-hidden">
                            <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex overflow-x-auto">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((mNum) => {
                                    const isActive = activeMeeting === mNum;
                                    return (
                                        <button
                                            key={mNum}
                                            onClick={() => handleMeetingChange(mNum)}
                                            className={`px-6 py-3.5 text-xs font-bold whitespace-nowrap transition border-b-2 cursor-pointer ${
                                                isActive
                                                    ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-transparent font-extrabold'
                                                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/40'
                                            }`}
                                        >
                                            Pertemuan {mNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div className="flex items-center gap-6 font-medium text-slate-600 dark:text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                        <span>{currentMeeting.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                        <span>{currentMeeting.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                        <span>{currentMeeting.room}</span>
                                    </div>
                                </div>

                                <div className="bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold px-3 py-1.5 rounded-xl">
                                    Topik: <span className="text-blue-600 dark:text-blue-400">{currentMeeting.topic}</span>
                                </div>
                            </div>

                            {/* TABEL KEHADIRAN MAHASISWA */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider text-[10px]">
                                        <tr>
                                            <th className="p-4 pl-6 w-16">No</th>
                                            <th className="p-4">Nama Mahasiswa / NIM</th>
                                            <th className="p-4 text-center w-24">Hadir (H)</th>
                                            <th className="p-4 text-center w-24">Izin (I)</th>
                                            <th className="p-4 text-center w-24">Sakit (S)</th>
                                            <th className="p-4 text-center w-24">Alpa (A)</th>
                                            <th className="p-4 pr-6 text-center w-24">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                                        {currentMeeting.students.map((student, idx) => {
                                            const currentStatus = attendanceState[student.id] || student.status;
                                            return (
                                                <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition">
                                                    <td className="p-4 pl-6 font-bold text-slate-400 dark:text-slate-500">{idx + 1}</td>
                                                    <td className="p-4 flex items-center gap-3">
                                                        <Avatar className="h-8 w-8 bg-blue-600 border border-blue-400/20">
                                                            <AvatarFallback className="bg-blue-600 text-white font-bold text-[10px]">
                                                                {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-bold text-slate-900 dark:text-white">{student.name}</div>
                                                            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{student.nim}</div>
                                                        </div>
                                                    </td>

                                                    <td className="p-4 text-center">
                                                        <button
                                                            onClick={() => handleStatusChange(student.id, 'H')}
                                                            className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center transition border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ${
                                                                currentStatus === 'H'
                                                                    ? 'bg-blue-600 border-blue-600 shadow-xs'
                                                                    : 'border-slate-300 bg-white hover:border-blue-400 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-blue-400'
                                                            }`}
                                                        >
                                                            {currentStatus === 'H' && <span className="w-2 h-2 bg-white rounded-full"></span>}
                                                        </button>
                                                    </td>

                                                    <td className="p-4 text-center">
                                                        <button
                                                            onClick={() => handleStatusChange(student.id, 'I')}
                                                            className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center transition border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ${
                                                                currentStatus === 'I'
                                                                    ? 'bg-blue-600 border-blue-600 shadow-xs'
                                                                    : 'border-slate-300 bg-white hover:border-blue-400 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-blue-400'
                                                            }`}
                                                        >
                                                            {currentStatus === 'I' && <span className="w-2 h-2 bg-white rounded-full"></span>}
                                                        </button>
                                                    </td>

                                                    <td className="p-4 text-center">
                                                        <button
                                                            onClick={() => handleStatusChange(student.id, 'S')}
                                                            className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center transition border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ${
                                                                currentStatus === 'S'
                                                                    ? 'bg-blue-600 border-blue-600 shadow-xs'
                                                                    : 'border-slate-300 bg-white hover:border-blue-400 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-blue-400'
                                                            }`}
                                                        >
                                                            {currentStatus === 'S' && <span className="w-2 h-2 bg-white rounded-full"></span>}
                                                        </button>
                                                    </td>

                                                    <td className="p-4 text-center">
                                                        <button
                                                            onClick={() => handleStatusChange(student.id, 'A')}
                                                            className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center transition border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ${
                                                                currentStatus === 'A'
                                                                    ? 'bg-blue-600 border-blue-600 shadow-xs'
                                                                    : 'border-slate-300 bg-white hover:border-blue-400 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-blue-400'
                                                            }`}
                                                        >
                                                            {currentStatus === 'A' && <span className="w-2 h-2 bg-white rounded-full"></span>}
                                                        </button>
                                                    </td>

                                                    <td className="p-4 pr-6 text-center">
                                                        <button
                                                            onClick={() => showToast(`Melihat detail log absensi ${student.name}`)}
                                                            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                                                        >
                                                            Detail
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* FOOTER SUMMARY */}
                            <CardContent className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold gap-3">
                                <div className="text-slate-600 dark:text-slate-400">Total: <span className="font-bold text-slate-900 dark:text-white">40 Mahasiswa</span></div>
                                <div className="flex items-center gap-6 text-slate-600 dark:text-slate-300">
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Hadir: {totalHadir}</span>
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Izin: {totalIzin}</span>
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Sakit: {totalSakit}</span>
                                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> Alpa: {totalAlpa}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>

            {/* MODAL EDIT KEHADIRAN */}
            {showModalEdit && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                            <h3 className="text-sm font-bold">Sinkronisasi & Edit Kehadiran Massal</h3>
                            <button onClick={() => setShowModalEdit(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            Fitur ini memungkinkan sinkronisasi ulang data presensi mahasiswa dari sistem kehadiran mandiri (QR Code/Fingerprint) ke dalam rekap dosen.
                        </p>
                        <div className="flex justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                            <Button variant="outline" onClick={() => setShowModalEdit(false)} className="text-xs font-bold rounded-xl cursor-pointer bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">
                                Batal
                            </Button>
                            <Button onClick={() => { showToast('Data berhasil disinkronisasi!'); setShowModalEdit(false); }} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-xs font-bold rounded-xl cursor-pointer">
                                Sinkronisasi Sekarang
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL CATAT KEHADIRAN */}
            {showModalCatat && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                            <h3 className="text-sm font-bold">Catat Kehadiran Pertemuan Baru</h3>
                            <button onClick={() => setShowModalCatat(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-white cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-3 text-xs">
                            <div>
                                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pilih Pertemuan</label>
                                <select className="w-full bg-white border border-slate-200 text-slate-800 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:[color-scheme:dark] rounded-xl p-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer">
                                    <option>Pertemuan 10 - Topik Baru</option>
                                    <option>Pertemuan 11 - Sesi Diskusi</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Catatan Kuliah</label>
                                <textarea rows={3} placeholder="Masukkan ringkasan materi perkuliahan..." className="w-full bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30"></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                            <Button variant="outline" onClick={() => setShowModalCatat(false)} className="text-xs font-bold rounded-xl cursor-pointer bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">
                                Batal
                            </Button>
                            <Button onClick={() => { showToast('Kehadiran berhasil dicatat!'); setShowModalCatat(false); }} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white text-xs font-bold rounded-xl cursor-pointer">
                                Simpan Kehadiran
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

AttendanceDosen.layout = (page: React.ReactNode) => page;