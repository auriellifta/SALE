import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import {
    ArrowLeft,
    Bot,
    CheckCircle2,
    Play,
    RotateCcw,
    Send,
    Terminal,
} from 'lucide-react';
import _Editor from 'react-simple-code-editor';
const Editor = (_Editor as any).default || _Editor;
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StudentLayout from '@/layouts/student-layout';

interface ProgrammingTaskProps {
    taskId?: string;
}

type TaskDefinition = {
    course: string;
    courseCode: string;
    fileName: string;
    starterCode: string;
    assistantGreeting: string;
    suggestedPrompts: string[];
    title: string;
    weight: number;
    deadlineLabel: string;
    description: string;
    requirements: string[];
    examples: Array<{ input: string; output: string }>;
};

const taskDatabase: Record<string, TaskDefinition> = {
    '1': {
        course: 'Struktur Data & Algoritma',
        courseCode: 'INF-B',
        fileName: 'solution.js',
        starterCode: `// Tulis implementasi algoritma Bubble Sort Anda di bawah ini
function bubbleSort(arr) {
    const n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Tukar elemen bersebelahan
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }

    return arr;
}

// Jangan hapus bagian ini untuk pengujian otomatis
module.exports = bubbleSort;`,
        assistantGreeting:
            'Halo, Auriel! 👋 Saya SALE AI Assistant. Ada pertanyaan seputar optimasi perulangan bersarang atau kondisi swap pada Bubble Sort?',
        suggestedPrompts: [
            'Jelaskan cara kerja Bubble Sort step-by-step',
            'Bagaimana cara mengoptimalkan jika array sudah terurut?',
            'Analisis kompleksitas waktu Big-O',
        ],
        title: 'Implementasi Algoritma Sorting (Bubble Sort)',
        weight: 15,
        deadlineLabel: 'Hari ini, 23:59 WIB',
        description:
            'Bubble Sort adalah algoritma pengurutan sederhana yang berulang kali membandingkan elemen yang berdekatan dan menukarnya jika berada dalam urutan yang salah.',
        requirements: [
            'Fungsi bubbleSort(arr) harus mengembalikan array terurut secara ascending.',
            'Dilarang menggunakan fungsi bawaan Array.prototype.sort().',
            'Sertakan optimasi flag boolean untuk keluar awal jika array sudah terurut.',
            'Lolos seluruh test cases otomatis.',
        ],
        examples: [
            { input: '[5, 3, 8, 4, 2]', output: '[2, 3, 4, 5, 8]' },
            { input: '[10, -2, 4, 0]', output: '[-2, 0, 4, 10]' },
            { input: '[]', output: '[]' },
        ],
    },
};

type ChatMessage = {
    id: number;
    from: 'assistant' | 'user';
    text: string;
};

