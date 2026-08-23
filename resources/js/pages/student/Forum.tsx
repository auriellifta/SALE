import { Head } from '@inertiajs/react';
import { useState } from 'react';
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
import StudentLayout from '@/layouts/student-layout';

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
        title: 'Panduan Etika Diskusi & Format Tanya Jawab Forum',
        author: 'Dr. Budi Santoso, M.Kom',
        snippet: 'Harap membaca pedoman tata tertib forum sebelum membuka thread baru.',
        course: 'Interaksi Manusia & Komputer',
        category: 'Pengumuman',
        replies: 24,
        timeAgo: '1 hari lalu',
        isPinned: true,
    },
    {
        id: 2,
        title: 'Kendala Segmentation Fault saat Alokasi Memori Pointer di C++',
        author: 'Auriel Lifta',
        snippet: 'Program mengalami crash di baris 42 saat mengalokasikan array 2D dinamis.',
        course: 'Struktur Data & Algoritma',
        category: 'Praktikum',
        replies: 14,
        timeAgo: '2 jam lalu',
    },
    {
        id: 3,
        title: 'Perbedaan Adjacency Matrix vs Adjacency List pada Graf Berdensitas Rendah',
        author: 'Rizky Pratama (Asisten Lab)',
        snippet: 'Analisis efisiensi memori dan waktu eksekusi untuk persiapan kuis pekan ini.',
        course: 'Struktur Data & Algoritma',
        category: 'Materi',
        replies: 6,
        timeAgo: '4 jam lalu',
    },
    {
        id: 4,
        title: 'Pembentukan Kelompok untuk Proyek Akhir Desain Antarmuka',
        author: 'Sarah Oktavia',
        snippet: 'Mencari 1 rekan tim yang memiliki minat pada evaluasi heuristik usability.',
        course: 'Desain Antarmuka Pengguna',
        category: 'Tugas Kelompok',
        replies: 9,
        timeAgo: 'Kemarin',
    },
];

