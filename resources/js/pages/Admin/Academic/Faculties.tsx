import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Building2, GraduationCap, Layers, Plus, X, CheckCircle2, Pencil, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface Faculty {
    id: number;
    code: string;
    name: string;
    dean: string;
    programCount: number;
    studentCount: number;
    status: 'Aktif' | 'Nonaktif';
}

export default function Faculties() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [faculties, setFaculties] = useState<Faculty[]>([
        { id: 1, code: 'FT', name: 'Fakultas Teknik', dean: 'Prof. Dr. Hendra Wijaya, M.T.', programCount: 4, studentCount: 1450, status: 'Aktif' },
        { id: 2, code: 'FE', name: 'Fakultas Ekonomi', dean: 'Dr. Siti Rahmawati, M.M.', programCount: 3, studentCount: 980, status: 'Aktif' },
        { id: 3, code: 'FH', name: 'Fakultas Hukum', dean: 'Dr. Bambang Prakoso, S.H., M.H.', programCount: 2, studentCount: 540, status: 'Aktif' },
        { id: 4, code: 'FIB', name: 'Fakultas Ilmu Budaya', dean: 'Dr. Ratna Kusuma, M.Hum.', programCount: 2, studentCount: 310, status: 'Nonaktif' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
    const [form, setForm] = useState({ code: '', name: '', dean: '' });

    const openAddModal = () => {
        setEditingFaculty(null);
        setForm({ code: '', name: '', dean: '' });
        setShowModal(true);
    };

    const openEditModal = (faculty: Faculty) => {
        setEditingFaculty(faculty);
        setForm({ code: faculty.code, name: faculty.name, dean: faculty.dean });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.code || !form.name || !form.dean) return;

        if (editingFaculty) {
            setFaculties(faculties.map((f) => (f.id === editingFaculty.id ? { ...f, ...form } : f)));
            showToast(`Fakultas "${form.name}" berhasil diperbarui!`);
        } else {
            setFaculties([
                ...faculties,
                { id: Date.now(), ...form, programCount: 0, studentCount: 0, status: 'Aktif' },
            ]);
            showToast(`Fakultas "${form.name}" berhasil ditambahkan!`);
        }
        setShowModal(false);
    };

    const toggleStatus = (faculty: Faculty) => {
        setFaculties(
            faculties.map((f) =>
                f.id === faculty.id ? { ...f, status: f.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : f
            )
        );
        showToast(`Status "${faculty.name}" diubah menjadi ${faculty.status === 'Aktif' ? 'Nonaktif' : 'Aktif'}.`);
    };

    const totalProgram = faculties.reduce((sum, f) => sum + f.programCount, 0);
    const totalStudents = faculties.reduce((sum, f) => sum + f.studentCount, 0);
    const nonaktifCount = faculties.filter((f) => f.status === 'Nonaktif').length;

    return (
        <AdminLayout>
            <Head title="Faculties - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Faculties</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Kelola data fakultas di lingkungan SALE Academic Ecosystem.
                        </p>
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl gap-1.5 cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5" /> Tambah Fakultas
                    </Button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Fakultas</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{faculties.length}</h3>
                        </div>
                        <Building2 className="h-6 w-6 text-blue-700 dark:text-blue-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Total Program Studi</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalProgram}</h3>
                        </div>
                        <Layers className="h-6 w-6 text-indigo-700 dark:text-indigo-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Total Mahasiswa</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalStudents.toLocaleString('id-ID')}</h3>
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
                                        <th className="p-4 pl-6">Kode</th>
                                        <th className="p-4">Nama Fakultas</th>
                                        <th className="p-4">Dekan</th>
                                        <th className="p-4">Prodi</th>
                                        <th className="p-4">Mahasiswa</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 pr-6 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {faculties.map((faculty) => (
                                        <tr key={faculty.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                            <td className="p-4 pl-6">
                                                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-2.5 py-1 rounded-md">
                                                    {faculty.code}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-slate-900 dark:text-white">{faculty.name}</td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400">{faculty.dean}</td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400">{faculty.programCount}</td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400">{faculty.studentCount.toLocaleString('id-ID')}</td>
                                            <td className="p-4">
                                                <span
                                                    className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                                                        faculty.status === 'Aktif'
                                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/65 dark:text-emerald-400'
                                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                                    }`}
                                                >
                                                    {faculty.status}
                                                </span>
                                            </td>
                                            <td className="p-4 pr-6">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button
                                                        onClick={() => openEditModal(faculty)}
                                                        className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => toggleStatus(faculty)}
                                                        className="text-rose-600 dark:text-rose-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                    >
                                                        <Ban className="h-3.5 w-3.5" /> {faculty.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
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
                                {editingFaculty ? 'Edit Fakultas' : 'Tambah Fakultas Baru'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Kode Fakultas</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: FT"
                                    value={form.code}
                                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nama Fakultas</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Fakultas Teknik"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Dekan</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Prof. Dr. Hendra Wijaya, M.T."
                                    value={form.dean}
                                    onChange={(e) => setForm({ ...form, dean: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                />
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
                                    {editingFaculty ? 'Simpan Perubahan' : 'Tambah Fakultas'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
