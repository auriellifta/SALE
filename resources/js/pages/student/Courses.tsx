import { Head, Link } from '@inertiajs/react';
import { MoreVertical, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
        <Card className="relative gap-4 overflow-hidden rounded-xl border border-border bg-card p-0 shadow-xs hover:shadow-md hover:border-foreground/25 hover:-translate-y-0.5 transition-all duration-200">
            <Link
                href={`/student/courses/${course.id}`}
                className="absolute inset-0 z-0"
                aria-label={`Buka ${course.title}`}
            />

            <CardHeader className="relative z-10 flex flex-row items-center justify-between p-5 pb-0">
                <Badge variant="outline" className="font-semibold pointer-events-none text-xs">
                    {course.classCode}
                </Badge>

                <DropdownMenu>
                    <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors">
                        <MoreVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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

            <CardContent className="relative z-10 flex flex-col gap-4 p-5 pt-3 pointer-events-none">
                <h3 className="text-base font-semibold text-foreground leading-snug">
                    {course.title}
                </h3>

                <div className="flex items-center gap-2 pt-3 border-t border-border/60 text-xs text-muted-foreground">
                    <User className="size-3.5 shrink-0" />
                    <span className="truncate">{course.lecturer}</span>
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
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Mata Kuliah
                        </h1>
                        <p className="text-sm text-muted-foreground mt-0.5">
                            Daftar mata kuliah yang Anda ikuti pada semester ini
                        </p>
                    </div>

                    <Select defaultValue="ganjil-2023">
                        <SelectTrigger className="w-[200px] h-10 border-border bg-card text-sm shadow-2xs">
                            <SelectValue placeholder="Pilih semester" />
                        </SelectTrigger>
                        <SelectContent>
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