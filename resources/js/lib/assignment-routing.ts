export type SubmissionMode = 'classroom' | 'quiz' | 'programming';

export function getAssignmentHref(id: number | string, mode: SubmissionMode): string {
    switch (mode) {
        case 'programming':
            return `/student/programming-task/${id}`;
        case 'quiz':
            return `/student/quiz/${id}`;
        case 'classroom':
            return `/student/assignments/${id}`;
    }
}