import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MessageSquare,
    Pin,
    Plus,
    Search,
    User,
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import StudentLayout from '@/layouts/student-layout';

type Topic = {
    id: number;
    title: string;
    author: string;
    avatarBg: string;
    avatarText: string;
    snippet: string;
    course: string;
    category: string;
    replies: number;
    timeAgo: string;
    isPinned?: boolean;
};

const initialTopics: Topic[] = [
    {
        id: 1,
        title: 'Panduan Penggunaan Forum Diskusi IMK',
        author: 'Dr. Budi (Dosen)',
        avatarBg: 'bg-slate-700',
        avatarText: 'DB',
        snippet: 'Harap membaca panduan ini sebelum membuat topik diskusi baru.',
        course: 'Interaksi Manusia & Komputer',
        category: 'Pengumuman',
        replies: 5,
        timeAgo: '1 hari lalu',
        isPinned: true,
    },
    {
        id: 2,
        title: 'Evaluasi Heuristik vs Usability Testing',
        author: 'Auriel',
        avatarBg: 'bg-amber-600',
        avatarText: 'A',
        snippet: 'Apakah ada yang bisa memberikan contoh penerapan metode ini?',
        course: 'Interaksi Manusia & Komputer',
        category: 'Tugas Kelompok',
        replies: 12,
        timeAgo: '2 jam lalu',
    },
    {
        id: 3,
        title: 'Perbedaan Affordance dan Signifier pada UI Mobile',
        author: 'Rizky P.',
        avatarBg: 'bg-emerald-700',
        avatarText: 'RP',
        snippet: 'Saya masih agak bingung membedakan kedua konsep tersebut.',
        course: 'Interaksi Manusia & Komputer',
        category: 'Pertanyaan Materi',
        replies: 4,
        timeAgo: '5 jam lalu',
    },
    {
        id: 4,
        title: 'Kendala Segmentation Fault saat Alokasi Memori Pointer di C++',
        author: 'Sarah Oktavia',
        avatarBg: 'bg-violet-600',
        avatarText: 'SO',
        snippet: 'Program mengalami crash ketika mengalokasikan array 2D dinamis.',
        course: 'Struktur Data & Algoritma',
        category: 'Praktikum',
        replies: 8,
        timeAgo: 'Kemarin',
    },
];

const courses = [
    'Semua Mata Kuliah',
    'Interaksi Manusia & Komputer',
    'Struktur Data & Algoritma',
    'Sistem Operasi',
];

const avatarColors = [
    'bg-[#1B59F8]',
    'bg-emerald-600',
    'bg-amber-600',
    'bg-violet-600',
    'bg-rose-600',
];

