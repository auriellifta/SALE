import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Bell, CheckCircle2, Lock, User, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import StudentLayout from '@/layouts/student-layout';

const profile = {
    fullName: 'Auriel Lifta',
    studentId: '23051204088',
    studyProgram: 'S1 Teknik Informatika',
    academicEmail: 'auriel.lifta@student.sale.edu',
    faculty: 'Fakultas Ilmu Komputer',
    semester: 'Semester 3 (Ganjil 2023/2024)',
};

const initialNotifications = [
    {
        id: 'materials',
        title: 'Materi Baru',
        description: 'Dosen mengunggah slide atau video pembelajaran baru.',
        enabled: true,
    },
    {
        id: 'deadlines',
        title: 'Pengingat Batas Waktu',
        description: 'Pemberitahuan 24 jam sebelum batas waktu pengumpulan tugas.',
        enabled: true,
    },
    {
        id: 'grades',
        title: 'Hasil Penilaian',
        description: 'Nilai dan umpan balik tugas atau kuis telah dirilis.',
        enabled: true,
    },
    {
        id: 'forum',
        title: 'Aktivitas Forum',
        description: 'Tanggapan atau balasan baru pada topik diskusi Anda.',
        enabled: false,
    },
];

export default function Profile() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [savedPassword, setSavedPassword] = useState(false);

    const toggleNotification = (id: string) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, enabled: !item.enabled } : item
            )
        );
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setSavedPassword(true);
        setTimeout(() => setSavedPassword(false), 3000);
    };

    return (
        <StudentLayout>
            <Head title="Profil Pengguna — SALE" />

            <div className="space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link
                        href="/student/dashboard"
                        className="hover:text-foreground transition-colors"
                    >
                        Dashboard
                    </Link>
                    <span>›</span>
                    <span className="font-medium text-foreground">
                        Profil
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left column (8 cols) */}
                    <div className="lg:col-span-8 space-y-6 min-w-0">
                        {/* Profile Info Card */}
                        <Card className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-6 shadow-xs">
                            <div className="flex items-center gap-2">
                                <UserRound className="size-4.5 text-foreground" />
                                <h2 className="text-base font-semibold text-foreground">
                                    Informasi Pribadi & Akademik
                                </h2>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start gap-6 pt-1">
                                <div className="flex flex-col items-center gap-2 shrink-0">
                                    <div className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground border border-border">
                                        <User className="size-7 stroke-[1.5]" />
                                    </div>
                                    <button
                                        type="button"
                                        className="text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        GANTI FOTO
                                    </button>
                                </div>

                                <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="full-name" className="text-xs font-semibold text-foreground">
                                            Nama Lengkap
                                        </Label>
                                        <Input
                                            id="full-name"
                                            value={profile.fullName}
                                            readOnly
                                            className="text-xs bg-muted/40 h-10 border-border"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="student-id" className="text-xs font-semibold text-foreground">
                                            NIM (Nomor Induk Mahasiswa)
                                        </Label>
                                        <Input
                                            id="student-id"
                                            value={profile.studentId}
                                            readOnly
                                            className="text-xs bg-muted/40 h-10 border-border"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="study-program" className="text-xs font-semibold text-foreground">
                                            Program Studi
                                        </Label>
                                        <Input
                                            id="study-program"
                                            value={profile.studyProgram}
                                            readOnly
                                            className="text-xs bg-muted/40 h-10 border-border"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="academic-email" className="text-xs font-semibold text-foreground">
                                            Email Akademik
                                        </Label>
                                        <Input
                                            id="academic-email"
                                            value={profile.academicEmail}
                                            readOnly
                                            className="text-xs bg-muted/40 h-10 border-border"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Security & Password Card */}
                        <Card className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-5 shadow-xs">
                            <div className="flex items-center gap-2">
                                <Lock className="size-4.5 text-foreground" />
                                <h2 className="text-base font-semibold text-foreground">
                                    Keamanan & Kata Sandi
                                </h2>
                            </div>

                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Pastikan akun Anda menggunakan kata sandi yang kuat dan tidak digunakan pada layanan lain.
                            </p>

                            <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                                <div className="space-y-1.5">
                                    <Label htmlFor="current-password" className="text-xs font-semibold text-foreground">
                                        Kata Sandi Saat Ini
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="text-xs h-10 border-border"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="new-password" className="text-xs font-semibold text-foreground">
                                        Kata Sandi Baru
                                    </Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        placeholder="Masukkan kata sandi baru"
                                        className="text-xs h-10 border-border"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="confirm-password" className="text-xs font-semibold text-foreground">
                                        Konfirmasi Kata Sandi Baru
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        placeholder="Ulangi kata sandi baru"
                                        className="text-xs h-10 border-border"
                                    />
                                </div>

                                <div className="flex items-center gap-3 pt-1">
                                    <Button type="submit" size="sm" className="text-xs font-semibold h-9 px-4">
                                        Perbarui Kata Sandi
                                    </Button>
                                    {savedPassword && (
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <CheckCircle2 className="size-3.5" /> Berhasil diperbarui
                                        </span>
                                    )}
                                </div>
                            </form>
                        </Card>
                    </div>

                    {/* Right column: Notification Preferences (4 cols) */}
                    <div className="lg:col-span-4">
                        <Card className="h-fit rounded-xl border border-border bg-card p-6 space-y-5 shadow-xs">
                            <div className="flex items-center gap-2">
                                <Bell className="size-4.5 text-foreground" />
                                <h2 className="text-base font-semibold text-foreground">
                                    Preferensi Notifikasi
                                </h2>
                            </div>

                            <div className="space-y-4 divide-y divide-border">
                                {notifications.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start justify-between gap-4 pt-4 first:pt-0"
                                    >
                                        <div className="pr-2">
                                            <p className="text-sm font-semibold text-foreground">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                        <Switch
                                            checked={item.enabled}
                                            onCheckedChange={() =>
                                                toggleNotification(item.id)
                                            }
                                            className="shrink-0 mt-0.5"
                                        />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}