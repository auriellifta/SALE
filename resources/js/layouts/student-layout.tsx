import { ReactNode } from 'react';
import StudentSidebar from '@/components/sale/StudentSidebar';
import StudentTopbar from '@/components/sale/StudentTopbar';

interface StudentLayoutProps {
    children: ReactNode;
}

export default function StudentLayout({
    children,
}: StudentLayoutProps) {
    return (
        <div className="min-h-screen bg-[#F8F9FF]">
            <StudentSidebar />
            <StudentTopbar />

            <main className="ml-[280px] min-h-screen pt-20">
                {children}
            </main>
        </div>
    );
}
