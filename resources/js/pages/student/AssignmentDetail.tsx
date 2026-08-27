import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle2,
    Download,
    FileText,
    Info,
    UploadCloud,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import StudentLayout from '@/layouts/student-layout';

const assignment = {
    course: 'Interaksi Manusia & Komputer',
    title: 'Tugas Kelompok: Implementasi UI/UX Prototype',
    weight: 15,
    deadlineLabel: 'Besok, 23:59 WIB',
    submissionStatus: 'Belum Mengumpulkan',
    instructionIntro:
        "Lakukan evaluasi heuristik menggunakan Nielsen's 10 Usability Heuristics pada satu aplikasi mobile pilihan Anda (sebaiknya aplikasi e-commerce atau layanan publik lokal).",
    instructionPoints: [
        'Pilih minimal 3 fitur utama dari aplikasi tersebut.',
        'Identifikasi minimal 5 masalah usability berdasarkan prinsip Nielsen.',
        'Berikan severity rating (0-4) untuk setiap masalah yang ditemukan.',
        'Usulkan rekomendasi perbaikan desain (berupa sketsa kasar atau wireframe diperbolehkan).',
    ],
    submissionFormat: 'Format pengumpulan: PDF, maksimal 10 halaman.',
    attachments: [
        {
            name: 'Template_Analisis.pdf',
            size: '1.2 MB',
        },
    ],
    fileHint: 'PDF, DOCX (Maks 10MB)',
};

