import { Bell, Moon } from 'lucide-react';

export default function StudentTopbar() {
    return (
        <header className="bg-sale-surface fixed top-0 right-0 left-[280px] z-30 flex h-16 items-center justify-between border-b border-sale-border px-8">
            {/* Page Context */}
            <div className="flex items-center">
                <span className="text-sm font-medium text-sale-muted">
                    Dashboard
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="relative flex h-10 w-10 items-center justify-center rounded-full text-sale-muted transition-colors hover:bg-slate-100 hover:text-sale-dark"
                    aria-label="Notifikasi"
                >
                    <Bell className="h-5 w-5" strokeWidth={1.8} />

                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-sale-orange" />
                </button>

                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sale-muted transition-colors hover:bg-slate-100 hover:text-sale-dark"
                    aria-label="Ubah tema"
                >
                    <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </button>

                <div className="ml-2 h-8 w-px bg-sale-border" />

                <button
                    type="button"
                    className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-50"
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
                </button>
            </div>
        </header>
    );
}
