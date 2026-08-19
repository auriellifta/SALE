import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Pin, MessageSquare, Plus, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import StudentLayout from '@/layouts/student-layout';

type Topic = {
    id: number;
    title: string;
    author: string;
    avatarBg: string;
    avatarText: string;
    snippet: string;
    category: string;
    replies: number;
    timeAgo: string;
    isPinned?: boolean;
    isHighlightReplies?: boolean;
};

const forumTopics: Topic[] = [
    {
        id: 1,
        title: 'Panduan Penggunaan Forum Diskusi IMK',
        author: 'Dr. Budi (Dosen)',
        avatarBg: 'bg-slate-700',
        avatarText: 'DB',
        snippet: 'Harap membaca panduan ini...',
        category: 'Semua Kelas',
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
        snippet: 'Apakah ada yang bisa memberikan contoh...',
        category: 'Tugas Kelompok',
        replies: 12,
        timeAgo: '2 jam lalu',
        isHighlightReplies: true,
    },
    {
        id: 3,
        title: 'Perbedaan Affordance dan Signifier pada UI Mobile',
        author: 'Rizky P.',
        avatarBg: 'bg-emerald-700',
        avatarText: 'RP',
        snippet: 'Saya masih agak bingung membedakan...',
        category: 'Pertanyaan Materi',
        replies: 4,
        timeAgo: '5 jam lalu',
    },
];

export default function Forum() {
    const [selectedCourse, setSelectedCourse] = useState('Interaksi Manusia & Komputer');

    return (
        <StudentLayout>
            <Head title="Forum Diskusi — SALE" />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-8 py-8 md:px-12">
                {/* Header Control Bar */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <Link href="/student/dashboard" className="hover:text-slate-800">
                            SALE
                        </Link>
                        <span className="text-slate-400">›</span>
                        <span className="font-semibold text-[#1B59F8]">Forum Diskusi</span>
                    </div>

                    {/* Filter & Action */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm font-medium text-slate-700 shadow-xs outline-none hover:border-slate-300 focus:border-[#1B59F8]"
                            >
                                <option value="Interaksi Manusia & Komputer">
                                    Interaksi Manusia & Komputer
                                </option>
                                <option value="Struktur Data & Algoritma">
                                    Struktur Data & Algoritma
                                </option>
                                <option value="Sistem Operasi">Sistem Operasi</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        </div>

                        <button className="flex h-11 items-center gap-2 rounded-xl bg-[#1B59F8] px-5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-95">
                            <Plus className="size-4 stroke-[2.5]" />
                            <span>Topik Baru</span>
                        </button>
                    </div>
                </div>

                {/* Main Table Card */}
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                    {/* Header Tabel */}
                    <div className="grid grid-cols-12 items-center bg-[#F1F4FA]/80 px-6 py-4 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                        <div className="col-span-6">TOPIK DISKUSI</div>
                        <div className="col-span-2 text-center">MATA KULIAH</div>
                        <div className="col-span-2 text-center">BALASAN</div>
                        <div className="col-span-2 text-right">UPDATE TERAKHIR</div>
                    </div>

                    {/* Baris Tabel */}
                    <div className="divide-y divide-slate-100">
                        {forumTopics.map((topic) => (
                            <div
                                key={topic.id}
                                className="grid grid-cols-12 items-center px-6 py-5 transition-colors hover:bg-slate-50/60"
                            >
                                {/* Topik & Penulis */}
                                <div className="col-span-6 flex items-start gap-4 pr-4">
                                    <div className="mt-1 shrink-0">
                                        {topic.isPinned ? (
                                            <Pin className="size-4 fill-[#1B59F8] text-[#1B59F8]" />
                                        ) : (
                                            <div className="flex size-4 items-center justify-center rounded border border-slate-300 bg-white">
                                                <div className="size-1.5 rounded-xs border border-slate-400" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-sm font-bold text-slate-900 transition-colors hover:text-[#1B59F8]">
                                            <a href="#">{topic.title}</a>
                                        </h2>
                                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                            <div
                                                className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${topic.avatarBg}`}
                                            >
                                                {topic.avatarText}
                                            </div>
                                            <p className="truncate">
                                                <span className="font-semibold text-slate-800">
                                                    {topic.author}
                                                </span>{' '}
                                                • {topic.snippet}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tag Mata Kuliah */}
                                <div className="col-span-2 text-center">
                                    <span className="inline-block rounded-full bg-[#EBF2FF] px-3 py-1 text-xs font-medium text-[#1B59F8]">
                                        {topic.category}
                                    </span>
                                </div>

                                {/* Jumlah Balasan */}
                                <div className="col-span-2 text-center">
                                    {topic.isHighlightReplies ? (
                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FDF0EA] px-3 py-1.5 text-xs font-bold text-[#D9531E]">
                                            <MessageSquare className="size-3.5 fill-[#D9531E]" />
                                            {topic.replies} Balasan
                                        </span>
                                    ) : (
                                        <span className="text-xs font-bold text-slate-800">
                                            {topic.replies} Balasan
                                        </span>
                                    )}
                                </div>

                                {/* Update Terakhir */}
                                <div className="col-span-2 text-right text-xs font-medium text-slate-500">
                                    {topic.timeAgo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Footer */}
                <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
                    <div>Menampilkan 1-3 dari 24 topik</div>

                    <div className="flex items-center gap-2">
                        <button className="flex size-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-700">
                            <ChevronLeft className="size-4" />
                        </button>
                        <button className="flex size-7 items-center justify-center rounded-lg bg-[#1B59F8] font-bold text-white shadow-xs">
                            1
                        </button>
                        <button className="flex size-7 items-center justify-center rounded-lg font-medium text-slate-700 transition-colors hover:bg-slate-200/60">
                            2
                        </button>
                        <button className="flex size-7 items-center justify-center rounded-lg font-medium text-slate-700 transition-colors hover:bg-slate-200/60">
                            3
                        </button>
                        <span className="px-1 font-bold text-slate-400">...</span>
                        <button className="flex size-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-700">
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}