export default function Forum() {
    const [topics, setTopics] = useState<Topic[]>(initialTopics);
    const [selectedCourse, setSelectedCourse] = useState('Semua Mata Kuliah');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [newModalOpen, setNewModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('Diskusi Umum');
    const [newContent, setNewContent] = useState('');

    const itemsPerPage = 5;

    const filteredTopics = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return topics.filter((topic) => {
            const matchesSearch =
                !keyword ||
                topic.title.toLowerCase().includes(keyword) ||
                topic.author.toLowerCase().includes(keyword) ||
                topic.snippet.toLowerCase().includes(keyword);

            const matchesCourse =
                selectedCourse === 'Semua Mata Kuliah' ||
                topic.course === selectedCourse;

            return matchesSearch && matchesCourse;
        });
    }, [topics, search, selectedCourse]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredTopics.length / itemsPerPage),
    );

    const paginatedTopics = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredTopics.slice(start, start + itemsPerPage);
    }, [filteredTopics, currentPage]);

    const handleCourseChange = (course: string) => {
        setSelectedCourse(course);
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const getInitials = (name: string) => {
        return name
            .replace(/\(.*?\)/g, '')
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word.charAt(0).toUpperCase())
            .join('');
    };

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newTitle.trim() || !newContent.trim()) return;

        const author = 'Auriel';
        const newTopic: Topic = {
            id: Math.max(0, ...topics.map((topic) => topic.id)) + 1,
            title: newTitle.trim(),
            author,
            avatarBg: avatarColors[topics.length % avatarColors.length],
            avatarText: getInitials(author),
            snippet: newContent.trim(),
            course:
                selectedCourse === 'Semua Mata Kuliah'
                    ? 'Interaksi Manusia & Komputer'
                    : selectedCourse,
            category: newCategory,
            replies: 0,
            timeAgo: 'Baru saja',
        };

        setTopics((currentTopics) => [newTopic, ...currentTopics]);
        setNewTitle('');
        setNewCategory('Diskusi Umum');
        setNewContent('');
        setNewModalOpen(false);
        setCurrentPage(1);
    };

    const firstItem =
        filteredTopics.length === 0
            ? 0
            : (currentPage - 1) * itemsPerPage + 1;

    const lastItem = Math.min(
        currentPage * itemsPerPage,
        filteredTopics.length,
    );

    return (
        <StudentLayout>
            <Head title="Forum Diskusi — SALE" />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-5 py-6 sm:px-8 md:px-12 md:py-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                                <Link
                                    href="/student/dashboard"
                                    className="transition-colors hover:text-slate-800"
                                >
                                    SALE
                                </Link>
                                <span className="text-slate-400">›</span>
                                <span className="font-semibold text-[#1B59F8]">
                                    Forum Diskusi
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative min-w-full sm:min-w-[230px]">
                                <select
                                    value={selectedCourse}
                                    onChange={(e) =>
                                        handleCourseChange(e.target.value)
                                    }
                                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-medium text-slate-700 shadow-xs outline-none transition-colors hover:border-slate-300 focus:border-[#1B59F8] focus:ring-2 focus:ring-[#1B59F8]/10"
                                >
                                    {courses.map((course) => (
                                        <option key={course} value={course}>
                                            {course}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                            </div>

                            <button
                                type="button"
                                onClick={() => setNewModalOpen(true)}
                                className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1B59F8] px-5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-[0.98]"
                            >
                                <Plus className="size-4 stroke-[2.5]" />
                                <span>Topik Baru</span>
                            </button>
                        </div>
                    </div>

                    <div className="relative mb-5">
                        <Search className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                handleSearchChange(e.target.value)
                            }
                            placeholder="Cari topik diskusi atau nama penulis..."
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 shadow-xs outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1B59F8] focus:ring-2 focus:ring-[#1B59F8]/10"
                        />
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                        <div className="hidden grid-cols-12 items-center bg-[#F1F4FA]/80 px-6 py-4 text-[11px] font-bold tracking-wider text-slate-500 uppercase md:grid">
                            <div className="col-span-6">Topik Diskusi</div>
                            <div className="col-span-2 text-center">
                                Kategori
                            </div>
                            <div className="col-span-2 text-center">
                                Balasan
                            </div>
                            <div className="col-span-2 text-right">
                                Update Terakhir
                            </div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {paginatedTopics.length > 0 ? (
                                paginatedTopics.map((topic) => (
                                    <div
                                        key={topic.id}
                                        className="grid grid-cols-1 gap-4 px-5 py-5 transition-colors hover:bg-slate-50/60 md:grid-cols-12 md:items-center md:px-6"
                                    >
                                        <div className="flex min-w-0 items-start gap-4 md:col-span-6 md:pr-4">
                                            <div className="mt-1 shrink-0">
                                                {topic.isPinned ? (
                                                    <Pin className="size-4 fill-[#1B59F8] text-[#1B59F8]" />
                                                ) : (
                                                    <MessageSquare className="size-[18px] text-slate-400" />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h2 className="truncate text-sm font-bold text-slate-900 transition-colors hover:text-[#1B59F8]">
                                                    <button
                                                        type="button"
                                                        className="max-w-full truncate text-left"
                                                    >
                                                        {topic.title}
                                                    </button>
                                                </h2>

                                                <div className="mt-1.5 flex min-w-0 items-center gap-2 text-xs text-slate-500">
                                                    <div
                                                        className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${topic.avatarBg}`}
                                                    >
                                                        {topic.avatarText}
                                                    </div>

                                                    <p className="min-w-0 truncate">
                                                        <span className="font-semibold text-slate-800">
                                                            {topic.author}
                                                        </span>{' '}
                                                        • {topic.snippet}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:col-span-2 md:block md:text-center">
                                            <span className="text-xs font-medium text-slate-400 md:hidden">
                                                Kategori
                                            </span>
                                            <span className="inline-block rounded-full bg-[#EBF2FF] px-3 py-1 text-xs font-medium text-[#1B59F8]">
                                                {topic.category}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between md:col-span-2 md:block md:text-center">
                                            <span className="text-xs font-medium text-slate-400 md:hidden">
                                                Balasan
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800">
                                                <MessageSquare className="size-3.5 text-slate-400" />
                                                {topic.replies} Balasan
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-xs font-medium text-slate-500 md:col-span-2 md:block md:text-right">
                                            <span className="md:hidden">
                                                Update Terakhir
                                            </span>
                                            <span>{topic.timeAgo}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex min-h-56 flex-col items-center justify-center px-6 py-12 text-center">
                                    <MessageSquare className="mb-3 size-9 text-slate-300" />
                                    <h3 className="text-sm font-semibold text-slate-700">
                                        Topik tidak ditemukan
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Coba ubah kata kunci pencarian atau
                                        filter mata kuliah.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
                        <div>
                            Menampilkan {firstItem}-{lastItem} dari{' '}
                            {filteredTopics.length} topik
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.max(1, page - 1),
                                    )
                                }
                                className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft className="size-4" />
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1,
                            ).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => setCurrentPage(page)}
                                    className={`flex size-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                                        currentPage === page
                                            ? 'bg-[#1B59F8] text-white shadow-xs'
                                            : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((page) =>
                                        Math.min(totalPages, page + 1),
                                    )
                                }
                                className="flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronRight className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={newModalOpen} onOpenChange={setNewModalOpen}>
                <DialogContent className="max-w-lg rounded-2xl border border-slate-200 bg-white p-0 shadow-xl">
                    <DialogHeader className="border-b border-slate-100 px-6 py-5">
                        <DialogTitle className="text-lg font-bold text-slate-900">
                            Buat Topik Diskusi Baru
                        </DialogTitle>
                        <DialogDescription className="pt-1 text-sm text-slate-500">
                            Bagikan pertanyaan atau mulai diskusi baru dengan
                            mahasiswa lainnya.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreate} className="px-6 py-5">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Judul Topik
                                </label>
                                <Input
                                    value={newTitle}
                                    onChange={(e) =>
                                        setNewTitle(e.target.value)
                                    }
                                    placeholder="Tuliskan judul diskusi..."
                                    required
                                    className="h-11 rounded-xl border-slate-200 bg-white text-sm focus-visible:ring-[#1B59F8]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Kategori
                                </label>
                                <div className="relative">
                                    <select
                                        value={newCategory}
                                        onChange={(e) =>
                                            setNewCategory(e.target.value)
                                        }
                                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-700 outline-none transition-colors focus:border-[#1B59F8] focus:ring-2 focus:ring-[#1B59F8]/10"
                                    >
                                        <option value="Diskusi Umum">
                                            Diskusi Umum
                                        </option>
                                        <option value="Pertanyaan Materi">
                                            Pertanyaan Materi
                                        </option>
                                        <option value="Tugas Kelompok">
                                            Tugas Kelompok
                                        </option>
                                        <option value="Praktikum">
                                            Praktikum
                                        </option>
                                        <option value="Pengumuman">
                                            Pengumuman
                                        </option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Isi Diskusi
                                </label>
                                <Textarea
                                    value={newContent}
                                    onChange={(e) =>
                                        setNewContent(e.target.value)
                                    }
                                    placeholder="Jelaskan pertanyaan atau topik yang ingin Anda diskusikan..."
                                    required
                                    className="min-h-32 resize-none rounded-xl border-slate-200 bg-white text-sm focus-visible:ring-[#1B59F8]"
                                />
                            </div>
                        </div>

                        <DialogFooter className="mt-6 flex-row justify-end gap-3 sm:gap-3">
                            <button
                                type="button"
                                onClick={() => setNewModalOpen(false)}
                                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                className="flex h-10 items-center gap-2 rounded-xl bg-[#1B59F8] px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                            >
                                <Plus className="size-4" />
                                Publikasikan Topik
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </StudentLayout>
    );
}
