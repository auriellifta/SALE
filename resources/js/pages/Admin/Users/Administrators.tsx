import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { ShieldAlert, UserCheck, Shield, Plus, X, CheckCircle2, Pencil, Ban, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface Administrator {
    id: number;
    username: string;
    name: string;
    role: string;
    email: string;
    lastLogin: string;
    status: 'Aktif' | 'Nonaktif';
}

export default function Administrators() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [searchQuery, setSearchQuery] = useState('');

    const [admins, setAdmins] = useState<Administrator[]>([
        { id: 1, username: 'yura_admin', name: 'Yura', role: 'Super Administrator', email: 'yura@sale.ac.id', lastLogin: 'Hari ini, 10:42 WIB', status: 'Aktif' },
        { id: 2, username: 'akbar_baa', name: 'Akbar Pratama', role: 'BAA (Biro Administrasi Akademik)', email: 'akbar@sale.ac.id', lastLogin: 'Kemarin, 14:20 WIB', status: 'Aktif' },
        { id: 3, username: 'dewi_keu', name: 'Dewi Lestari', role: 'Keuangan & Pembayaran', email: 'dewi.k@sale.ac.id', lastLogin: '3 hari lalu', status: 'Aktif' },
        { id: 4, username: 'support_it', name: 'Tim Helpdesk', role: 'IT Support', email: 'it@sale.ac.id', lastLogin: '1 minggu lalu', status: 'Nonaktif' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState<Administrator | null>(null);
    const [form, setForm] = useState({
        username: '',
        name: '',
        role: 'Super Administrator',
        email: '',
    });

    const openAddModal = () => {
        setEditingAdmin(null);
        setForm({ username: '', name: '', role: 'Super Administrator', email: '' });
        setShowModal(true);
    };

    const openEditModal = (admin: Administrator) => {
        setEditingAdmin(admin);
        setForm({
            username: admin.username,
            name: admin.name,
            role: admin.role,
            email: admin.email,
        });
        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.username || !form.name || !form.email) return;

        if (editingAdmin) {
            setAdmins(
                admins.map((a) =>
                    a.id === editingAdmin.id
                        ? {
                              ...a,
                              username: form.username,
                              name: form.name,
                              role: form.role,
                              email: form.email,
                          }
                        : a
                )
            );
            showToast(`Data administrator "${form.name}" berhasil diperbarui!`);
        } else {
            setAdmins([
                ...admins,
                {
                    id: Date.now(),
                    username: form.username,
                    name: form.name,
                    role: form.role,
                    email: form.email,
                    lastLogin: 'Belum pernah login',
                    status: 'Aktif',
                },
            ]);
            showToast(`Administrator "${form.name}" berhasil ditambahkan!`);
        }
        setShowModal(false);
    };

    const toggleStatus = (admin: Administrator) => {
        setAdmins(
            admins.map((a) =>
                a.id === admin.id ? { ...a, status: a.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : a
            )
        );
        showToast(`Status administrator "${admin.name}" diubah.`);
    };

    const filteredAdmins = admins.filter(admin => {
        return admin.name.toLowerCase().includes(searchQuery.toLowerCase()) || admin.username.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const activeCount = admins.filter((a) => a.status === 'Aktif').length;

    return (
        <AdminLayout>
            <Head title="Administrators - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Administrators</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Kelola hak akses pengelola sistem, staf administrasi, dan tingkat otorisasi di lingkungan SALE.
                        </p>
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl gap-1.5 cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5" /> Tambah Administrator
                    </Button>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-blue-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Total Admin</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{admins.length}</h3>
                        </div>
                        <Shield className="h-6 w-6 text-blue-700 dark:text-blue-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Admin Aktif</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{activeCount}</h3>
                        </div>
                        <UserCheck className="h-6 w-6 text-emerald-700 dark:text-emerald-400 opacity-80" />
                    </div>
                    <div className="bg-white dark:bg-slate-900 shadow-xs rounded-2xl border border-slate-200/80 dark:border-slate-800 border-l-4 border-l-indigo-600 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Tingkat Keamanan</p>
                            <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">Protected</h3>
                        </div>
                        <ShieldAlert className="h-6 w-6 text-indigo-700 dark:text-indigo-400 opacity-80" />
                    </div>
                </div>

                {/* SEARCH BAR */}
                <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                    <CardContent className="p-4">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari nama atau username admin..."
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
                                        <th className="p-4 pl-6 whitespace-nowrap">Username</th>
                                        <th className="p-4">Nama Lengkap</th>
                                        <th className="p-4">Role / Hak Akses</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Login Terakhir</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 pr-6 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                    {filteredAdmins.length > 0 ? (
                                        filteredAdmins.map((admin) => (
                                            <tr key={admin.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                                                <td className="p-4 pl-6 whitespace-nowrap">
                                                    <span className="inline-block text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-2.5 py-1 rounded-md tracking-wider">
                                                        {admin.username}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">{admin.name}</td>
                                                <td className="p-4 text-slate-700 dark:text-slate-300 font-semibold">{admin.role}</td>
                                                <td className="p-4 text-slate-500 dark:text-slate-400">{admin.email}</td>
                                                <td className="p-4 text-slate-500 dark:text-slate-400">{admin.lastLogin}</td>
                                                <td className="p-4 whitespace-nowrap">
                                                    <span
                                                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                                                            admin.status === 'Aktif'
                                                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/65 dark:text-emerald-400'
                                                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                                        }`}
                                                    >
                                                        {admin.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 pr-6 whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button
                                                            onClick={() => openEditModal(admin)}
                                                            className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                        >
                                                            <Pencil className="h-3.5 w-3.5" /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => toggleStatus(admin)}
                                                            className="text-rose-600 dark:text-rose-400 hover:underline font-bold transition cursor-pointer flex items-center gap-1"
                                                        >
                                                            <Ban className="h-3.5 w-3.5" /> {admin.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-slate-500 font-medium">
                                                Tidak ada administrator yang ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* MODAL ADMINISTRATOR */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-5 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                                {editingAdmin ? 'Edit Administrator' : 'Tambah Administrator Baru'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Username</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: andi_admin"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nama Lengkap</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Andi Wijaya"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Role / Hak Akses</label>
                                <select
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                                >
                                    <option value="Super Administrator">Super Administrator</option>
                                    <option value="BAA (Biro Administrasi Akademik)">BAA (Biro Administrasi Akademik)</option>
                                    <option value="Keuangan & Pembayaran">Keuangan & Pembayaran</option>
                                    <option value="IT Support">IT Support</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="admin@sale.ac.id"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none text-slate-900 dark:text-white"
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
                                    {editingAdmin ? 'Simpan Perubahan' : 'Tambah Administrator'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}