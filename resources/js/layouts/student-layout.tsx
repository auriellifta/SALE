import { ReactNode, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import StudentSidebar from '@/components/sale/StudentSidebar';
import StudentTopbar from '@/components/sale/StudentTopbar';
import {
    Bell,
    BookOpen,
    ClipboardList,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    UserRound,
    X,
} from 'lucide-react';

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
        <div className="min-h-screen bg-[#F8F9FF]">
            {/* Desktop Sidebar */}
            <StudentSidebar />

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div
                        className="fixed inset-0 bg-black/40"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="relative z-10 flex w-72 flex-col bg-sale-white p-6 shadow-xl">
                        <div className="flex h-12 items-center justify-between pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sale-blue text-white">
                                    <span className="text-lg font-extrabold">S</span>
                                </div>
                                <span className="font-poppins text-lg font-extrabold tracking-tight text-sale-blue">
                                    SALE
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="rounded-lg p-1.5 text-sale-muted hover:bg-slate-100 hover:text-sale-dark"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <nav className="mt-6 flex-1 space-y-1 overflow-y-auto">
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
                                            'flex h-12 items-center gap-4 rounded-lg px-4 text-sm transition-colors',
                                            active
                                                ? 'bg-blue-50 font-semibold text-sale-blue'
                                                : 'font-medium text-sale-muted hover:bg-slate-50 hover:text-sale-dark',
                                        ].join(' ')}
                                    >
                                        <Icon
                                            className="h-[18px] w-[18px] shrink-0"
                                            strokeWidth={active ? 2.2 : 1.8}
                                        />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="space-y-1 border-t border-sale-border pt-4">
                            <button
                                type="button"
                                className="text-sale-danger flex h-11 w-full items-center gap-4 rounded-lg px-4 text-left text-sm font-medium transition-colors hover:bg-red-50"
                            >
                                <LogOut className="h-[18px] w-[18px]" strokeWidth={1.8} />
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Topbar */}
            <StudentTopbar onOpenMobileMenu={() => setMobileOpen(true)} />

            {/* Main Content */}
            <main className="min-h-screen pt-16 md:ml-[280px]">
                {children}
            </main>
        </div>
    );
}