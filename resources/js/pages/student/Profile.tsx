import { Head, Link } from '@inertiajs/react';
import { Bell, Lock, Pencil, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import StudentLayout from '@/layouts/student-layout';

const profile = {
    fullName: 'Ahmad Mahasiswa',
    studentId: '1234567890',
    studyProgram: 'Teknik Informatika',
    academicEmail: 'ahmad.m@student.univ.edu',
    photoUrl: undefined as string | undefined,
};

type NotificationPreference = {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
};

const initialNotifications: NotificationPreference[] = [
    {
        id: 'course-announcements',
        title: 'Pengumuman Mata Kuliah',
        description: 'Pembaruan dari dosen',
        enabled: false,
    },
    {
        id: 'assignment-deadlines',
        title: 'Tenggat Tugas',
        description: 'Pengingat 24 jam & 1 jam',
        enabled: false,
    },
    {
        id: 'grade-published',
        title: 'Nilai Diterbitkan',
        description: 'Saat nilai baru tersedia',
        enabled: false,
    },
    {
        id: 'forum-replies',
        title: 'Balasan Forum',
        description: 'Penyebutan dan balasan thread',
        enabled: false,
    },
];

export default function Profile() {
    const [notifications, setNotifications] = useState(initialNotifications);

    function toggleNotification(id: string) {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, enabled: !item.enabled } : item,
            ),
        );
    }

    return (
        <StudentLayout>
            <Head title="Profil & Pengaturan" />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-16 py-[21px]">
                <div className="flex items-center gap-2 text-sm text-sale-muted">
                    <Link href="/student/profile" className="hover:text-sale-dark">
                        Profil
                    </Link>
                    <span>›</span>
                    <span className="font-medium text-sale-dark">
                        Pengaturan
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
                    <div className="space-y-6">
                        <Card className="gap-5 rounded-2xl border-sale-border bg-sale-white p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="flex items-center gap-2 font-poppins text-lg font-semibold text-sale-dark">
                                    <User className="size-5 text-sale-blue" />
                                    Informasi Pribadi
                                </h2>
                                <button
                                    type="button"
                                    className="flex items-center gap-1.5 text-sm font-medium text-sale-blue hover:underline"
                                >
                                    <Pencil className="size-3.5" />
                                    Ubah
                                </button>
                            </div>

                            <div className="flex flex-col gap-6 sm:flex-row">
                                <div className="flex shrink-0 flex-col items-center gap-2">
                                    <div className="size-24 overflow-hidden rounded-full bg-blue-50">
                                        {profile.photoUrl ? (
                                            <img
                                                src={profile.photoUrl}
                                                alt={profile.fullName}
                                                className="size-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex size-full items-center justify-center text-2xl font-semibold text-sale-blue">
                                                {profile.fullName.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        className="text-xs font-medium text-sale-muted hover:text-sale-blue"
                                    >
                                        GANTI FOTO
                                    </button>
                                </div>

                                <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="full-name" className="text-sale-dark">
                                            Nama Lengkap
                                        </Label>
                                        <Input
                                            id="full-name"
                                            value={profile.fullName}
                                            readOnly
                                            className="border-sale-border bg-muted/30"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="student-id" className="text-sale-dark">
                                            NIM (Nomor Induk Mahasiswa)
                                        </Label>
                                        <Input
                                            id="student-id"
                                            value={profile.studentId}
                                            readOnly
                                            className="border-sale-border bg-muted/30"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="study-program" className="text-sale-dark">
                                            Program Studi (Prodi)
                                        </Label>
                                        <Input
                                            id="study-program"
                                            value={profile.studyProgram}
                                            readOnly
                                            className="border-sale-border bg-muted/30"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="academic-email" className="text-sale-dark">
                                            Email Akademik
                                        </Label>
                                        <Input
                                            id="academic-email"
                                            value={profile.academicEmail}
                                            readOnly
                                            className="border-sale-border bg-muted/30"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="gap-5 rounded-2xl border-sale-border bg-sale-white p-6">
                            <h2 className="flex items-center gap-2 font-poppins text-lg font-semibold text-sale-dark">
                                <Lock className="size-5 text-sale-orange" />
                                Keamanan & Kata Sandi
                            </h2>

                            <p className="text-sm text-sale-muted">
                                Pastikan akun Anda menggunakan kata sandi yang panjang dan acak
                                agar tetap aman.
                            </p>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="current-password" className="text-sale-dark">
                                        Kata Sandi Saat Ini
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="border-sale-border"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="new-password" className="text-sale-dark">
                                        Kata Sandi Baru
                                    </Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        placeholder="Masukkan kata sandi baru yang kuat"
                                        className="border-sale-border"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="confirm-password" className="text-sale-dark">
                                        Konfirmasi Kata Sandi Baru
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        placeholder="Ulangi kata sandi baru"
                                        className="border-sale-border"
                                    />
                                </div>
                            </div>

                            <Button className="w-fit bg-sale-blue text-white hover:bg-blue-600">
                                Perbarui Kata Sandi
                            </Button>
                        </Card>
                    </div>

                    <Card className="h-fit gap-5 rounded-2xl border-sale-border bg-sale-white p-6">
                        <h2 className="flex items-center gap-2 font-poppins text-lg font-semibold text-sale-dark">
                            <Bell className="size-5 text-sale-blue" />
                            Notifikasi
                        </h2>

                        <div className="space-y-5">
                            {notifications.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start justify-between gap-4"
                                >
                                    <div>
                                        <p className="font-medium text-sale-dark">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-sale-muted">
                                            {item.description}
                                        </p>
                                    </div>
                                    <Switch
                                        checked={item.enabled}
                                        onCheckedChange={() =>
                                            toggleNotification(item.id)
                                        }
                                        className="shrink-0"
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </StudentLayout>
    );
}