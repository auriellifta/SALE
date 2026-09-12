import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Plus, X, CheckCircle2, Pencil, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface StudyProgram {
    id: number;
    code: string;
    name: string;
    faculty: string;
    level: 'D3' | 'S1' | 'S2';
    accreditation: 'A' | 'B' | 'Baik Sekali' | 'Unggul';
    activeStudents: number;
    curriculumProgress: number;
}

const faculties = ['Fakultas Teknik', 'Fakultas Ekonomi', 'Fakultas Hukum', 'Fakultas Ilmu Budaya'];

export default function StudyPrograms() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [programs, setPrograms] = useState<StudyProgram[]>([
        { id: 1, code: 'IF', name: 'S1 Teknik Informatika', faculty: 'Fakultas Teknik', level: 'S1', accreditation: 'Unggul', activeStudents: 450, curriculumProgress: 85 },
        { id: 2, code: 'SI', name: 'S1 Sistem Informasi', faculty: 'Fakultas Teknik', level: 'S1', accreditation: 'A', activeStudents: 380, curriculumProgress: 80 },
        { id: 3, code: 'TE', name: 'S1 Teknik Elektro', faculty: 'Fakultas Teknik', level: 'S1', accreditation: 'B', activeStudents: 240, curriculumProgress: 70 },
        { id: 4, code: 'TS', name: 'S1 Teknik Sipil', faculty: 'Fakultas Teknik', level: 'S1', accreditation: 'A', activeStudents: 380, curriculumProgress: 90 },
        { id: 5, code: 'MJ', name: 'S1 Manajemen', faculty: 'Fakultas Ekonomi', level: 'S1', accreditation: 'Baik Sekali', activeStudents: 520, curriculumProgress: 75 },
        { id: 6, code: 'HK', name: 'S1 Ilmu Hukum', faculty: 'Fakultas Hukum', level: 'S1', accreditation: 'A', activeStudents: 300, curriculumProgress: 60 },
    ]);

    const [facultyFilter, setFacultyFilter] = useState('Semua');
    const [showModal, setShowModal] = useState(false);
    const [editingProgram, setEditingProgram] = useState<StudyProgram | null>(null);
    const [form, setForm] = useState({ code: '', name: '', faculty: faculties[0], level: 'S1' as StudyProgram['level'], accreditation: 'A' as StudyProgram['accreditation'] });

    const openAddModal = () => {
        setEditingProgram(null);
        setForm({ code: '', name: '', faculty: faculties[0], level: 'S1', accreditation: 'A' });
        setShowModal(true);
    };

    const openEditModal = (program: StudyProgram) => {
        setEditingProgram(program);
        setForm({ code: program.code, name: program.name, faculty: program.faculty, level: program.level, accreditation: program.accreditation });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.code || !form.name) return;

        if (editingProgram) {
            setPrograms(programs.map((p) => (p.id === editingProgram.id ? { ...p, ...form } : p)));
            showToast(`Program Studi "${form.name}" berhasil diperbarui!`);
        } else {
            setPrograms([
                ...programs,
                { id: Date.now(), ...form, activeStudents: 0, curriculumProgress: 0 },
            ]);
            showToast(`Program Studi "${form.name}" berhasil ditambahkan!`);
        }
        setShowModal(false);
    };

    const filteredPrograms = programs.filter((p) => facultyFilter === 'Semua' || p.faculty === facultyFilter);

    return (
        <AdminLayout>
            <Head title="Study Programs - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Study Programs</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Kelola program studi di seluruh fakultas SALE.
                        </p>
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl gap-1.5 cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5" /> Tambah Program Studi
                    </Button>
                </div>

                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                        <Filter className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                        <select
                            value={facultyFilter}
                            onChange={(e) => setFacultyFilter(e.target.value)}
                            className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none cursor-pointer"
                        >
                            <option value="Semua">Semua Fakultas</option>
                            {faculties.map((f) => (
                                <option key={f} value={f}>{f}</option>
                            ))}
                        </select>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-2">
                            ({filteredPrograms.length} program studi)
                        </span>
                    </div>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        <th className="p-4 pl-6">Kode</th>
                                        <th className="p-4">Nama Program Studi</th>
                                        <th className="p-4">Fakultas</th>
                                        <th className="p-4">Jenjang</th>
                                        <th className="p-4">Akreditasi</th>
                                        <th className="p-4">Mahasiswa Aktif</th>
                                        <th className="p-4">Ketercapaian Kurikulum</th>
                                        <th className="p-4 pr-6 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {filteredPrograms.map((program) => (
                                        <tr key={program.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                            <td className="p-4 pl-6">
                                                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-2.5 py-1 rounded-md">
                                                    {program.code}
                                                </span>
                                            </td>
                                            <td className="p-4 font-bold text-slate-900 dark:text-white">{program.name}</td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400">{program.faculty}</td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400">{program.level}</td>
                                            <td className="p-4">
                                                <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-950/65 dark:text-indigo-400">
                                                    {program.accreditation}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-500 dark:text-slate-400">{program.activeStudents}</td>
                                            <td className="p-4 w-40">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${program.curriculumProgress}%` }}></div>
                                                    </div>
                                                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{program.curriculumProgress}%</span>
                                                </div>
                                            </td>
                                            <td className="p-4 pr-6 text-right">
                                                <button
                                                    onClick={() => openEditModal(program)}
                                                    className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition cursor-pointer inline-flex items-center gap-1"
                                                >
                                                    <Pencil className="h-3.5 w-3.5" /> Edit
                                                </button>
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
                                {editingProgram ? 'Edit Program Studi' : 'Tambah Program Studi Baru'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Kode</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="IF"
                                        value={form.code}
                                        onChange={(e) => setForm({ ...form, code: e.target.value })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Jenjang</label>
                                    <select
                                        value={form.level}
                                        onChange={(e) => setForm({ ...form, level: e.target.value as StudyProgram['level'] })}
                                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold focus:outline-none text-slate-900 dark:text-white cursor-pointer"
                                    >
                                        <option value="D3">D3</option>
                                        <option value="S1">S1</option>
                                        <option value="S2">S2</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nama Program Studi</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: S1 Teknik Informatika"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Fakultas</label>
                                <select
                                    value={form.faculty}
                                    onChange={(e) => setForm({ ...form, faculty: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold focus:outline-none text-slate-900 dark:text-white cursor-pointer"
                                >
                                    {faculties.map((f) => (
                                        <option key={f} value={f}>{f}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Akreditasi</label>
                                <select
                                    value={form.accreditation}
                                    onChange={(e) => setForm({ ...form, accreditation: e.target.value as StudyProgram['accreditation'] })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold focus:outline-none text-slate-900 dark:text-white cursor-pointer"
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="Baik Sekali">Baik Sekali</option>
                                    <option value="Unggul">Unggul</option>
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
                                    {editingProgram ? 'Simpan Perubahan' : 'Tambah Program Studi'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
