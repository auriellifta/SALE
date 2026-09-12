import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Bell, CheckCircle2, Lock, User, UserRound, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import LecturerSidebar from '@/components/sale/LecturerSidebar';
import LecturerTopbar from '@/components/sale/LecturerTopbar';

const profile = {
    fullName: 'Devanovita Chelsea Prasojo, M.Kom.',
    nidn: '0412019801',
    faculty: 'Fakultas Teknik / Ilmu Komputer',
    studyProgram: 'S1 Teknik Informatika',
    academicEmail: 'devanovita.prasojo@dosen.sale.edu',
    functionalPosition: 'Lektor / Dosen Pengampu',
};

const initialNotifications = [
    {
        id: 'submissions',
        title: 'Pengumpulan Tugas',
        description: 'Pemberitahuan saat mahasiswa mengumpulkan tugas atau proyek baru.',
        enabled: true,
    },
    {
        id: 'attendance',
        title: 'Rekap Kehadiran',
        description: 'Ringkasan kehadiran otomatis setelah sesi perkuliahan berakhir.',
        enabled: true,
    },
    {
        id: 'forum',
        title: 'Diskusi Mahasiswa',
        description: 'Pemberitahuan ketika ada pertanyaan atau topik baru di forum.',
        enabled: true,
    },
    {
        id: 'system',
        title: 'Pengumuman Akademik',
        description: 'Informasi penting seputar kalender akademik dan jadwal ujian.',
        enabled: false,
    },
];

export default function ProfileDosen() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [savedPassword, setSavedPassword] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const toggleNotification = (id: string) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, enabled: !item.enabled } : item
            )
        );
        showToast('Preferensi notifikasi diperbarui');
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setSavedPassword(true);
        showToast('Kata sandi berhasil diperbarui');
        setTimeout(() => setSavedPassword(false), 3000);
    };

    return (
        <>
            <Head title="Profil Dosen — SALE" />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex">
                
                {/* TOAST NOTIFICATION */}
                {toastMessage && (
                    <div className="fixed top-5 right-5 z-[60] bg-white text-slate-800 dark:bg-slate-900 dark:text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                        <span>{toastMessage}</span>
                    </div>
                )}

                {/* SIDEBAR DOSEN */}
                <LecturerSidebar />

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 flex flex-col min-w-0 md:ml-[280px]">
                    
                    {/* TOP NAVBAR */}
                    <LecturerTopbar />

                    {/* CONTENT BODY */}
                    <main className="flex-1 p-5 sm:p-6 md:p-8 space-y-6 mt-16 max-w-7xl w-full mx-auto">
                        
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <Link
                                href="/dosen/dashboard"
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <span>›</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                                Profil Dosen
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* Left column (8 cols) */}
                            <div className="lg:col-span-8 space-y-6 min-w-0">
                                {/* Profile Info Card */}
                                <Card className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 space-y-6 shadow-xs">
                                    <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-slate-800 pb-4">
                                        <UserRound className="size-5 text-blue-600 dark:text-blue-400" />
                                        <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                                            Informasi Kepegawaian & Akademik Dosen
                                        </h2>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start gap-6 pt-1">
                                        <div className="flex flex-col items-center gap-2.5 shrink-0 mx-auto sm:mx-0">
                                            <div className="flex size-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                                <User className="size-10 stroke-[1.75]" />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => showToast('Fitur unggah foto belum tersedia')}
                                                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline transition-colors cursor-pointer"
                                            >
                                                GANTI FOTO
                                            </button>
                                        </div>

                                        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-4 w-full text-xs">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="full-name" className="font-bold text-slate-700 dark:text-slate-300">
                                                    Nama Lengkap & Gelar
                                                </Label>
                                                <Input
                                                    id="full-name"
                                                    value={profile.fullName}
                                                    readOnly
                                                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-10 rounded-xl text-slate-900 dark:text-white"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="nidn" className="font-bold text-slate-700 dark:text-slate-300">
                                                    NIDN (Nomor Induk Dosen Nasional)
                                                </Label>
                                                <Input
                                                    id="nidn"
                                                    value={profile.nidn}
                                                    readOnly
                                                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-10 rounded-xl text-slate-900 dark:text-white"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="study-program" className="font-bold text-slate-700 dark:text-slate-300">
                                                    Program Studi Utama
                                                </Label>
                                                <Input
                                                    id="study-program"
                                                    value={profile.studyProgram}
                                                    readOnly
                                                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-10 rounded-xl text-slate-900 dark:text-white"
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="academic-email" className="font-bold text-slate-700 dark:text-slate-300">
                                                    Email Institusi
                                                </Label>
                                                <Input
                                                    id="academic-email"
                                                    value={profile.academicEmail}
                                                    readOnly
                                                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-10 rounded-xl text-slate-900 dark:text-white"
                                                />
                                            </div>

                                            <div className="space-y-1.5 sm:col-span-2">
                                                <Label htmlFor="position" className="font-bold text-slate-700 dark:text-slate-300">
                                                    Jabatan Fungsional
                                                </Label>
                                                <Input
                                                    id="position"
                                                    value={profile.functionalPosition}
                                                    readOnly
                                                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 h-10 rounded-xl text-slate-900 dark:text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Security & Password Card */}
                                <Card className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 space-y-5 shadow-xs">
                                    <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-slate-800 pb-4">
                                        <Lock className="size-5 text-blue-600 dark:text-blue-400" />
                                        <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                                            Keamanan & Kata Sandi Akun
                                        </h2>
                                    </div>

                                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Pastikan akun dosen Anda menggunakan kata sandi yang kuat dan tidak digunakan pada layanan eksternal lain.
                                    </p>

                                    <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md text-xs">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="current-password" className="font-bold text-slate-700 dark:text-slate-300">
                                                Kata Sandi Saat Ini
                                            </Label>
                                            <Input
                                                id="current-password"
                                                type="password"
                                                placeholder="••••••••"
                                                className="h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="new-password" className="font-bold text-slate-700 dark:text-slate-300">
                                                Kata Sandi Baru
                                            </Label>
                                            <Input
                                                id="new-password"
                                                type="password"
                                                placeholder="Masukkan kata sandi baru"
                                                className="h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="confirm-password" className="font-bold text-slate-700 dark:text-slate-300">
                                                Konfirmasi Kata Sandi Baru
                                            </Label>
                                            <Input
                                                id="confirm-password"
                                                type="password"
                                                placeholder="Ulangi kata sandi baru"
                                                className="h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 pt-1">
                                            <Button type="submit" size="sm" className="text-xs font-bold h-10 px-5 rounded-xl shadow-xs bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer">
                                                Perbarui Kata Sandi
                                            </Button>
                                            {savedPassword && (
                                                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                                    <CheckCircle className="size-4" /> Berhasil diperbarui
                                                </span>
                                            )}
                                        </div>
                                    </form>
                                </Card>
                            </div>

                            {/* Right column: Notification Preferences (4 cols) */}
                            <div className="lg:col-span-4">
                                <Card className="h-fit rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-xs">
                                    <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-slate-800 pb-4">
                                        <Bell className="size-5 text-blue-600 dark:text-blue-400" />
                                        <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                                            Preferensi Notifikasi
                                        </h2>
                                    </div>

                                    <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800/60">
                                        {notifications.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-start justify-between gap-4 pt-4 first:pt-0"
                                            >
                                                <div className="pr-2">
                                                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={item.enabled}
                                                    onCheckedChange={() =>
                                                        toggleNotification(item.id)
                                                    }
                                                    className="shrink-0 mt-0.5 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500 cursor-pointer"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

ProfileDosen.layout = (page: React.ReactNode) => page;