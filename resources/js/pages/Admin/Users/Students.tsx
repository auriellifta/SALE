import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { GraduationCap, Users, UserCheck, Plus, X, CheckCircle2, Pencil, Ban, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface Student {
    id: number;
    nim: string;
    name: string;
    studyProgram: string;
    batch: string;
    email: string;
    status: 'Aktif' | 'Cuti' | 'Nonaktif';
}

export default function Students() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('Semua');

    const [students, setStudents] = useState<Student[]>([
        { id: 1, nim: '202401001', name: 'Devanovita Chelsea Prasojo', studyProgram: 'S1 Teknik Informatika', batch: '2024', email: 'devanovita@student.ac.id', status: 'Aktif' },
        { id: 2, nim: '202401002', name: 'Ahmad Fauzan', studyProgram: 'S1 Sistem Informasi', batch: '2024', email: 'fauzan@student.ac.id', status: 'Aktif' },
        { id: 3, name: 'Siti Rahma', nim: '202302015', studyProgram: 'S1 Teknik Elektro', batch: '2023', email: 'siti@student.ac.id', status: 'Cuti' },
        { id: 4, name: 'Budi Pratama', nim: '202203040', studyProgram: 'S1 Teknik Sipil', batch: '2022', email: 'budi@student.ac.id', status: 'Aktif' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [form, setForm] = useState({
        nim: '',
        name: '',
        studyProgram: 'S1 Teknik Informatika',
        batch: '2026',
        email: '',
    });

    const openAddModal = () => {
        setEditingStudent(null);
        setForm({ nim: '', name: '', studyProgram: 'S1 Teknik Informatika', batch: '2026', email: '' });
        setShowModal(true);
    };

    const openEditModal = (student: Student) => {
        setEditingStudent(student);
        setForm({
            nim: student.nim,
            name: student.name,
            studyProgram: student.studyProgram,
            batch: student.batch,
            email: student.email,
        });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.nim || !form.name || !form.email) return;

        if (editingStudent) {
            setStudents(
                students.map((s) =>
                    s.id === editingStudent.id
                        ? {
                              ...s,
                              nim: form.nim,
                              name: form.name,
                              studyProgram: form.studyProgram,
                              batch: form.batch,
                              email: form.email,
                          }
                        : s
                )
            );
            showToast(`Data mahasiswa "${form.name}" berhasil diperbarui!`);
        } else {
            setStudents([
                ...students,
                {
                    id: Date.now(),
                    nim: form.nim,
                    name: form.name,
                    studyProgram: form.studyProgram,
                    batch: form.batch,
                    email: form.email,
                    status: 'Aktif',
                },
            ]);
            showToast(`Mahasiswa "${form.name}" berhasil ditambahkan!`);
        }
        setShowModal(false);
    };

    const toggleStatus = (student: Student) => {
        setStudents(
            students.map((s) =>
                s.id === student.id ? { ...s, status: s.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : s
            )
        );
        showToast(`Status mahasiswa "${student.name}" diubah.`);
    };

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.nim.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesProgram = selectedProgram === 'Semua' || student.studyProgram === selectedProgram;
        return matchesSearch && matchesProgram;
    });

    const activeCount = students.filter((s) => s.status === 'Aktif').length;

    return (
        <AdminLayout>
            <Head title="Students - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Students</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Kelola data mahasiswa aktif, status akademik, dan profil seluruh angkatan di sistem SALE.
                        </p>
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl gap-1.5 cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5" /> Tambah Mahasiswa
                    </Button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Mahasiswa</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{students.length}</h3>
                        </div>
                        <GraduationCap className="h-6 w-6 text-blue-700 dark:text-blue-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Mahasiswa Aktif</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{activeCount}</h3>
                        </div>
                        <UserCheck className="h-6 w-6 text-emerald-700 dark:text-emerald-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Program Studi</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">4 Prodi</h3>
                        </div>
                        <Users className="h-6 w-6 text-indigo-700 dark:text-indigo-400 opacity-80" />
                    </div>
                </div>

                {/* SEARCH & FILTER BAR */}
                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari nama atau NIM mahasiswa..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Filter className="h-4 w-4 text-slate-500" />
                            <select
                                value={selectedProgram}
                                onChange={(e) => setSelectedProgram(e.target.value)}
                                className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer w-full sm:w-auto"
                            >
                                <option value="Semua">Semua Program Studi</option>
                                <option value="S1 Teknik Informatika">S1 Teknik Informatika</option>
                                <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                                <option value="S1 Teknik Elektro">S1 Teknik Elektro</option>
                                <option value="S1 Teknik Sipil">S1 Teknik Sipil</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* TABLE */}
                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        <th className="p-4 pl-6 whitespace-nowrap">NIM</th>
                                        <th className="p-4">Nama Mahasiswa</th>
                                        <th className="p-4">Program Studi</th>
                                        <th className="p-4">Angkatan</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 pr-6 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map((student) => (
                                            <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                <td className="p-4 pl-6 whitespace-nowrap">
                                                    <span className="inline-block text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-2.5 py-1 rounded-md tracking-wider">
                                                        {student.nim}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">{student.name}</td>
                                                <td className="p-4 text-slate-700 dark:text-slate-300">{student.studyProgram}</td>
                                                <td className="p-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">{student.batch}</td>
                                                <td className="p-4 text-slate-500 dark:text-slate-400">{student.email}</td>
                                                <td className="p-4 whitespace-nowrap">
                                                    <span
                                                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                                                            student.status === 'Aktif'
                                                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/65 dark:text-emerald-400'
                                                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/65 dark:text-amber-400'
                                                        }`}
                                                    >
                                                        {student.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 pr-6 whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button
                                                            onClick={() => openEditModal(student)}
                                                            className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => toggleStatus(student)}
                                                            className="text-rose-600 dark:text-rose-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                        >
                                                            <Ban className="h-3.5 w-3.5" /> {student.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-slate-500 font-medium">
                                                Tidak ada mahasiswa yang ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* MODAL MAHASISWA */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-5 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                {editingStudent ? 'Edit Data Mahasiswa' : 'Tambah Mahasiswa Baru'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">NIM</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: 202401003"
                                    value={form.nim}
                                    onChange={(e) => setForm({ ...form, nim: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nama Lengkap</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Andi Pratama"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                                />
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
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Angkatan</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: 2026"
                                        value={form.batch}
                                        onChange={(e) => setForm({ ...form, batch: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Kampus</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="email@student.ac.id"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
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
                                    {editingStudent ? 'Simpan Perubahan' : 'Tambah Mahasiswa'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}