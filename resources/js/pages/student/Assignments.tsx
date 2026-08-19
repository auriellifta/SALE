import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, CheckCircle2, Clock, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentLayout from '@/layouts/student-layout';

type AssignmentType = 'mandiri' | 'kuis' | 'kelompok';
type AssignmentStatus = 'belum-dikerjakan' | 'belum-dimulai' | 'sudah-dikumpulkan';

type Assignment = {
    id: number;
    type: AssignmentType;
    typeLabel: string;
    title: string;
    course: string;
    deadlineLabel: string;
    deadlineUrgent?: boolean;
    deadlineStrikethrough?: boolean;
    status: AssignmentStatus;
    statusLabel: string;
    href: string;
};

// Dummy data — nanti diganti fetch/props Inertia dari controller
const activeAssignments: Assignment[] = [
    {
        id: 1,
        type: 'mandiri',
        typeLabel: 'Tugas Pemrograman',
        title: 'Implementasi Algoritma Sorting (Bubble Sort)',
        course: 'Struktur Data & Algoritma',
        deadlineLabel: 'Hari ini, 23:59 WIB',
        deadlineUrgent: true,
        status: 'belum-dikerjakan',
        statusLabel: 'Belum Dikerjakan',
        href: '/student/programming-task/1', // Mengarah ke Code Editor
    },
    {
        id: 2,
        type: 'kuis',
        typeLabel: 'Kuis Online',
        title: 'Kuis 2: Manajemen Memori',
        course: 'Sistem Operasi',
        deadlineLabel: 'Jum, 24 Okt • 10:00 WIB',
        status: 'belum-dimulai',
        statusLabel: 'Belum Dimulai',
        href: '/student/quiz/2', // Mengarah ke Kuis Pilihan Ganda
    },
    {
        id: 3,
        type: 'kelompok',
        typeLabel: 'Tugas Kelompok',
        title: 'Implementasi UI/UX Prototype',
        course: 'Desain Antarmuka Pengguna',
        deadlineLabel: 'Rab, 22 Okt • 23:59 WIB',
        deadlineStrikethrough: true,
        status: 'sudah-dikumpulkan',
        statusLabel: 'Sudah Dikumpulkan',
        href: '/student/assignments/3',
    },
];

const historyAssignments: Assignment[] = [];

const typeIconMap: Record<
    AssignmentType,
    { icon: typeof AlertTriangle; wrapClass: string }
> = {
    mandiri: {
        icon: AlertTriangle,
        wrapClass: 'bg-red-50 text-sale-danger',
    },
    kuis: {
        icon: HelpCircle,
        wrapClass: 'bg-blue-50 text-sale-blue',
    },
    kelompok: {
        icon: CheckCircle2,
        wrapClass: 'bg-green-50 text-sale-green',
    },
};

const statusBadgeClass: Record<AssignmentStatus, string> = {
    'belum-dikerjakan':
        'border-transparent bg-red-50 text-sale-danger hover:bg-red-50',
    'belum-dimulai':
        'border-transparent bg-blue-50 text-sale-blue hover:bg-blue-50',
    'sudah-dikumpulkan':
        'border-transparent bg-green-50 text-sale-green hover:bg-green-50',
};

function AssignmentRow({ item }: { item: Assignment }) {
    const { icon: Icon, wrapClass } = typeIconMap[item.type];

    return (
        <Link
            href={item.href}
            className="flex items-center gap-4 border-t border-sale-border px-6 py-5 first:border-t-0 hover:bg-muted/30"
        >
            <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${wrapClass}`}
            >
                <Icon className="size-5" />
            </span>

            <div className="min-w-0 flex-[2]">
                <Badge className="rounded-full border-transparent bg-blue-50 text-[11px] font-medium text-sale-blue hover:bg-blue-50">
                    {item.typeLabel.toUpperCase()}
                </Badge>
                <p className="mt-1.5 truncate font-poppins font-semibold text-sale-dark">
                    {item.title}
                </p>
            </div>

            <div className="hidden flex-1 text-sm text-sale-muted sm:block">
                {item.course}
            </div>

            <div className="hidden flex-1 items-center gap-1.5 text-sm md:flex">
                <Clock
                    className={`size-3.5 shrink-0 ${
                        item.deadlineUrgent ? 'text-sale-danger' : 'text-sale-muted'
                    }`}
                />
                <span
                    className={[
                        item.deadlineUrgent
                            ? 'font-medium text-sale-danger'
                            : 'text-sale-muted',
                        item.deadlineStrikethrough ? 'line-through' : '',
                    ].join(' ')}
                >
                    {item.deadlineLabel}
                </span>
            </div>

            <div className="shrink-0">
                <Badge className={`rounded-full font-medium ${statusBadgeClass[item.status]}`}>
                    {item.statusLabel}
                </Badge>
            </div>
        </Link>
    );
}

function AssignmentTable({ items }: { items: Assignment[] }) {
    if (items.length === 0) {
        return (
            <Card className="rounded-2xl border-sale-border bg-sale-white p-10 text-center text-sm text-sale-muted">
                Belum ada data untuk ditampilkan.
            </Card>
        );
    }

    return (
        <Card className="gap-0 overflow-hidden rounded-2xl border-sale-border bg-sale-white py-0">
            <div className="hidden items-center gap-4 px-6 py-3 text-xs font-medium text-sale-muted uppercase md:flex">
                <span className="size-10 shrink-0" />
                <span className="flex-[2]">Detail Penugasan</span>
                <span className="flex-1">Mata Kuliah</span>
                <span className="flex-1">Batas Waktu</span>
                <span className="w-[150px] shrink-0">Status</span>
            </div>

            <div>
                {items.map((item) => (
                    <AssignmentRow key={item.id} item={item} />
                ))}
            </div>
        </Card>
    );
}

export default function Assignments() {
    return (
        <StudentLayout>
            <Head title="Tugas & Kuis" />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-16 py-[21px]">
                <div className="flex items-center gap-2 text-sm text-sale-muted">
                    <Link href="/student/dashboard" className="hover:text-sale-dark">
                        Beranda
                    </Link>
                    <span>›</span>
                    <span className="font-medium text-sale-blue">
                        Tugas & Kuis
                    </span>
                </div>

                <Tabs defaultValue="active" className="mt-4">
                    <TabsList>
                        <TabsTrigger value="active">
                            Aktif & Mendatang
                        </TabsTrigger>
                        <TabsTrigger value="history">Riwayat</TabsTrigger>
                    </TabsList>

                    <TabsContent value="active" className="mt-6">
                        <AssignmentTable items={activeAssignments} />
                    </TabsContent>

                    <TabsContent value="history" className="mt-6">
                        <AssignmentTable items={historyAssignments} />
                    </TabsContent>
                </Tabs>
            </div>
        </StudentLayout>
    );
}