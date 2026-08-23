import { Head, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    Bell,
    CheckCheck,
    MessageSquare,
    Sparkles,
    Star,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import StudentLayout from '@/layouts/student-layout';

type NotificationVariant = 'grade' | 'deadline' | 'ai' | 'forum' | 'system';

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
        variant: 'grade',
        title: 'Nilai Baru: Interaksi Manusia & Komputer',
        description:
            'Tugas evaluasi heuristik Anda telah dinilai. Anda memperoleh nilai 92/100. Kerja bagus pada bagian lembar observasi partisipan.',
        time: '10:42',
        action: { label: 'Lihat Hasil', href: '/student/assignments' },
    },
    {
        id: 2,
        variant: 'deadline',
        title: 'Tenggat Tugas Mendekat',
        description:
            '"Implementasi Algoritma Sorting (Bubble Sort)" harus dikumpulkan hari ini sebelum pukul 23:59 WIB.',
        time: '08:15',
        action: { label: 'Buka Editor', href: '/student/programming-task/1' },
    },
    {
        id: 3,
        variant: 'ai',
        title: 'Rekomendasi Belajar AI',
        badge: 'SISTEM',
        description:
            'Berdasarkan hasil kuis terbaru pada Struktur Data, kami merekomendasikan untuk mempelajari kembali modul "Binary Search Trees".',
        time: '06:00',
        action: { label: 'Mulai Belajar', href: '/student/quiz/1' },
    },
];

const initialYesterdayNotifications: NotificationItem[] = [
    {
        id: 4,
        variant: 'forum',
        title: 'Balasan Baru di Forum Diskusi',
        description:
            'Dr. Budi Santoso membalas pertanyaan Anda mengenai alokasi memori pointer di C++.',
        time: 'Kemarin',
        action: { label: 'Buka Forum', href: '/student/forum' },
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
    grade: Star,
    deadline: AlertTriangle,
    ai: Sparkles,
    forum: MessageSquare,
    system: Bell,
};

function NotificationCard({ item }: { item: NotificationItem }) {
    const Icon = variantIcons[item.variant];

    return (
        <Card className="rounded-xl border border-border bg-card p-5 shadow-xs transition-colors hover:border-foreground/30">
            <div className="flex items-start gap-4">
                <Icon className="size-4.5 text-muted-foreground shrink-0 mt-0.5" />

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-foreground">
                                {item.title}
                            </h3>
                            {item.badge && (
                                <Badge variant="secondary" className="text-[10px] font-bold">
                                    {item.badge}
                                </Badge>
                            )}
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">
                            {item.time}
                        </span>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                    </p>

                    {item.action && (
                        <Link
                            href={item.action.href}
                            className="mt-2.5 inline-block text-xs font-semibold text-foreground hover:underline"
                        >
                            {item.action.label} →
                        </Link>
                    )}
                </div>
            </div>
        </Card>
    );
}

export default function Notifications() {
    const [todayList] = useState(initialTodayNotifications);
    const [yesterdayList] = useState(initialYesterdayNotifications);

    return (
        <StudentLayout>
            <Head title="Notifikasi — SALE" />

            <div className="space-y-6 max-w-4xl mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link
                            href="/student/dashboard"
                            className="hover:text-foreground transition-colors"
                        >
                            Dashboard
                        </Link>
                        <span>›</span>
                        <span className="font-medium text-foreground">
                            Notifikasi
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        className="gap-2 text-xs font-semibold h-9 rounded-lg"
                    >
                        <CheckCheck className="size-4" />
                        Tandai semua sudah dibaca
                    </Button>
                </div>

                {/* Hari Ini */}
                <div className="space-y-3.5">
                    <div className="flex items-center gap-2.5">
                        <h2 className="text-base font-semibold text-foreground">
                            Hari Ini
                        </h2>
                        <Badge variant="secondary" className="text-xs">
                            {todayList.length} Baru
                        </Badge>
                    </div>

                    <div className="space-y-3">
                        {todayList.map((item) => (
                            <NotificationCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                {/* Kemarin */}
                <div className="space-y-3.5 pt-2">
                    <h2 className="text-base font-semibold text-foreground">
                        Kemarin
                    </h2>

                    <div className="space-y-3">
                        {yesterdayList.map((item) => (
                            <NotificationCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}