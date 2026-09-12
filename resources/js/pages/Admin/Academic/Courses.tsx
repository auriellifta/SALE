import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { BookOpen, Layers, GraduationCap, Plus, X, CheckCircle2, Pencil, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface Course {
    id: number;
    code: string;
    name: string;
    sks: number;
    semester: number;
    studyProgram: string;
    status: 'Aktif' | 'Nonaktif';
}

export default function Courses() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [courses, setCourses] = useState<Course[]>([
        { id: 1, code: 'IF101', name: 'Pemrograman Web', sks: 3, semester: 3, studyProgram: 'S1 Teknik Informatika', status: 'Aktif' },
        { id: 2, code: 'SI201', name: 'Analisis Perancangan Sistem', sks: 3, semester: 3, studyProgram: 'S1 Sistem Informasi', status: 'Aktif' },
        { id: 3, code: 'TE301', name: 'Jaringan Komputer', sks: 3, semester: 5, studyProgram: 'S1 Teknik Elektro', status: 'Aktif' },
        { id: 4, code: 'TS401', name: 'Mekanika Tanah', sks: 4, semester: 4, studyProgram: 'S1 Teknik Sipil', status: 'Nonaktif' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [form, setForm] = useState({
        code: '',
        name: '',
        sks: '3',
        semester: '1',
        studyProgram: 'S1 Teknik Informatika',
    });

    const openAddModal = () => {
        setEditingCourse(null);
        setForm({ code: '', name: '', sks: '3', semester: '1', studyProgram: 'S1 Teknik Informatika' });
        setShowModal(true);
    };

    const openEditModal = (course: Course) => {
        setEditingCourse(course);
        setForm({
            code: course.code,
            name: course.name,
            sks: course.sks.toString(),
            semester: course.semester.toString(),
            studyProgram: course.studyProgram,
        });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.code || !form.name || !form.studyProgram) return;

        if (editingCourse) {
            setCourses(
                courses.map((c) =>
                    c.id === editingCourse.id
                        ? {
                              ...c,
                              code: form.code,
                              name: form.name,
                              sks: parseInt(form.sks),
                              semester: parseInt(form.semester),
                              studyProgram: form.studyProgram,
                          }
                        : c
                )
            );
            showToast(`Mata kuliah "${form.name}" berhasil diperbarui!`);
        } else {
            setCourses([
                ...courses,
                {
                    id: Date.now(),
                    code: form.code,
                    name: form.name,
                    sks: parseInt(form.sks),
                    semester: parseInt(form.semester),
                    studyProgram: form.studyProgram,
                    status: 'Aktif',
                },
            ]);
            showToast(`Mata kuliah "${form.name}" berhasil ditambahkan!`);
        }
        setShowModal(false);
    };

    const toggleStatus = (course: Course) => {
        setCourses(
            courses.map((c) =>
                c.id === course.id ? { ...c, status: c.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : c
            )
        );
        showToast(`Status "${course.name}" diubah menjadi ${course.status === 'Aktif' ? 'Nonaktif' : 'Aktif'}.`);
    };

    const totalSks = courses.reduce((sum, c) => sum + (c.status === 'Aktif' ? c.sks : 0), 0);
    const activeCount = courses.filter((c) => c.status === 'Aktif').length;

    return (
        <AdminLayout>
            <Head title="Courses - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Courses</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Kelola data mata kuliah dan kurikulum akademik di lingkungan SALE.
                        </p>
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl gap-1.5 cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5" /> Tambah Mata Kuliah
                    </Button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Mata Kuliah</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{courses.length}</h3>
                        </div>
                        <BookOpen className="h-6 w-6 text-blue-700 dark:text-blue-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Mata Kuliah Aktif</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{activeCount}</h3>
                        </div>
                        <Layers className="h-6 w-6 text-indigo-700 dark:text-indigo-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Akumulasi SKS Aktif</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalSks} SKS</h3>
                        </div>
                        <GraduationCap className="h-6 w-6 text-emerald-700 dark:text-emerald-400 opacity-80" />
                    </div>
                </div>

                {/* TABLE */}
                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        <th className="p-4 pl-6">Kode MK</th>
                                        <th className="p-4">Nama Mata Kuliah</th>
                                        <th className="p-4">SKS</th>
                                        <th className="p-4">Semester</th>
                                        <th className="p-4">Program Studi</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 pr-6 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {courses.map((course) => (
                                        <tr key={course.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                            <td className="p-4 pl-6">
                                                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-2.5 py-1 rounded-md">
                                                    {course.code}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-slate-900 dark:text-white">{course.name}</td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400">{course.sks} SKS</td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400">Sem {course.semester}</td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400">{course.studyProgram}</td>
                                            <td className="p-4">
                                                <span
                                                    className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                                                        course.status === 'Aktif'
                                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/65 dark:text-emerald-400'
                                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                                    }`}
                                                >
                                                    {course.status}
                                                </span>
                                            </td>
                                            <td className="p-4 pr-6">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        onClick={() => openEditModal(course)}
                                                        className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => toggleStatus(course)}
                                                        className="text-rose-600 dark:text-rose-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                    >
                                                        <Ban className="h-3.5 w-3.5" /> {course.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-5 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                {editingCourse ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah Baru'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Kode Mata Kuliah</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: IF102"
                                    value={form.code}
                                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nama Mata Kuliah</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Pemrograman Berorientasi Objek"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">SKS</label>
                                    <select
                                        value={form.sks}
                                        onChange={(e) => setForm({ ...form, sks: e.target.value })}
                                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                                    >
                                        <option value="1">1 SKS</option>
                                        <option value="2">2 SKS</option>
                                        <option value="3">3 SKS</option>
                                        <option value="4">4 SKS</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Semester</label>
                                    <select
                                        value={form.semester}
                                        onChange={(e) => setForm({ ...form, semester: e.target.value })}
                                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                            <option key={sem} value={sem}>Semester {sem}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Program Studi</label>
                                <select
                                    value={form.studyProgram}
                                    onChange={(e) => setForm({ ...form, studyProgram: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                                >
                                    <option value="S1 Teknik Informatika">S1 Teknik Informatika</option>
                                    <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                                    <option value="S1 Teknik Elektro">S1 Teknik Elektro</option>
                                    <option value="S1 Teknik Sipil">S1 Teknik Sipil</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowModal(false)}
                                    className="text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 cursor-pointer"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-5 cursor-pointer"
                                >
                                    {editingCourse ? 'Simpan Perubahan' : 'Tambah Mata Kuliah'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}