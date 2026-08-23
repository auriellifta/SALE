import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    HelpCircle,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import StudentLayout from '@/layouts/student-layout';

interface QuizProps {
    quizId?: string;
}

type Question = {
    number: number;
    question: string;
    options: string[];
};

const quizData = {
    title: 'Kuis 2: Manajemen Memori & Virtual Memory',
    course: 'Sistem Operasi Lanjut',
    courseCode: 'INF-301',
    module: 'Modul 04',
    timeRemaining: '24:15 Menit',
    totalQuestions: 5,
    questions: [
        {
            number: 1,
            question:
                'Manakah dari algoritma page replacement berikut yang paling rentan terhadap fenomena Bélády’s Anomaly?',
            options: [
                'FIFO (First-In, First-Out)',
                'LRU (Least Recently Used)',
                'Optimal Page Replacement (OPT)',
                'LFU (Least Frequently Used)',
            ],
        },
        {
            number: 2,
            question:
                'Apa fungsi utama dari Translation Lookaside Buffer (TLB) dalam manajemen memori virtual?',
            options: [
                'Menyimpan salinan instruksi CPU yang sedang aktif',
                'Cache hardware berkecepatan tinggi untuk mempercepat translasi virtual address ke physical address',
                'Mencegah fragmentasi eksternal pada alokasi memori dinamis',
                'Menangani swapping partisi disk ke main memory',
            ],
        },
        {
            number: 3,
            question:
                'Kondisi di mana sistem menghabiskan lebih banyak waktu untuk melakukan paging dibandingkan mengeksekusi instruksi disebut sebagai...',
            options: [
                'Segmentation Fault',
                'Thrashing',
                'Deadlock',
                'Starvation',
            ],
        },
        {
            number: 4,
            question:
                'Pada teknik paging bertingkat (multi-level paging), keuntungan utama yang diperoleh adalah...',
            options: [
                'Mengurangi ukuran keseluruhan page table yang harus disimpan di memori utama',
                'Mempercepat waktu akses memori tanpa bantuan hardware TLB',
                'Menghilangkan kebutuhan akan physical memory',
                'Meniadakan fenomena fragmentasi internal',
            ],
        },
        {
            number: 5,
            question:
                'Fragmentasi yang terjadi ketika alokasi memori melebihi ukuran aktual data yang dibutuhkan dalam satu blok disebut...',
            options: [
                'External Fragmentation',
                'Internal Fragmentation',
                'Paging Fault',
                'Virtual Spanning',
            ],
        },
    ] as Question[],
};

