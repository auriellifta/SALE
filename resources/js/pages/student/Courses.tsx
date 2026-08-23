import { Head, Link } from '@inertiajs/react';
import { MoreVertical, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import StudentLayout from '@/layouts/student-layout';

type CourseClass = {
    id: number;
    classCode: string;
    title: string;
    lecturer: string;
};

const courses: CourseClass[] = [
    {
        id: 1,
        classCode: 'INF-A',
        title: 'Interaksi Manusia & Komputer',
        lecturer: 'Dr. Budi Santoso, M.Kom',
    },
    {
        id: 2,
        classCode: 'INF-B',
        title: 'Struktur Data Terapan',
        lecturer: 'Siti Rahmawati, M.T.',
    },
    {
        id: 3,
        classCode: 'UMUM',
        title: 'Kewarganegaraan & Pancasila',
        lecturer: 'Drs. Ahmad Yani',
    },
    {
        id: 4,
        classCode: 'INF-A',
        title: 'Sistem Operasi Lanjut',
        lecturer: 'Prof. Dr. Hendra Wijaya',
    },
];

function CourseCard({ course }: { course: CourseClass }) {
    return (
        <Card className="relative gap-0 overflow-hidden rounded-2xl bg-card p-0 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-0">
            <Link
                href={`/student/courses/${course.id}`}
                className="absolute inset-0 z-0"
                aria-label={`Buka ${course.title}`}
            />

            <CardHeader className="relative z-10 flex flex-row items-center justify-between p-6 pb-2">
                <span className="text-xs font-semibold text-muted-foreground pointer-events-none">
                    {course.classCode}
                </span>

                <DropdownMenu>
                    <DropdownMenuTrigger className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 p-1 rounded-md transition-colors">
                        <MoreVertical className="size-4.5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="shadow-md rounded-xl border-0 bg-card">
                        <DropdownMenuItem asChild>
                            <Link href={`/student/courses/${course.id}`}>
                                Lihat Detail
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/student/forum">Buka Forum Diskusi</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent className="relative z-10 flex flex-col gap-4 p-6 pt-2 pointer-events-none">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {course.title}
                </h3>

                <div className="flex items-center gap-2 pt-3 -mx-6 -mb-6 p-4 rounded-b-2xl bg-slate-50/80 dark:bg-slate-800/40 text-xs text-muted-foreground">
                    <User className="size-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate font-medium">{course.lecturer}</span>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Courses() {
    return (
        <StudentLayout>
            <Head title="Mata Kuliah — SALE" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            Mata Kuliah
                        </h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            Daftar mata kuliah yang Anda ikuti pada semester ini
                        </p>
                    </div>

                    <Select defaultValue="ganjil-2023">
                        <SelectTrigger className="w-[200px] h-10 bg-card text-sm shadow-xs border-0 rounded-xl font-medium">
                            <SelectValue placeholder="Pilih semester" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-0 shadow-md">
                            <SelectItem value="ganjil-2023">
                                Semester Ganjil 2023
                            </SelectItem>
                            <SelectItem value="genap-2023">
                                Semester Genap 2023
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </StudentLayout>
    );
}