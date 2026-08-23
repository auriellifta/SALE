import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle2,
    Clock,
    Code2,
    FileText,
    HelpCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAssignmentHref } from '@/lib/assignment-routing';
import type { SubmissionMode } from '@/lib/assignment-routing';
import StudentLayout from '@/layouts/student-layout';

type AssignmentType = 'mandiri' | 'kuis' | 'kelompok' | 'pemrograman';
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

const typeIconMap: Record<AssignmentType, typeof FileText> = {
    mandiri: FileText,
    kuis: HelpCircle,
    kelompok: CheckCircle2,
    pemrograman: Code2,
};

function StatusBadge({ status, label }: { status: AssignmentStatus; label: string }) {
    if (status === 'sudah-dikumpulkan') {
        return (
            <Badge variant="secondary" className="font-medium text-xs">
                {label}
            </Badge>
        );
    }
    return (
        <Badge variant="outline" className="font-normal text-xs text-muted-foreground border-border">
            {label}
        </Badge>
    );
}

function AssignmentRow({ item }: { item: Assignment }) {
    const Icon = typeIconMap[item.type];
    const href = getAssignmentHref(item.id, item.submissionMode);

    return (
        <Link
            href={href}
            className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-4 px-6 py-4.5 hover:bg-accent/40 transition-colors group text-left"
        >
            {/* Col 1-5: Detail Penugasan with large icon vertically centered */}
            <div className="flex items-center gap-4 min-w-0 md:col-span-5 text-left">
                <Icon className="size-5 text-muted-foreground shrink-0" />

                <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate group-hover:underline">
                        {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {item.typeLabel}
                    </p>
                </div>
            </div>

            {/* Col 6-8: Mata Kuliah */}
            <div className="text-xs text-muted-foreground md:col-span-3 truncate text-left">
                <span className="md:hidden font-semibold text-foreground">Mata Kuliah: </span>
                {item.course}
            </div>

            {/* Col 9-10: Batas Waktu */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground md:col-span-2 text-left">
                <Clock className="size-3.5 shrink-0 text-muted-foreground" />
                <span className={item.deadlineStrikethrough ? 'line-through' : ''}>
                    {item.deadlineLabel}
                </span>
            </div>

            {/* Col 11-12: Status (Clean monochrome badge) */}
            <div className="md:col-span-2 text-left">
                <StatusBadge status={item.status} label={item.statusLabel} />
            </div>
        </Link>
    );
}

function AssignmentTable({ items }: { items: Assignment[] }) {
    if (items.length === 0) {
        return (
            <Card className="rounded-xl border border-border bg-card p-10 text-center text-sm text-muted-foreground shadow-xs">
                Belum ada data riwayat penugasan untuk ditampilkan.
            </Card>
        );
    }

    return (
        <Card className="gap-0 overflow-hidden rounded-xl border border-border bg-card py-0 shadow-xs">
            {/* Header */}
            <div className="hidden grid-cols-12 items-center gap-4 px-6 py-3.5 text-xs font-semibold text-muted-foreground uppercase border-b border-border bg-muted/40 md:grid text-left">
                <div className="col-span-5 text-left">Detail Penugasan</div>
                <div className="col-span-3 text-left">Mata Kuliah</div>
                <div className="col-span-2 text-left">Batas Waktu</div>
                <div className="col-span-2 text-left">Status</div>
            </div>

            <div className="divide-y divide-border">
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
            <Head title="Tugas & Kuis — SALE" />

            <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/student/dashboard" className="hover:text-foreground transition-colors">
                        Beranda
                    </Link>
                    <span>›</span>
                    <span className="font-medium text-foreground">
                        Tugas & Kuis
                    </span>
                </div>

                <Tabs defaultValue="active" className="space-y-6">
                    <TabsList className="bg-muted p-1 h-10">
                        <TabsTrigger value="active" className="text-xs sm:text-sm font-medium px-4">
                            Aktif & Mendatang ({activeAssignments.length})
                        </TabsTrigger>
                        <TabsTrigger value="history" className="text-xs sm:text-sm font-medium px-4">
                            Riwayat ({historyAssignments.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="active" className="mt-0">
                        <AssignmentTable items={activeAssignments} />
                    </TabsContent>

                    <TabsContent value="history" className="mt-0">
                        <AssignmentTable items={historyAssignments} />
                    </TabsContent>
                </Tabs>
            </div>
        </StudentLayout>
    );
}