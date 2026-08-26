import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    ChevronRight,
    Clock,
    Code2,
    HelpCircle,
    Megaphone,
    Sparkles,
    User,
} from 'lucide-react';
import StudentLayout from '@/layouts/student-layout';

const courses = [
    {
        id: 1,
        title: 'Dasar Pemrograman',
        lecturer: 'Dr. Budi Santoso',
        semester: 'Semester 3',
        image:
            'https://www.figma.com/api/mcp/asset/d7f4acef-b244-4a5f-a39b-553865e127ba.png',
    },
    {
        id: 2,
        title: 'Struktur Data',
        lecturer: 'Prof. Linda Wijaya',
        semester: 'Semester 3',
        image:
            'https://www.figma.com/api/mcp/asset/7837e887-eee9-489d-a637-4e02b3dbde9f.png',
    },
];

const upcomingTasks = [
    {
        id: 1,
        title: 'Implementasi Array 2D',
        course: 'Dasar Pemrograman',
        deadline: '23:59 WIB',
        urgent: true,
        type: 'task',
        href: '/student/programming-task/1',
    },
    {
        id: 2,
        title: 'Kuis Tree & Graph',
        course: 'Struktur Data',
        deadline: 'Besok, 10:00 WIB',
        urgent: false,
        type: 'quiz',
        href: '/student/quiz/1',
    },
];

const announcements = [
    {
        id: 1,
        source: 'Fakultas Teknik • 2 jam lalu',
        title: 'Perubahan Jadwal Ujian Tengah Semester',
        href: '/student/announcements/1',
        active: true,
    },
    {
        id: 2,
        source: 'Dasar Pemrograman • 1 hari lalu',
        title: 'Materi Tambahan: Pointers di C++ telah diunggah',
        href: '/student/announcements/2',
        active: false,
    },
];

