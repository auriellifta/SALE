import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Clock, Code2, HelpCircle, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StudentLayout from '@/layouts/student-layout';

type CourseClass = {
    id: number;
    classCode: string;
    title: string;
    lecturer: string;
    semester: string;
    activity: string;
};

const courses: CourseClass[] = [
    {
        id: 1,
        classCode: 'INF-A',
        title: 'Dasar Pemrograman',
        lecturer: 'Dr. Budi Santoso, M.Kom',
        semester: 'Semester 3',
        activity: 'Aktivitas terakhir: 2 jam lalu',
    },
    {
        id: 2,
        classCode: 'INF-B',
        title: 'Struktur Data & Algoritma',
        lecturer: 'Prof. Linda Wijaya, Ph.D',
        semester: 'Semester 3',
        activity: 'Aktivitas terakhir: Kemarin',
    },
    {
        id: 3,
        classCode: 'UMUM',
        title: 'Kewarganegaraan & Pancasila',
        lecturer: 'Drs. Ahmad Yani',
        semester: 'Semester 3',
        activity: 'Aktivitas terakhir: 3 hari lalu',
    },
    {
        id: 4,
        classCode: 'INF-A',
        title: 'Sistem Operasi Lanjut',
        lecturer: 'Prof. Dr. Hendra Wijaya',
        semester: 'Semester 3',
        activity: 'Aktivitas terakhir: 4 hari lalu',
    },
];

const upcomingTasks = [
    {
        id: 1,
        title: 'Implementasi Algoritma Sorting (Bubble Sort)',
        course: 'Struktur Data & Algoritma',
        deadline: 'Hari ini, 23:59 WIB',
        urgent: true,
        href: '/student/programming-task/1',
    },
    {
        id: 2,
        title: 'Kuis 2: Manajemen Memori',
        course: 'Sistem Operasi Lanjut',
        deadline: 'Jum, 24 Okt • 10:00 WIB',
        urgent: false,
        href: '/student/quiz/1',
    },
    {
        id: 3,
        title: 'Implementasi UI/UX Prototype',
        course: 'Dasar Pemrograman',
        deadline: 'Rab, 22 Okt • 23:59 WIB',
        urgent: false,
        href: '/student/assignments/1',
    },
];

const announcements = [
    {
        id: 1,
        source: 'Fakultas Teknik',
        time: '2 jam lalu',
        title: 'Perubahan Jadwal Ujian Tengah Semester Ganjil 2023/2024',
    },
    {
        id: 2,
        source: 'Dasar Pemrograman',
        time: '1 hari lalu',
        title: 'Materi Tambahan: Pointers di C++ telah diunggah ke modul',
    },
    {
        id: 3,
        source: 'Pusat Komputasi',
        time: '2 hari lalu',
        title: 'Pemeliharaan Server E-Learning Akhir Pekan ini',
    },
];

export default function Dashboard() {
    return (
        <StudentLayout>
            <Head title="Dashboard Mahasiswa — SALE" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Column (8 cols) */}
                <div className="lg:col-span-8 space-y-8 min-w-0">
                    {/* Courses Section */}
                    <section>
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                                    Mata Kuliah Aktif
                                </h1>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    Semester Ganjil 2023/2024
                                </p>
                            </div>

                            <Link
                                href="/student/courses"
                                className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 transition-colors"
                            >
                                Lihat Semua
                                <ArrowRight className="size-4 text-slate-800 dark:text-slate-200" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {courses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={`/student/courses/${course.id}`}
                                    className="group flex flex-col justify-between rounded-2xl bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-semibold text-muted-foreground">
                                                {course.classCode}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {course.semester}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors leading-snug">
                                            {course.title}
                                        </h3>
                                    </div>

                                    <div className="mt-5 pt-3.5 space-y-1.5 text-xs text-muted-foreground bg-slate-50/80 dark:bg-slate-800/40 -mx-6 -mb-6 p-4 rounded-b-2xl">
                                        <div className="flex items-center gap-1.5">
                                            <User className="size-3.5 shrink-0 text-slate-700 dark:text-slate-300" />
                                            <span className="truncate font-medium text-slate-700 dark:text-slate-300">{course.lecturer}</span>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground">
                                            {course.activity}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Learning Recommendation Section */}
                    <section className="rounded-2xl bg-card p-6 sm:p-8 shadow-sm">
                        <div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="size-5 text-slate-800 dark:text-slate-200" />
                                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                                    Rekomendasi Belajar Pintar
                                </h2>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                                Berdasarkan pola belajarmu, fokus pada materi berikut hari ini:
                            </p>

                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link
                                    href="/student/programming-task/1"
                                    className="flex items-start gap-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 p-5 hover:bg-slate-100 dark:hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 group"
                                >
                                    <Code2 className="size-5 text-slate-800 dark:text-slate-200 shrink-0 mt-0.5" />
                                    <div className="min-w-0">
                                        <span className="text-xs text-muted-foreground block truncate">
                                            Dasar Pemrograman
                                        </span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary truncate block mt-0.5">
                                            Lanjutkan Modul 3: Array
                                        </span>
                                    </div>
                                </Link>

                                <Link
                                    href="/student/quiz/1"
                                    className="flex items-start gap-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 p-5 hover:bg-slate-100 dark:hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 group"
                                >
                                    <HelpCircle className="size-5 text-slate-800 dark:text-slate-200 shrink-0 mt-0.5" />
                                    <div className="min-w-0">
                                        <span className="text-xs text-muted-foreground block truncate">
                                            Struktur Data & Algoritma
                                        </span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary truncate block mt-0.5">
                                            Tinjau Kuis Algoritma
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Upcoming Tasks & Announcements (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Upcoming Tasks */}
                    <section className="rounded-2xl bg-card shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-5 bg-slate-50/80 dark:bg-slate-800/50">
                            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                                Tugas Mendatang
                            </h2>
                            <span className="text-xs font-semibold text-muted-foreground">
                                ({upcomingTasks.length})
                            </span>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {upcomingTasks.map((task) => (
                                <Link
                                    key={task.id}
                                    href={task.href}
                                    className="block p-5 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors group"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-primary">
                                            {task.title}
                                        </h3>
                                        {task.urgent && (
                                            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 shrink-0">
                                                Hari ini
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-1.5">
                                        {task.course}
                                    </p>

                                    <p className="text-xs mt-2 flex items-center gap-1.5 text-slate-500 font-medium">
                                        <Clock className="size-3.5 text-slate-700 dark:text-slate-300" />
                                        {task.deadline}
                                    </p>
                                </Link>
                            ))}
                        </div>

                        <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30">
                            <Link href="/student/assignments">
                                <Button className="w-full text-xs font-bold h-10 shadow-xs bg-primary text-white hover:bg-primary/90">
                                    Lihat Semua Tugas
                                </Button>
                            </Link>
                        </div>
                    </section>

                    {/* Announcements */}
                    <section className="rounded-2xl bg-card shadow-sm overflow-hidden">
                        <div className="p-5 bg-slate-50/80 dark:bg-slate-800/50">
                            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                                Pengumuman
                            </h2>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {announcements.map((ann) => (
                                <div key={ann.id} className="p-5">
                                    <p className="text-xs font-medium text-muted-foreground">
                                        {ann.source} • {ann.time}
                                    </p>
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1 leading-snug">
                                        {ann.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </StudentLayout>
    );
}