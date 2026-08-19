import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle2,
    ChevronDown,
    FileText,
    Info,
    MessageSquare,
    PlayCircle,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentLayout from '@/layouts/student-layout';

// ============ Dummy data — nanti diganti props Inertia dari controller ============

const course = {
    code: 'CS-302',
    status: 'Aktif',
    title: 'Interaksi Manusia & Komputer',
    lecturer: 'Prof. Dr. Budi Santoso, M.Kom.',
    className: 'Kelas A',
    term: 'Semester Genap 2023/2024',
    semesterLabel: 'Semester 4',
};

const video = {
    weekTitle: 'Minggu 04: Evaluasi Heuristik & Usability Testing',
    duration: '45:20',
    description:
        'Mempelajari teknik-teknik evaluasi antarmuka pengguna tanpa melibatkan user (Heuristic Evaluation) dan metode pengujian langsung dengan user (Usability Testing) untuk mengidentifikasi masalah desain.',
    lecturerName: 'Prof. Dr. Aris Setiawan',
    lecturerRole: 'Academic Lecture',
};

type ModuleItem = {
    id: string;
    label: string;
    icon: 'pdf' | 'video' | 'task';
    meta: string;
    score?: string;
    highlighted?: boolean;
};

type ModuleWeek = {
    id: string;
    number: number;
    title: string;
    meta: string;
    defaultOpen?: boolean;
    items: ModuleItem[];
};

const modules: ModuleWeek[] = [
    {
        id: 'week-1',
        number: 1,
        title: 'Pengenalan Graf & Representasinya',
        meta: 'Minggu 1 • Selesai',
        defaultOpen: true,
        items: [
            {
                id: 'w1-slide',
                label: 'Slide Kuliah: Representasi Graf.pdf',
                icon: 'pdf',
                meta: 'Materi • 2.4 MB',
            },
            {
                id: 'w1-video',
                label: 'Rekaman Sesi Sinkron',
                icon: 'video',
                meta: 'Materi • 45 Menit',
            },
            {
                id: 'w1-task',
                label: 'Tugas Praktikum 1: Adjacency Matrix',
                icon: 'task',
                meta: 'Tenggat: 12 Okt 2024',
                score: '95/100',
                highlighted: true,
            },
        ],
    },
    {
        id: 'week-2',
        number: 2,
        title: 'Algoritma Pencarian (BFS & DFS)',
        meta: 'Minggu 2 • Sedang Berlangsung',
        items: [],
    },
];

const rps = {
    description:
        'Mata kuliah ini memberikan pemahaman mendalam mengenai interaksi antara manusia dan sistem komputer. Fokus utama meliputi prinsip desain antarmuka, psikologi kognitif dalam komputasi, serta metodologi evaluasi pengalaman pengguna (UX) untuk menciptakan sistem yang efektif, efisien, dan memuaskan.',
    cpmk: [
        'CPMK 1: Mampu memahami prinsip dasar dan teori interaksi manusia-komputer dalam pengembangan perangkat lunak.',
        'CPMK 2: Mampu menerapkan teknik evaluasi heuristik untuk mengidentifikasi masalah kegunaan pada antarmuka.',
        'CPMK 3: Mampu merancang prototipe antarmuka yang berpusat pada pengguna (User-Centered Design).',
        'CPMK 4: Mampu melakukan pengujian kegunaan (Usability Testing) secara sistematis.',
    ],
    references: [
        {
            title: 'Interaction Design: Beyond Human-Computer Interaction',
            author: 'Preece, Rogers, & Sharp (5th Edition)',
        },
        {
            title: 'Designing the User Interface',
            author: 'Ben Shneiderman, et al. (6th Edition)',
        },
    ],
};

