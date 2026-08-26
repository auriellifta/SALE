import { Head, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    Code2,
    HelpCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';
import { getAssignmentHref } from '@/lib/assignment-routing';
import type { SubmissionMode } from '@/lib/assignment-routing';
import StudentLayout from '@/layouts/student-layout';

type AssignmentType =
    | 'mandiri'
    | 'kuis'
    | 'kelompok'
    | 'pemrograman';

type AssignmentStatus =
    | 'belum-dikerjakan'
    | 'belum-dimulai'
    | 'sudah-dikumpulkan';

type Assignment = {
    id: number;
    type: AssignmentType;
    typeLabel: string;
    submissionMode: SubmissionMode;
    title: string;
    course: string;
    deadlineLabel: string;
    deadlineUrgent?: boolean;
    deadlineStrikethrough?: boolean;
    status: AssignmentStatus;
    statusLabel: string;
};

const activeAssignments: Assignment[] = [
    {
        id: 1,
        type: 'pemrograman',
        typeLabel: 'Tugas Pemrograman',
        submissionMode: 'programming',
        title: 'Implementasi Algoritma Sorting (Bubble Sort)',
        course: 'Struktur Data & Algoritma',
        deadlineLabel: 'Hari ini, 23:59 WIB',
        deadlineUrgent: true,
        status: 'belum-dikerjakan',
        statusLabel: 'Belum Dikerjakan',
    },
    {
        id: 2,
        type: 'kuis',
        typeLabel: 'Kuis Online',
        submissionMode: 'quiz',
        title: 'Kuis 2: Manajemen Memori',
        course: 'Sistem Operasi',
        deadlineLabel: 'Jum, 24 Okt • 10:00 WIB',
        status: 'belum-dimulai',
        statusLabel: 'Belum Dimulai',
    },
    {
        id: 3,
        type: 'kelompok',
        typeLabel: 'Tugas Kelompok',
        submissionMode: 'classroom',
        title: 'Implementasi UI/UX Prototype',
        course: 'Desain Antarmuka Pengguna',
        deadlineLabel: 'Rab, 22 Okt • 23:59 WIB',
        deadlineStrikethrough: true,
        status: 'sudah-dikumpulkan',
        statusLabel: 'Sudah Dikumpulkan',
    },
];

const historyAssignments: Assignment[] = [];

const typeIconMap: Record<
    AssignmentType,
    {
        icon: typeof AlertTriangle;
        wrapClass: string;
    }
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
    pemrograman: {
        icon: Code2,
        wrapClass: 'bg-orange-50 text-sale-orange',
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
    const href = getAssignmentHref(item.id, item.submissionMode);

    return (
        <Link
            href={href}
            className="group grid grid-cols-1 items-start gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50 md:grid-cols-12 md:items-center md:gap-4"
        >
            {/* Detail Penugasan */}
            <div className="flex min-w-0 items-center gap-4 md:col-span-5">
                <Icon
                    className={`size-5 shrink-0 ${
                        item.type === 'pemrograman'
                            ? 'text-sale-orange'
                            : item.type === 'kuis'
                              ? 'text-sale-blue'
                              : item.type === 'kelompok'
                                ? 'text-sale-green'
                                : 'text-sale-danger'
                    }`}
                />

                <div className="min-w-0">
                    <p className="truncate font-poppins text-sm font-semibold leading-snug text-sale-dark transition-colors group-hover:text-sale-blue">
                        {item.title}
                    </p>

                    <p className="mt-1 text-xs text-sale-muted">
                        {item.typeLabel}
                    </p>
                </div>
            </div>

            {/* Mata Kuliah */}
            <div className="min-w-0 text-sm text-sale-muted md:col-span-3">
                <span className="mr-1 font-medium md:hidden">
                    Mata Kuliah:
                </span>

                <span className="truncate">
                    {item.course}
                </span>
            </div>

            {/* Batas Waktu */}
            <div className="flex items-center gap-1.5 text-sm md:col-span-2">
                <Clock
                    className={`size-3.5 shrink-0 ${
                        item.deadlineUrgent
                            ? 'text-sale-danger'
                            : 'text-sale-muted'
                    }`}
                />

                <span
                    className={[
                        item.deadlineUrgent
                            ? 'font-medium text-sale-danger'
                            : 'text-sale-muted',
                        item.deadlineStrikethrough
                            ? 'line-through'
                            : '',
                    ].join(' ')}
                >
                    {item.deadlineLabel}
                </span>
            </div>

            {/* Status */}
            <div className="md:col-span-2">
                <Badge
                    className={`rounded-full border-transparent px-3 py-1 text-xs font-medium ${statusBadgeClass[item.status]}`}
                >
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
        <Card className="gap-0 overflow-hidden rounded-2xl border-sale-border bg-sale-white py-0 shadow-sm">
            <div className="hidden grid-cols-12 items-center gap-4 border-b border-sale-border bg-slate-50/70 px-6 py-4 text-xs font-medium uppercase tracking-wide text-sale-muted md:grid">
                <div className="col-span-5">
                    Detail Penugasan
                </div>

                <div className="col-span-3">
                    Mata Kuliah
                </div>

                <div className="col-span-2">
                    Batas Waktu
                </div>

                <div className="col-span-2">
                    Status
                </div>
            </div>

            <div className="divide-y divide-sale-border">
                {items.map((item) => (
                    <AssignmentRow
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
        </Card>
    );
}

export default function Assignments() {
    return (
        <StudentLayout>
            <Head title="Tugas & Kuis" />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-4 py-6 sm:px-6 md:px-10 lg:px-16 lg:py-[21px]">
                <div className="flex items-center gap-2 text-sm text-sale-muted">
                    <Link
                        href="/student/dashboard"
                        className="transition-colors hover:text-sale-dark"
                    >
                        Beranda
                    </Link>

                    <span>›</span>

                    <span className="font-medium text-sale-blue">
                        Tugas & Kuis
                    </span>
                </div>

                <Tabs
                    defaultValue="active"
                    className="mt-5"
                >
                    <TabsList className="h-auto gap-8 rounded-none border-b border-sale-border bg-transparent p-0">
                        <TabsTrigger
                            value="active"
                            className="relative rounded-none border-0 bg-transparent px-0 pb-3 pt-0 text-sm font-semibold text-sale-muted shadow-none transition-colors hover:text-sale-blue data-[state=active]:bg-transparent data-[state=active]:text-sale-blue data-[state=active]:shadow-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-sale-blue after:opacity-0 data-[state=active]:after:opacity-100"
                        >
                            Aktif & Mendatang ({activeAssignments.length})
                        </TabsTrigger>

                        <TabsTrigger
                            value="history"
                            className="relative rounded-none border-0 bg-transparent px-0 pb-3 pt-0 text-sm font-semibold text-sale-muted shadow-none transition-colors hover:text-sale-blue data-[state=active]:bg-transparent data-[state=active]:text-sale-blue data-[state=active]:shadow-none after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-sale-blue after:opacity-0 data-[state=active]:after:opacity-100"
                        >
                            Riwayat ({historyAssignments.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent
                        value="active"
                        className="mt-6"
                    >
                        <AssignmentTable
                            items={activeAssignments}
                        />
                    </TabsContent>

                    <TabsContent
                        value="history"
                        className="mt-6"
                    >
                        <AssignmentTable
                            items={historyAssignments}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </StudentLayout>
    );
}