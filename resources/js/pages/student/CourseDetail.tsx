import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle2,
    ChevronDown,
    ExternalLink,
    FileText,
    HelpCircle,
    Link as LinkIcon,
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentLayout from '@/layouts/student-layout';

const course = {
    code: 'INF-A',
    status: 'Sedang Berjalan',
    title: 'Interaksi Manusia & Komputer',
    lecturer: 'Dr. Budi Santoso, M.Kom',
    className: 'Kelas A',
    term: 'Semester Ganjil 2023',
    semesterLabel: 'Semester 3',
};

const video = {
    weekTitle: 'Minggu 04: Evaluasi Heuristik & Usability Testing',
    duration: '42:15 Menit',
    description:
        'Memahami 10 prinsip evaluasi heuristik Jakob Nielsen, metodologi pengujian keterpakaian (usability testing), serta penyusunan lembar observasi partisipan.',
};

type ModuleItem = {
    id: string;
    label: string;
    icon: 'pdf' | 'video' | 'link' | 'task' | 'code' | 'quiz';
    meta: string;
    url?: string;
    score?: string;
    highlighted?: boolean;
    statusText?: string;
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
        title: 'Pengantar Interaksi Manusia & Komputer',
        meta: 'Minggu 1 • Selesai',
        defaultOpen: true,
        items: [
            {
                id: 'w1-slide',
                label: 'Slide Materi 01: Konsep Dasar IMK.pdf',
                icon: 'pdf',
                meta: 'Dokumen PDF • 3.2 MB',
                url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            },
            {
                id: 'w1-video',
                label: 'Video Rekaman Kuliah Sesi 1',
                icon: 'video',
                meta: 'Video HD • 45 Menit',
                url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
            },
            {
                id: 'w1-quiz',
                label: 'Kuis Evaluasi Konsep Dasar',
                icon: 'quiz',
                meta: 'Kuis Selesai • Skor 95/100',
                score: '95/100',
            },
        ],
    },
    {
        id: 'week-2',
        number: 2,
        title: 'User-Centered Design & Persona',
        meta: 'Minggu 2 • Selesai',
        defaultOpen: true,
        items: [
            {
                id: 'w2-slide',
                label: 'Slide Materi 02: UCD & User Persona.pdf',
                icon: 'pdf',
                meta: 'Dokumen PDF • 2.8 MB',
                url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            },
            {
                id: 'w2-task',
                label: 'Tugas 01: Penyusunan User Persona Aplikasi Edukasi',
                icon: 'task',
                meta: 'Nilai: 90/100 • Dinilai oleh Dosen',
                score: '90/100',
            },
        ],
    },
    {
        id: 'week-3',
        number: 3,
        title: 'Prototyping & Wireframing Interaktif',
        meta: 'Minggu 3 • Aktif',
        defaultOpen: true,
        items: [
            {
                id: 'w3-slide',
                label: 'Slide Materi 03: Wireframing Tools & Principles.pdf',
                icon: 'pdf',
                meta: 'Dokumen PDF • 4.1 MB',
                url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            },
            {
                id: 'w3-code',
                label: 'Tugas Pemrograman: Implementasi UI/UX Prototype',
                icon: 'code',
                meta: 'Tenggat: Rab, 22 Okt • 23:59 WIB',
                highlighted: true,
                statusText: 'Kerjakan Tugas',
            },
            {
                id: 'w3-link',
                label: 'Referensi Panduan Material Design 3',
                icon: 'link',
                meta: 'm3.material.io',
                url: 'https://m3.material.io',
            },
        ],
    },
    {
        id: 'week-4',
        number: 4,
        title: 'Evaluasi Heuristik & Analisis Keterpakaian',
        meta: 'Minggu 4 • Terbuka Pekan Depan',
        defaultOpen: false,
        items: [],
    },
];

const rps = {
    description:
        'Mata kuliah ini membahas teori dasar dan praktik dalam merancang antarmuka pengguna interaktif yang berorientasi pada manusia (human-centered design), mulai dari analisis kebutuhan, prototyping, hingga evaluasi heuristik usability.',
    cpmk: [
        'Mampu menjelaskan konsep dan paradigma interaksi manusia dan komputer secara komprehensif.',
        'Mampu merancang antarmuka aplikasi interaktif menggunakan prinsip User-Centered Design.',
        'Mampu menyusun wireframe dan prototype interaktif berskala fungsional.',
        'Mampu melakukan evaluasi heuristik dan usability testing terhadap sistem antarmuka.',
    ],
    references: [
        {
            title: 'Designing the User Interface: Strategies for Effective HCI (6th Ed)',
            author: 'Ben Shneiderman, Catherine Plaisant, et al.',
        },
        {
            title: 'The Design of Everyday Things',
            author: 'Don Norman',
        },
    ],
};

