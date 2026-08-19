import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, Bell, CheckCheck, MessageSquare, Sparkles, Star } from 'lucide-react';
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

const todayNotifications: NotificationItem[] = [
    {
        id: 1,
        variant: 'grade',
        title: 'Nilai Baru: Matematika Lanjutan',
        description:
            'Tugas tengah semester Anda telah dinilai. Anda memperoleh nilai 92/100. Kerja bagus pada bagian pembuktian akhir.',
        time: '10:42',
        action: { label: 'Lihat Hasil', href: '#' },
    },
    {
        id: 2,
        variant: 'deadline',
        title: 'Tenggat Tugas Mendekat',
        description:
            '"Draf Esai: Strukturalisme" harus dikumpulkan dalam 4 jam. Pastikan Anda mengumpulkannya sebelum pukul 13.00 untuk menghindari penalti keterlambatan.',
        time: '08:15',
    },
    {
        id: 3,
        variant: 'ai',
        title: 'Rekomendasi Belajar AI',
        badge: 'SISTEM',
        description:
            'Berdasarkan hasil kuis terbaru Anda pada Struktur Data, kami merekomendasikan untuk mempelajari kembali modul "Binary Search Trees". Kami telah menyiapkan 3 latihan untuk Anda.',
        time: '06:00',
        action: { label: 'Mulai Belajar', href: '#' },
    },
];

const yesterdayNotifications: NotificationItem[] = [
    {
        id: 4,
        variant: 'forum',
        title: 'Balasan Baru di Diskusi: Bacaan Minggu ke-3',
        description:
            'Prof. Anderson membalas komentar Anda mengenai dampak sosial ekonomi yang dibahas pada bab 4.',
        time: 'Kemarin',
    },
    {
        id: 5,
        variant: 'system',
        title: 'Pemberitahuan Pemeliharaan Perpustakaan',
        description:
            'Katalog perpustakaan digital pusat akan menjalani pemeliharaan terjadwal pada hari Jumat mulai pukul 02.00 hingga 05.00.',
        time: 'Kemarin',
    },
];

const variantStyles: Record<
    NotificationVariant,
    { icon: typeof Star; iconWrap: string; borderClass: string; highlight?: boolean }
> = {
    grade: {
        icon: Star,
        iconWrap: 'bg-blue-50 text-sale-blue',
        borderClass: 'border-l-sale-blue',
    },
    deadline: {
        icon: AlertTriangle,
        iconWrap: 'bg-orange-50 text-sale-orange',
        borderClass: 'border-l-sale-orange',
    },
    ai: {
        icon: Sparkles,
        iconWrap: 'bg-blue-50 text-sale-blue',
        borderClass: 'border-l-sale-blue',
        highlight: true,
    },
    forum: {
        icon: MessageSquare,
        iconWrap: 'bg-slate-100 text-sale-muted',
        borderClass: 'border-l-transparent',
    },
    system: {
        icon: Bell,
        iconWrap: 'bg-slate-100 text-sale-muted',
        borderClass: 'border-l-transparent',
    },
};

function NotificationCard({ item }: { item: NotificationItem }) {
    const { icon: Icon, iconWrap, borderClass, highlight } =
        variantStyles[item.variant];

    return (
        <Card
            className={[
                'flex-row items-start gap-4 rounded-xl border-l-4 bg-sale-white p-5',
                borderClass,
                highlight ? 'bg-blue-50/40 border-sale-border' : 'border-sale-border',
            ].join(' ')}
        >
            <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-full ${iconWrap}`}
            >
                <Icon className="size-4" />
            </span>

            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-poppins font-semibold text-sale-dark">
                            {item.title}
                        </h3>
                        {item.badge && (
                            <Badge className="rounded-md border-transparent bg-sale-blue text-[10px] font-bold text-white hover:bg-sale-blue">
                                {item.badge}
                            </Badge>
                        )}
                    </div>
                    <span className="shrink-0 text-xs text-sale-muted">
                        {item.time}
                    </span>
                </div>

                <p className="mt-1.5 text-sm leading-relaxed text-sale-muted">
                    {item.description}
                </p>

                {item.action && (
                    <Link
                        href={item.action.href}
                        className={
                            item.variant === 'ai'
                                ? 'mt-3 inline-block rounded-lg bg-sale-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-600'
                                : 'mt-2 inline-block text-sm font-medium text-sale-blue hover:underline'
                        }
                    >
                        {item.action.label}
                    </Link>
                )}
            </div>
        </Card>
    );
}

export default function Notifications() {
    return (
        <StudentLayout>
            <Head title="Notifikasi" />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-16 py-[21px]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-sale-muted">
                        <Link
                            href="/student/dashboard"
                            className="hover:text-sale-dark"
                        >
                            Dashboard
                        </Link>
                        <span>›</span>
                        <span className="font-medium text-sale-dark">
                            Notifikasi
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        className="gap-2 rounded-full border-sale-blue text-sale-blue hover:bg-blue-50"
                    >
                        <CheckCheck className="size-4" />
                        Tandai semua sudah dibaca
                    </Button>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                        <h2 className="font-poppins text-lg font-semibold text-sale-dark">
                            Hari Ini
                        </h2>
                        <Badge className="rounded-full border-transparent bg-blue-50 text-xs font-medium text-sale-blue hover:bg-blue-50">
                            {todayNotifications.length} Baru
                        </Badge>
                    </div>

                    <div className="space-y-3">
                        {todayNotifications.map((item) => (
                            <NotificationCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    <h2 className="font-poppins text-lg font-semibold text-sale-dark">
                        Kemarin
                    </h2>

                    <div className="space-y-3">
                        {yesterdayNotifications.map((item) => (
                            <NotificationCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}