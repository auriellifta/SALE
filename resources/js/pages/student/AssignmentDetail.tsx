import { Head, Link } from '@inertiajs/react';
import { Download, FileText, Info, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import StudentLayout from '@/layouts/student-layout';

// Halaman ini KHUSUS untuk assignment dengan submissionMode === 'classroom'
// (tugas laporan/file biasa — individu maupun kelompok).
// Untuk submissionMode 'quiz' → lihat pages/student/Quiz.tsx
// Untuk submissionMode 'programming' → lihat pages/student/ProgrammingTask.tsx
// Routing ke ketiganya diatur terpusat di lib/assignment-routing.ts,
// jangan buat link manual ke halaman ini dari luar helper tsb.

// Dummy data — nanti diganti props Inertia dari controller (by assignment id)
const assignment = {
    course: 'Interaksi Manusia & Komputer',
    title: 'Tugas Individu 2: Analisis Aplikasi Mobile',
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
    attachments: [{ name: 'Template_Analisis.pdf', size: '1.2 MB' }],
    fileHint: 'PDF, DOCX (Maks 10MB)',
};

export default function AssignmentDetail() {
    const [note, setNote] = useState('');

    return (
        <StudentLayout>
            <Head title={assignment.title} />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-16 py-[21px]">
                <div className="flex items-center gap-2 text-sm text-sale-muted">
                    <Link
                        href="/student/assignments"
                        className="hover:text-sale-dark"
                    >
                        Tugas & Kuis
                    </Link>
                    <span>›</span>
                    <span className="font-medium text-sale-dark">
                        {assignment.title}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                    {/* Left column */}
                    <div className="space-y-6">
                        <Card className="gap-3 rounded-2xl border-sale-border bg-sale-white p-6">
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

                        <Card className="gap-4 rounded-2xl border-sale-border bg-sale-white p-6">
                            <h2 className="flex items-center gap-2 font-poppins text-lg font-semibold text-sale-dark">
                                <FileText className="size-5 text-sale-blue" />
                                Instruksi Tugas
                            </h2>

                            <p className="leading-relaxed text-sale-muted">
                                {assignment.instructionIntro}
                            </p>

                            <ul className="space-y-2">
                                {assignment.instructionPoints.map((point) => (
                                    <li
                                        key={point}
                                        className="flex items-start gap-2 text-sale-dark"
                                    >
                                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sale-muted" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-sale-dark">
                                {assignment.submissionFormat}
                            </p>

                            <div className="border-t border-sale-border pt-4">
                                <p className="mb-2 text-sm text-sale-muted">
                                    Lampiran
                                </p>
                                {assignment.attachments.map((file) => (
                                    <div
                                        key={file.name}
                                        className="flex items-center gap-3 rounded-lg border border-sale-border p-3"
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
                                        <Download className="size-4 shrink-0 text-sale-muted" />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right column — submission panel */}
                    <Card className="h-fit gap-4 rounded-2xl border-sale-border bg-sale-white p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="font-poppins text-lg font-semibold text-sale-dark">
                                Pengumpulan
                            </h2>
                            <Badge className="rounded-full border-transparent bg-blue-50 text-xs font-medium text-sale-blue hover:bg-blue-50">
                                {assignment.submissionStatus}
                            </Badge>
                        </div>

                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sale-border px-4 py-10 text-center hover:border-sale-blue">
                            <span className="flex size-11 items-center justify-center rounded-full bg-sale-blue text-white">
                                <UploadCloud className="size-5" />
                            </span>
                            <span className="text-sm font-medium text-sale-dark">
                                Pilih file atau seret ke sini
                            </span>
                            <span className="text-xs text-sale-muted">
                                {assignment.fileHint}
                            </span>
                            <input type="file" className="hidden" />
                        </label>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-sale-dark">
                                Catatan (Opsional)
                            </label>
                            <Textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Tambahkan pesan untuk pengajar..."
                                className="min-h-[90px] border-sale-border"
                            />
                        </div>

                        <Button className="w-full gap-2 bg-sale-blue text-white hover:bg-blue-600">
                            Kumpulkan Tugas
                        </Button>

                        <p className="flex items-start gap-1.5 text-xs text-sale-muted">
                            <Info className="mt-0.5 size-3.5 shrink-0" />
                            Pastikan file sudah benar sebelum mengumpulkan.
                        </p>
                    </Card>
                </div>
            </div>
        </StudentLayout>
    );
}