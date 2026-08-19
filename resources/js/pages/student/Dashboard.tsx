import StudentLayout from '@/layouts/student-layout';

const courses = [
    {
        title: 'Dasar Pemrograman',
        lecturer: 'Dr. Budi Santoso',
        semester: 'Semester 3',
        progress: 65,
        activity: 'Aktivitas terakhir: 2 jam lalu',
        image:
            'https://www.figma.com/api/mcp/asset/d7f4acef-b244-4a5f-a39b-553865e127ba.png',
    },
    {
        title: 'Struktur Data',
        lecturer: 'Prof. Linda Wijaya',
        semester: 'Semester 3',
        progress: 42,
        activity: 'Aktivitas terakhir: Kemarin',
        image:
            'https://www.figma.com/api/mcp/asset/7837e887-eee9-489d-a637-4e02b3dbde9f.png',
    },
];

const upcomingTasks = [
    {
        title: 'Implementasi Array 2D',
        course: 'Dasar Pemrograman',
        deadline: '23:59 WIB',
        urgent: true,
        type: 'task',
    },
    {
        title: 'Kuis Tree & Graph',
        course: 'Struktur Data',
        deadline: 'Besok, 10:00 WIB',
        urgent: false,
        type: 'quiz',
    },
];

const announcements = [
    {
        source: 'Fakultas Teknik • 2 jam lalu',
        title: 'Perubahan Jadwal Ujian Tengah Semester',
        active: true,
    },
    {
        source: 'Dasar Pemrograman • 1 hari lalu',
        title: 'Materi Tambahan: Pointers di C++ telah diunggah',
        active: false,
    },
];

