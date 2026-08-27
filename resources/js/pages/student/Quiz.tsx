import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
} from 'lucide-react';
import { useState } from 'react';
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
    id: number;
    number: number;
    question: string;
    options: string[];
};

type QuizData = {
    course: string;
    module: string;
    title: string;
    totalQuestions: number;
    timeRemaining: string;
    questions: Question[];
};

const quizDatabase: Record<string, QuizData> = {
    '1': {
        course: 'Sistem Operasi',
        module: 'Modul 4',
        title: 'Kuis 1: Pengenalan Sistem Operasi',
        totalQuestions: 5,
        timeRemaining: '45:00',
        questions: [
            {
                id: 1,
                number: 1,
                question: 'Apa fungsi utama dari Sistem Operasi?',
                options: [
                    'Mengelola sumber daya perangkat keras dan perangkat lunak komputer.',
                    'Menyusun dokumen teks dan spreadsheet.',
                    'Membuat grafis 3D secara otomatis.',
                    'Menghubungkan jaringan internet secara fisik.',
                ],
            },
            {
                id: 2,
                number: 2,
                question: 'Komponen utama sistem operasi yang bertanggung jawab dalam mengatur sumber daya komputer adalah...',
                options: [
                    'Kernel',
                    'Browser',
                    'Compiler',
                    'Database',
                ],
            },
            {
                id: 3,
                number: 3,
                question: 'Manakah yang termasuk contoh sistem operasi?',
                options: [
                    'Windows',
                    'Google Chrome',
                    'Microsoft Word',
                    'Adobe Photoshop',
                ],
            },
            {
                id: 4,
                number: 4,
                question: 'Salah satu fungsi sistem operasi dalam manajemen proses adalah...',
                options: [
                    'Mengatur proses yang sedang berjalan pada CPU.',
                    'Membuat desain grafis secara otomatis.',
                    'Mengedit dokumen teks.',
                    'Mengatur tampilan website.',
                ],
            },
            {
                id: 5,
                number: 5,
                question: 'Sistem operasi menyediakan antarmuka yang memungkinkan pengguna berinteraksi dengan komputer. Antarmuka tersebut disebut...',
                options: [
                    'User Interface',
                    'Database',
                    'Compiler',
                    'File System',
                ],
            },
        ],
    },

    '2': {
        course: 'Sistem Operasi',
        module: 'Modul 4',
        title: 'Kuis 2: Manajemen Memori',
        totalQuestions: 5,
        timeRemaining: '45:12',
        questions: [
            {
                id: 1,
                number: 1,
                question: 'Apa fungsi utama dari Manajemen Memori pada Sistem Operasi?',
                options: [
                    'Mengatur alokasi dan dealokasi ruang memori untuk proses.',
                    'Menghubungkan perangkat keras dengan perangkat lunak.',
                    'Menyimpan file secara permanen di dalam harddisk.',
                    'Mengontrol kecepatan transfer data pada prosesor.',
                ],
            },
            {
                id: 2,
                number: 2,
                question: 'Apa yang dimaksud dengan Paging dalam Sistem Operasi?',
                options: [
                    'Skema manajemen memori yang memungkinkan ruang alamat fisik proses tidak berurutan.',
                    'Proses menghapus cache memori secara otomatis.',
                    'Metode untuk menggabungkan dua partisi memori utama.',
                    'Pengalokasian memori berurutan tanpa fragmentasi.',
                ],
            },
            {
                id: 3,
                number: 3,
                question: 'Apa perbedaan utama antara RAM dan Virtual Memory?',
                options: [
                    'RAM adalah memori fisik cepat, sedangkan Virtual Memory memanfaatkan media penyimpanan sekunder.',
                    'RAM bersifat non-volatile, sedangkan Virtual Memory bersifat volatile.',
                    'Virtual Memory lebih cepat daripada RAM.',
                    'Tidak ada perbedaan, keduanya adalah komponen fisik yang sama.',
                ],
            },
            {
                id: 4,
                number: 4,
                question:
                    'Jelaskan perbedaan antara fragmentasi internal dan eksternal dalam sistem paging.',
                options: [
                    'Fragmentasi internal terjadi pada ruang memori yang dialokasikan tetapi tidak digunakan, sedangkan eksternal terjadi ketika total ruang memori cukup untuk memenuhi permintaan, tetapi tidak berurutan.',
                    'Fragmentasi internal terjadi ketika ruang memori berurutan, sedangkan fragmentasi eksternal terjadi di dalam halaman-halaman memori yang tetap.',
                    'Sistem paging hanya mengalami fragmentasi eksternal, tidak pernah mengalami fragmentasi internal.',
                    'Fragmentasi internal dan eksternal adalah istilah yang sama untuk menggambarkan kebocoran memori dalam sistem operasi.',
                ],
            },
            {
                id: 5,
                number: 5,
                question: 'Manakah yang merupakan salah satu teknik dalam manajemen memori?',
                options: [
                    'Paging',
                    'Rendering',
                    'Compiling',
                    'Routing',
                ],
            },
        ],
    },
};

