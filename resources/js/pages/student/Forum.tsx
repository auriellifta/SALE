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
import { Badge } from '@/components/ui/badge';
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
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
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
                                className="h-10 appearance-none rounded-lg border border-border bg-card pl-3.5 pr-9 text-sm font-medium text-foreground outline-none focus:border-foreground transition-colors cursor-pointer"
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
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        </div>

                        <Button
                            onClick={() => setNewModalOpen(true)}
                            className="gap-2 text-sm font-semibold h-10 px-4"
                        >
                            <Plus className="size-4" />
                            Topik Baru
                        </Button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari topik diskusi atau nama penulis..."
                        className="w-full h-10 pl-10 pr-4 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition-all"
                    />
                </div>

                {/* Main Table Card */}
                <Card className="gap-0 overflow-hidden rounded-xl border border-border bg-card py-0 shadow-xs">
                    {/* Header */}
                    <div className="hidden grid-cols-12 items-center gap-4 bg-muted/40 px-6 py-3.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase border-b border-border md:grid text-left">
                        <div className="col-span-6 text-left">Topik Diskusi</div>
                        <div className="col-span-2 text-left">Kategori</div>
                        <div className="col-span-2 text-left">Balasan</div>
                        <div className="col-span-2 text-left">Update Terakhir</div>
                    </div>

                    {/* Baris Tabel */}
                    <div className="divide-y divide-border">
                        {filteredTopics.map((topic) => (
                            <div
                                key={topic.id}
                                className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-4 px-6 py-4.5 hover:bg-accent/40 transition-colors text-left"
                            >
                                {/* Col 1-6: Topik & Penulis with large icon vertically centered */}
                                <div className="col-span-6 flex items-center gap-4 min-w-0 pr-4 text-left">
                                    {topic.isPinned ? (
                                        <Pin className="size-5 text-foreground fill-foreground shrink-0" />
                                    ) : (
                                        <MessageSquare className="size-5 text-muted-foreground shrink-0" />
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-sm font-semibold text-foreground hover:underline transition-colors leading-snug truncate">
                                            {topic.title}
                                        </h2>
                                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                                            <User className="size-3.5 text-muted-foreground shrink-0" />
                                            <span className="font-medium text-foreground shrink-0">
                                                {topic.author}
                                            </span>
                                            <span>•</span>
                                            <span className="truncate">{topic.snippet}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Col 7-8: Kategori */}
                                <div className="col-span-2 text-left">
                                    <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                                        {topic.category}
                                    </Badge>
                                </div>

                                {/* Col 9-10: Balasan */}
                                <div className="col-span-2 text-left text-xs text-muted-foreground">
                                    <span className="inline-flex items-center gap-1.5">
                                        <MessageSquare className="size-3.5 text-muted-foreground" />
                                        {topic.replies} Balasan
                                    </span>
                                </div>

                                {/* Col 11-12: Update Terakhir */}
                                <div className="col-span-2 text-left text-xs text-muted-foreground">
                                    {topic.timeAgo}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Pagination Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground pt-2">
                    <div>Menampilkan {filteredTopics.length} dari {topics.length} topik</div>

                    <div className="flex items-center gap-1.5">
                        <Button variant="outline" size="icon-sm" className="rounded-lg">
                            <ChevronLeft className="size-4" />
                        </Button>
                        <Button size="icon-sm" className="rounded-lg text-xs font-bold">
                            1
                        </Button>
                        <Button variant="outline" size="icon-sm" className="rounded-lg">
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </div>

                {/* Create Topic Modal */}
                <Dialog open={newModalOpen} onOpenChange={setNewModalOpen}>
                    <DialogContent className="max-w-lg rounded-xl p-6 space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-base font-semibold text-foreground">
                                Buat Topik Diskusi Baru
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground">
                                Ajukan pertanyaan atau bagikan topik diskusi untuk kelas Anda.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground">
                                    Judul Topik
                                </label>
                                <Input
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Tuliskan judul pertanyaan atau diskusi..."
                                    required
                                    className="text-xs h-10"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground">
                                    Kategori
                                </label>
                                <select
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="w-full h-10 rounded-lg border border-border bg-card px-3 text-xs text-foreground outline-none focus:border-foreground"
                                >
                                    <option value="Praktikum">Praktikum</option>
                                    <option value="Materi">Materi</option>
                                    <option value="Tugas Kelompok">Tugas Kelompok</option>
                                    <option value="Diskusi Umum">Diskusi Umum</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground">
                                    Isi Pesan / Pertanyaan
                                </label>
                                <Textarea
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    placeholder="Jelaskan pertanyaan atau topik Anda secara rinci..."
                                    className="text-xs resize-none h-28"
                                    required
                                />
                            </div>

                            <DialogFooter className="gap-2 sm:gap-0">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setNewModalOpen(false)}
                                    className="text-xs"
                                >
                                    Batal
                                </Button>
                                <Button type="submit" size="sm" className="text-xs font-semibold">
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