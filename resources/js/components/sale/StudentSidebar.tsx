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

    /*
     * Semua halaman yang masih termasuk area
     * "Tugas & Kuis" akan membuat menu tersebut tetap aktif.
     *
     * Termasuk:
     * - Halaman utama Tugas & Kuis
     * - Detail tugas Classroom
     * - Quiz
     * - Programming Task
     * - Tugas Kelompok
     */
    const isAssignmentArea =
        url === '/student/assignments' ||
        url.startsWith('/student/assignments/') ||
        url.startsWith('/student/quiz') ||
        url.startsWith('/student/programming') ||
        url.startsWith('/student/group-task') ||
        url.startsWith('/student/group-tasks');

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col border-r border-sale-border bg-sale-white md:flex">
            {/* Brand */}
            <div className="px-6 py-6">
                <Link
                    href="/student/dashboard"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sale-blue text-white">
                        <span className="text-xl font-extrabold">S</span>
                    </div>

                    <div>
                        <div className="font-poppins text-2xl leading-6 font-extrabold tracking-tight text-sale-blue">
                            SALE
                        </div>

                        <div className="mt-1 text-xs font-semibold text-sale-orange">
                            Academic Ecosystem
                        </div>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-4">
                {navigation.map((item) => {
                    const Icon = item.icon;

                    const active =
                        item.label === 'Tugas & Kuis'
                            ? isAssignmentArea
                            : url === item.href ||
                              (item.href !== '/student/dashboard' &&
                                  url.startsWith(`${item.href}/`));

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={[
                                'flex h-12 items-center gap-4 rounded-lg px-4 transition-colors',
                                active
                                    ? 'bg-blue-50 text-sale-blue'
                                    : 'text-sale-muted hover:bg-slate-50 hover:text-sale-dark',
                            ].join(' ')}
                        >
                            <Icon
                                className="h-[18px] w-[18px] shrink-0"
                                strokeWidth={active ? 2.2 : 1.8}
                            />

                            <span
                                className={
                                    active
                                        ? 'text-sm font-semibold'
                                        : 'text-sm font-medium'
                                }
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="space-y-1 border-t border-sale-border px-4 py-4">
                <button
                    type="button"
                    className="flex h-11 w-full items-center gap-4 rounded-lg px-4 text-left text-sm font-medium text-sale-muted transition-colors hover:bg-slate-50 hover:text-sale-dark"
                >
                    <CircleHelp
                        className="h-5 w-5"
                        strokeWidth={1.8}
                    />
                    Bantuan
                </button>

                <button
                    type="button"
                    className="text-sale-danger flex h-11 w-full items-center gap-4 rounded-lg px-4 text-left text-sm font-medium transition-colors hover:bg-red-50"
                >
                    <LogOut
                        className="h-[18px] w-[18px]"
                        strokeWidth={1.8}
                    />
                    Keluar
                </button>
            </div>
        </aside>
    );
}