export default function Quiz({ quizId = '2' }: QuizProps) {
    const currentQuizData =
        quizDatabase[quizId] || quizDatabase['2'];

    const [currentIndex, setCurrentIndex] = useState(0);

    const [answers, setAnswers] = useState<Record<number, number>>({});

    const [submitModalOpen, setSubmitModalOpen] = useState(false);

    const currentQuestion =
        currentQuizData.questions[currentIndex] ||
        currentQuizData.questions[0];

    const answeredCount = Object.keys(answers).length;

    const isLastQuestion =
        currentIndex === currentQuizData.questions.length - 1;

    const handleSelectOption = (optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [currentIndex]: optionIndex,
        }));
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            Math.min(
                currentQuizData.questions.length - 1,
                prev + 1,
            ),
        );
    };

    const handleSubmit = () => {
        setSubmitModalOpen(false);
    };

    return (
        <StudentLayout>
            <Head title={`${currentQuizData.title} — SALE`} />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-4 py-5 sm:px-6 md:px-10 lg:px-16 lg:py-[21px]">
                {/* Back / Breadcrumb */}
                <div className="mb-5 flex items-center gap-2 text-sm text-sale-muted">
                    <Link
                        href="/student/assignments"
                        className="flex shrink-0 items-center gap-1.5 transition-colors hover:text-sale-blue"
                    >
                        <ArrowLeft className="size-4" />
                        <span>Tugas & Kuis</span>
                    </Link>

                    <span>›</span>

                    <span className="truncate font-medium text-sale-dark">
                        {currentQuizData.title}
                    </span>
                </div>

                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-1.5 text-xs font-medium text-sale-muted">
                            <span>{currentQuizData.course}</span>
                            <span>›</span>
                            <span>{currentQuizData.module}</span>
                        </div>

                        <h1 className="font-poppins text-xl font-bold leading-snug text-sale-dark sm:text-2xl">
                            {currentQuizData.title}
                        </h1>

                        <p className="mt-1 text-sm text-sale-muted">
                            Soal {currentQuestion.number} dari{' '}
                            {currentQuizData.totalQuestions}
                            {' • '}
                            <span className="font-semibold text-sale-dark">
                                {answeredCount} terjawab
                            </span>
                        </p>
                    </div>

                    {/* Timer */}
                    <div className="flex w-fit shrink-0 items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-sale-blue">
                        <Clock className="size-4" />
                        <span>{currentQuizData.timeRemaining}</span>
                    </div>
                </div>

                {/* Question Card */}
                <Card className="mb-6 rounded-2xl border-sale-border bg-sale-white p-5 shadow-sm sm:p-6 md:p-8">
                    {/* Question */}
                    <div className="mb-6 flex items-start gap-4">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-sale-blue">
                            {currentQuestion.number}
                        </span>

                        <p className="pt-1 text-base font-medium leading-relaxed text-sale-dark sm:text-lg">
                            {currentQuestion.question}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 md:pl-[52px]">
                        {currentQuestion.options.map(
                            (option, idx) => {
                                const isSelected =
                                    answers[currentIndex] === idx;

                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() =>
                                            handleSelectOption(idx)
                                        }
                                        className={[
                                            'flex w-full items-center gap-4 rounded-xl border p-4 text-left text-sm transition-all sm:text-base',
                                            isSelected
                                                ? 'border-sale-blue bg-blue-50/40 font-medium text-sale-dark shadow-sm'
                                                : 'border-sale-border bg-sale-white text-sale-dark hover:border-blue-200 hover:bg-blue-50/20',
                                        ].join(' ')}
                                    >
                                        <span
                                            className={[
                                                'flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                                                isSelected
                                                    ? 'border-sale-blue bg-sale-blue'
                                                    : 'border-gray-300 bg-sale-white',
                                            ].join(' ')}
                                        >
                                            {isSelected && (
                                                <span className="size-2 rounded-full bg-white" />
                                            )}
                                        </span>

                                        <span className="leading-relaxed">
                                            {option}
                                        </span>
                                    </button>
                                );
                            },
                        )}
                    </div>
                </Card>

                {/* Navigation */}
                <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    {/* Previous */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className="w-full gap-2 rounded-xl border-sale-border bg-sale-white text-sale-dark hover:bg-blue-50 hover:text-sale-blue sm:w-auto"
                    >
                        <ArrowLeft className="size-4" />
                        Sebelumnya
                    </Button>

                    {/* Question Numbers */}
                    <div className="order-first flex items-center justify-center gap-1.5 sm:order-none">
                        {currentQuizData.questions
                            .slice(0, 5)
                            .map((question, idx) => {
                                const isCurrent =
                                    currentIndex === idx;

                                const isAnswered =
                                    answers[idx] !== undefined;

                                return (
                                    <button
                                        key={question.id}
                                        type="button"
                                        onClick={() =>
                                            setCurrentIndex(idx)
                                        }
                                        className={[
                                            'flex size-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors',
                                            isCurrent
                                                ? 'bg-sale-blue text-white shadow-sm'
                                                : isAnswered
                                                  ? 'bg-blue-100 text-sale-blue hover:bg-blue-200'
                                                  : 'bg-gray-100 text-sale-dark hover:bg-gray-200',
                                        ].join(' ')}
                                    >
                                        {question.number}
                                    </button>
                                );
                            })}
                    </div>

                    {/* Next + Submit */}
                    <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
                        {!isLastQuestion && (
                            <Button
                                type="button"
                                onClick={handleNext}
                                className="order-1 flex-1 gap-2 rounded-xl bg-sale-blue text-white hover:bg-blue-600 sm:flex-none"
                            >
                                Selanjutnya
                                <ArrowRight className="size-4" />
                            </Button>
                        )}

                        {isLastQuestion && (
                            <Button
                                type="button"
                                onClick={() =>
                                    setSubmitModalOpen(true)
                                }
                                className="order-2 flex-1 gap-2 rounded-xl bg-sale-blue text-white hover:bg-blue-600 sm:flex-none"
                            >
                                <CheckCircle2 className="size-4" />
                                Kumpulkan
                            </Button>
                        )}
                    </div>
                </div>

                {/* Submit Confirmation */}
                <Dialog
                    open={submitModalOpen}
                    onOpenChange={setSubmitModalOpen}
                >
                    <DialogContent className="max-w-md rounded-2xl border-sale-border bg-sale-white p-6 shadow-xl">
                        <DialogHeader>
                            <DialogTitle className="font-poppins text-lg font-semibold text-sale-dark">
                                Kumpulkan Jawaban Kuis?
                            </DialogTitle>

                            <DialogDescription className="text-sm leading-relaxed text-sale-muted">
                                Anda telah menjawab{' '}
                                <span className="font-semibold text-sale-dark">
                                    {answeredCount}
                                </span>{' '}
                                dari{' '}
                                <span className="font-semibold text-sale-dark">
                                    {currentQuizData.totalQuestions}
                                </span>{' '}
                                soal. Setelah dikumpulkan, jawaban
                                tidak dapat diubah kembali.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="rounded-xl bg-blue-50 p-4 text-sm text-sale-muted">
                            <div className="flex items-center justify-between gap-4">
                                <span>Mata Kuliah</span>
                                <span className="font-semibold text-sale-dark">
                                    {currentQuizData.course}
                                </span>
                            </div>

                            <div className="mt-2 flex items-center justify-between gap-4">
                                <span>Sisa Waktu</span>
                                <span className="font-semibold text-sale-blue">
                                    {currentQuizData.timeRemaining}
                                </span>
                            </div>
                        </div>

                        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setSubmitModalOpen(false)
                                }
                                className="w-full rounded-xl border-sale-border bg-sale-white text-sale-dark hover:bg-gray-50 sm:w-auto"
                            >
                                Periksa Kembali
                            </Button>

                            <Link
                                href="/student/assignments"
                                onClick={handleSubmit}
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    type="button"
                                    className="w-full rounded-xl bg-sale-blue font-semibold text-white hover:bg-blue-600 sm:w-auto"
                                >
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