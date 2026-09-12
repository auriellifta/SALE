import { Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    Bell,
    BookOpen,
    Building2,
    Calendar,
    FileText,
    GraduationCap,
    Layers,
    LayoutDashboard,
    LogOut,
    Shield,
    Upload,
    User,
    UserCircle,
    UserRound,
    Users,
} from 'lucide-react';

export const adminNavigation = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    // Academic Data
    { label: 'Faculties', href: '/admin/academic/faculties', icon: Building2 },
    { label: 'Study Programs', href: '/admin/academic/study-programs', icon: BookOpen },
    { label: 'Courses', href: '/admin/academic/courses', icon: FileText },
    { label: 'Classes', href: '/admin/academic/classes', icon: Layers },
    { label: 'Academic Period', href: '/admin/academic/period', icon: Calendar },
    { label: 'Import Data', href: '/admin/academic/import', icon: Upload },
    // Users & Access
    { label: 'Students', href: '/admin/users/students', icon: GraduationCap },
    { label: 'Lecturers', href: '/admin/users/lecturers', icon: Users },
    { label: 'Administrators', href: '/admin/users/administrators', icon: UserCircle },
    { label: 'Role & Permissions', href: '/admin/users/roles', icon: Shield },
    // Reports
    { label: 'Academic Report', href: '/admin/reports/academic', icon: BarChart3 },
    { label: 'Grade Report', href: '/admin/reports/grade', icon: FileText },
    { label: 'CPMK Achievement', href: '/admin/reports/cpmk', icon: BarChart3 },
    { label: 'Report by Study Program', href: '/admin/reports/study-program', icon: Building2 },
    { label: 'Notifikasi', href: '/admin/notifications', icon: Bell },
    { label: 'Profile', href: '/admin/profile', icon: UserRound },
];

export default function AdminSidebar() {
    const { url } = usePage();

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col bg-blue-900 text-white md:flex shadow-md">
            {/* Brand Header */}
            <div className="flex h-16 items-center px-6 bg-blue-950/30">
                <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                    <GraduationCap className="size-6 text-emerald-400 transition-transform group-hover:scale-105" />
                    <div>
                        <div className="text-base font-bold tracking-tight text-white leading-none">
                            SALE
                        </div>
                        <div className="mt-1 text-[11px] font-medium text-blue-200 leading-none">
                            Academic Ecosystem (Admin)
                        </div>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3.5 py-4 space-y-1 overflow-y-auto">
                {adminNavigation.map((item) => {
                    const Icon = item.icon;
                    const active =
                        url === item.href ||
                        (item.href !== '/admin/dashboard' && url.startsWith(`${item.href}/`));

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={[
                                'flex h-10 items-center gap-3 rounded-lg px-3.5 text-sm font-medium transition-all',
                                active
                                    ? 'bg-white text-blue-900 font-bold shadow-sm'
                                    : 'text-blue-100 hover:bg-blue-800/60 hover:text-white',
                            ].join(' ')}
                        >
                            <Icon
                                className={`size-4.5 shrink-0 ${active ? 'text-emerald-600' : 'text-emerald-400'}`}
                                strokeWidth={active ? 2.3 : 1.75}
                            />
                            <span className="truncate">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3.5 space-y-1 bg-blue-950/40 border-t border-blue-800/40">
                <Link
                    href="/admin/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-blue-100 hover:bg-blue-800/40 hover:text-white transition-colors"
                >
                    <User className="size-4 shrink-0 text-emerald-400" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate leading-none">
                            Yura
                        </p>
                        <p className="text-xs text-blue-200 truncate mt-1 leading-none">
                            Administrator
                        </p>
                    </div>
                </Link>

                <Link
                    href="/login"
                    className="flex h-9 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-rose-300 hover:bg-rose-500/20 hover:text-rose-100 transition-colors"
                >
                    <LogOut className="size-4 shrink-0" />
                    <span>Keluar</span>
                </Link>
            </div>
        </aside>
    );
}