const grading = {
    finalPrediction: 88.5,
    finalGradeLabel: 'Grade A',
    components: [
        {
            id: 'assignments',
            label: 'Assignments (Avg)',
            score: '92 / 100',
            weight: '30%',
            contribution: '+ 27.60',
            status: 'Graded',
            dotClass: 'bg-sale-blue',
        },
        {
            id: 'quizzes',
            label: 'Quizzes (Best 4/5)',
            score: '85 / 100',
            weight: '20%',
            contribution: '+ 17.00',
            status: 'Graded',
            dotClass: 'bg-sale-green',
        },
        {
            id: 'midterm',
            label: 'Midterm Examination',
            score: '88 / 100',
            weight: '25%',
            contribution: '+ 22.00',
            status: 'Graded',
            dotClass: 'bg-sale-orange',
        },
        {
            id: 'final',
            label: 'Final Examination',
            score: '- / 100',
            weight: '25%',
            contribution: 'Pending',
            status: 'Upcoming',
            dotClass: 'bg-muted-foreground',
        },
    ],
    currentTotal: 66.6,
};

// ============ Small building blocks ============

function moduleIcon(icon: ModuleItem['icon']) {
    switch (icon) {
        case 'pdf':
            return <FileText className="size-4" />;
        case 'video':
            return <PlayCircle className="size-4" />;
        case 'task':
            return <FileText className="size-4" />;
    }
}

function ModuleItemRow({ item }: { item: ModuleItem }) {
    return (
        <div
            className={[
                'flex items-center gap-3 rounded-lg px-3 py-3',
                item.highlighted ? 'bg-blue-50' : '',
            ].join(' ')}
        >
            <span
                className={[
                    'flex size-9 shrink-0 items-center justify-center rounded-lg',
                    item.icon === 'pdf'
                        ? 'bg-orange-50 text-sale-orange'
                        : item.icon === 'video'
                          ? 'bg-blue-50 text-sale-blue'
                          : 'bg-blue-50 text-sale-blue',
                ].join(' ')}
            >
                {moduleIcon(item.icon)}
            </span>

            <div className="min-w-0 flex-1">
                <p
                    className={[
                        'truncate text-sm font-medium',
                        item.highlighted ? 'text-sale-blue' : 'text-sale-dark',
                    ].join(' ')}
                >
                    {item.label}
                </p>
                <p
                    className={[
                        'text-xs',
                        item.highlighted ? 'text-sale-danger' : 'text-sale-muted',
                    ].join(' ')}
                >
                    {item.meta}
                </p>
            </div>

            {item.score && (
                <span className="text-sm font-semibold text-sale-green">
                    {item.score}
                </span>
            )}

            {!item.score && !item.highlighted && (
                <CheckCircle2 className="size-5 shrink-0 text-sale-green" />
            )}
        </div>
    );
}

function ModuleWeekCard({ week }: { week: ModuleWeek }) {
    const [open, setOpen] = useState(week.defaultOpen ?? false);
    const hasItems = week.items.length > 0;

    return (
        <Card className="gap-0 overflow-hidden rounded-2xl border-sale-border bg-sale-white py-0">
            <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger
                    disabled={!hasItems}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left disabled:cursor-default"
                >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-sale-blue text-sm font-semibold text-sale-blue">
                        {week.number}
                    </span>

                    <span className="min-w-0 flex-1">
                        <span className="block truncate font-poppins font-semibold text-sale-dark">
                            {week.title}
                        </span>
                        <span className="block text-sm text-sale-muted">
                            {week.meta}
                        </span>
                    </span>

                    {hasItems && (
                        <ChevronDown
                            className={[
                                'size-4 shrink-0 text-sale-muted transition-transform',
                                open ? 'rotate-180' : '',
                            ].join(' ')}
                        />
                    )}
                </CollapsibleTrigger>

                {hasItems && (
                    <CollapsibleContent className="space-y-1 border-t border-sale-border px-3 pb-3">
                        <div className="pt-2" />
                        {week.items.map((item) => (
                            <ModuleItemRow key={item.id} item={item} />
                        ))}
                    </CollapsibleContent>
                )}
            </Collapsible>
        </Card>
    );
}