const grading = {
    components: [
        {
            id: 'assignments',
            label: 'Tugas & Praktikum Individu/Kelompok',
            score: '92 / 100',
            weight: '30%',
            status: 'Dinilai',
        },
        {
            id: 'quizzes',
            label: 'Kuis Berkala',
            score: '88 / 100',
            weight: '20%',
            status: 'Dinilai',
        },
        {
            id: 'midterm',
            label: 'Ujian Tengah Semester (UTS)',
            score: '94 / 100',
            weight: '25%',
            status: 'Dinilai',
        },
        {
            id: 'final',
            label: 'Ujian Akhir Semester (UAS / Proyek Akhir)',
            score: 'Prediksi 90+',
            weight: '25%',
            status: 'Mendatang',
        },
    ],
};

function ModuleItemRow({
    item,
    onOpenViewer,
}: {
    item: ModuleItem;
    onOpenViewer: (item: ModuleItem) => void;
}) {
    const Icon =
        item.icon === 'video'
            ? PlayCircle
            : item.icon === 'link'
              ? LinkIcon
              : item.icon === 'quiz'
                ? HelpCircle
                : FileText;

    const content = (
        <>
            <Icon className="size-4 text-muted-foreground shrink-0" />

            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                    {item.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                    {item.meta}
                </p>
            </div>

            {item.score && (
                <span className="text-xs font-semibold text-foreground px-2 py-0.5 rounded bg-muted">
                    {item.score}
                </span>
            )}

            {item.highlighted && (
                <Link href="/student/assignments/1">
                    <Button size="sm" className="h-8 text-xs font-semibold px-3.5">
                        {item.statusText || 'Buka'}
                    </Button>
                </Link>
            )}

            {item.icon === 'link' && (
                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
            )}
        </>
    );

    const baseRowClass =
        'flex w-full items-center gap-3.5 rounded-lg p-3 text-left transition-colors';

    if (item.icon === 'link') {
        return (
            <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseRowClass} hover:bg-accent/60`}
            >
                {content}
            </a>
        );
    }

    if (item.icon === 'pdf' || item.icon === 'video') {
        return (
            <button
                type="button"
                onClick={() => onOpenViewer(item)}
                className={`${baseRowClass} hover:bg-accent/60`}
            >
                {content}
            </button>
        );
    }

    return <div className={baseRowClass}>{content}</div>;
}

export default function CourseDetail() {
    const [viewerItem, setViewerItem] = useState<ModuleItem | null>(null);
    const [viewerOpen, setViewerOpen] = useState(false);

    function handleOpenViewer(item: ModuleItem) {
        setViewerItem(item);
        setViewerOpen(true);
    }

    return (
        <StudentLayout>
            <Head title={`${course.title} — SALE`} />

            <div className="space-y-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/student/courses" className="hover:text-foreground transition-colors">
                        Course
                    </Link>
                    <span>›</span>
                    <span>{course.semesterLabel}</span>
                    <span>›</span>
                    <span className="font-medium text-foreground">
                        {course.title}
                    </span>
                </div>

                {/* Header Profile Course */}
                <div className="flex flex-wrap items-start justify-between gap-6 pb-2">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="font-semibold">
                                {course.code}
                            </Badge>
                            <Badge variant="secondary" className="gap-1 font-medium">
                                <CheckCircle2 className="size-3.5" />
                                {course.status}
                            </Badge>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                            {course.title}
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {course.lecturer} • {course.className} • {course.term}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        <Link href="/student/forum">
                            <Button variant="outline" className="gap-2 text-sm h-10">
                                <MessageSquare className="size-4" />
                                Diskusi Kelas
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Video / Featured Material Card */}
                <Card className="rounded-xl border border-border bg-card p-6 space-y-4">
                    <div className="relative aspect-video max-h-[380px] w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center cursor-pointer group">
                        <PlayCircle className="size-14 text-foreground/80 group-hover:scale-105 transition-transform" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pt-1">
                        <div>
                            <h2 className="text-base font-semibold text-foreground">
                                {video.weekTitle}
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                                {video.description}
                            </p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0 font-medium">
                            {video.duration}
                        </span>
                    </div>
                </Card>

                {/* Tabs Section */}
                <Tabs defaultValue="modules" className="space-y-6">
                    <TabsList className="bg-muted p-1 h-10">
                        <TabsTrigger value="modules" className="text-xs sm:text-sm font-medium px-4">
                            Modul Pembelajaran
                        </TabsTrigger>
                        <TabsTrigger value="rps" className="text-xs sm:text-sm font-medium px-4">
                            Informasi Kursus (RPS)
                        </TabsTrigger>
                        <TabsTrigger value="grading" className="text-xs sm:text-sm font-medium px-4">
                            Penilaian & Bobot
                        </TabsTrigger>
                    </TabsList>

                    {/* Modul Pembelajaran */}
                    <TabsContent value="modules" className="space-y-4 mt-0">
                        {modules.map((week) => (
                            <div
                                key={week.id}
                                className="rounded-xl border border-border bg-card overflow-hidden"
                            >
                                <Collapsible defaultOpen={week.defaultOpen}>
                                    <CollapsibleTrigger className="flex w-full items-center justify-between p-5 text-left hover:bg-accent/40 transition-colors">
                                        <div>
                                            <h3 className="text-sm md:text-base font-semibold text-foreground">
                                                {week.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {week.meta}
                                            </p>
                                        </div>
                                        <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200" />
                                    </CollapsibleTrigger>

                                    <CollapsibleContent className="border-t border-border p-3 space-y-1 bg-background/50">
                                        {week.items.length > 0 ? (
                                            week.items.map((item) => (
                                                <ModuleItemRow
                                                    key={item.id}
                                                    item={item}
                                                    onOpenViewer={handleOpenViewer}
                                                />
                                            ))
                                        ) : (
                                            <p className="p-4 text-xs text-muted-foreground text-center">
                                                Materi minggu ini akan dibuka sesuai jadwal perkuliahan.
                                            </p>
                                        )}
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        ))}
                    </TabsContent>

                    {/* RPS */}
                    <TabsContent value="rps" className="mt-0">
                        <Card className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-6">
                            <div>
                                <h3 className="text-base font-semibold text-foreground">
                                    Deskripsi Mata Kuliah
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                    {rps.description}
                                </p>
                            </div>

                            <div className="border-t border-border pt-6 space-y-3">
                                <h4 className="text-sm font-semibold text-foreground">
                                    Capaian Pembelajaran Lulusan (CPMK)
                                </h4>
                                <div className="space-y-2">
                                    {rps.cpmk.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 text-sm text-muted-foreground"
                                        >
                                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground" />
                                            <span className="leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-border pt-6 space-y-3">
                                <h4 className="text-sm font-semibold text-foreground">
                                    Buku Referensi
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {rps.references.map((ref) => (
                                        <div
                                            key={ref.title}
                                            className="rounded-lg border border-border bg-background p-4"
                                        >
                                            <p className="text-sm font-semibold text-foreground">
                                                {ref.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {ref.author}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    {/* Grading */}
                    <TabsContent value="grading" className="mt-0">
                        <Card className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
                            <h3 className="text-base font-semibold text-foreground">
                                Komponen Penilaian & Bobot
                            </h3>
                            <div className="space-y-3">
                                {grading.components.map((comp) => (
                                    <div
                                        key={comp.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-background"
                                    >
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">
                                                {comp.label}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                Bobot: {comp.weight} • {comp.score}
                                            </p>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {comp.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Viewer Dialog */}
                <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
                    <DialogContent className="max-h-[85vh] max-w-4xl p-0 overflow-hidden rounded-xl">
                        <DialogHeader className="border-b border-border p-5">
                            <DialogTitle className="text-base font-semibold text-foreground">
                                {viewerItem?.label}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="p-4">
                            {viewerItem?.icon === 'pdf' && viewerItem.url && (
                                <iframe
                                    src={viewerItem.url}
                                    title={viewerItem.label}
                                    className="h-[60vh] w-full rounded-lg border border-border"
                                />
                            )}
                            {viewerItem?.icon === 'video' && viewerItem.url && (
                                <video
                                    src={viewerItem.url}
                                    controls
                                    className="max-h-[60vh] w-full rounded-lg bg-black"
                                />
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </StudentLayout>
    );
}