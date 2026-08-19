import { Bell, Moon } from 'lucide-react';

export default function StudentTopbar() {
    return (
        <header className="fixed left-[280px] right-0 top-0 z-30 flex h-20 items-center justify-end border-b border-[#C3C6D7] bg-[#F8F9FF] px-8">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#434655] hover:bg-white"
                    aria-label="Notifikasi"
                >
                    <Bell className="h-5 w-5" strokeWidth={1.8} />
                </button>

                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#434655] hover:bg-white"
                    aria-label="Ubah tema"
                >
                    <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </button>

                <button
                    type="button"
                    className="h-10 w-10 overflow-hidden rounded-full border border-[#C3C6D7]"
                    aria-label="Profil"
                >
                    <div className="flex h-full w-full items-center justify-center bg-[#DCE9FF] text-sm font-semibold text-[#004AC6]">
                        A
                    </div>
                </button>
            </div>
        </header>
    );
}