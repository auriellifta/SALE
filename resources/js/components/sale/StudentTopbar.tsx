import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bell, Moon, Sun, User } from 'lucide-react';

interface StudentTopbarProps {
    onOpenMobileMenu?: () => void;
}

export default function StudentTopbar({ onOpenMobileMenu }: StudentTopbarProps) {
    const { url } = usePage();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('appearance', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('appearance', 'dark');
            setIsDark(true);
        }
    };

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
        <header className="fixed top-0 right-0 left-0 md:left-[280px] z-30 flex h-16 items-center justify-between bg-card/95 backdrop-blur-md px-6 md:px-10 shadow-xs">
            {/* Left Context */}
            <div className="flex items-center gap-3">
                {onOpenMobileMenu && (
                    <button
                        type="button"
                        onClick={onOpenMobileMenu}
                        className="flex size-9 items-center justify-center rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden transition-colors"
                        aria-label="Buka Menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    </button>
                )}
                <span className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                    {getPageTitle()}
                </span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
                <Link
                    href="/student/notifications"
                    className="relative flex size-9 items-center justify-center rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    aria-label="Notifikasi"
                >
                    <Bell className="size-4.5 text-slate-800 dark:text-slate-200" />
                    <span className="absolute top-2 right-2 size-2 rounded-full bg-emerald-500 ring-2 ring-card" />
                </Link>

                <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex size-9 items-center justify-center rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title={isDark ? 'Mode Terang' : 'Mode Gelap'}
                    aria-label="Ubah tema"
                >
                    {isDark ? <Sun className="size-4.5 text-slate-800 dark:text-slate-200" /> : <Moon className="size-4.5 text-slate-800 dark:text-slate-200" />}
                </button>

                <div className="hidden sm:block mx-1.5 h-6 w-px bg-slate-200 dark:bg-slate-800" />

                <Link
                    href="/student/profile"
                    className="hidden sm:flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <div className="flex size-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                        <User className="size-4" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-none">
                            Auriel Lifta
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-none">
                            Mahasiswa
                        </p>
                    </div>
                </Link>
            </div>
        </header>
    );
}
