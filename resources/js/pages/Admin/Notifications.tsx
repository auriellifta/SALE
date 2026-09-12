import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Bell, CheckCircle2, Trash2, MailOpen, AlertCircle, Info, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

interface NotificationItem {
    id: number;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'success' | 'warning';
    read: boolean;
}

export default function AdminNotifications() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [filter, setFilter] = useState<'Semua' | 'Belum Dibaca'>('Semua');

    const [notifications, setNotifications] = useState<NotificationItem[]>([
        { 
            id: 1, 
            title: 'Sinkronisasi Data Mahasiswa Baru', 
            message: 'Import data massal untuk 150 mahasiswa baru program studi Teknik Informatika telah berhasil diproses.', 
            time: '10 menit yang lalu', 
            type: 'success', 
            read: false 
        },
        { 
            id: 2, 
            title: 'Pembaruan Kalender Akademik', 
            message: 'Periode perkuliahan semester ganjil 2026/2027 telah diaktifkan oleh sistem.', 
            time: '2 jam yang lalu', 
            type: 'info', 
            read: false 
        },
        { 
            id: 3, 
            title: 'Peringatan Kapasitas Server', 
            message: 'Penggunaan penyimpanan database mencapai 85%. Disarankan untuk melakukan pembersihan log historis.', 
            time: 'Kemarin', 
            type: 'warning', 
            read: true 
        },
    ]);

    const markAsRead = (id: number) => {
        setNotifications(
            notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
        showToast('Notifikasi ditandai sebagai sudah dibaca.');
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
        showToast('Semua notifikasi ditandai sudah dibaca.');
    };

    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter((n) => n.id !== id));
        showToast('Notifikasi berhasil dihapus.');
    };

    const filteredNotifications = notifications.filter((n) => {
        if (filter === 'Belum Dibaca') return !n.read;
        return true;
    });

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <AdminLayout>
            <Head title="Admin Notifications - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Notifications</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Pusat pemberitahuan sistem, log aktivitas import, dan peringatan operasional admin.
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <Button
                            onClick={markAllAsRead}
                            variant="outline"
                            className="text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 gap-2 cursor-pointer"
                        >
                            <CheckCheck className="h-4 w-4 text-blue-600" /> Tandai Semua Dibaca
                        </Button>
                    )}
                </div>

                {/* STAT CARDS / FILTER TABS */}
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <button
                        onClick={() => setFilter('Semua')}
                        className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
                            filter === 'Semua'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                        }`}
                    >
                        Semua ({notifications.length})
                    </button>
                    <button
                        onClick={() => setFilter('Belum Dibaca')}
                        className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer ${
                            filter === 'Belum Dibaca'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                        }`}
                    >
                        Belum Dibaca ({unreadCount})
                    </button>
                </div>

                {/* NOTIFICATION LIST */}
                <div className="space-y-3">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notif) => (
                            <Card
                                key={notif.id}
                                className={`bg-white dark:bg-slate-900 shadow-xs border transition rounded-2xl ${
                                    !notif.read
                                        ? 'border-blue-500/50 dark:border-blue-500/40 bg-blue-50/20 dark:bg-blue-950/10'
                                        : 'border-slate-200/80 dark:border-slate-800'
                                }`}
                            >
                                <CardContent className="p-5 flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3.5">
                                        <div className={`mt-0.5 p-2 rounded-xl shrink-0 ${
                                            notif.type === 'success'
                                                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                                                : notif.type === 'warning'
                                                ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                                                : 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                                        }`}>
                                            {notif.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : notif.type === 'warning' ? <AlertCircle className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xs font-bold text-slate-900 dark:text-white">{notif.title}</h3>
                                                {!notif.read && (
                                                    <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{notif.message}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">{notif.time}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        {!notif.read && (
                                            <button
                                                onClick={() => markAsRead(notif.id)}
                                                title="Tandai sudah dibaca"
                                                className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                                            >
                                                <MailOpen className="h-4 w-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteNotification(notif.id)}
                                            title="Hapus notifikasi"
                                            className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition cursor-pointer"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl p-12 text-center">
                            <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                                <Bell className="h-6 w-6" />
                            </div>
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Tidak ada notifikasi saat ini.</p>
                        </Card>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}