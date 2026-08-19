import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StudentLayout from '@/layouts/student-layout';

interface QuizProps {
    quizId?: string;
}

// Database Mockup Kuis berdasarkan quizId
const quizDatabase: Record<string, {
    course: string;
    module: string;
    title: string;
    totalQuestions: number;
    timeRemaining: string;
    questions: Array<{
        id: number;
        number: number;
        question: string;
        options: string[];
    }>;
}> = {
    '1': {
        course: 'Sistem Operasi',
        module: 'Modul 4',
        title: 'Kuis 1: Pengenalan Sistem Operasi',
        totalQuestions: 20,
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
        ],
    },
    '2': {
        course: 'Sistem Operasi',
        module: 'Modul 4',
        title: 'Kuis 2: Manajemen Memori',
        totalQuestions: 20,
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
                question: 'Jelaskan perbedaan antara fragmentasi internal dan eksternal dalam sistem paging.',
                options: [
                    'Fragmentasi internal terjadi pada ruang memori yang dialokasikan tetapi tidak digunakan, sedangkan eksternal terjadi ketika total ruang memori cukup untuk memenuhi permintaan, tetapi tidak berurutan.',
                    'Fragmentasi internal terjadi ketika ruang memori berurutan, sedangkan fragmentasi eksternal terjadi di dalam halaman-halaman memori yang tetap.',
                    'Sistem paging hanya mengalami fragmentasi eksternal, tidak pernah mengalami fragmentasi internal.',
                    'Fragmentasi internal dan eksternal adalah istilah yang sama untuk menggambarkan kebocoran memori dalam sistem operasi.',
                ],
            },
        ],
    },
};

export default function Quiz({ quizId = '2' }: QuizProps) {
    const currentQuizData = quizDatabase[quizId] || quizDatabase['2'];

    // Menampilkan soal nomor 4 (index 3) agar sesuai mockup
    const [currentIndex, setCurrentIndex] = useState(
        currentQuizData.questions.length >= 4 ? 3 : 0
    );

    // Menyimpan opsi terpilih (key: indexSoal, value: indexOpsi)
    const [answers, setAnswers] = useState<Record<number, number>>({
        3: 0, // Soal nomor 4 terisi pilihan pertama
    });

    const currentQuestion = currentQuizData.questions[currentIndex] || currentQuizData.questions[0];

    const handleSelectOption = (optionIndex: number) => {
        setAnswers((prev) => ({
            ...prev,
            [currentIndex]: optionIndex,
        }));
    };

    return (
        <StudentLayout>
            <Head title={`${currentQuizData.title} — SALE`} />

            <div className="mx-auto max-w-5xl px-6 py-8">
                {/* Header Info & Timer */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-1 text-xs font-medium text-sale-muted">
                            {currentQuizData.course} &gt; {currentQuizData.module} &gt;{' '}
                            <span className="font-semibold text-sale-blue">
                                {currentQuizData.title}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-sale-dark">
                            {currentQuizData.title}
                        </h1>
                        <p className="mt-1 text-sm text-sale-muted">
                            Soal {currentQuestion.number} dari {currentQuizData.totalQuestions}
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-sale-blue">
                        <Clock className="size-4" />
                        <span>{currentQuizData.timeRemaining}</span>
                    </div>
                </div>

                {/* Kartu Soal */}
                <div className="mb-8 rounded-2xl border border-sale-border bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-6 flex items-start gap-4">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-sale-blue">
                            {currentQuestion.number}
                        </span>
                        <p className="pt-1 text-base font-medium leading-relaxed text-sale-dark md:text-lg">
                            {currentQuestion.question}
                        </p>
                    </div>

                    {/* Opsi Jawaban */}
                    <div className="space-y-3 pl-0 md:pl-13">
                        {currentQuestion.options.map((option, idx) => {
                            const isSelected = answers[currentIndex] === idx;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSelectOption(idx)}
                                    className={[
                                        'flex w-full items-center gap-4 rounded-xl border p-4 text-left text-sm transition-all md:text-base',
                                        isSelected
                                            ? 'border-sale-blue bg-blue-50/40 font-medium text-sale-dark shadow-sm'
                                            : 'border-sale-border bg-white text-sale-dark hover:border-gray-300',
                                    ].join(' ')}
                                >
                                    <div
                                        className={[
                                            'flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                                            isSelected
                                                ? 'border-sale-blue bg-sale-blue'
                                                : 'border-gray-300 bg-white',
                                        ].join(' ')}
                                    >
                                        {isSelected && (
                                            <div className="size-2 rounded-full bg-white" />
                                        )}
                                    </div>
                                    <span className="leading-relaxed">{option}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Navigasi & Pagination */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                        disabled={currentIndex === 0}
                        className="gap-2 rounded-xl border-sale-border text-sale-dark"
                    >
                        <ArrowLeft className="size-4" />
                        Sebelumnya
                    </Button>

                    {/* Angka Halaman / Soal */}
                    <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                        {[1, 2, 3, 4, 5, '...', 20].map((item, idx) => {
                            const isCurrent = typeof item === 'number' && item === currentQuestion.number;
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        if (typeof item === 'number' && item <= currentQuizData.questions.length) {
                                            setCurrentIndex(item - 1);
                                        }
                                    }}
                                    className={[
                                        'flex size-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors',
                                        isCurrent
                                            ? 'bg-sale-blue text-white'
                                            : 'bg-gray-100 text-sale-dark hover:bg-gray-200',
                                    ].join(' ')}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            className="rounded-xl bg-blue-100 font-medium text-sale-blue hover:bg-blue-200"
                        >
                            Kumpulkan
                        </Button>
                        <Button
                            onClick={() => setCurrentIndex((prev) => Math.min(currentQuizData.questions.length - 1, prev + 1))}
                            disabled={currentIndex === currentQuizData.questions.length - 1}
                            className="gap-2 rounded-xl bg-sale-blue text-white hover:bg-blue-600"
                        >
                            Selanjutnya
                            <ArrowRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}