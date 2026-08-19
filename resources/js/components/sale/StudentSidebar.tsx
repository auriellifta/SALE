import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    CircleHelp,
    ClipboardList,
    LayoutDashboard,
    LogOut,
    MessageSquare,
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
        <aside className="fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-[#C3C6D7] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
            {/* Brand */}
            <div className="px-6 py-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center text-[#004AC6]">
                            <span className="text-2xl font-extrabold">
                                S
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className="font-poppins text-2xl font-extrabold leading-6 tracking-tight text-[#004AC6]">
                            SALE
                        </div>
                        <div className="mt-1 text-xs font-semibold text-[#8E3C00]">
                            Academic Ecosystem
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-4">
                {navigation.map((item) => {
                    const Icon = item.icon;

                    const active =
                        url === item.href ||
                        url.startsWith(`${item.href}/`);

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={[
                                'flex h-12 items-center gap-4 border-l-4 px-6 transition-colors',
                                active
                                    ? 'border-[#004AC6] bg-[#EFF4FF] text-[#004AC6]'
                                    : 'border-transparent text-[#434655] hover:bg-[#F8F9FF]',
                            ].join(' ')}
                        >
                            <Icon
                                className="h-[18px] w-[18px] shrink-0"
                                strokeWidth={active ? 2.3 : 1.8}
                            />

                            <span
                                className={
                                    active
                                        ? 'text-base font-semibold'
                                        : 'text-base'
                                }
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="space-y-2 px-6 pb-6">
                <button className="flex w-full items-center gap-4 px-6 py-3 text-left text-base text-[#434655] hover:bg-[#F8F9FF]">
                    <CircleHelp className="h-5 w-5" strokeWidth={1.8} />
                    Bantuan
                </button>

                <button className="flex w-full items-center gap-4 px-6 py-3 text-left text-base text-[#BA1A1A] hover:bg-[#FFF4F3]">
                    <LogOut className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    Keluar
                </button>
            </div>
        </aside>
    );
}