function GradingTab() {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
            {/* Final grade prediction */}
            <Card className="items-start gap-6 rounded-2xl border-sale-border bg-sale-white p-6">
                <div className="flex w-full items-start justify-between">
                    <h3 className="font-poppins text-lg font-semibold text-sale-dark">
                        Final Grade Prediction
                    </h3>
                    <Info className="size-4 shrink-0 text-sale-muted" />
                </div>

                <div className="mx-auto flex size-40 items-center justify-center rounded-full border-8 border-sale-blue">
                    <div className="text-center">
                        <p className="font-poppins text-3xl font-bold text-sale-dark">
                            {grading.finalPrediction}
                        </p>
                        <Badge className="mt-1 border-transparent bg-blue-50 text-sale-blue hover:bg-blue-50">
                            {grading.finalGradeLabel}
                        </Badge>
                    </div>
                </div>

                <div className="grid w-full grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {grading.components.map((c) => (
                        <div key={c.id} className="flex items-center gap-2">
                            <span
                                className={`size-2 rounded-full ${c.dotClass}`}
                            />
                            <span className="text-sale-muted">
                                {c.label.replace(/\s*\(.+\)$/, '')} ({c.weight})
                            </span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Component breakdown */}
            <Card className="gap-0 overflow-hidden rounded-2xl border-sale-border bg-sale-white py-0">
                <div className="flex items-center justify-between px-6 py-5">
                    <h3 className="font-poppins text-lg font-semibold text-sale-dark">
                        Component Breakdown
                    </h3>
                    <Badge className="gap-1 border-transparent bg-green-50 text-sale-green hover:bg-green-50">
                        <CheckCircle2 className="size-3.5" />
                        On Track
                    </Badge>
                </div>

                <div className="overflow-x-auto border-t border-sale-border">
                    <table className="w-full min-w-[560px] text-left text-sm">
                        <thead>
                            <tr className="text-xs text-sale-muted uppercase">
                                <th className="px-6 py-3 font-medium">
                                    Component
                                </th>
                                <th className="px-3 py-3 font-medium">
                                    Score
                                </th>
                                <th className="px-3 py-3 font-medium">
                                    Weight
                                </th>
                                <th className="px-3 py-3 font-medium">
                                    Contribution
                                </th>
                                <th className="px-3 py-3 font-medium">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {grading.components.map((c) => (
                                <tr
                                    key={c.id}
                                    className="border-t border-sale-border"
                                >
                                    <td className="px-6 py-4 font-medium text-sale-dark">
                                        {c.label}
                                    </td>
                                    <td className="px-3 py-4 text-sale-dark">
                                        {c.score}
                                    </td>
                                    <td className="px-3 py-4 text-sale-muted">
                                        {c.weight}
                                    </td>
                                    <td
                                        className={
                                            c.contribution === 'Pending'
                                                ? 'px-3 py-4 text-sale-muted'
                                                : 'px-3 py-4 font-semibold text-sale-blue'
                                        }
                                    >
                                        {c.contribution}
                                    </td>
                                    <td className="px-3 py-4">
                                        <Badge
                                            className={
                                                c.status === 'Graded'
                                                    ? 'border-transparent bg-green-50 text-sale-green hover:bg-green-50'
                                                    : 'border-transparent bg-blue-50 text-sale-blue hover:bg-blue-50'
                                            }
                                        >
                                            {c.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between border-t border-sale-border bg-muted/40 px-6 py-4">
                    <span className="font-poppins font-semibold text-sale-dark">
                        Current Total Contribution:
                    </span>
                    <span className="text-xl font-bold text-sale-blue">
                        {grading.currentTotal}
                    </span>
                </div>
            </Card>

            <Card className="col-span-1 flex-row items-center justify-between gap-4 rounded-2xl border-transparent bg-sale-blue p-6 text-white lg:col-span-2">
                <div className="flex items-center gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                        🎓
                    </span>
                    <div>
                        <p className="font-poppins font-semibold">
                            View Cumulative GPA & All Courses
                        </p>
                        <p className="text-sm text-blue-100">
                            Review your overall academic standing for{' '}
                            {course.semesterLabel}.
                        </p>
                    </div>
                </div>

                <Button
                    variant="secondary"
                    className="shrink-0 bg-white text-sale-blue hover:bg-blue-50"
                >
                    View Full Transcript →
                </Button>
            </Card>
        </div>
    );
}

function RpsTab() {
    return (
        <Card className="gap-6 rounded-2xl border-sale-border bg-sale-white p-8">
            <h2 className="font-poppins text-2xl font-bold text-sale-dark">
                Rencana Pembelajaran Semester (RPS)
            </h2>

            <div className="space-y-3">
                <h3 className="font-poppins text-lg font-semibold text-sale-blue">
                    Deskripsi Mata Kuliah
                </h3>
                <p className="leading-relaxed text-sale-muted">
                    {rps.description}
                </p>
            </div>

            <div className="space-y-3">
                <h3 className="font-poppins text-lg font-semibold text-sale-blue">
                    Capaian Pembelajaran (CPMK)
                </h3>
                <ul className="space-y-2">
                    {rps.cpmk.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sale-blue" />
                            <span className="text-sm font-medium text-sale-dark">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="space-y-3">
                <h3 className="font-poppins text-lg font-semibold text-sale-blue">
                    Buku Referensi
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {rps.references.map((ref) => (
                        <div
                            key={ref.title}
                            className="rounded-lg bg-muted/50 p-4"
                        >
                            <p className="text-sm font-semibold text-sale-dark">
                                {ref.title}
                            </p>
                            <p className="mt-1 text-sm text-sale-muted">
                                {ref.author}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

// ============ Page ============

export default function CourseDetail() {
    return (
        <StudentLayout>
            <Head title={course.title} />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-16 py-[21px]">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-sale-muted">
                    <Link href="/student/courses" className="hover:text-sale-dark">
                        Course
                    </Link>
                    <span>›</span>
                    <span>{course.semesterLabel}</span>
                    <span>›</span>
                    <span className="font-medium text-sale-dark">
                        {course.title}
                    </span>
                </div>

                {/* Header */}
                <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Badge className="rounded-full border-transparent bg-blue-50 font-medium text-sale-blue hover:bg-blue-50">
                                {course.code}
                            </Badge>
                            <Badge className="gap-1 rounded-full border-transparent bg-green-50 font-medium text-sale-green hover:bg-green-50">
                                <CheckCircle2 className="size-3.5" />
                                {course.status}
                            </Badge>
                        </div>

                        <h1 className="mt-3 font-poppins text-3xl font-bold leading-tight text-sale-dark">
                            {course.title}
                        </h1>

                        <p className="mt-2 text-sale-muted">
                            {course.lecturer} • {course.className} •{' '}
                            {course.term}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        <Button
                            variant="outline"
                            className="gap-2 border-sale-border text-sale-dark"
                        >
                            <Calendar className="size-4" />
                            Jadwal
                        </Button>
                        <Button className="gap-2 bg-sale-blue text-white hover:bg-blue-600">
                            <MessageSquare className="size-4" />
                            Diskusi Kelas
                        </Button>
                    </div>
                </div>

                {/* Video card */}
                <Card className="mt-6 gap-4 rounded-2xl border-sale-border bg-sale-white p-6">
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-900">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="size-16 text-white/90" />
                        </div>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="font-poppins text-lg font-semibold text-sale-dark">
                                {video.weekTitle}
                            </h2>
                            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-sale-muted">
                                {video.description}
                            </p>
                        </div>
                        <span className="shrink-0 text-sm text-sale-muted">
                            {video.duration}
                        </span>
                    </div>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="modules" className="mt-8">
                    <TabsList>
                        <TabsTrigger value="modules">
                            Modul Pembelajaran
                        </TabsTrigger>
                        <TabsTrigger value="rps">
                            Informasi Kursus (RPS)
                        </TabsTrigger>
                        <TabsTrigger value="grading">
                            Penilaian & Bobot
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="modules" className="mt-6 space-y-4">
                        {modules.map((week) => (
                            <ModuleWeekCard key={week.id} week={week} />
                        ))}
                    </TabsContent>

                    <TabsContent value="rps" className="mt-6">
                        <RpsTab />
                    </TabsContent>

                    <TabsContent value="grading" className="mt-6">
                        <GradingTab />
                    </TabsContent>
                </Tabs>
            </div>
        </StudentLayout>
    );
}