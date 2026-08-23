import { Head, Link } from '@inertiajs/react';
import {
    CheckCircle2,
    Clock,
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
    course: 'Desain Antarmuka Pengguna',
    courseCode: 'INF-312',
    title: 'Implementasi UI/UX Prototype Aplikasi Mobile',
    weight: 20,
    deadlineLabel: 'Rab, 22 Okt • 23:59 WIB',
    submissionStatus: 'Menunggu Pengumpulan',
    fileHint: 'Mendukung format PDF, DOCX, ZIP (Maksimal 15 MB)',
    instructionIntro:
        'Buatlah perancangan prototipe interaktif (interactive high-fidelity prototype) untuk aplikasi mobile edukasi SALE, lengkap dengan user flow utama, design system component tokens, dan lembar evaluasi heuristik.',
    instructionPoints: [
        'Desain mencakup minimal 5 flow utama: Onboarding, Dashboard, Course Detail, Submission, dan Forum.',
        'Gunakan typography sistem dan skala grid konsisten.',
        'Sertakan link Figma atau berkas desain berserta dokumen laporan analisis heuristik.',
        'Format laporan dalam bentuk PDF rapi sesuai panduan template.',
    ],
    submissionFormat: 'Format berkas: PDF atau ZIP (Maksimal 15 MB)',
    attachments: [
        { name: 'Panduan_Penyusunan_Laporan_Prototype.pdf', size: '1.8 MB' },
        { name: 'Design_System_Kit_Template.fig', size: '4.2 MB' },
    ],
};

export default function AssignmentDetail() {
    const [note, setNote] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <Head title={`${assignment.title} — SALE`} />

            <div className="space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link
                        href="/student/assignments"
                        className="hover:text-foreground transition-colors"
                    >
                        Tugas & Kuis
                    </Link>
                    <span>›</span>
                    <span className="font-medium text-foreground truncate">
                        {assignment.title}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Header Card */}
                        <Card className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-4 shadow-xs">
                            <div className="flex items-start justify-between gap-4">
                                <Badge variant="outline" className="font-semibold">
                                    {assignment.course}
                                </Badge>

                                <div className="shrink-0 rounded-lg bg-muted px-4 py-2 text-center">
                                    <p className="text-xs text-muted-foreground font-medium">
                                        Bobot
                                    </p>
                                    <p className="text-lg font-bold text-foreground">
                                        {assignment.weight}%
                                    </p>
                                </div>
                            </div>

                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground leading-snug">
                                {assignment.title}
                            </h1>

                            <p className="flex items-center gap-1.5 text-sm text-muted-foreground pt-1">
                                <Clock className="size-4 text-destructive" />
                                <span>Tenggat:</span>
                                <span className="font-semibold text-destructive">
                                    {assignment.deadlineLabel}
                                </span>
                            </p>
                        </Card>

                        {/* Instructions Card */}
                        <Card className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-5 shadow-xs">
                            <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
                                <FileText className="size-4.5" />
                                Instruksi Tugas
                            </h2>

                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {assignment.instructionIntro}
                            </p>

                            <ul className="space-y-2.5 pt-1">
                                {assignment.instructionPoints.map((point, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3 text-sm text-foreground"
                                    >
                                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground" />
                                        <span className="leading-relaxed">{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="rounded-lg bg-muted/60 p-3.5 text-xs text-muted-foreground font-medium">
                                {assignment.submissionFormat}
                            </div>

                            {/* Attachments */}
                            <div className="border-t border-border pt-5 space-y-3">
                                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Lampiran Berkas Dosen
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {assignment.attachments.map((file) => (
                                        <div
                                            key={file.name}
                                            className="flex items-center justify-between p-3.5 rounded-lg border border-border bg-background hover:border-foreground/30 transition-colors"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                                <FileText className="size-4 text-muted-foreground shrink-0" />
                                                <div className="min-w-0">
                                                    <p className="truncate text-xs font-semibold text-foreground">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-[11px] text-muted-foreground mt-0.5">
                                                        {file.size}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button size="icon-sm" variant="ghost" className="shrink-0">
                                                <Download className="size-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Submission Panel */}
                    <div>
                        <Card className="h-fit rounded-xl border border-border bg-card p-6 space-y-5 shadow-xs">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-semibold text-foreground">
                                    Pengumpulan
                                </h2>
                                <Badge variant={isSubmitted ? 'secondary' : 'outline'}>
                                    {isSubmitted ? 'Terkirim' : assignment.submissionStatus}
                                </Badge>
                            </div>

                            {isSubmitted ? (
                                <div className="rounded-xl bg-muted p-6 text-center space-y-3">
                                    <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-foreground text-background">
                                        <CheckCircle2 className="size-5" />
                                    </div>
                                    <h4 className="text-base font-semibold text-foreground">
                                        Tugas Berhasil Dikumpulkan!
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        Berkas ({selectedFile?.name}) telah tersimpan.
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-xs mt-2"
                                    >
                                        Kirim Ulang Berkas
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border hover:border-foreground/40 bg-muted/20 px-4 py-8 text-center transition-colors group">
                                        <UploadCloud className="size-7 text-muted-foreground group-hover:scale-105 transition-transform" />
                                        <span className="text-sm font-semibold text-foreground">
                                            {selectedFile ? selectedFile.name : 'Pilih file atau seret ke sini'}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {selectedFile
                                                ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Siap dikirim`
                                                : assignment.fileHint}
                                        </span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept=".pdf,.docx,.zip,.fig"
                                        />
                                    </label>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-foreground">
                                            Catatan Mahasiswa (Opsional)
                                        </label>
                                        <Textarea
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            placeholder="Tambahkan catatan untuk dosen atau asisten..."
                                            className="min-h-[80px] text-xs resize-none"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={!selectedFile}
                                        className="w-full text-sm font-semibold h-10"
                                    >
                                        Kumpulkan Tugas
                                    </Button>

                                    <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                                        <Info className="size-3.5 shrink-0 mt-0.5" />
                                        Pastikan berkas telah sesuai dengan format ketentuan sebelum mengumpulkan.
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