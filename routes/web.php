<?php

use Illuminate\Support\Facades\Route;

// Redirect root / to student dashboard while keeping route name 'home'
Route::get('/', function () {
    return redirect()->route('student.dashboard');
})->name('home');

Route::redirect('/student', '/student/dashboard');

Route::prefix('student')->name('student.')->group(function () {
    Route::inertia('dashboard', 'student/Dashboard')->name('dashboard');
    Route::inertia('courses', 'student/Courses')->name('courses');
    Route::get('courses/{course}', function (string $course) {
        return \Inertia\Inertia::render('student/CourseDetail', [
            'courseId' => $course,
        ]);
    })->name('courses.show');
    Route::inertia('assignments', 'student/Assignments')->name('assignments');

    Route::get('assignments/{assignment}', function (string $assignment) {
        return \Inertia\Inertia::render('student/AssignmentDetail', [
            'assignmentId' => $assignment,
        ]);
    })->name('assignments.show'); // submissionMode: 'classroom'
    Route::get('quiz/{quiz}', function (string $quiz) {
        return \Inertia\Inertia::render('student/Quiz', [
            'quizId' => $quiz,
        ]);
    })->name('quiz.show'); // submissionMode: 'quiz'
    Route::get('programming-task/{task}', function (string $task) {
        return \Inertia\Inertia::render('student/ProgrammingTask', [
            'taskId' => $task,
        ]);
    })->name('programming-task.show'); // submissionMode: 'programming'
    Route::inertia('forum', 'student/Forum')->name('forum');
    Route::inertia('notifications', 'student/Notifications')->name('notifications');
    Route::inertia('profile', 'student/Profile')->name('profile');
});

// --- RUTE DOSEN (LECTURER) ---
Route::redirect('/dosen', '/dosen/dashboard');

Route::prefix('dosen')->name('dosen.')->group(function () {
    Route::inertia('dashboard', 'dosen/Dashboard')->name('dashboard');
    Route::inertia('courses', 'dosen/Courses')->name('courses');
    Route::inertia('curriculum', 'dosen/Curriculum')->name('rps');
    Route::inertia('materials', 'dosen/Materials')->name('materials');
    Route::inertia('assignments', 'dosen/Assignments')->name('assignments');
    Route::inertia('gradebook', 'dosen/Gradebook')->name('gradebook');
    Route::inertia('attendance', 'dosen/Attendance')->name('attendance');
    Route::inertia('analytics', 'dosen/Analytics')->name('analytics');
    Route::inertia('forum', 'dosen/Forum')->name('forum');
    Route::inertia('notifications', 'dosen/Notifications')->name('notifications');
    Route::inertia('profile', 'dosen/Profile')->name('profile');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// --- RUTE ADMIN ---
Route::redirect('/admin', '/admin/dashboard');

Route::prefix('admin')->name('admin.')->group(function () {
    // Dashboard Admin
    Route::inertia('dashboard', 'Admin/Dashboard')->name('dashboard');

    // Academic Data Routes
    Route::prefix('academic')->name('academic.')->group(function () {
        Route::inertia('faculties', 'Admin/Academic/Faculties')->name('faculties');
        Route::inertia('study-programs', 'Admin/Academic/StudyPrograms')->name('study-programs');
        Route::inertia('courses', 'Admin/Academic/Courses')->name('courses');
        Route::inertia('classes', 'Admin/Academic/Classes')->name('classes');
        Route::inertia('period', 'Admin/Academic/Period')->name('period');
        Route::inertia('import', 'Admin/Academic/Import')->name('import');
    });

    // Users & Access Routes
    Route::prefix('users')->name('users.')->group(function () {
        Route::inertia('students', 'Admin/Users/Students')->name('students');
        Route::inertia('lecturers', 'Admin/Users/Lecturers')->name('lecturers');
        Route::inertia('administrators', 'Admin/Users/Administrators')->name('administrators');
        Route::inertia('roles', 'Admin/Users/Roles')->name('roles');
    });

    // Reports Routes
    Route::prefix('reports')->name('reports.')->group(function () {
        Route::inertia('academic', 'Admin/Reports/Academic')->name('academic');
        Route::inertia('grade', 'Admin/Reports/Grade')->name('grade');
        Route::inertia('cpmk', 'Admin/Reports/Cpmk')->name('cpmk');
        Route::inertia('study-program', 'Admin/Reports/StudyProgram')->name('study-program');
    });

    // Notifikasi & Profil Admin
    Route::inertia('notifications', 'Admin/Notifications')->name('notifications');
    Route::inertia('profile', 'Admin/Profile')->name('profile');
});

require __DIR__.'/settings.php';