export default function ProgrammingTask({ taskId = '1' }: ProgrammingTaskProps) {
    const currentTask = taskDatabase[taskId] || taskDatabase['1'];

    const [code, setCode] = useState<string>(currentTask.starterCode);
    const [consoleOutput, setConsoleOutput] = useState<string>(
        'Tekan "Jalankan Kode" untuk menguji solusi program Anda.'
    );
    const [testResults, setTestResults] = useState<Array<{ name: string; passed: boolean; details: string }> | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, from: 'assistant', text: currentTask.assistantGreeting },
    ]);
    const [chatInput, setChatInput] = useState<string>('');
    const [activeConsoleTab, setActiveConsoleTab] = useState<'console' | 'tests'>('console');
    const [isRunning, setIsRunning] = useState(false);

    function handleReset() {
        setCode(currentTask.starterCode);
        setConsoleOutput('Kode berhasil di-reset ke template awal.');
        setTestResults(null);
    }

    function handleRun() {
        setIsRunning(true);
        setConsoleOutput('> Menjalankan sandbox runner untuk solution.js...');
        setTimeout(() => {
            setIsRunning(false);
            setConsoleOutput(
                `> Eksekusi selesai (Exit code: 0)\n> Input: [5, 3, 8, 4, 2]\n> Output: [2, 3, 4, 5, 8]\n> Status: Lolos 3 dari 3 Test Cases (Waktu eksekusi: 14ms)`
            );
            setTestResults([
                { name: 'Test Case 1: Array acak standar', passed: true, details: 'Input: [5,3,8,4,2] => Output: [2,3,4,5,8]' },
                { name: 'Test Case 2: Array dengan bilangan negatif', passed: true, details: 'Input: [10,-2,4,0] => Output: [-2,0,4,10]' },
                { name: 'Test Case 3: Empty Array []', passed: true, details: 'Input: [] => Output: []' },
            ]);
        }, 600);
    }

    function sendPrompt(text: string) {
        if (!text.trim()) return;
        const userMsgId = messages.length + 1;
        setMessages((prev) => [...prev, { id: userMsgId, from: 'user', text }]);
        setChatInput('');

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: prev.length + 1,
                    from: 'assistant',
                    text: `Pada Bubble Sort, perulangan luar mengatur berapa banyak lintasan yang dilakukan, sedangkan perulangan dalam melakukan perbandingan elemen bertetangga (arr[j] > arr[j+1]). Penggunaan flag swapped = true saat terjadi pertukaran nilai memungkinkan algoritma selesai lebih cepat (O(n) best-case) jika array sudah terurut.`,
                },
            ]);
        }, 500);
    }

    return (
        <StudentLayout>
            <Head title={`${currentTask.title} — SALE IDE`} />

            <div className="space-y-5">
                {/* Header Context Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                    <div className="flex items-center gap-3">
                        <Link href="/student/assignments">
                            <Button size="icon-sm" variant="outline" className="rounded-lg">
                                <ArrowLeft className="size-4" />
                            </Button>
                        </Link>
                        <div>
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <span>{currentTask.course}</span>
                                <span>•</span>
                                <span>{currentTask.courseCode}</span>
                            </div>
                            <h1 className="text-lg font-bold text-foreground mt-0.5">
                                {currentTask.title}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-semibold text-xs">
                            Tenggat: {currentTask.deadlineLabel}
                        </Badge>
                        <Button size="sm" className="text-xs font-semibold h-9 px-4">
                            Kumpulkan Solusi
                        </Button>
                    </div>
                </div>

                {/* 3-Column IDE Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[620px]">
                    {/* Left: Problem Instruction (4 cols) */}
                    <div className="lg:col-span-4 rounded-xl border border-border bg-card p-5 space-y-4 flex flex-col justify-between overflow-y-auto max-h-[700px] shadow-xs">
                        <div className="space-y-4">
                            <h2 className="text-sm font-semibold text-foreground border-b border-border pb-2.5">
                                Instruksi Soal
                            </h2>

                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {currentTask.description}
                            </p>

                            <div className="space-y-2 pt-2 border-t border-border">
                                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                                    Ketentuan Soal:
                                </h3>
                                <ul className="space-y-1.5 text-xs text-muted-foreground">
                                    {currentTask.requirements.map((req, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-foreground" />
                                            <span className="leading-relaxed">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-border">
                                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                                    Contoh Input & Output:
                                </h3>
                                <div className="space-y-2">
                                    {currentTask.examples.map((ex, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-lg bg-muted p-3 font-mono text-xs space-y-1"
                                        >
                                            <p className="text-muted-foreground">
                                                Input: <strong className="text-foreground">{ex.input}</strong>
                                            </p>
                                            <p className="text-muted-foreground">
                                                Output: <strong className="text-foreground">{ex.output}</strong>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle: Code Editor & Output (5 cols) */}
                    <div className="lg:col-span-5 rounded-xl border border-border bg-card flex flex-col justify-between overflow-hidden shadow-xs">
                        {/* Editor Header */}
                        <div className="flex items-center justify-between p-3.5 border-b border-border bg-card">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-[10px] font-mono">
                                    JS
                                </Badge>
                                <span className="font-mono text-xs font-semibold text-foreground">
                                    {currentTask.fileName}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleReset}
                                    className="h-8 text-xs gap-1"
                                >
                                    <RotateCcw className="size-3" />
                                    Reset
                                </Button>
                                <Button
                                    size="sm"
                                    disabled={isRunning}
                                    onClick={handleRun}
                                    className="h-8 text-xs font-semibold gap-1.5"
                                >
                                    <Play className="size-3 fill-foreground text-foreground" />
                                    {isRunning ? 'Menjalankan...' : 'Jalankan Kode'}
                                </Button>
                            </div>
                        </div>

                        {/* Editor Body */}
                        <div className="flex-1 bg-background p-4 font-mono text-xs overflow-auto min-h-[300px]">
                            <Editor
                                value={code || ''}
                                onValueChange={(val: string) => setCode(val || '')}
                                highlight={(value: string) =>
                                    Prism.highlight(
                                        value || '',
                                        Prism.languages.javascript || Prism.languages.js,
                                        'javascript'
                                    )
                                }
                                padding={0}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 13,
                                    lineHeight: 1.6,
                                }}
                            />
                        </div>

                        {/* Console & Test Results Tab */}
                        <div className="border-t border-border bg-card">
                            <div className="flex items-center gap-4 px-4 border-b border-border text-xs font-semibold">
                                <button
                                    type="button"
                                    onClick={() => setActiveConsoleTab('console')}
                                    className={[
                                        'py-2.5 border-b-2 transition-colors flex items-center gap-1.5',
                                        activeConsoleTab === 'console'
                                            ? 'border-foreground text-foreground'
                                            : 'border-transparent text-muted-foreground hover:text-foreground',
                                    ].join(' ')}
                                >
                                    <Terminal className="size-3.5" />
                                    Console Output
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveConsoleTab('tests')}
                                    className={[
                                        'py-2.5 border-b-2 transition-colors flex items-center gap-1.5',
                                        activeConsoleTab === 'tests'
                                            ? 'border-foreground text-foreground'
                                            : 'border-transparent text-muted-foreground hover:text-foreground',
                                    ].join(' ')}
                                >
                                    <CheckCircle2 className="size-3.5" />
                                    Hasil Test Cases {testResults ? `(${testResults.length})` : ''}
                                </button>
                            </div>

                            <div className="p-4 font-mono text-xs max-h-[160px] overflow-y-auto bg-muted/20">
                                {activeConsoleTab === 'console' ? (
                                    <pre className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                                        {consoleOutput}
                                    </pre>
                                ) : (
                                    <div className="space-y-2">
                                        {testResults ? (
                                            testResults.map((t, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-start justify-between p-2.5 rounded-lg border border-border bg-background text-xs"
                                                >
                                                    <div>
                                                        <span className="font-semibold text-foreground">
                                                            {t.name}
                                                        </span>
                                                        <p className="text-muted-foreground mt-0.5">
                                                            {t.details}
                                                        </p>
                                                    </div>
                                                    <Badge variant="secondary" className="text-[10px]">
                                                        PASSED
                                                    </Badge>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-muted-foreground">
                                                Jalankan kode untuk melihat evaluasi unit test.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: AI Assistant Panel (3 cols) */}
                    <div className="lg:col-span-3 rounded-xl border border-border bg-card p-4 flex flex-col justify-between space-y-4 shadow-xs">
                        <div className="flex items-center gap-2 border-b border-border pb-3">
                            <Bot className="size-4.5 text-foreground" />
                            <div>
                                <h3 className="text-xs font-semibold text-foreground">
                                    SALE AI Assistant
                                </h3>
                                <p className="text-[10px] text-muted-foreground">
                                    Bantuan Coding & Teori
                                </p>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={[
                                        'rounded-xl p-3 text-xs leading-relaxed',
                                        msg.from === 'assistant'
                                            ? 'bg-muted text-foreground'
                                            : 'bg-foreground text-background ml-4 shadow-xs',
                                    ].join(' ')}
                                >
                                    {msg.text}
                                </div>
                            ))}

                            {/* Quick Prompts */}
                            <div className="space-y-1.5 pt-2">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                                    Bantuan Cepat:
                                </span>
                                {currentTask.suggestedPrompts.map((prompt) => (
                                    <button
                                        key={prompt}
                                        type="button"
                                        onClick={() => sendPrompt(prompt)}
                                        className="w-full text-left p-2.5 rounded-lg border border-border bg-background hover:bg-accent text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chat Input */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendPrompt(chatInput);
                            }}
                            className="flex items-center gap-2 pt-2 border-t border-border"
                        >
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Tanyakan seputar kode..."
                                className="flex-1 h-9 px-3 text-xs rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
                            />
                            <Button size="icon-sm" type="submit" variant="default" className="shrink-0">
                                <Send className="size-3.5" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}