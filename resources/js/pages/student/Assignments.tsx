import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle2,
    Clock,
    Code2,
    FileText,
    HelpCircle,
} from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
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

function StatusText({ status, label }: { status: AssignmentStatus; label: string }) {
    if (status === 'sudah-dikumpulkan') {
        return (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {label}
            </span>
        );
    }
    if (status === 'belum-dimulai') {
        return (
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {label}
            </span>
        );
    }
    return (
        <span className="text-xs text-muted-foreground">
            {label}
        </span>
    );
}

function AssignmentRow({ item }: { item: Assignment }) {
    const Icon = typeIconMap[item.type];
    const href = getAssignmentHref(item.id, item.submissionMode);

    return (
        <Link
            href={href}
            className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-4 px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group text-left"
        >
            {/* Col 1-5: Detail Penugasan */}
            <div className="flex items-center gap-4 min-w-0 md:col-span-5 text-left">
                <Icon className="size-5 text-slate-800 dark:text-slate-200 shrink-0" />

                <div className="min-w-0">
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate group-hover:text-primary transition-colors">
                        {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {item.typeLabel}
                    </p>
                </div>
            </div>

            {/* Col 6-8: Mata Kuliah */}
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium md:col-span-3 truncate text-left">
                <span className="md:hidden font-semibold text-foreground">Mata Kuliah: </span>
                {item.course}
            </div>

            {/* Col 9-10: Batas Waktu */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium md:col-span-2 text-left">
                <Clock className="size-3.5 shrink-0 text-slate-700 dark:text-slate-300" />
                <span className={item.deadlineStrikethrough ? 'line-through' : ''}>
                    {item.deadlineLabel}
                </span>
            </div>

            {/* Col 11-12: Status */}
            <div className="md:col-span-2 text-left">
                <StatusText status={item.status} label={item.statusLabel} />
            </div>
        </Link>
    );
}

function AssignmentTable({ items }: { items: Assignment[] }) {
    if (items.length === 0) {
        return (
            <Card className="rounded-2xl bg-card p-10 text-center text-sm text-muted-foreground shadow-sm border-0">
                Belum ada data riwayat penugasan untuk ditampilkan.
            </Card>
        );
    }

    return (
        <Card className="gap-0 overflow-hidden rounded-2xl bg-card py-0 shadow-sm border-0">
            {/* Header with tonal separation */}
            <div className="hidden grid-cols-12 items-center gap-4 px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase bg-slate-100/80 dark:bg-slate-800/80 md:grid text-left tracking-wider">
                <div className="col-span-5 text-left">Detail Penugasan</div>
                <div className="col-span-3 text-left">Mata Kuliah</div>
                <div className="col-span-2 text-left">Batas Waktu</div>
                <div className="col-span-2 text-left">Status</div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {items.map((item) => (
                    <AssignmentRow key={item.id} item={item} />
                ))}
            </div>
        </Card>
    );
}

export default function Assignments() {
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

    return (
        <StudentLayout>
            <Head title="Tugas & Kuis — SALE" />

            <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/student/dashboard" className="hover:text-primary transition-colors">
                        Beranda
                    </Link>
                    <span>›</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                        Tugas & Kuis
                    </span>
                </div>

                {/* Minimalist Clean Tabs */}
                <div className="flex items-center gap-8 border-b border-slate-200/80 dark:border-slate-800">
                    <button
                        type="button"
                        onClick={() => setActiveTab('active')}
                        className={[
                            'pb-3 text-sm font-bold transition-colors relative',
                            activeTab === 'active'
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground',
                        ].join(' ')}
                    >
                        Aktif & Mendatang ({activeAssignments.length})
                        {activeTab === 'active' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('history')}
                        className={[
                            'pb-3 text-sm font-bold transition-colors relative',
                            activeTab === 'history'
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground',
                        ].join(' ')}
                    >
                        Riwayat ({historyAssignments.length})
                        {activeTab === 'history' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                        )}
                    </button>
                </div>

                <div>
                    {activeTab === 'active' ? (
                        <AssignmentTable items={activeAssignments} />
                    ) : (
                        <AssignmentTable items={historyAssignments} />
                    )}
                </div>
            </div>
        </StudentLayout>
    );
}