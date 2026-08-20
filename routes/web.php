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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';