export default function AssignmentDetail() {
    const [note, setNote] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedFile) {
            setIsSubmitted(true);
        }
    };

    return (
        <StudentLayout>
            <Head title={assignment.title} />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-6 py-[21px] md:px-10 lg:px-16">
                {/* Tombol Kembali */}
                <div className="mb-4">
                    <Link
                        href="/student/assignments"
                        className="inline-flex items-center gap-2 text-sm font-medium text-sale-muted transition-colors hover:text-sale-blue"
                    >
                        <ArrowLeft className="size-4" />
                        Tugas & Kuis
                    </Link>
                </div>

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-sale-muted">


                    <span className="truncate font-medium text-sale-dark">
                        {assignment.title}
                    </span>
                </div>

                {/* Main Content */}
                <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Header Card */}
                        <Card className="gap-3 rounded-2xl border-sale-border bg-sale-white p-6 md:p-8">
                            <div className="flex items-start justify-between gap-4">
                                <Badge className="rounded-full border-transparent bg-blue-50 font-medium text-sale-blue hover:bg-blue-50">
                                    {assignment.course}
                                </Badge>

                                <div className="shrink-0 rounded-lg bg-blue-50 px-4 py-2 text-center">
                                    <p className="text-xs text-sale-muted">
                                        Bobot
                                    </p>

                                    <p className="text-lg font-bold text-sale-blue">
                                        {assignment.weight}%
                                    </p>
                                </div>
                            </div>

                            <h1 className="font-poppins text-2xl font-bold leading-snug text-sale-dark">
                                {assignment.title}
                            </h1>

                            <p className="flex items-center gap-1.5 text-sm text-sale-muted">
                                <span>🕐</span>
                                Tenggat:{' '}
                                <span className="font-semibold text-sale-danger">
                                    {assignment.deadlineLabel}
                                </span>
                            </p>
                        </Card>

                        {/* Instructions Card */}
                        <Card className="gap-4 rounded-2xl border-sale-border bg-sale-white p-6 md:p-8">
                            <h2 className="flex items-center gap-2 font-poppins text-lg font-semibold text-sale-dark">
                                <FileText className="size-5 text-sale-blue" />
                                Instruksi Tugas
                            </h2>

                            <p className="leading-relaxed text-sale-muted">
                                {assignment.instructionIntro}
                            </p>

                            <ul className="space-y-2">
                                {assignment.instructionPoints.map(
                                    (point) => (
                                        <li
                                            key={point}
                                            className="flex items-start gap-2 text-sale-dark"
                                        >
                                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sale-muted" />

                                            <span className="leading-relaxed">
                                                {point}
                                            </span>
                                        </li>
                                    ),
                                )}
                            </ul>

                            <p className="text-sale-dark">
                                {assignment.submissionFormat}
                            </p>

                            {/* Attachments */}
                            <div className="border-t border-sale-border pt-4">
                                <p className="mb-2 text-sm text-sale-muted">
                                    Lampiran
                                </p>

                                <div className="space-y-2">
                                    {assignment.attachments.map((file) => (
                                        <div
                                            key={file.name}
                                            className="flex items-center gap-3 rounded-lg border border-sale-border p-3 transition-colors hover:bg-blue-50/40"
                                        >
                                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-sale-orange">
                                                <FileText className="size-4" />
                                            </span>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-sale-dark">
                                                    {file.name}
                                                </p>

                                                <p className="text-xs text-sale-muted">
                                                    {file.size}
                                                </p>
                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon-sm"
                                                className="shrink-0 text-sale-muted hover:bg-blue-50 hover:text-sale-blue"
                                            >
                                                <Download className="size-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column — Submission Panel */}
                    <div>
                        <Card className="h-fit gap-4 rounded-2xl border-sale-border bg-sale-white p-6">
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="font-poppins text-lg font-semibold text-sale-dark">
                                    Pengumpulan
                                </h2>

                                <Badge
                                    className={[
                                        'rounded-full border-transparent text-xs font-medium',
                                        isSubmitted
                                            ? 'bg-blue-50 text-sale-blue hover:bg-blue-50'
                                            : 'bg-blue-50 text-sale-blue hover:bg-blue-50',
                                    ].join(' ')}
                                >
                                    {isSubmitted
                                        ? 'Terkirim'
                                        : assignment.submissionStatus}
                                </Badge>
                            </div>

                            {isSubmitted ? (
                                /* Submitted State */
                                <div className="space-y-3 rounded-2xl bg-blue-50/60 p-6 text-center">
                                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-sale-blue text-white">
                                        <CheckCircle2 className="size-6" />
                                    </div>

                                    <h4 className="font-poppins text-base font-semibold text-sale-dark">
                                        Tugas Berhasil Dikumpulkan!
                                    </h4>

                                    <p className="text-xs leading-relaxed text-sale-muted">
                                        Berkas{' '}
                                        <span className="font-medium text-sale-dark">
                                            ({selectedFile?.name})
                                        </span>{' '}
                                        telah berhasil disimpan.
                                    </p>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setIsSubmitted(false)
                                        }
                                        className="mt-2 rounded-lg border-sale-border bg-sale-white text-xs text-sale-dark hover:bg-blue-50 hover:text-sale-blue"
                                    >
                                        Kirim Ulang Berkas
                                    </Button>
                                </div>
                            ) : (
                                /* Submission Form */
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    {/* Upload Area */}
                                    <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sale-border px-4 py-10 text-center transition-colors hover:border-sale-blue hover:bg-blue-50/30">
                                        <span className="flex size-11 items-center justify-center rounded-full bg-sale-blue text-white transition-transform group-hover:scale-105">
                                            <UploadCloud className="size-5" />
                                        </span>

                                        <span className="max-w-full truncate text-sm font-medium text-sale-dark">
                                            {selectedFile
                                                ? selectedFile.name
                                                : 'Pilih file atau seret ke sini'}
                                        </span>

                                        <span className="text-xs text-sale-muted">
                                            {selectedFile
                                                ? `${(
                                                      selectedFile.size /
                                                      1024 /
                                                      1024
                                                  ).toFixed(2)} MB • Siap dikirim`
                                                : assignment.fileHint}
                                        </span>

                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".pdf,.docx"
                                        />
                                    </label>

                                    {/* Note */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-sale-dark">
                                            Catatan (Opsional)
                                        </label>

                                        <Textarea
                                            value={note}
                                            onChange={(e) =>
                                                setNote(e.target.value)
                                            }
                                            placeholder="Tambahkan pesan untuk pengajar..."
                                            className="min-h-[90px] resize-none border-sale-border bg-sale-white text-sm focus:border-sale-blue focus:ring-sale-blue"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={!selectedFile}
                                        className="w-full gap-2 bg-sale-blue text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Kumpulkan Tugas
                                    </Button>

                                    {/* Information */}
                                    <p className="flex items-start gap-1.5 text-xs text-sale-muted">
                                        <Info className="mt-0.5 size-3.5 shrink-0" />

                                        <span>
                                            Pastikan file sudah benar sebelum
                                            mengumpulkan.
                                        </span>
                                    </p>
                                </form>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}