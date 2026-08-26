import { Head, Link } from '@inertiajs/react';
import { MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    lecturerAvatar?: string;
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
        <Card className="group relative gap-0 overflow-hidden rounded-2xl border-t-4 border-t-sale-blue border-x-sale-border border-b-sale-border bg-sale-white py-0 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <Link
                href={`/student/courses/${course.id}`}
                className="absolute inset-0 z-0"
                aria-label={`Buka ${course.title}`}
            />

            <CardHeader className="relative z-10 flex flex-row items-center justify-between p-6 pb-3">
                <Badge className="pointer-events-none rounded-full border-transparent bg-blue-50 font-medium text-sale-blue hover:bg-blue-50">
                    {course.classCode}
                </Badge>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="rounded-md p-1 text-sale-muted transition-colors hover:bg-blue-50 hover:text-sale-dark focus:outline-none dark:hover:bg-slate-800"
                        aria-label={`Menu ${course.title}`}
                    >
                        <MoreVertical className="size-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="rounded-xl border-0 bg-card shadow-md"
                    >
                        <DropdownMenuItem asChild>
                            <Link href={`/student/courses/${course.id}`}>
                                Lihat detail
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href="/student/forum">
                                Buka forum diskusi
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem variant="destructive">
                            Keluar dari kelas
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent className="relative z-10 flex flex-col gap-4 p-6 pt-2 pointer-events-none">
                <h3 className="font-poppins text-base font-semibold leading-snug text-sale-dark transition-colors group-hover:text-sale-blue">
                    {course.title}
                </h3>

                <div className="-mx-6 -mb-6 flex items-center gap-2 rounded-b-2xl bg-blue-50/50 p-4 text-sm">
                    <Avatar className="size-6">
                        <AvatarImage src={course.lecturerAvatar} />

                        <AvatarFallback className="bg-blue-50 text-[10px] text-sale-blue">
                            {course.lecturer.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <span className="truncate text-sale-muted">
                        {course.lecturer}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Courses() {
    return (
        <StudentLayout>
            <Head title="Mata Kuliah" />

            <div className="min-h-[calc(100vh-80px)] bg-[#F8F9FF] px-16 py-[21px]">
                <div className="flex items-center justify-between">
                    <h1 className="font-poppins text-2xl font-semibold leading-[33.6px] text-sale-dark">
                        Mata Kuliah
                    </h1>

                    <Select defaultValue="ganjil-2023">
                        <SelectTrigger className="w-[180px] border-sale-border bg-sale-white">
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

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                        />
                    ))}
                </div>
            </div>
        </StudentLayout>
    );
}