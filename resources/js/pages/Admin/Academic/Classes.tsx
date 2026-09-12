import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Layers, BookOpen, Users, Plus, X, CheckCircle2, Pencil, Ban, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface AcademicClass {
    id: number;
    code: string;
    name: string;
    course: string;
    lecturer: string;
    schedule: string;
    room: string;
    studentCount: number;
    status: 'Aktif' | 'Nonaktif';
}

export default function Classes() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [classes, setClasses] = useState<AcademicClass[]>([
        { id: 1, code: 'IF-301A', name: 'Kelas A Reguler', course: 'Pemrograman Web', lecturer: 'Dr. Budi Santoso, M.Kom.', schedule: 'Senin, 08:00 - 10:30', room: 'Lab Komputer 1', studentCount: 35, status: 'Aktif' },
        { id: 2, code: 'IF-301B', name: 'Kelas B Reguler', course: 'Pemrograman Web', lecturer: 'Ani Surya, M.T.', schedule: 'Selasa, 13:00 - 15:30', room: 'Ruang 302', studentCount: 32, status: 'Aktif' },
        { id: 3, code: 'SI-201A', name: 'Kelas A Ekstensi', course: 'Analisis Perancangan Sistem', lecturer: 'Citra Wijaya, Ph.D.', schedule: 'Rabu, 15:30 - 18:00', room: 'Ruang 204', studentCount: 28, status: 'Aktif' },
        { id: 4, code: 'TE-301A', name: 'Kelas Praktikum', course: 'Jaringan Komputer', lecturer: 'Ahmad Fauzi, M.T.', schedule: 'Kamis, 10:00 - 12:30', room: 'Lab Jaringan', studentCount: 25, status: 'Nonaktif' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingClass, setEditingClass] = useState<AcademicClass | null>(null);
    const [form, setForm] = useState({
        code: '',
        name: '',
        course: 'Pemrograman Web',
        lecturer: '',
        schedule: '',
        room: '',
    });

    const openAddModal = () => {
        setEditingClass(null);
        setForm({ code: '', name: '', course: 'Pemrograman Web', lecturer: '', schedule: 'Senin, 08:00 - 10:30', room: 'Lab Komputer 1' });
        setShowModal(true);
    };

    const openEditModal = (cls: AcademicClass) => {
        setEditingClass(cls);
        setForm({
            code: cls.code,
            name: cls.name,
            course: cls.course,
            lecturer: cls.lecturer,
            schedule: cls.schedule,
            room: cls.room,
        });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.code || !form.name || !form.course || !form.lecturer || !form.schedule || !form.room) return;

        if (editingClass) {
            setClasses(
                classes.map((c) =>
                    c.id === editingClass.id
                        ? {
                              ...c,
                              code: form.code,
                              name: form.name,
                              course: form.course,
                              lecturer: form.lecturer,
                              schedule: form.schedule,
                              room: form.room,
                          }
                        : c
                )
            );
            showToast(`Kelas "${form.name}" berhasil diperbarui!`);
        } else {
            setClasses([
                ...classes,
                {
                    id: Date.now(),
                    code: form.code,
                    name: form.name,
                    course: form.course,
                    lecturer: form.lecturer,
                    schedule: form.schedule,
                    room: form.room,
                    studentCount: 0,
                    status: 'Aktif',
                },
            ]);
            showToast(`Kelas "${form.name}" berhasil ditambahkan!`);
        }
        setShowModal(false);
    };

    const toggleStatus = (cls: AcademicClass) => {
        setClasses(
            classes.map((c) =>
                c.id === cls.id ? { ...c, status: c.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : c
            )
        );
        showToast(`Status kelas "${cls.name}" diubah menjadi ${cls.status === 'Aktif' ? 'Nonaktif' : 'Aktif'}.`);
    };

    const totalStudents = classes.reduce((sum, c) => sum + (c.status === 'Aktif' ? c.studentCount : 0), 0);
    const activeCount = classes.filter((c) => c.status === 'Aktif').length;

    return (
        <AdminLayout>
            <Head title="Classes - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Classes</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Kelola rombongan belajar, jadwal spesifik perkuliahan, dan alokasi ruangan kelas.
                        </p>
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl gap-1.5 cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5" /> Tambah Kelas
                    </Button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Kelas</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{classes.length}</h3>
                        </div>
                        <Layers className="h-6 w-6 text-blue-700 dark:text-blue-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Kelas Aktif</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{activeCount}</h3>
                        </div>
                        <BookOpen className="h-6 w-6 text-indigo-700 dark:text-indigo-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Mahasiswa Teralokasi</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalStudents}</h3>
                        </div>
                        <Users className="h-6 w-6 text-emerald-700 dark:text-emerald-400 opacity-80" />
                    </div>
                </div>

                {/* TABLE */}
                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        <th className="p-4 pl-6 whitespace-nowrap">Kode Kelas</th>
                                        <th className="p-4">Rombel / Nama Kelas</th>
                                        <th className="p-4">Mata Kuliah</th>
                                        <th className="p-4">Jadwal & Ruangan</th>
                                        <th className="p-4">Dosen Pengampu</th>
                                        <th className="p-4 whitespace-nowrap">Kapasitas Mhs</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 pr-6 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {classes.map((cls) => (
                                        <tr key={cls.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                            <td className="p-4 pl-6 whitespace-nowrap">
                                                <span className="inline-block text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-2.5 py-1 rounded-md tracking-wider">
                                                    {cls.code}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">{cls.name}</td>
                                            <td className="p-4 text-slate-700 dark:text-slate-300 font-semibold">{cls.course}</td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400 space-y-0.5 whitespace-nowrap">
                                                <div className="flex items-center gap-1 font-medium text-slate-800 dark:text-slate-200">
                                                    <Clock className="h-3 w-3 text-blue-500 shrink-0" /> {cls.schedule}
                                                </div>
                                                <div className="flex items-center gap-1 text-[11px]">
                                                    <MapPin className="h-3 w-3 text-rose-500 shrink-0" /> {cls.room}
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400">{cls.lecturer}</td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400 font-semibold whitespace-nowrap">{cls.studentCount} Mhs</td>
                                            <td className="p-4 whitespace-nowrap">
                                                <span
                                                    className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                                                        cls.status === 'Aktif'
                                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/65 dark:text-emerald-400'
                                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                                    }`}
                                                >
                                                    {cls.status}
                                                </span>
                                            </td>
                                            <td className="p-4 pr-6 whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        onClick={() => openEditModal(cls)}
                                                        className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => toggleStatus(cls)}
                                                        className="text-rose-600 dark:text-rose-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                    >
                                                        <Ban className="h-3.5 w-3.5" /> {cls.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
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

            {/* MODAL KELAS */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-5 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                {editingClass ? 'Edit Kelas & Jadwal' : 'Tambah Kelas Baru'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Kode Kelas</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: IF-301C"
                                    value={form.code}
                                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nama Rombel / Kelas</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Kelas C Reguler"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mata Kuliah</label>
                                <select
                                    value={form.course}
                                    onChange={(e) => setForm({ ...form, course: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                                >
                                    <option value="Pemrograman Web">Pemrograman Web</option>
                                    <option value="Analisis Perancangan Sistem">Analisis Perancangan Sistem</option>
                                    <option value="Jaringan Komputer">Jaringan Komputer</option>
                                    <option value="Mekanika Tanah">Mekanika Tanah</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Dosen Pengampu</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Dr. Budi Santoso, M.Kom."
                                    value={form.lecturer}
                                    onChange={(e) => setForm({ ...form, lecturer: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Jadwal Kuliah</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: Senin, 08:00"
                                        value={form.schedule}
                                        onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Ruangan</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: Lab Komputer 1"
                                        value={form.room}
                                        onChange={(e) => setForm({ ...form, room: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                    />
                                </div>
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
                                    {editingClass ? 'Simpan Perubahan' : 'Tambah Kelas'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}