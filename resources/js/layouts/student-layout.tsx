import { ReactNode, useState } from 'react';
import StudentSidebar from '@/components/sale/StudentSidebar';
import StudentTopbar from '@/components/sale/StudentTopbar';
import {
    BookOpen,
    ClipboardList,
    GraduationCap,
    LayoutDashboard,
    MessageSquare,
    Bell,
    UserRound,
    X,
} from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

interface StudentLayoutProps {
    children: ReactNode;
}

const mobileNav = [
    { label: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Course', href: '/student/courses', icon: BookOpen },
    { label: 'Tugas & Kuis', href: '/student/assignments', icon: ClipboardList },
    { label: 'Forum Diskusi', href: '/student/forum', icon: MessageSquare },
    { label: 'Notifikasi', href: '/student/notifications', icon: Bell },
    { label: 'Profil', href: '/student/profile', icon: UserRound },
];

export default function StudentLayout({ children }: StudentLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-foreground">
            {/* Desktop Sidebar */}
            <StudentSidebar />

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="relative z-10 flex w-72 flex-col bg-blue-900 text-white p-6 shadow-xl">
                        <div className="flex h-12 items-center justify-between pb-4">
                            <div className="flex items-center gap-2.5">
                                <GraduationCap className="size-6 text-emerald-400" />
                                <span className="font-bold text-base text-white tracking-tight">
                                    SALE
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="rounded-lg p-1.5 text-blue-200 hover:bg-blue-800 hover:text-white"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <nav className="mt-6 flex-1 space-y-1.5 overflow-y-auto">
                            {mobileNav.map((item) => {
                                const Icon = item.icon;
                                const active =
                                    url === item.href ||
                                    (item.href !== '/student/dashboard' && url.startsWith(`${item.href}/`));
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={[
                                            'flex items-center gap-3.5 rounded-lg px-3.5 py-3 text-sm font-medium transition-all',
                                            active
                                                ? 'bg-white text-blue-900 font-bold shadow-sm'
                                                : 'text-blue-100 hover:bg-blue-800/60 hover:text-white',
                                        ].join(' ')}
                                    >
                                        <Icon className={`size-5 ${active ? 'text-emerald-600' : 'text-emerald-400'}`} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}

            {/* Topbar */}
            <StudentTopbar onOpenMobileMenu={() => setMobileOpen(true)} />

            {/* Main Content */}
            <main className="md:ml-[280px] min-h-screen pt-16">
                <div className="mx-auto max-w-7xl px-6 md:px-10 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
