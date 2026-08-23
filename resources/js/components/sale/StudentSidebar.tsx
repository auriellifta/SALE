import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    ClipboardList,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    User,
    UserRound,
} from 'lucide-react';

const navigation = [
    {
        label: 'Dashboard',
        href: '/student/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Course',
        href: '/student/courses',
        icon: BookOpen,
    },
    {
        label: 'Tugas & Kuis',
        href: '/student/assignments',
        icon: ClipboardList,
    },
    {
        label: 'Forum Diskusi',
        href: '/student/forum',
        icon: MessageSquare,
    },
    {
        label: 'Notifikasi',
        href: '/student/notifications',
        icon: Bell,
    },
    {
        label: 'Profil',
        href: '/student/profile',
        icon: UserRound,
    },
];

export default function StudentSidebar() {
    const { url } = usePage();

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col border-r border-border bg-card md:flex">
            {/* Brand Header */}
            <div className="flex h-16 items-center border-b border-border px-6">
                <Link href="/student/dashboard" className="flex items-center gap-2.5">
                    <GraduationCap className="size-5.5 text-foreground" />
                    <div>
                        <div className="text-base font-bold tracking-tight text-foreground leading-none">
                            SALE
                        </div>
                        <div className="mt-1 text-[11px] font-medium text-muted-foreground leading-none">
                            Academic Ecosystem
                        </div>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3.5 py-5 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    const active =
                        url === item.href ||
                        (item.href !== '/student/dashboard' && url.startsWith(`${item.href}/`));

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={[
                                'flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors',
                                active
                                    ? 'bg-accent text-foreground font-semibold'
                                    : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                            ].join(' ')}
                        >
                            <Icon
                                className="size-4 shrink-0"
                                strokeWidth={active ? 2.2 : 1.75}
                            />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="space-y-1 border-t border-border p-3.5">
                <Link
                    href="/student/profile"
                    className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                    <User className="size-4 shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate leading-none">
                            Auriel Lifta
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-1 leading-none">
                            Mahasiswa
                        </p>
                    </div>
                </Link>

                <Link
                    href="/login"
                    className="flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                    <LogOut className="size-4 shrink-0" />
                    <span>Keluar</span>
                </Link>
            </div>
        </aside>
    );
}
