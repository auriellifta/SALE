import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MessageSquare,
    Pin,
    Plus,
    Search,
    User,
    CheckCircle2,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import LecturerSidebar from '@/components/sale/LecturerSidebar';
import LecturerTopbar from '@/components/sale/LecturerTopbar';

type Topic = {
    id: number;
    title: string;
    author: string;
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
        title: 'Kebijakan Penilaian Ujian Tengah Semester & Remedial',
        author: 'Devanovita, M.Kom. (Anda)',
        snippet: 'Harap membaca pedoman tata tertib penilaian sebelum mengajukan sanggah nilai.',
        course: 'CS101 - Pengantar Ilmu Komputer (Kelas A)',
        category: 'Pengumuman',
        replies: 24,
        timeAgo: '1 hari lalu',
        isPinned: true,
    },
    {
        id: 2,
        title: 'Diskusi Kendala Tugas Besar: Implementasi Basis Data Relasional',
        author: 'Budi Santoso',
        snippet: 'Izin bertanya dosen, apakah relasi many-to-many wajib menggunakan tabel relasi tambahan?',
        course: 'IF204 - Basis Data (Kelas B)',
        category: 'Tanya Jawab',
        replies: 14,
        timeAgo: '2 jam lalu',
    },
    {
        id: 3,
        title: 'Klarifikasi Format Laporan Praktikum Struktur Data',
        author: 'Siti Aminah',
        snippet: 'Minta arahan terkait sistematika penulisan daftar pustaka pada laporan pekan ini.',
        course: 'CS101 - Pengantar Ilmu Komputer (Kelas A)',
        category: 'Praktikum',
        replies: 6,
        timeAgo: '4 jam lalu',
    },
    {
        id: 4,
        title: 'Pengumuman Jadwal Pengganti Kuliah (Make-up Class)',
        author: 'Devanovita, M.Kom. (Anda)',
        snippet: 'Kuliah pengganti pertemuan ke-5 akan dilaksanakan secara daring via Zoom.',
        course: 'IF301 - Kecerdasan Buatan (Kelas A)',
        category: 'Pengumuman',
        replies: 9,
        timeAgo: 'Kemarin',
        isPinned: true,
    },
];

