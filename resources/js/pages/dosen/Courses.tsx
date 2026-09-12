import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Users,
    Clock,
    AlertCircle,
    Sparkles,
    MoreVertical,
    ChevronDown,
    CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LecturerSidebar from '@/components/sale/LecturerSidebar';
import LecturerTopbar from '@/components/sale/LecturerTopbar';

export default function MyCoursesDosen() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Data Mata Kuliah
    const courses = [
        {
            code: 'IF204',
            name: 'Basis Data',
            class: 'Kelas TI-3A',
            students: 32,
            schedule: 'Senin, 08:00 - 10:30 • Ruang 401',
            progressText: 'Pertemuan 8 dari 16',
            progressPercent: 50,
            progressColor: 'bg-blue-600',
            alert: {
                type: 'warning',
                text: '2 Tugas (Kuis 1 & Tugas Besar) perlu dinilai.'
            },
            isArchived: false
        },
        {
            code: 'IF301',
            name: 'Kecerdasan Buatan',
            class: 'Kelas TI-5B',
            students: 40,
            schedule: 'Selasa, 13:00 - 15:30 • Lab Komputer 2',
            progressText: 'Pertemuan 7 dari 16',
            progressPercent: 43,
            progressColor: 'bg-amber-600',
            aiInsight: 'Tingkat kehadiran kelas ini stabil di 95%. Performa kuis terakhir meningkat.',
            isArchived: false
        },
        {
            code: 'IF405',
            name: 'Pemrograman Web Lanjut',
            class: 'Kelas TI-6A',
            students: 35,
            schedule: 'Rabu, 10:00 - 12:30 • Lab Komputer 1',
            progressText: 'Pertemuan 9 dari 16',
            progressPercent: 56,
            progressColor: 'bg-emerald-600',
            aiInsight: 'Antusiasme mahasiswa tinggi pada modul Framework Modern.',
            isArchived: false
        },
        {
            code: 'IF102',
            name: 'Algoritma dan Pemrograman',
            class: 'Kelas TI-1C',
            students: 45,
            schedule: 'Kamis, 08:00 - 10:30 • Ruang 302',
            progressText: 'Pertemuan 10 dari 16',
            progressPercent: 62,
            progressColor: 'bg-blue-600',
            alert: {
                type: 'warning',
                text: 'Nilai UTS belum di-input ke sistem.'
            },
            isArchived: false
        },
        {
            code: 'IF310',
            name: 'Grafika Komputer',
            class: 'Kelas TI-5A',
            students: 26,
            schedule: 'Jumat, 13:00 - 15:30 • Lab Multimedia',
            progressText: 'Pertemuan 6 dari 16',
            progressPercent: 37,
            progressColor: 'bg-purple-600',
            isArchived: false
        },
        {
            code: 'SE102',
            name: 'Pengantar Rekayasa Perangkat Lunak',
            class: 'Kelas SE-1A',
            students: 28,
            schedule: 'Jumat, 09:00 - 11:30 • Ruang 305',
            statusText: 'Selesai (Semester Lalu)',
            isArchived: true
        }
    ];

    return (
        <>
            <Head title="Mata Kuliah Saya - SALE" />

            <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex">
                
                {/* TOAST NOTIFICATION */}
                {toastMessage && (
                    <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>{toastMessage}</span>
                    </div>
                )}

                {/* SIDEBAR TERPUSAT */}
                <LecturerSidebar />

                {/* MAIN CONTAINER */}
                <div className="flex-1 flex flex-col min-w-0 md:ml-[280px]">
                    
                    {/* TOPBAR */}
                    <LecturerTopbar
                        onOpenMobileMenu={() => setMobileMenuOpen(true)}
                    />
                    
                    {/* CONTENT */}
                    <main className="flex-1 w-full max-w-7xl px-6 md:px-8 pb-12 pt-6 md:pt-8 mt-16">

                        {/* HEADER */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                    Mata Kuliah Saya
                                </h1>

                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Kelola seluruh mata kuliah dan kelas yang Anda ampu.
                                </p>
                            </div>

                            {/* Dropdown Filter Semester */}
                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/70 rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer">
                                <span>Semester Ganjil 2026/2027</span>
                                <ChevronDown className="h-4 w-4 text-slate-400" />
                            </button>
                        </div>

                        {/* CARDS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                            {courses.map((course, i) => (
                                <Card key={i} className="bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs rounded-2xl flex flex-col justify-between overflow-hidden transition">
                                    <CardContent className="p-6 space-y-4">
                                        {/* Top Badge & Action */}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-md">
                                                {course.code}
                                            </span>
                                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer">
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Title & Info */}
                                        <div>
                                            <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                                                {course.name}
                                            </h3>
                                            <div className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-3.5 w-3.5 text-slate-400" />
                                                    <span>{course.class} • {course.students} Mahasiswa</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                                                    <span>{course.schedule}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Section (Active Course) */}
                                        {!course.isArchived && (
                                            <div className="bg-blue-50/50 dark:bg-slate-800/40 border border-blue-100/60 dark:border-slate-700/60 p-3.5 rounded-xl space-y-2">
                                                <div className="flex justify-between items-center text-[11px] font-bold">
                                                    <span className="text-slate-400 uppercase tracking-wider text-[10px]">PROGRESS PERKULIAHAN</span>
                                                    <span className="text-blue-600 dark:text-blue-400">{course.progressText}</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-200/70 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className={`h-full ${course.progressColor} rounded-full`} style={{ width: `${course.progressPercent}%` }}></div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Status Section (Archived Course) */}
                                        {course.isArchived && (
                                            <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/60 p-3.5 rounded-xl space-y-2">
                                                <div className="flex justify-between items-center text-[11px]">
                                                    <span className="text-slate-400 uppercase tracking-wider font-bold text-[10px]">STATUS</span>
                                                    <span className="text-slate-400 font-medium">{course.statusText}</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                            </div>
                                        )}

                                        {/* Warning Alert */}
                                        {course.alert && (
                                            <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 p-3.5 rounded-xl flex items-start gap-2.5">
                                                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                                                <div className="text-xs font-medium leading-tight">
                                                    <p className="font-bold text-rose-800 dark:text-rose-400">Perlu Perhatian</p>
                                                    <p className="mt-0.5">{course.alert.text}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* AI Insight Alert */}
                                        {course.aiInsight && (
                                            <div className="bg-indigo-50/70 dark:bg-blue-950/30 border border-indigo-100 dark:border-blue-900/50 text-indigo-900 dark:text-blue-200 p-3.5 rounded-xl flex items-start gap-2.5">
                                                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                                <div className="text-xs leading-relaxed">
                                                    <p className="font-bold text-indigo-700 dark:text-blue-400">AI Insight</p>
                                                    <p className="mt-0.5 text-slate-600 dark:text-slate-300">{course.aiInsight}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="pt-2 space-y-2">
                                            {!course.isArchived ? (
                                                <>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Link href="/dosen/materials">
                                                            <Button variant="outline" className="w-full text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 py-2 h-auto cursor-pointer">
                                                                Kelola Materi
                                                            </Button>
                                                        </Link>
                                                        <Link href="/dosen/grades">
                                                            <Button variant="outline" className="w-full text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 py-2 h-auto cursor-pointer">
                                                                Penilaian
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl py-2.5 h-auto cursor-pointer shadow-sm shadow-blue-500/25">
                                                        Lihat Kelas
                                                    </Button>
                                                </>
                                            ) : (
                                                <Button variant="outline" className="w-full text-xs font-bold bg-slate-50/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 py-2.5 h-auto mt-auto cursor-pointer">
                                                    Lihat Arsip Kelas
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

MyCoursesDosen.layout = (page: React.ReactNode) => page;