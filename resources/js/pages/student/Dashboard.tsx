import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Clock, Code2, HelpCircle, Layers, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
        active: true,
    },
    {
        id: 2,
        source: 'Dasar Pemrograman',
        time: '1 hari lalu',
        title: 'Materi Tambahan: Pointers di C++ telah diunggah ke modul',
        active: false,
    },
    {
        id: 3,
        source: 'Pusat Komputasi',
        time: '2 hari lalu',
        title: 'Pemeliharaan Server E-Learning Akhir Pekan ini',
        active: false,
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
                                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                                    Mata Kuliah Aktif
                                </h1>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    Semester Ganjil 2023/2024
                                </p>
                            </div>

                            <Link
                                href="/student/courses"
                                className="text-sm font-semibold text-foreground hover:underline flex items-center gap-1 transition-colors"
                            >
                                Lihat Semua
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {courses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={`/student/courses/${course.id}`}
                                    className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-xs hover:shadow-md hover:border-foreground/25 hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <Badge variant="outline" className="font-semibold text-xs">
                                                {course.classCode}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {course.semester}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-semibold text-foreground group-hover:underline transition-colors leading-snug">
                                            {course.title}
                                        </h3>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-border/60 space-y-1.5 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <User className="size-3.5 shrink-0" />
                                            <span className="truncate">{course.lecturer}</span>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground/80">
                                            {course.activity}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Learning Recommendation Section */}
                    <section className="rounded-xl border border-border bg-card p-6 shadow-xs">
                        <div>
                            <div className="flex items-center gap-2">
                                <Layers className="size-4.5 text-foreground" />
                                <h2 className="text-base font-semibold text-foreground">
                                    Rekomendasi Belajar Pintar
                                </h2>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                                Berdasarkan pola belajarmu, fokus pada materi berikut hari ini:
                            </p>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Link
                                    href="/student/programming-task/1"
                                    className="flex items-start gap-3 rounded-lg border border-border bg-background p-4 shadow-2xs hover:shadow-xs hover:border-foreground/25 hover:-translate-y-0.5 transition-all duration-200 group"
                                >
                                    <Code2 className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                                    <div className="min-w-0">
                                        <span className="text-xs text-muted-foreground block truncate">
                                            Dasar Pemrograman
                                        </span>
                                        <span className="text-sm font-semibold text-foreground group-hover:underline truncate block mt-0.5">
                                            Lanjutkan Modul 3: Array & Pointer
                                        </span>
                                    </div>
                                </Link>

                                <Link
                                    href="/student/quiz/1"
                                    className="flex items-start gap-3 rounded-lg border border-border bg-background p-4 shadow-2xs hover:shadow-xs hover:border-foreground/25 hover:-translate-y-0.5 transition-all duration-200 group"
                                >
                                    <HelpCircle className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                                    <div className="min-w-0">
                                        <span className="text-xs text-muted-foreground block truncate">
                                            Struktur Data & Algoritma
                                        </span>
                                        <span className="text-sm font-semibold text-foreground group-hover:underline truncate block mt-0.5">
                                            Tinjau Kuis Algoritma & Tree
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
                    <section className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-border bg-muted/20">
                            <h2 className="text-base font-semibold text-foreground">
                                Tugas Mendatang
                            </h2>
                            <Badge variant="secondary" className="font-semibold">{upcomingTasks.length}</Badge>
                        </div>

                        <div className="divide-y divide-border">
                            {upcomingTasks.map((task) => (
                                <Link
                                    key={task.id}
                                    href={task.href}
                                    className="block p-5 hover:bg-accent/40 transition-colors group"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-sm font-medium text-foreground leading-snug group-hover:underline">
                                            {task.title}
                                        </h3>
                                        {task.urgent && (
                                            <Badge variant="outline" className="text-[10px] uppercase font-bold shrink-0">
                                                HARI INI
                                            </Badge>
                                        )}
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-1.5">
                                        {task.course}
                                    </p>

                                    <p className="text-xs mt-2 flex items-center gap-1.5 text-muted-foreground">
                                        <Clock className="size-3.5" />
                                        {task.deadline}
                                    </p>
                                </Link>
                            ))}
                        </div>

                        <div className="p-3.5 border-t border-border bg-muted/20">
                            <Link href="/student/assignments">
                                <Button variant="outline" size="sm" className="w-full text-xs font-semibold h-9 shadow-2xs">
                                    Lihat Semua Tugas
                                </Button>
                            </Link>
                        </div>
                    </section>

                    {/* Announcements */}
                    <section className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-border bg-muted/20">
                            <h2 className="text-base font-semibold text-foreground">
                                Pengumuman
                            </h2>
                        </div>

                        <div className="divide-y divide-border">
                            {announcements.map((ann) => (
                                <div key={ann.id} className="p-5">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className={`size-2 rounded-full ${ann.active ? 'bg-foreground' : 'bg-muted-foreground/40'}`} />
                                        <span className="text-xs text-muted-foreground">
                                            {ann.source} • {ann.time}
                                        </span>
                                    </div>
                                    <p className="text-sm text-foreground leading-snug">
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