export default function Quiz({ quizId = '2' }: QuizProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({
        0: 0,
        1: 0,
    });
    const [submitModalOpen, setSubmitModalOpen] = useState(false);

    const currentQuestion = quizData.questions[currentIndex];
    const answeredCount = Object.keys(answers).length;

    const handleSelectOption = (optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [currentIndex]: optionIndex,
        }));
    };

    return (
        <StudentLayout>
            <Head title={`${quizData.title} — SALE`} />

            <div className="space-y-6 max-w-4xl mx-auto">
                {/* Header Info & Timer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                            <Link href="/student/assignments" className="hover:text-foreground transition-colors">
                                Tugas & Kuis
                            </Link>
                            <span>›</span>
                            <span>{quizData.course}</span>
                            <span>›</span>
                            <span>{quizData.module}</span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                            {quizData.title}
                        </h1>
                        <p className="text-xs text-muted-foreground mt-1">
                            Soal {currentQuestion.number} dari {quizData.totalQuestions} • {answeredCount} terjawab
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shrink-0 shadow-xs">
                        <Clock className="size-4" />
                        <span>{quizData.timeRemaining}</span>
                    </div>
                </div>

                {/* Question Card */}
                <Card className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-6 shadow-xs">
                    <div className="space-y-3">
                        <Badge variant="outline" className="text-xs font-semibold">
                            SOAL NOMOR {currentQuestion.number}
                        </Badge>
                        <p className="text-base md:text-lg font-medium text-foreground leading-relaxed">
                            {currentQuestion.question}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 pt-2">
                        {currentQuestion.options.map((option, idx) => {
                            const isSelected = answers[currentIndex] === idx;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSelectOption(idx)}
                                    className={[
                                        'flex w-full items-center gap-4 rounded-xl border p-4 text-left text-sm transition-all shadow-2xs hover:shadow-xs',
                                        isSelected
                                            ? 'border-foreground bg-accent text-foreground font-semibold shadow-xs'
                                            : 'border-border bg-card text-foreground hover:bg-muted/40 hover:border-foreground/30',
                                    ].join(' ')}
                                >
                                    <span
                                        className={[
                                            'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors',
                                            isSelected
                                                ? 'border-foreground bg-foreground text-background'
                                                : 'border-border text-muted-foreground',
                                        ].join(' ')}
                                    >
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span className="flex-1 leading-relaxed">{option}</span>
                                </button>
                            );
                        })}
                    </div>
                </Card>

                {/* Navigation & Question Map */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <Button
                        variant="outline"
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex((prev) => prev - 1)}
                        className="w-full sm:w-auto gap-2 text-xs font-semibold h-10 shadow-2xs"
                    >
                        <ArrowLeft className="size-4" />
                        Soal Sebelumnya
                    </Button>

                    {/* Question Number Pills */}
                    <div className="flex items-center gap-2">
                        {quizData.questions.map((q, idx) => {
                            const isCurrent = currentIndex === idx;
                            const isAnswered = answers[idx] !== undefined;

                            return (
                                <button
                                    key={q.number}
                                    type="button"
                                    onClick={() => setCurrentIndex(idx)}
                                    className={[
                                        'flex size-9 items-center justify-center rounded-lg text-xs font-bold transition-all shadow-2xs',
                                        isCurrent
                                            ? 'border-2 border-foreground bg-foreground text-background shadow-xs'
                                            : isAnswered
                                              ? 'border border-border bg-muted text-foreground'
                                              : 'border border-border bg-card text-muted-foreground hover:border-foreground/30 hover:bg-accent/40',
                                    ].join(' ')}
                                >
                                    {q.number}
                                </button>
                            );
                        })}
                    </div>

                    {currentIndex === quizData.questions.length - 1 ? (
                        <Button
                            onClick={() => setSubmitModalOpen(true)}
                            className="w-full sm:w-auto gap-2 text-xs font-semibold h-10 shadow-xs"
                        >
                            <CheckCircle2 className="size-4" />
                            Kumpulkan Jawaban
                        </Button>
                    ) : (
                        <Button
                            onClick={() => setCurrentIndex((prev) => prev + 1)}
                            className="w-full sm:w-auto gap-2 text-xs font-semibold h-10 shadow-xs"
                        >
                            Soal Berikutnya
                            <ArrowRight className="size-4" />
                        </Button>
                    )}
                </div>

                {/* Submit Confirmation Modal */}
                <Dialog open={submitModalOpen} onOpenChange={setSubmitModalOpen}>
                    <DialogContent className="max-w-md rounded-xl p-6 space-y-4 shadow-lg">
                        <DialogHeader>
                            <DialogTitle className="text-base font-semibold text-foreground">
                                Kumpulkan Jawaban Kuis?
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
                                Anda telah menjawab {answeredCount} dari {quizData.totalQuestions} soal. Setelah dikumpulkan, jawaban tidak dapat diubah kembali.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="rounded-lg bg-muted p-4 text-xs text-muted-foreground space-y-1">
                            <p>Mata Kuliah: <strong className="text-foreground">{quizData.course}</strong></p>
                            <p>Sisa Waktu: <strong className="text-foreground">{quizData.timeRemaining}</strong></p>
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setSubmitModalOpen(false)}
                                className="text-xs"
                            >
                                Periksa Kembali
                            </Button>
                            <Link href="/student/assignments">
                                <Button size="sm" className="text-xs font-semibold">
                                    Ya, Kumpulkan
                                </Button>
                            </Link>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </StudentLayout>
    );
}