export default function Forum() {
    const [topics, setTopics] = useState<Topic[]>(initialTopics);
    const [search, setSearch] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('Semua Mata Kuliah');
    const [newModalOpen, setNewModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('Diskusi Umum');
    const [newContent, setNewContent] = useState('');

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
            author: 'Auriel Lifta',
            snippet: newContent || 'Diskusi baru...',
            course: selectedCourse === 'Semua Mata Kuliah' ? 'Interaksi Manusia & Komputer' : selectedCourse,
            category: newCategory,
            replies: 0,
            timeAgo: 'Baru saja',
        };

        setTopics([newTopicItem, ...topics]);
        setNewTitle('');
        setNewContent('');
        setNewModalOpen(false);
    };

    return (
        <StudentLayout>
            <Head title="Forum Diskusi — SALE" />

            <div className="space-y-6">
                {/* Header Context & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            Forum Diskusi
                        </h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            Ruang diskusi akademik antara mahasiswa, asisten, dan dosen pengampu
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="h-10 appearance-none rounded-xl bg-card pl-4 pr-10 text-sm font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary shadow-xs cursor-pointer border-0"
                            >
                                <option value="Semua Mata Kuliah">Semua Mata Kuliah</option>
                                <option value="Interaksi Manusia & Komputer">
                                    Interaksi Manusia & Komputer
                                </option>
                                <option value="Struktur Data & Algoritma">
                                    Struktur Data & Algoritma
                                </option>
                                <option value="Desain Antarmuka Pengguna">
                                    Desain Antarmuka Pengguna
                                </option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        </div>

                        <Button
                            onClick={() => setNewModalOpen(true)}
                            className="gap-2 text-sm font-bold h-10 px-5 rounded-xl shadow-xs bg-primary text-white hover:bg-primary/90"
                        >
                            <Plus className="size-4" />
                            Topik Baru
                        </Button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari topik diskusi atau nama penulis..."
                        className="w-full h-11 pl-11 pr-4 text-sm rounded-xl bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary transition-all shadow-xs border-0"
                    />
                </div>

                {/* Main Table Card */}
                <Card className="gap-0 overflow-hidden rounded-2xl bg-card py-0 shadow-sm border-0">
                    {/* Header */}
                    <div className="hidden grid-cols-12 items-center gap-4 bg-slate-100/90 dark:bg-slate-800/80 px-6 py-4 text-xs font-bold tracking-wider text-slate-600 dark:text-slate-300 uppercase md:grid text-left">
                        <div className="col-span-6 text-left">Topik Diskusi</div>
                        <div className="col-span-2 text-left">Kategori</div>
                        <div className="col-span-2 text-left">Balasan</div>
                        <div className="col-span-2 text-left">Update Terakhir</div>
                    </div>

                    {/* Baris Tabel */}
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                        {filteredTopics.map((topic) => (
                            <div
                                key={topic.id}
                                className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-4 px-6 py-5 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors text-left"
                            >
                                {/* Col 1-6: Topik & Penulis with dark icon */}
                                <div className="col-span-6 flex items-center gap-4 min-w-0 pr-4 text-left">
                                    {topic.isPinned ? (
                                        <Pin className="size-5 fill-slate-800 text-slate-800 dark:fill-slate-200 dark:text-slate-200 shrink-0" />
                                    ) : (
                                        <MessageSquare className="size-5 text-slate-800 dark:text-slate-200 shrink-0" />
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-primary transition-colors leading-snug truncate cursor-pointer">
                                            {topic.title}
                                        </h2>
                                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                                            <User className="size-3.5 text-slate-600 dark:text-slate-400 shrink-0" />
                                            <span className="font-semibold text-slate-700 dark:text-slate-300 shrink-0">
                                                {topic.author}
                                            </span>
                                            <span>•</span>
                                            <span className="truncate">{topic.snippet}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 7-8: Kategori (Plain text, no bg) */}
                                <div className="col-span-2 text-left">
                                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                        {topic.category}
                                    </span>
                                </div>

                                {/* Col 9-10: Balasan */}
                                <div className="col-span-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    <span className="inline-flex items-center gap-1.5">
                                        <MessageSquare className="size-3.5 text-slate-600 dark:text-slate-400" />
                                        {topic.replies} Balasan
                                    </span>
                                </div>

                                {/* Col 11-12: Update Terakhir */}
                                <div className="col-span-2 text-left text-xs text-muted-foreground font-medium">
                                    {topic.timeAgo}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Pagination Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground pt-2">
                    <div className="font-medium">Menampilkan {filteredTopics.length} dari {topics.length} topik</div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon-sm" className="rounded-xl shadow-xs border-0 bg-card hover:bg-blue-50 hover:text-primary">
                            <ChevronLeft className="size-4" />
                        </Button>
                        <Button size="icon-sm" className="rounded-xl text-xs font-bold shadow-xs bg-primary text-white">
                            1
                        </Button>
                        <Button variant="outline" size="icon-sm" className="rounded-xl shadow-xs border-0 bg-card hover:bg-blue-50 hover:text-primary">
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </div>

                {/* Create Topic Modal */}
                <Dialog open={newModalOpen} onOpenChange={setNewModalOpen}>
                    <DialogContent className="max-w-lg rounded-2xl p-6 space-y-4 shadow-xl border-0 bg-card">
                        <DialogHeader>
                            <DialogTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
                                Buat Topik Diskusi Baru
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground">
                                Ajukan pertanyaan atau bagikan topik diskusi untuk kelas Anda.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                    Judul Topik
                                </label>
                                <Input
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Tuliskan judul pertanyaan atau diskusi..."
                                    required
                                    className="text-xs h-10 bg-slate-50 dark:bg-slate-800 border-0 rounded-xl"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                    Kategori
                                </label>
                                <select
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="w-full h-10 rounded-xl bg-slate-50 dark:bg-slate-800 px-3 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary border-0"
                                >
                                    <option value="Praktikum">Praktikum</option>
                                    <option value="Materi">Materi</option>
                                    <option value="Tugas Kelompok">Tugas Kelompok</option>
                                    <option value="Diskusi Umum">Diskusi Umum</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                                    Isi Pesan / Pertanyaan
                                </label>
                                <Textarea
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    placeholder="Jelaskan pertanyaan atau topik Anda secara rinci..."
                                    className="text-xs resize-none h-28 bg-slate-50 dark:bg-slate-800 border-0 rounded-xl"
                                    required
                                />
                            </div>

                            <DialogFooter className="gap-2 sm:gap-0 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setNewModalOpen(false)}
                                    className="text-xs border-0 bg-slate-100 dark:bg-slate-800 rounded-xl"
                                >
                                    Batal
                                </Button>
                                <Button type="submit" size="sm" className="text-xs font-bold rounded-xl shadow-xs bg-primary text-white hover:bg-primary/90">
                                    Publikasikan Topik
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </StudentLayout>
    );
}