function CourseCard({
    course,
}: {
    course: (typeof courses)[number];
}) {
    return (
        <Link
            href={`/student/courses/${course.id}`}
            className="group block overflow-hidden rounded-[24px] border border-[#C3C6D7] bg-[#F8F9FF] shadow-[0_4px_10px_rgba(31,41,55,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-[#9EB8F5] hover:bg-white hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600 dark:hover:bg-slate-800"
        >
            <div className="relative h-32 overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <div className="absolute bottom-4 left-4">
                    <span className="rounded bg-white/90 px-2 py-1 text-xs font-semibold text-[#004AC6] backdrop-blur-sm dark:bg-slate-900/90 dark:text-blue-300">
                        {course.semester}
                    </span>
                </div>

                <div className="absolute right-4 bottom-4 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#004AC6] opacity-0 shadow-sm transition-all group-hover:opacity-100 dark:bg-slate-900/90 dark:text-blue-300">
                    <ChevronRight className="size-4" />
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-poppins text-xl font-semibold leading-[30px] text-[#0B1C30] transition-colors group-hover:text-[#004AC6] dark:text-slate-100 dark:group-hover:text-blue-300">
                        {course.title}
                    </h3>

                    <BookOpen className="mt-1 size-5 shrink-0 text-[#004AC6] dark:text-blue-300" />
                </div>

                <p className="mt-2 flex items-center gap-2 text-sm text-[#434655] dark:text-slate-400">
                    <User className="size-4 text-[#004AC6] dark:text-blue-300" />
                    {course.lecturer}
                </p>
            </div>
        </Link>
    );
}

function UpcomingTasks() {
    return (
        <section className="overflow-hidden rounded-[24px] border border-[#C3C6D7] bg-[#F8F9FF] shadow-[0_4px_10px_rgba(31,41,55,0.04)] dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between p-[25px] pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#DCE9FF] text-[#004AC6] dark:bg-blue-950 dark:text-blue-300">
                        <CalendarDays className="size-5" />
                    </div>

                    <h2 className="font-poppins text-xl font-semibold leading-[30px] text-center text-[#0B1C30] dark:text-slate-100">
                        Tugas
                        <br />
                        Mendatang
                    </h2>
                </div>

                <Link
                    href="/student/assignments"
                    className="flex size-8 items-center justify-center rounded-full text-[#434655] transition-colors hover:bg-[#DCE9FF] hover:text-[#004AC6] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-300"
                    aria-label="Lihat semua tugas"
                >
                </Link>
            </div>

            <div className="px-[25px]">
                {upcomingTasks.map((task, index) => (
                    <Link
                        key={task.id}
                        href={task.href}
                        className={[
                            'group flex gap-4 py-4',
                            index !== upcomingTasks.length - 1
                                ? 'border-b border-[#C3C6D7] dark:border-slate-700'
                                : '',
                        ].join(' ')}
                    >
                        <div
                            className={[
                                'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105',
                                task.urgent
                                    ? 'bg-[#FFDAD6] text-[#BA1A1A] dark:bg-red-950 dark:text-red-300'
                                    : 'bg-[#DCE9FF] text-[#004AC6] dark:bg-blue-950 dark:text-blue-300',
                            ].join(' ')}
                        >
                            {task.type === 'task' ? (
                                <Code2 className="size-5" />
                            ) : (
                                <HelpCircle className="size-5" />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="text-sm leading-[19px] text-[#0B1C30] transition-colors group-hover:text-[#004AC6] dark:text-slate-100 dark:group-hover:text-blue-300">
                                    {task.title}
                                </h3>

                                {task.urgent && (
                                    <span className="shrink-0 rounded bg-[#FFDAD6] px-2 py-0.5 text-[10px] font-bold text-[#BA1A1A] dark:bg-red-950 dark:text-red-300">
                                        HARI INI
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-xs text-[#434655] dark:text-slate-400">
                                {task.course}
                            </p>

                            <p
                                className={[
                                    'mt-2 flex items-center gap-1.5 text-xs',
                                    task.urgent
                                        ? 'text-[#BA1A1A] dark:text-red-300'
                                        : 'text-[#737686] dark:text-slate-500',
                                ].join(' ')}
                            >
                                <Clock className="size-3.5" />
                                {task.deadline}
                            </p>
                        </div>

                        <ChevronRight className="mt-3 size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#004AC6] dark:text-slate-600 dark:group-hover:text-blue-300" />
                    </Link>
                ))}
            </div>

            <div className="p-[25px] pt-4">
                <Link
                    href="/student/assignments"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#C3C6D7] px-4 py-3 text-sm font-medium text-[#004AC6] transition-colors hover:bg-white dark:border-slate-700 dark:text-blue-300 dark:hover:bg-slate-800"
                >
                    Lihat Semua Tugas
                </Link>
            </div>
        </section>
    );
}

function AiRecommendation() {
    return (
        <section className="relative overflow-hidden rounded-[24px] border border-[#DBE1FF] bg-[#EFF4FF] p-[25px] dark:border-blue-950 dark:bg-slate-900">
            <div className="relative flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-xl text-white shadow-sm">
                    <Sparkles className="size-6" />
                </div>

                <div className="min-w-0 flex-1">
                    <h2 className="font-poppins text-xl font-semibold leading-[30px] text-[#0B1C30] dark:text-slate-100">
                        Rekomendasi Belajar Pintar
                    </h2>

                    <p className="mt-2 text-sm leading-5 text-[#434655] dark:text-slate-400">
                        Berdasarkan pola belajarmu, AI merekomendasikan fokus
                        pada materi berikut hari ini:
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Link
                            href="/student/programming-task/1"
                            className="group flex items-center gap-3 rounded-lg border border-[#C3C6D7] bg-[#F8F9FF] p-3 text-left transition-all hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E5EEFF] text-[#2563EB] dark:bg-blue-950 dark:text-blue-300">
                                <Code2 className="size-4" />
                            </span>

                            <span className="min-w-0">
                                <span className="block text-xs text-[#737686] dark:text-slate-400">
                                    Dasar Pemrograman
                                </span>
                                <span className="mt-0.5 block truncate text-sm leading-5 text-[#0B1C30] group-hover:text-[#004AC6] dark:text-slate-100 dark:group-hover:text-blue-300">
                                    Lanjutkan Modul 3: Array
                                </span>
                            </span>

                            <ChevronRight className="ml-auto size-4 shrink-0 text-slate-300 group-hover:text-[#004AC6] dark:text-slate-600 dark:group-hover:text-blue-300" />
                        </Link>

                        <Link
                            href="/student/quiz/1"
                            className="group flex items-center gap-3 rounded-lg border border-[#C3C6D7] bg-[#F8F9FF] p-3 text-left transition-all hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFD7C8] text-[#B54E00] dark:bg-orange-950 dark:text-orange-300">
                                <HelpCircle className="size-4" />
                            </span>

                            <span className="min-w-0">
                                <span className="block text-xs text-[#737686] dark:text-slate-400">
                                    Struktur Data
                                </span>
                                <span className="mt-0.5 block truncate text-sm leading-5 text-[#0B1C30] group-hover:text-[#B54E00] dark:text-slate-100 dark:group-hover:text-orange-300">
                                    Tinjau Kuis Algoritma
                                </span>
                            </span>

                            <ChevronRight className="ml-auto size-4 shrink-0 text-slate-300 group-hover:text-[#B54E00] dark:text-slate-600 dark:group-hover:text-orange-300" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Announcements() {
    return (
        <section>
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <Megaphone className="size-5 text-[#004AC6] dark:text-blue-300" />
                    <h2 className="font-poppins text-lg font-semibold leading-7 text-[#0B1C30] dark:text-slate-100">
                        Pengumuman
                    </h2>
                </div>

                <Link
                    href="/student/announcements"
                    className="text-xs font-semibold text-[#004AC6] hover:underline dark:text-blue-300"
                >
                    Baca semua pengumuman
                </Link>
            </div>

            <div className="mt-3 space-y-3">
                {announcements.map((announcement) => (
                    <Link
                        href={announcement.href}
                        key={announcement.id}
                        className="group block w-full rounded-xl border border-[#C3C6D7] bg-[#F8F9FF] p-[17px] text-left transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className={[
                                    'h-2 w-2 rounded-full',
                                    announcement.active
                                        ? 'bg-[#004AC6]'
                                        : 'bg-[#C3C6D7] dark:bg-slate-600',
                                ].join(' ')}
                            />

                            <span className="text-xs text-[#737686] dark:text-slate-400">
                                {announcement.source}
                            </span>
                        </div>

                        <div className="mt-2 flex items-start gap-3">
                            <p className="text-sm leading-5 text-[#0B1C30] group-hover:text-[#004AC6] dark:text-slate-100 dark:group-hover:text-blue-300">
                                {announcement.title}
                            </p>

                            <ChevronRight className="mt-0.5 ml-auto size-4 shrink-0 text-slate-300 group-hover:text-[#004AC6] dark:text-slate-600 dark:group-hover:text-blue-300" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default function Dashboard() {
    return (
        <StudentLayout>
            <Head title="Dashboard Mahasiswa — SALE" />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-5 py-6 sm:px-8 md:px-12 lg:px-16 dark:bg-slate-950">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-7 flex items-end justify-between gap-4">
                        <div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
                        <div className="min-w-0 space-y-8">
                            <section>
                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <h2 className="font-poppins text-2xl font-semibold leading-[33.6px] text-[#0B1C30] dark:text-slate-100">
                                            Mata Kuliah Aktif
                                        </h2>
                                        <p className="mt-1 text-sm text-[#737686] dark:text-slate-400">
                                            Semester Ganjil 2023/2024
                                        </p>
                                    </div>

                                    <Link
                                        href="/student/courses"
                                        className="flex items-center gap-1 text-sm font-semibold text-[#004AC6] hover:underline dark:text-blue-300"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    {courses.map((course) => (
                                        <CourseCard
                                            key={course.id}
                                            course={course}
                                        />
                                    ))}
                                </div>
                            </section>

                            <AiRecommendation />
                        </div>

                        <div className="space-y-8">
                            <UpcomingTasks />
                            <Announcements />
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