export default function ForumDosen() {
    const [topics, setTopics] = useState<Topic[]>(initialTopics);
    const [search, setSearch] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('Semua Mata Kuliah');
    const [newModalOpen, setNewModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('Pengumuman');
    const [newContent, setNewContent] = useState('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const filteredTopics = topics.filter((t) => {
        const matchesSearch =
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.snippet.toLowerCase().includes(search.toLowerCase()) ||
            t.author.toLowerCase().includes(search.toLowerCase());
        const matchesCourse =
            selectedCourse === 'Semua Mata Kuliah' || t.course === selectedCourse;
        return matchesSearch && matchesCourse;
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        const newTopicItem: Topic = {
            id: topics.length + 1,
            title: newTitle,
            author: 'Devanovita, M.Kom. (Anda)',
            snippet: newContent || 'Informasi resmi dari dosen pengampu...',
            course: selectedCourse === 'Semua Mata Kuliah' ? 'CS101 - Pengantar Ilmu Komputer (Kelas A)' : selectedCourse,
            category: newCategory,
            replies: 0,
            timeAgo: 'Baru saja',
            isPinned: newCategory === 'Pengumuman',
        };

        setTopics([newTopicItem, ...topics]);
        setNewTitle('');
        setNewContent('');
        setNewModalOpen(false);
        showToast('Topik atau pengumuman berhasil dipublikasikan!');
    };

    return (
        <>
            <Head title="Forum Diskusi Dosen — SALE" />

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
                        
                        {/* Header Context & Action */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                    Forum Diskusi Perkuliahan
                                </h1>
                                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Pusat koordinasi, pengumuman resmi, dan ruang tanya jawab interaktif bersama mahasiswa
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative">
                                    <select
                                        value={selectedCourse}
                                        onChange={(e) => setSelectedCourse(e.target.value)}
                                        className="h-10 appearance-none rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-4 pr-10 text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary shadow-xs cursor-pointer"
                                    >
                                        <option value="Semua Mata Kuliah">Semua Mata Kuliah</option>
                                        <option value="CS101 - Pengantar Ilmu Komputer (Kelas A)">CS101 - Pengantar Ilmu Komputer (Kelas A)</option>
                                        <option value="IF204 - Basis Data (Kelas B)">IF204 - Basis Data (Kelas B)</option>
                                        <option value="IF301 - Kecerdasan Buatan (Kelas A)">IF301 - Kecerdasan Buatan (Kelas A)</option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                                </div>

                                <Button
                                    onClick={() => setNewModalOpen(true)}
                                    className="gap-2 text-xs font-bold h-10 px-5 rounded-xl shadow-xs bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
                                >
                                    <Plus className="size-4" />
                                    Buat Pengumuman / Topik
                                </Button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 dark:text-slate-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari topik diskusi, pertanyaan mahasiswa, atau pengumuman..."
                                className="w-full h-11 pl-11 pr-4 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-primary transition-all shadow-xs"
                            />
                        </div>

                        {/* Main Table Card */}
                        <Card className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs py-0">
                            {/* Header Table */}
                            <div className="hidden grid-cols-12 items-center gap-4 bg-slate-50 dark:bg-slate-950 px-6 py-4 text-[10px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase md:grid text-left border-b border-slate-200 dark:border-slate-800">
                                <div className="col-span-6 text-left">Topik Diskusi / Pengumuman</div>
                                <div className="col-span-2 text-left">Kategori</div>
                                <div className="col-span-2 text-left">Tanggapan</div>
                                <div className="col-span-2 text-left">Update Terakhir</div>
                            </div>

                            {/* Baris Tabel */}
                            <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                                {filteredTopics.map((topic) => (
                                    <div
                                        key={topic.id}
                                        className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-4 px-6 py-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors text-left"
                                    >
                                        {/* Col 1-6: Topik & Penulis */}
                                        <div className="col-span-6 flex items-center gap-3.5 min-w-0 pr-4 text-left">
                                            {topic.isPinned ? (
                                                <Pin className="size-4 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400 shrink-0" />
                                            ) : (
                                                <MessageSquare className="size-4 text-slate-500 dark:text-slate-400 shrink-0" />
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <h2 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug truncate cursor-pointer">
                                                    {topic.title}
                                                </h2>
                                                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                                    <User className="size-3 text-slate-400 dark:text-slate-500 shrink-0" />
                                                    <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">
                                                        {topic.author}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="truncate">{topic.snippet}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Col 7-8: Kategori */}
                                        <div className="col-span-2 text-left">
                                            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                                                {topic.category}
                                            </span>
                                        </div>

                                        {/* Col 9-10: Tanggapan */}
                                        <div className="col-span-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">
                                            <span className="inline-flex items-center gap-1.5">
                                                <MessageSquare className="size-3.5 text-slate-400 dark:text-slate-500" />
                                                {topic.replies} Tanggapan
                                            </span>
                                        </div>

                                        {/* Col 11-12: Update Terakhir */}
                                        <div className="col-span-2 text-left text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                            {topic.timeAgo}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Pagination Footer */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
                            <div className="font-medium">Menampilkan {filteredTopics.length} dari {topics.length} topik diskusi</div>

                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="rounded-xl shadow-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 h-9 w-9 p-0 flex items-center justify-center">
                                    <ChevronLeft className="size-4" />
                                </Button>
                                <Button size="sm" className="rounded-xl text-xs font-bold shadow-xs bg-blue-600 dark:bg-blue-500 text-white h-9 w-9 p-0 flex items-center justify-center">
                                    1
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-xl shadow-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 h-9 w-9 p-0 flex items-center justify-center">
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Create Topic Modal */}
                        <Dialog open={newModalOpen} onOpenChange={setNewModalOpen}>
                            <DialogContent className="max-w-lg rounded-2xl p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                <DialogHeader className="flex flex-row items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                                    <div>
                                        <DialogTitle className="text-sm font-black">
                                            Buat Pengumuman atau Topik Diskusi Dosen
                                        </DialogTitle>
                                        <DialogDescription className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            Publikasikan informasi penting atau buka ruang diskusi bagi mahasiswa Anda.
                                        </DialogDescription>
                                    </div>
                                </DialogHeader>

                                <form onSubmit={handleCreate} className="space-y-4 text-xs">
                                    <div className="space-y-1.5">
                                        <label className="font-bold text-slate-700 dark:text-slate-300">
                                            Judul Topik / Pengumuman
                                        </label>
                                        <Input
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            placeholder="Contoh: Ketentuan Ujian Akhir Semester & Kisi-kisi..."
                                            required
                                            className="text-xs h-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="font-bold text-slate-700 dark:text-slate-300">
                                            Kategori
                                        </label>
                                        <select
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            className="w-full h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="Pengumuman">Pengumuman Resmi</option>
                                            <option value="Tanya Jawab">Tanya Jawab Perkuliahan</option>
                                            <option value="Praktikum">Praktikum / Tugas</option>
                                            <option value="Diskusi Umum">Diskusi Umum</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="font-bold text-slate-700 dark:text-slate-300">
                                            Isi Pengumuman / Pesan
                                        </label>
                                        <Textarea
                                            value={newContent}
                                            onChange={(e) => setNewContent(e.target.value)}
                                            placeholder="Tuliskan detail informasi atau instruksi untuk mahasiswa..."
                                            className="text-xs resize-none h-28 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3"
                                            required
                                        />
                                    </div>

                                    <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-slate-200 dark:border-slate-800">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setNewModalOpen(false)}
                                            className="text-xs border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 rounded-xl cursor-pointer"
                                        >
                                            Batal
                                        </Button>
                                        <Button type="submit" size="sm" className="text-xs font-bold rounded-xl shadow-xs bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer">
                                            Publikasikan Topik
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </main>
                </div>
            </div>
        </>
    );
}

ForumDosen.layout = (page: React.ReactNode) => page;