function CourseCard({
    course,
}: {
    course: (typeof courses)[number];
}) {
    return (
        <article className="overflow-hidden rounded-[24px] border border-[#C3C6D7] bg-[#F8F9FF]">
            <div className="relative h-32 overflow-hidden">
                <img
                    src={course.image}
                    alt=""
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <div className="absolute bottom-4 left-4">
                    <span className="rounded bg-white/90 px-2 py-1 text-xs font-semibold text-[#004AC6] backdrop-blur-sm">
                        {course.semester}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="font-poppins text-xl font-semibold leading-[30px] text-[#0B1C30]">
                    {course.title}
                </h3>

                <p className="mt-1 flex items-center gap-2 text-sm text-[#434655]">
                    <span>♙</span>
                    {course.lecturer}
                </p>

                <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-[#434655]">
                            Progress Modul
                        </span>

                        <span className="font-semibold text-[#0B1C30]">
                            {course.progress}%
                        </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#DCE9FF]">
                        <div
                            className="h-full rounded-full bg-[#B54E00]"
                            style={{ width: `${course.progress}%` }}
                        />
                    </div>

                    <p className="mt-2 text-xs text-[#737686]">
                        {course.activity}
                    </p>
                </div>
            </div>
        </article>
    );
}

function UpcomingTasks() {
    return (
        <section className="rounded-[24px] border border-[#C3C6D7] bg-[#F8F9FF] p-[25px] shadow-[0_4px_10px_rgba(31,41,55,0.04)]">
            <div className="flex items-center justify-between">
                <h2 className="font-poppins text-xl font-semibold leading-[30px] text-[#0B1C30]">
                    Tugas
                    <br />
                    Mendatang
                </h2>

                <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#434655]"
                >
                    <span className="text-lg">⋮</span>
                </button>
            </div>

            <div className="mt-5">
                {upcomingTasks.map((task, index) => (
                    <div
                        key={task.title}
                        className={[
                            'flex gap-4 py-4',
                            index === 0
                                ? 'border-b border-[#C3C6D7]'
                                : '',
                        ].join(' ')}
                    >
                        <div
                            className={[
                                'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                                task.urgent
                                    ? 'bg-[#FFDAD6] text-[#BA1A1A]'
                                    : 'bg-[#DCE9FF] text-[#004AC6]',
                            ].join(' ')}
                        >
                            {task.type === 'task' ? '▣' : '▤'}
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="text-sm leading-[19px] text-[#0B1C30]">
                                    {task.title}
                                </h3>

                                {task.urgent && (
                                    <span className="shrink-0 rounded bg-[#FFDAD6] px-2 py-0.5 text-[10px] font-bold text-[#BA1A1A]">
                                        HARI INI
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-xs text-[#434655]">
                                {task.course}
                            </p>

                            <p
                                className={[
                                    'mt-2 text-xs',
                                    task.urgent
                                        ? 'text-[#BA1A1A]'
                                        : 'text-[#737686]',
                                ].join(' ')}
                            >
                                ◷ {task.deadline}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="mt-4 w-full rounded-lg border border-[#C3C6D7] px-4 py-3 text-sm text-[#004AC6] hover:bg-white"
            >
                Lihat Semua Tugas
            </button>
        </section>
    );
}

function AiRecommendation() {
    return (
        <section className="relative overflow-hidden rounded-[24px] border border-[#DBE1FF] bg-[#EFF4FF] p-[25px]">
            <div className="relative flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-xl text-white">
                    ✿
                </div>

                <div className="min-w-0 flex-1">
                    <h2 className="font-poppins text-xl font-semibold leading-[30px] text-[#0B1C30]">
                        Rekomendasi Belajar Pintar
                    </h2>

                    <p className="mt-2 text-sm leading-5 text-[#434655]">
                        Berdasarkan pola belajarmu, AI merekomendasikan fokus
                        pada materi berikut hari ini:
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="flex items-center gap-3 rounded-lg border border-[#C3C6D7] bg-[#F8F9FF] p-3 text-left"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E5EEFF] text-xs text-[#2563EB]">
                                ▶
                            </span>

                            <span>
                                <span className="block text-xs text-[#737686]">
                                    Dasar Pemrograman
                                </span>
                                <span className="mt-0.5 block text-sm leading-5 text-[#0B1C30]">
                                    Lanjutkan Modul 3:
                                    <br />
                                    Array
                                </span>
                            </span>
                        </button>

                        <button
                            type="button"
                            className="flex items-center gap-3 rounded-lg border border-[#C3C6D7] bg-[#F8F9FF] p-3 text-left"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFD7C8] text-xs text-[#B54E00]">
                                ↻
                            </span>

                            <span>
                                <span className="block text-xs text-[#737686]">
                                    Struktur Data
                                </span>
                                <span className="mt-0.5 block text-sm leading-5 text-[#0B1C30]">
                                    Tinjau Kuis Algoritma
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Announcements() {
    return (
        <section>
            <h2 className="font-poppins px-1 text-lg font-semibold leading-7 text-[#0B1C30]">
                Pengumuman
            </h2>

            <div className="mt-3 space-y-3">
                {announcements.map((announcement) => (
                    <button
                        type="button"
                        key={announcement.title}
                        className="w-full rounded-xl border border-[#C3C6D7] bg-[#F8F9FF] p-[17px] text-left hover:bg-white"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className={[
                                    'h-2 w-2 rounded-full',
                                    announcement.active
                                        ? 'bg-[#004AC6]'
                                        : 'bg-[#C3C6D7]',
                                ].join(' ')}
                            />

                            <span className="text-xs text-[#737686]">
                                {announcement.source}
                            </span>
                        </div>

                        <p className="mt-2 text-sm leading-5 text-[#0B1C30]">
                            {announcement.title}
                        </p>
                    </button>
                ))}
            </div>

            <button
                type="button"
                className="mt-3 w-full text-center text-sm text-[#004AC6]"
            >
                Baca semua pengumuman
            </button>
        </section>
    );
}

export default function Dashboard() {
    return (
        <StudentLayout>
            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-16 py-[21px]">
                <div className="grid grid-cols-[568px_264px] gap-10">
                    {/* Main */}
                    <div className="space-y-10">
                        <section>
                            <div className="flex items-center justify-between">
                                <h1 className="font-poppins text-2xl font-semibold leading-[33.6px] text-[#0B1C30]">
                                    Mata Kuliah Aktif
                                </h1>

                                <button
                                    type="button"
                                    className="text-[15px] font-semibold tracking-[0.15px] text-[#004AC6]"
                                >
                                    Lihat Semua ›
                                </button>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-6">
                                {courses.map((course) => (
                                    <CourseCard
                                        key={course.title}
                                        course={course}
                                    />
                                ))}
                            </div>
                        </section>

                        <AiRecommendation />
                    </div>

                    {/* Right */}
                    <div className="space-y-10">
                        <UpcomingTasks />
                        <Announcements />
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}