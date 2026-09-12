import { Head, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    Bell,
    CheckCheck,
    MessageSquare,
    Sparkles,
    Star,
    CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LecturerSidebar from '@/components/sale/LecturerSidebar';
import LecturerTopbar from '@/components/sale/LecturerTopbar';

type NotificationVariant = 'submission' | 'deadline' | 'ai' | 'forum' | 'system';

type NotificationItem = {
    id: number;
    variant: NotificationVariant;
    title: string;
    badge?: string;
    description: string;
    time: string;
    action?: { label: string; href: string };
};

const initialTodayNotifications: NotificationItem[] = [
    {
        id: 1,
        variant: 'submission',
        title: 'Pengumpulan Tugas Baru: CS101',
        description:
            '35 dari 40 mahasiswa telah mengumpulkan tugas "Implementasi Algoritma Sorting". 5 mahasiswa belum mengumpulkan.',
        time: '10:42',
        action: { label: 'Periksa Tugas', href: '/dosen/assignments' },
    },
    {
        id: 2,
        variant: 'deadline',
        title: 'Batas Akhir Penilaian UTS Mendekat',
        description:
            'Batas waktu penginputan dan verifikasi nilai Ujian Tengah Semester untuk mata kuliah Basis Data berakhir hari ini pukul 23:59 WIB.',
        time: '08:15',
        action: { label: 'Buka Gradebook', href: '/dosen/grades' },
    },
    {
        id: 3,
        variant: 'ai',
        title: 'Rekomendasi AI Teaching Analytics',
        badge: 'Sistem',
        description:
            'Berdasarkan data minggu ke-7, 14 mahasiswa mengalami keterlambatan pada modul SQL Lanjut. Disarankan membuka sesi tanya jawab.',
        time: '06:00',
        action: { label: 'Lihat Analitik', href: '/dosen/analytics' },
    },
];

const initialYesterdayNotifications: NotificationItem[] = [
    {
        id: 4,
        variant: 'forum',
        title: 'Pertanyaan Baru di Forum Diskusi',
        description:
            'Budi Santoso mengajukan pertanyaan baru pada topik "Implementasi Basis Data Relasional".',
        time: 'Kemarin',
        action: { label: 'Buka Forum', href: '/dosen/forum' },
    },
    {
        id: 5,
        variant: 'system',
        title: 'Pemberitahuan Pemeliharaan Server E-Learning',
        description:
            'Sistem e-learning SALE akan menjalani pemeliharaan terjadwal pada hari Jumat pukul 02.00 hingga 05.00 WIB.',
        time: 'Kemarin',
    },
];

const variantIcons: Record<NotificationVariant, typeof Star> = {
    submission: Star,
    deadline: AlertTriangle,
    ai: Sparkles,
    forum: MessageSquare,
    system: Bell,
};

function NotificationRow({ item }: { item: NotificationItem }) {
    const Icon = variantIcons[item.variant];

    return (
        <div className="flex items-start gap-4 p-6 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors text-left">
            <Icon className="size-5 text-slate-800 dark:text-slate-200 shrink-0 mt-0.5" />

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {item.title}
                        </h3>
                        {item.badge && (
                            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                                • {item.badge}
                            </span>
                        )}
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0 font-medium">
                        {item.time}
                    </span>
                </div>

                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                </p>

                {item.action && (
                    <Link
                        href={item.action.href}
                        className="mt-2.5 inline-block text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        {item.action.label} →
                    </Link>
                )}
            </div>
        </div>
    );
}

export default function NotificationsDosen() {
    const [todayList] = useState(initialTodayNotifications);
    const [yesterdayList] = useState(initialYesterdayNotifications);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <>
            <Head title="Notifikasi Dosen — SALE" />

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
                    <main className="flex-1 p-5 sm:p-6 md:p-8 space-y-6 mt-16 max-w-4xl w-full mx-auto">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <Link
                                    href="/dosen/dashboard"
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <span>›</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-100">
                                    Notifikasi
                                </span>
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => showToast('Semua notifikasi ditandai sudah dibaca.')}
                                className="gap-2 text-xs font-bold h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                            >
                                <CheckCheck className="size-4 text-slate-800 dark:text-slate-200" />
                                Tandai semua sudah dibaca
                            </Button>
                        </div>

                        {/* Hari Ini Group Card */}
                        <div className="space-y-3">
                            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                Hari Ini
                            </h2>

                            <Card className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs divide-y divide-slate-100 dark:divide-slate-800/60 p-0">
                                {todayList.map((item) => (
                                    <NotificationRow key={item.id} item={item} />
                                ))}
                            </Card>
                        </div>

                        {/* Kemarin Group Card */}
                        <div className="space-y-3 pt-4">
                            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                Kemarin
                            </h2>

                            <Card className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs divide-y divide-slate-100 dark:divide-slate-800/60 p-0">
                                {yesterdayList.map((item) => (
                                    <NotificationRow key={item.id} item={item} />
                                ))}
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

NotificationsDosen.layout = (page: React.ReactNode) => page;