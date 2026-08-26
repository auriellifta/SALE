import { Link, usePage } from '@inertiajs/react';
import { Bell, Moon } from 'lucide-react';

interface StudentTopbarProps {
    onOpenMobileMenu?: () => void;
}

export default function StudentTopbar({ onOpenMobileMenu }: StudentTopbarProps) {
    const { url } = usePage();

    const getPageTitle = () => {
        if (url.includes('/student/courses')) return 'Course';
        if (url.includes('/student/assignments')) return 'Tugas & Kuis';
        if (url.includes('/student/quiz')) return 'Kuis Online';
        if (url.includes('/student/programming-task')) return 'Tugas Pemrograman';
        if (url.includes('/student/forum')) return 'Forum Diskusi';
        if (url.includes('/student/notifications')) return 'Notifikasi';
        if (url.includes('/student/profile')) return 'Profil';
        return 'Dashboard';
    };

    return (
        <header className="bg-sale-surface fixed top-0 right-0 left-0 md:left-[280px] z-[100] flex h-16 items-center justify-between border-b border-sale-border px-4 md:px-8">
            {/* Page Context */}
            <div className="flex items-center gap-3">
                {onOpenMobileMenu && (
                    <button
                        type="button"
                        onClick={onOpenMobileMenu}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-sale-muted transition-colors hover:bg-slate-100 hover:text-sale-dark md:hidden"
                        aria-label="Buka Menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    </button>
                )}

                <span className="text-sm font-medium text-sale-muted">
                    {getPageTitle()}
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Link
                    href="/student/notifications"
                    className="relative flex h-10 w-10 items-center justify-center rounded-full text-sale-muted transition-colors hover:bg-slate-100 hover:text-sale-dark"
                    aria-label="Notifikasi"
                >
                    <Bell className="h-5 w-5" strokeWidth={1.8} />

                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-sale-orange" />
                </Link>

                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sale-muted transition-colors hover:bg-slate-100 hover:text-sale-dark"
                    aria-label="Ubah tema"
                >
                    <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </button>

                <div className="ml-2 hidden h-8 w-px bg-sale-border sm:block" />

                <Link
                    href="/student/profile"
                    className="hidden items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-50 sm:flex"
                    aria-label="Profil pengguna"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-sale-blue">
                        A
                    </div>

                    <div className="hidden text-left md:block">
                        <p className="text-sm font-semibold text-sale-dark">
                            Auriel Lifta
                        </p>

                        <p className="text-xs text-sale-muted">Mahasiswa</p>
                    </div>
                </Link>
            </div>
        </header>
    );
}