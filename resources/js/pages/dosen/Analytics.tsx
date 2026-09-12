import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Sparkles,
    TrendingUp,
    TrendingDown,
    MoreVertical,
    X,
    ArrowUpRight,
    Clock,
    Lightbulb,
    CheckCircle2,
    FileText,
    BarChart3,
    Award,
    Users,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LecturerSidebar from '@/components/sale/LecturerSidebar';
import LecturerTopbar from '@/components/sale/LecturerTopbar';

export default function ClassAnalyticsDosen() {
    // State Toast Notification
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // State Modal AI Deep Analysis & Detail Clock Merah
    const [showAiModal, setShowAiModal] = useState(false);
    const [showClockDetailModal, setShowClockDetailModal] = useState(false);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Data Mahasiswa yang Memerlukan Dukungan
    const strugglingStudents = [
        { name: 'Budi Santoso', nim: '10123001', kehadiran: '75%', nilai: 55, status: 'Perlu Perhatian', badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' },
        { name: 'Siti Aminah', nim: '10123002', kehadiran: '80%', nilai: 62, status: 'Pantau Ketat', badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' },
        { name: 'Andi Wijaya', nim: '10123003', kehadiran: '60%', nilai: 45, status: 'Perlu Perhatian', badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800' },
        { name: 'Dewi Lestari', nim: '10123004', kehadiran: '70%', nilai: 58, status: 'Pantau Ketat', badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' }
    ];

    return (
        <>
            <Head title="Class Analytics - SALE" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex">
                
                {/* TOAST NOTIFICATION */}
                {toastMessage && (
                    <div className="fixed top-5 right-5 z-[60] bg-white text-slate-800 dark:bg-slate-900 dark:text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2">
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

                    {/* CONTENT BODY */}
                    <main className="flex-1 p-5 sm:p-6 md:p-8 space-y-6 mt-16 max-w-7xl w-full mx-auto">
                        
                        {/* TITLE & DESCRIPTION */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Analitik & Performa Kelas
                                </h1>
                                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
                                    Pantau perkembangan pembelajaran, evaluasi sebaran nilai, dan identifikasi area yang membutuhkan perhatian khusus secara real-time.
                                </p>
                            </div>

                            <div className="flex items-center gap-2.5">
                                <Button
                                    variant="outline"
                                    onClick={() => showToast('Laporan analitik berhasil diunduh!')}
                                    className="text-xs font-bold bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 rounded-xl px-4 py-2.5 shadow-xs cursor-pointer"
                                >
                                    Unduh Laporan
                                </Button>
                            </div>
                        </div>

                        {/* 4 STATS CARDS ATAS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs rounded-2xl p-5 relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rata-rata Nilai</p>
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-2">82.4</h3>
                                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                                            <TrendingUp className="h-3.5 w-3.5" /> +2.1% dari periode lalu
                                        </span>
                                    </div>
                                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center">
                                        <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs rounded-2xl p-5 relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tingkat Penyelesaian</p>
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-2">78%</h3>
                                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-1">
                                            <TrendingDown className="h-3.5 w-3.5" /> -1.2% perlu dorongan
                                        </span>
                                    </div>
                                    <div className="h-10 w-10 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 flex items-center justify-center">
                                        <BarChart3 className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs rounded-2xl p-5 relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Kehadiran Kelas</p>
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-2">94%</h3>
                                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                                            <TrendingUp className="h-3.5 w-3.5" /> +0.5% sangat baik
                                        </span>
                                    </div>
                                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                            </Card>

                            <Card className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs rounded-2xl p-5 relative overflow-hidden">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Partisipasi Aktif</p>
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-2">65%</h3>
                                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-1">
                                            <TrendingDown className="h-3.5 w-3.5" /> -4.3% forum diskusi
                                        </span>
                                    </div>
                                    <div className="h-10 w-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center">
                                        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* AI TEACHING ANALYTICS BANNER */}
                        <div
                            onClick={() => setShowAiModal(true)}
                            className="bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-white dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 border border-blue-200 dark:border-blue-500/30 p-5 rounded-2xl flex items-start gap-4 shadow-xs relative overflow-hidden cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition group"
                        >
                            <Sparkles className="absolute -right-4 -bottom-4 w-20 h-20 text-blue-300/30 dark:text-blue-400/20 pointer-events-none group-hover:scale-110 transition" />
                            <div className="p-2.5 bg-blue-600 text-white rounded-xl shrink-0 shadow-xs relative z-10">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <div className="space-y-1 relative z-10 flex-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-bold text-blue-950 dark:text-blue-300 flex items-center gap-1.5">
                                        AI Teaching Analytics & Rekomendasi Kelas <span className="text-[10px] bg-blue-600 text-white px-2.5 py-0.5 rounded-full font-bold">Rekomendasi Pintar</span>
                                    </h4>
                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline inline-flex items-center gap-1">
                                        Analisis Lengkap <ArrowUpRight className="h-3.5 w-3.5" />
                                    </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                    Mahasiswa menunjukkan penurunan aktivitas pada minggu ke-7. Disarankan untuk memberikan materi interaktif atau kuis singkat guna meningkatkan kembali keterlibatan mereka.
                                </p>
                            </div>
                        </div>

                        {/* SECTION TENGAH: DISTRIBUSI NILAI & PROGRES MATERI */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs rounded-2xl p-6 lg:col-span-2 space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900 dark:text-white">Distribusi Nilai Akhir</h3>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Rentang nilai keseluruhan mahasiswa dalam kelas aktif</p>
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-200 cursor-pointer">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </div>
                                {/* Catatan perbaikan: batang dengan warna transparan (amber/blue/indigo) nyaris tidak
                                    terlihat di atas latar gelap #0B0F17. Opacity dinaikkan + ditambah varian dark:
                                    yang lebih pekat agar tetap kontras di kedua tema. */}
                                <div className="h-52 bg-slate-50/50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl p-4 flex items-end justify-around gap-3">
                                    <div className="w-1/6 bg-amber-500/30 dark:bg-amber-500/50 hover:bg-amber-500/40 dark:hover:bg-amber-500/60 transition rounded-t-lg h-[25%] flex flex-col justify-end items-center pb-2 text-[10px] font-bold text-amber-700 dark:text-amber-200">
                                        <span className="mb-1">4 mhs</span>
                                    </div>
                                    <div className="w-1/6 bg-blue-500/30 dark:bg-blue-500/50 hover:bg-blue-500/40 dark:hover:bg-blue-500/60 transition rounded-t-lg h-[40%] flex flex-col justify-end items-center pb-2 text-[10px] font-bold text-blue-700 dark:text-blue-100">
                                        <span className="mb-1">8 mhs</span>
                                    </div>
                                    <div className="w-1/6 bg-indigo-500/40 dark:bg-indigo-500/60 hover:bg-indigo-500/50 dark:hover:bg-indigo-500/70 transition rounded-t-lg h-[55%] flex flex-col justify-end items-center pb-2 text-[10px] font-bold text-indigo-700 dark:text-indigo-100">
                                        <span className="mb-1">12 mhs</span>
                                    </div>
                                    <div className="w-1/6 bg-blue-600 dark:bg-blue-500 hover:bg-blue-500 transition rounded-t-lg h-[85%] flex flex-col justify-end items-center pb-2 text-[10px] font-bold text-white shadow-xs">
                                        <span className="mb-1">18 mhs</span>
                                    </div>
                                    <div className="w-1/6 bg-emerald-500 dark:bg-emerald-400 hover:bg-emerald-400 transition rounded-t-lg h-[50%] flex flex-col justify-end items-center pb-2 text-[10px] font-bold text-white shadow-xs">
                                        <span className="mb-1">10 mhs</span>
                                    </div>
                                </div>
                                <div className="flex justify-around text-[10px] font-bold text-slate-500 dark:text-slate-400 px-2 uppercase tracking-wide text-center">
                                    <span>&lt; 60<br/>(Kurang)</span>
                                    <span>60-70<br/>(Cukup)</span>
                                    <span>71-80<br/>(Baik)</span>
                                    <span>81-90<br/>(Sangat Baik)</span>
                                    <span>&gt; 90<br/>(Istimewa)</span>
                                </div>
                            </Card>

                            <Card className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs rounded-2xl p-6 space-y-5">
                                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                                    <h3 className="text-sm font-black text-slate-900 dark:text-white">Progres Penyelesaian Modul</h3>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Tingkat akses materi oleh mahasiswa</p>
                                </div>
                                <div className="space-y-4 text-xs font-semibold">
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-slate-700 dark:text-slate-300">
                                            <span>Modul 1: Pengantar Algoritma</span>
                                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">100%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 dark:bg-emerald-400 w-full"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-slate-700 dark:text-slate-300">
                                            <span>Modul 2: Desain Relasional</span>
                                            <span className="text-blue-600 dark:text-blue-400 font-bold">85%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-600 dark:bg-blue-500 w-[85%]"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-slate-700 dark:text-slate-300">
                                            <span>Modul 3: Normalisasi Database</span>
                                            <span className="text-rose-600 dark:text-rose-400 font-bold">42%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                                            <div className="h-full bg-rose-500 dark:bg-rose-400 w-[42%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* SECTION BAWAH: TABEL MAHASISWA & MATERI PERHATIAN */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                            <Card className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs rounded-2xl overflow-hidden">
                                <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900 dark:text-white">Mahasiswa yang Memerlukan Dukungan</h3>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Rekomendasi pendampingan akademik</p>
                                    </div>
                                    <span className="text-xs font-bold text-rose-600 dark:text-rose-300 bg-rose-500/10 dark:bg-rose-500/20 px-2.5 py-1 rounded-lg">4 Mahasiswa</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-50 text-slate-500 dark:bg-slate-950 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider text-[10px]">
                                            <tr>
                                                <th className="p-3.5 pl-5">Nama / NIM</th>
                                                <th className="p-3.5">Kehadiran</th>
                                                <th className="p-3.5">Nilai</th>
                                                <th className="p-3.5 pr-5">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                                            {strugglingStudents.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                                                    <td className="p-3.5 pl-5">
                                                        <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
                                                        <div className="text-[10px] text-slate-400 dark:text-slate-500">NIM: {item.nim}</div>
                                                    </td>
                                                    <td className="p-3.5 font-bold">{item.kehadiran}</td>
                                                    <td className="p-3.5 font-bold text-slate-800 dark:text-slate-200">{item.nilai}</td>
                                                    <td className="p-3.5 pr-5">
                                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl border inline-block ${item.badge}`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>

                            {/* Materi yang Memerlukan Perhatian */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-black text-slate-900 dark:text-white px-1">Materi yang Memerlukan Perhatian</h3>

                                <Card className="bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 shadow-xs rounded-2xl p-5 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30 rounded-xl">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Normalisasi Database</h4>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Rata-rata skor kuis menurun signifikan.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 py-2.5 border-y border-slate-200 dark:border-slate-800 text-xs">
                                        <div>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase block">AVG SCORE</span>
                                            <span className="text-base font-black text-rose-600 dark:text-rose-400">58%</span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase block">COMPLETION</span>
                                            <span className="text-base font-black text-slate-800 dark:text-white">72%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={() => showToast('Membuka detail modul Normalisasi Database')} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer">
                                            Tinjau Modul →
                                        </button>
                                    </div>
                                </Card>

                                {/* CARD DENGAN CLOCK MERAH INTERAKTIF */}
                                <Card
                                    onClick={() => setShowClockDetailModal(true)}
                                    className="bg-white border-rose-200 text-slate-900 dark:bg-slate-900 dark:border-rose-500/40 dark:text-white shadow-xs rounded-2xl p-5 space-y-3 hover:border-rose-400 dark:hover:border-rose-400 transition cursor-pointer relative group overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-2 h-full bg-rose-500"></div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30 rounded-xl group-hover:scale-105 transition">
                                                <Clock className="h-5 w-5 animate-pulse" />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold flex items-center gap-1.5">
                                                    Pengenalan SQL Lanjut <span className="text-[9px] bg-rose-100 text-rose-700 dark:bg-rose-500/25 dark:text-rose-200 px-2 py-0.5 rounded-full font-bold">Keterlambatan Tinggi</span>
                                                </h4>
                                                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium mt-0.5">Waktu penyelesaian tugas molor melebihi batas rata-rata.</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:underline">Detail ↗</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 py-2.5 border-y border-slate-200 dark:border-slate-800 text-xs">
                                        <div>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase block">RATA-RATA DURASI</span>
                                            <span className="text-sm font-black text-rose-600 dark:text-rose-400">4.5 Hari <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">(Normal: 2 Hari)</span></span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase block">STATUS TUGAS</span>
                                            <span className="text-sm font-black text-amber-600 dark:text-amber-400">14 Mahasiswa Terlambat</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* MODAL DETAIL CLOCK MERAH */}
            {showClockDetailModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 relative">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-black">Analisis Keterlambatan Tugas</h3>
                            </div>
                            <button onClick={() => setShowClockDetailModal(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-200 cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            <p className="font-semibold">
                                Modul <span className="text-rose-600 dark:text-rose-400 font-bold">Pengenalan SQL Lanjut</span> mendeteksi kendala durasi pengerjaan yang tidak biasa.
                            </p>
                            <div className="bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 p-3.5 rounded-xl space-y-2">
                                <div className="flex justify-between font-bold">
                                    <span className="text-slate-400 dark:text-slate-500">Estimasi Normal:</span>
                                    <span>2 Hari</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span className="text-slate-400 dark:text-slate-500">Rata-rata Kelas Saat Ini:</span>
                                    <span className="text-rose-600 dark:text-rose-400">4.5 Hari</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span className="text-slate-400 dark:text-slate-500">Mahasiswa Belum Submit:</span>
                                    <span className="text-amber-600 dark:text-amber-400">14 Orang</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                AI menyarankan Anda untuk memberikan perpanjangan tenggat waktu (deadline extension) atau membuka sesi tanya jawab khusus (Q&A session).
                            </p>
                        </div>

                        <div className="flex justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                            <Button
                                variant="outline"
                                onClick={() => setShowClockDetailModal(false)}
                                className="text-xs font-bold rounded-xl cursor-pointer bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                            >
                                Tutup
                            </Button>
                            <Button
                                onClick={() => {
                                    showToast('Tenggat waktu tugas berhasil diperpanjang 2 hari.');
                                    setShowClockDetailModal(false);
                                }}
                                className="bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white text-xs font-bold rounded-xl px-4 shadow-xs cursor-pointer"
                            >
                                Perpanjang Deadline 2 Hari
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL AI DEEP ANALYSIS */}
            {showAiModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 relative">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
                                    <Lightbulb className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-black">Analisis Mendalam & Saran AI</h3>
                            </div>
                            <button onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-200 cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            Evaluasi kinerja pembelajaran kelas Anda menunjukkan tren positif secara umum, namun perlu perhatian khusus pada manajemen tenggat waktu tugas praktikum di modul SQL lanjutan.
                        </p>
                        <div className="flex justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                            <Button onClick={() => setShowAiModal(false)} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-bold rounded-xl px-5 cursor-pointer">
                                Mengerti
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

ClassAnalyticsDosen.layout = (page: React.ReactNode) => page;