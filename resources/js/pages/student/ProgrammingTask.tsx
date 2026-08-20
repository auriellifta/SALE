import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import { Code2, FileText, RotateCcw, Send, Sparkles } from 'lucide-react';
import _Editor from 'react-simple-code-editor';
const Editor = (_Editor as any).default || _Editor;
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StudentLayout from '@/layouts/student-layout';

interface ProgrammingTaskProps {
    taskId?: string;
}

type TaskExample = {
    input: string;
    output: string;
};

type TaskDefinition = {
    course: string;
    fileName: string;
    starterCode: string;
    assistantGreeting: string;
    suggestedPrompts: string[];
    // Data soal — ditampilkan di panel "Soal" sebelah kiri editor
    title: string;
    weight: number;
    deadlineLabel: string;
    description: string;
    requirements: string[];
    examples: TaskExample[];
};

// Database Mockup Tugas Pemrograman berdasarkan taskId
const taskDatabase: Record<string, TaskDefinition> = {
    '1': {
        course: 'Struktur Data & Algoritma',
        fileName: 'main.js',
        starterCode: `// Tulis implementasi Bubble Sort Anda di bawah ini
function bubbleSort(arr) {
    // Mulai koding di sini

    return arr;
}

// Jangan hapus bagian ini untuk pengujian
module.exports = bubbleSort;`,
        assistantGreeting: 'Halo! Saya dapat membantu Anda memahami algoritma Bubble Sort. Apakah Anda butuh petunjuk untuk memulai?',
        suggestedPrompts: [
            'Jelaskan konsep Bubble Sort',
            'Berikan petunjuk baris pertama',
        ],
        title: 'Implementasi Algoritma Sorting (Bubble Sort)',
        weight: 15,
        deadlineLabel: 'Hari ini, 23:59 WIB',
        description:
            'Bubble Sort adalah algoritma pengurutan sederhana yang membandingkan dua elemen bersebelahan secara berulang, lalu menukarnya jika urutannya salah. Proses ini diulang hingga seluruh array terurut.',
        requirements: [
            'Implementasikan fungsi bubbleSort(arr) yang menerima array angka.',
            'Fungsi harus mengembalikan array baru yang sudah terurut ascending (dari kecil ke besar).',
            'Tidak boleh menggunakan method bawaan .sort() dari JavaScript.',
            'Pastikan kompleksitas waktu solusi Anda O(n²).',
        ],
        examples: [
            { input: '[5, 3, 8, 4, 2]', output: '[2, 3, 4, 5, 8]' },
            { input: '[1]', output: '[1]' },
            { input: '[]', output: '[]' },
        ],
    },
    '2': {
        course: 'Struktur Data & Algoritma',
        fileName: 'selection_sort.js',
        starterCode: `// Tulis implementasi Selection Sort Anda di bawah ini
function selectionSort(arr) {
    // Mulai koding di sini

    return arr;
}

// Jangan hapus bagian ini untuk pengujian
module.exports = selectionSort;`,
        assistantGreeting: 'Halo! Saya dapat membantu Anda memahami algoritma Selection Sort. Apakah Anda butuh petunjuk?',
        suggestedPrompts: [
            'Jelaskan konsep Selection Sort',
            'Berikan petunjuk baris pertama',
        ],
        title: 'Implementasi Algoritma Sorting (Selection Sort)',
        weight: 15,
        deadlineLabel: 'Jum, 24 Okt • 23:59 WIB',
        description:
            'Selection Sort bekerja dengan mencari elemen terkecil dari bagian array yang belum terurut, lalu menukarnya ke posisi terdepan. Proses ini diulang untuk setiap posisi hingga seluruh array terurut.',
        requirements: [
            'Implementasikan fungsi selectionSort(arr) yang menerima array angka.',
            'Fungsi harus mengembalikan array baru yang sudah terurut ascending (dari kecil ke besar).',
            'Tidak boleh menggunakan method bawaan .sort() dari JavaScript.',
            'Pastikan kompleksitas waktu solusi Anda O(n²).',
        ],
        examples: [
            { input: '[29, 10, 14, 37, 13]', output: '[10, 13, 14, 29, 37]' },
            { input: '[2, 1]', output: '[1, 2]' },
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
    // key={taskId} membuat React membongkar & memasang ulang komponen inner
    // setiap kali taskId berubah — ini cara resmi React untuk "reset semua
    // state" saat berpindah task, menggantikan pola useEffect(() => reset).
    return <ProgrammingTaskView key={taskId} taskId={taskId} />;
}

function ProgrammingTaskView({ taskId }: Required<ProgrammingTaskProps>) {
    const currentTask = taskDatabase[taskId] || taskDatabase['1'];

    const [code, setCode] = useState<string>(currentTask.starterCode);
    const [consoleOutput, setConsoleOutput] = useState<string>('Siap untuk menjalankan kode...');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, from: 'assistant', text: currentTask.assistantGreeting },
    ]);
    const [chatInput, setChatInput] = useState<string>('');
    const [activeConsoleTab, setActiveConsoleTab] = useState<'console' | 'tests'>('console');

    function handleReset() {
        setCode(currentTask.starterCode);
        setConsoleOutput('Kode berhasil di-reset.');
    }

    function handleRun() {
        setConsoleOutput(`> Menjalankan ${currentTask.fileName}...\n> (Belum terhubung ke runtime eksekusi)`);
    }

    function sendPrompt(text: string) {
        if (!text.trim()) {
return;
}

        setMessages((prev) => [
            ...prev,
            { id: prev.length + 1, from: 'user', text },
        ]);
        setChatInput('');
    }

    return (
        <StudentLayout>
            <Head title={`${currentTask.fileName} — Tugas Pemrograman`} />

            <div className="grid h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-[300px_1fr_340px]">
                {/* Panel Soal / Instruksi */}
                <div className="flex min-w-0 flex-col overflow-y-auto border-r border-sale-border bg-sale-white">
                    <div className="flex items-center gap-2 border-b border-sale-border px-5 py-3">
                        <FileText className="size-4 text-sale-blue" />
                        <h2 className="font-poppins font-semibold text-sale-dark">
                            Soal
                        </h2>
                    </div>

                    <div className="space-y-5 px-5 py-4">
                        <div>
                            <Badge className="rounded-full border-transparent bg-orange-50 text-[11px] font-medium text-sale-orange hover:bg-orange-50">
                                <Code2 className="mr-1 size-3" />
                                TUGAS PEMROGRAMAN
                            </Badge>
                            <h1 className="mt-2 font-poppins text-base leading-snug font-bold text-sale-dark">
                                {currentTask.title}
                            </h1>
                            <p className="mt-1 text-xs text-sale-muted">
                                {currentTask.course}
                            </p>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 text-xs">
                            <span className="text-sale-muted">Bobot</span>
                            <span className="font-bold text-sale-blue">
                                {currentTask.weight}%
                            </span>
                        </div>

                        <p className="text-xs font-medium text-sale-danger">
                            Tenggat: {currentTask.deadlineLabel}
                        </p>

                        <div>
                            <h3 className="text-sm font-semibold text-sale-dark">
                                Deskripsi
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-sale-muted">
                                {currentTask.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-sale-dark">
                                Ketentuan
                            </h3>
                            <ul className="mt-1.5 space-y-1.5">
                                {currentTask.requirements.map((req) => (
                                    <li
                                        key={req}
                                        className="flex items-start gap-2 text-sm text-sale-muted"
                                    >
                                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-sale-muted" />
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-sale-dark">
                                Contoh
                            </h3>
                            <div className="mt-1.5 space-y-2">
                                {currentTask.examples.map((example, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg border border-sale-border bg-muted/30 p-3 font-mono text-xs"
                                    >
                                        <p className="text-sale-muted">
                                            Input:{' '}
                                            <span className="text-sale-dark">
                                                {example.input}
                                            </span>
                                        </p>
                                        <p className="mt-1 text-sale-muted">
                                            Output:{' '}
                                            <span className="text-sale-green">
                                                {example.output}
                                            </span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor + Console Section */}
                <div className="flex min-w-0 flex-col border-r border-sale-border">
                    <div className="flex items-center justify-between border-b border-sale-border bg-sale-white px-5 py-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-sale-dark">
                            <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-bold text-yellow-700">
                                JS
                            </span>
                            {currentTask.fileName}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5 border-sale-border text-sale-dark"
                                onClick={handleReset}
                            >
                                <RotateCcw className="size-3.5" />
                                Reset
                            </Button>
                            <Button
                                size="sm"
                                className="gap-1.5 bg-sale-blue text-white hover:bg-blue-600"
                                onClick={handleRun}
                            >
                                ▷ Jalankan Kode
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto bg-white p-4 font-mono text-sm">
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
                                fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                                fontSize: 14,
                                lineHeight: 1.6,
                            }}
                        />
                    </div>

                    <div className="border-t border-sale-border bg-sale-white">
                        <div className="flex items-center gap-6 border-b border-sale-border px-5">
                            <button
                                type="button"
                                onClick={() => setActiveConsoleTab('console')}
                                className={[
                                    'border-b-2 py-3 text-sm font-medium',
                                    activeConsoleTab === 'console'
                                        ? 'border-sale-blue text-sale-blue'
                                        : 'border-transparent text-sale-muted',
                                ].join(' ')}
                            >
                                Console
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveConsoleTab('tests')}
                                className={[
                                    'border-b-2 py-3 text-sm font-medium',
                                    activeConsoleTab === 'tests'
                                        ? 'border-sale-blue text-sale-blue'
                                        : 'border-transparent text-sale-muted',
                                ].join(' ')}
                            >
                                Test Results
                            </button>
                        </div>

                        <div className="min-h-[110px] px-5 py-3 font-mono text-sm text-sale-muted">
                            {activeConsoleTab === 'console' ? (
                                <pre className="whitespace-pre-wrap">
                                    {'> ' + consoleOutput}
                                </pre>
                            ) : (
                                <p>Belum ada hasil pengujian.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* AI Assistant Panel */}
                <div className="flex min-w-0 flex-col bg-sale-white">
                    <div className="flex items-center gap-2 border-b border-sale-border px-5 py-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sale-blue text-white">
                            <Sparkles className="size-4" />
                        </span>
                        <h2 className="font-poppins font-semibold text-sale-dark">
                            SALE AI Assistant
                        </h2>
                    </div>

                    <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                        <p className="text-xs font-medium uppercase text-sale-muted">
                            AI Assistant
                        </p>

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={[
                                    'rounded-xl p-4 text-sm leading-relaxed',
                                    message.from === 'assistant'
                                        ? 'bg-blue-50 text-sale-dark'
                                        : 'ml-6 bg-sale-blue text-white',
                                ].join(' ')}
                            >
                                {message.text}
                            </div>
                        ))}

                        <div className="space-y-2 pt-2">
                            {currentTask.suggestedPrompts.map((prompt) => (
                                <button
                                    key={prompt}
                                    type="button"
                                    onClick={() => sendPrompt(prompt)}
                                    className="block w-full rounded-lg border border-sale-border px-4 py-2.5 text-left text-sm text-sale-blue hover:bg-blue-50"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <form
                        className="flex items-center gap-2 border-t border-sale-border p-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendPrompt(chatInput);
                        }}
                    >
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Tanya sesuatu..."
                            className="h-10 flex-1 rounded-full border border-sale-border bg-muted/30 px-4 text-sm outline-none focus-visible:border-sale-blue"
                        />
                        <button
                            type="submit"
                            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sale-blue text-white hover:bg-blue-600"
                            aria-label="Kirim"
                        >
                            <Send className="size-4" />
                        </button>
                    </form>
                </div>
            </div>
        </StudentLayout>
    );
}