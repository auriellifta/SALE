import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Shield, ShieldCheck, KeyRound, Plus, X, CheckCircle2, Pencil, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface RoleItem {
    id: number;
    name: string;
    description: string;
    userCount: number;
    permissions: string[];
}

export default function Roles() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [searchQuery, setSearchQuery] = useState('');

    const [roles, setRoles] = useState<RoleItem[]>([
        { 
            id: 1, 
            name: 'Super Administrator', 
            description: 'Akses penuh ke seluruh modul sistem akademik, pengguna, dan pengaturan.', 
            userCount: 3, 
            permissions: ['manage-all', 'manage-users', 'manage-academic', 'view-reports'] 
        },
        { 
            id: 2, 
            name: 'Dosen Pengampu', 
            description: 'Akses untuk mengelola materi, presensi, tugas, dan input nilai mahasiswa.', 
            userCount: 48, 
            permissions: ['manage-courses', 'input-grades', 'view-attendance'] 
        },
        { 
            id: 3, 
            name: 'Mahasiswa', 
            description: 'Akses untuk pengisian KRS, melihat jadwal, materi, tugas, dan nilai.', 
            userCount: 1450, 
            permissions: ['fill-krs', 'submit-assignments', 'view-grades'] 
        },
        { 
            id: 4, 
            name: 'Biro Administrasi Akademik (BAA)', 
            description: 'Akses untuk pengelolaan kurikulum, data mahasiswa, dan periode akademik.', 
            userCount: 5, 
            permissions: ['manage-academic', 'import-data', 'view-reports'] 
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingRole, setEditingRole] = useState<RoleItem | null>(null);
    const [form, setForm] = useState({
        name: '',
        description: '',
        permissions: 'manage-academic, view-reports',
    });

    const openAddModal = () => {
        setEditingRole(null);
        setForm({ name: '', description: '', permissions: 'manage-academic, view-reports' });
        setShowModal(true);
    };

    const openEditModal = (role: RoleItem) => {
        setEditingRole(role);
        setForm({
            name: role.name,
            description: role.description,
            permissions: role.permissions.join(', '),
        });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.description) return;

        const formattedPermissions = form.permissions.split(',').map((p) => p.trim()).filter(Boolean);

        if (editingRole) {
            setRoles(
                roles.map((r) =>
                    r.id === editingRole.id
                        ? {
                              ...r,
                              name: form.name,
                              description: form.description,
                              permissions: formattedPermissions,
                          }
                        : r
                )
            );
            showToast(`Role "${form.name}" berhasil diperbarui!`);
        } else {
            setRoles([
                ...roles,
                {
                    id: Date.now(),
                    name: form.name,
                    description: form.description,
                    userCount: 0,
                    permissions: formattedPermissions,
                },
            ]);
            showToast(`Role "${form.name}" berhasil ditambahkan!`);
        }
        setShowModal(false);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus role ini?')) {
            setRoles(roles.filter(r => r.id !== id));
            showToast('Role berhasil dihapus.');
        }
    };

    const filteredRoles = roles.filter(role => {
        return role.name.toLowerCase().includes(searchQuery.toLowerCase()) || role.description.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <AdminLayout>
            <Head title="Role & Permissions - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Role & Permissions</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Kelola tingkat hak akses pengguna (Role-Based Access Control) di dalam sistem SALE.
                        </p>
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl gap-1.5 cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5" /> Tambah Role Baru
                    </Button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Role</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{roles.length}</h3>
                        </div>
                        <Shield className="h-6 w-6 text-blue-700 dark:text-blue-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Sistem Keamanan</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">RBAC Active</h3>
                        </div>
                        <ShieldCheck className="h-6 w-6 text-emerald-700 dark:text-emerald-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Otorisasi Fitur</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">Granular</h3>
                        </div>
                        <KeyRound className="h-6 w-6 text-indigo-700 dark:text-indigo-400 opacity-80" />
                    </div>
                </div>

                {/* SEARCH BAR */}
                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                    <CardContent className="p-4">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari nama role atau deskripsi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                            />
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
                                        <th className="p-4 pl-6 whitespace-nowrap">Nama Role</th>
                                        <th className="p-4">Deskripsi Akses</th>
                                        <th className="p-4">Jumlah Pengguna</th>
                                        <th className="p-4">Daftar Permissions</th>
                                        <th className="p-4 pr-6 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {filteredRoles.length > 0 ? (
                                        filteredRoles.map((role) => (
                                            <tr key={role.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                <td className="p-4 pl-6 whitespace-nowrap font-bold text-blue-700 dark:text-blue-300">
                                                    {role.name}
                                                </td>
                                                <td className="p-4 text-slate-700 dark:text-slate-300 max-w-xs">{role.description}</td>
                                                <td className="p-4 text-slate-500 dark:text-slate-400 font-semibold">{role.userCount.toLocaleString('id-ID')} Pengguna</td>
                                                <td className="p-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {role.permissions.map((perm, idx) => (
                                                            <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-mono">
                                                                {perm}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="p-4 pr-6 whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button
                                                            onClick={() => openEditModal(role)}
                                                            className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(role.id)}
                                                            className="text-rose-600 dark:text-rose-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" /> Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                                                Tidak ada role yang ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* MODAL ROLE */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-5 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                {editingRole ? 'Edit Role & Permissions' : 'Tambah Role Baru'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nama Role</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Kepala Program Studi"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Deskripsi Akses</label>
                                <textarea
                                    required
                                    rows={2}
                                    placeholder="Jelaskan batasan hak akses role ini..."
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white resize-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Permissions (Pisahkan dengan koma)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="manage-curriculum, view-reports"
                                    value={form.permissions}
                                    onChange={(e) => setForm({ ...form, permissions: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white font-mono"
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
                                    {editingRole ? 'Simpan Perubahan' : 'Tambah Role'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}