import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Upload, CheckCircle2, FileSpreadsheet, Download, AlertCircle, RefreshCw, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/layouts/admin-layout';

export default function ImportData() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [selectedCategory, setSelectedCategory] = useState('Mahasiswa');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleImport = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            showToast(`Data ${selectedCategory} berhasil di-import dari file "${selectedFile.name}"!`);
            setSelectedFile(null);
        }, 2000);
    };

    const handleDownloadTemplate = (category: string) => {
        showToast(`Template Excel untuk ${category} berhasil diunduh!`);
    };

    return (
        <AdminLayout>
            <Head title="Import Data - SALE" />

            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="space-y-8">
                {/* HEADER BANNER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Import Data Akademik</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Upload berkas spreadsheet (.xlsx atau .csv) untuk memasukkan data massal ke sistem SALE secara instan.
                        </p>
                    </div>
                </div>

                {/* GRID PILIHAN KATEGORI & FORM UPLOAD */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* KIRI: PILIH KATEGORI & TEMPLATE */}
                    <div className="space-y-6">
                        <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                            <CardHeader className="p-5 pb-3">
                                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Database className="h-4 w-4 text-blue-600" /> Pilih Kategori Data
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 pt-0 space-y-3">
                                {[
                                    { name: 'Mahasiswa', desc: 'NIM, Nama, Prodi, Angkatan, Email' },
                                    { name: 'Dosen', desc: 'NIDN, Nama Lengkap, Gelar, Email' },
                                    { name: 'Mata Kuliah', desc: 'Kode MK, Nama MK, SKS, Semester' },
                                    { name: 'Kurikulum & Rencana Studi', desc: 'Mapping matakuliah per program studi' },
                                ].map((item) => (
                                    <div
                                        key={item.name}
                                        onClick={() => setSelectedCategory(item.name)}
                                        className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                                            selectedCategory === item.name
                                                ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200 font-bold'
                                                : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        <div className="min-w-0 pr-2">
                                            <p className="text-xs font-bold truncate">{item.name}</p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal mt-0.5 truncate">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-4">
                                    <Button
                                        onClick={() => handleDownloadTemplate(selectedCategory)}
                                        variant="outline"
                                        className="w-full text-xs font-bold rounded-xl border-slate-200 dark:border-slate-700 gap-2 cursor-pointer h-10 truncate px-3"
                                    >
                                        <Download className="h-4 w-4 text-blue-600 shrink-0" /> 
                                        <span className="truncate">Download Template ({selectedCategory})</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* KANAN: AREA UPLOAD FILE */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white dark:bg-slate-900 shadow-xs border-slate-200/80 dark:border-slate-800 rounded-2xl">
                            <CardHeader className="p-5 border-b border-slate-100 dark:border-slate-800">
                                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white">
                                    Upload Berkas Excel untuk <span className="text-blue-600">[{selectedCategory}]</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <form onSubmit={handleImport} className="space-y-6">
                                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center space-y-4 hover:border-blue-500 transition bg-slate-50/50 dark:bg-slate-800/20">
                                        <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600">
                                            <FileSpreadsheet className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                {selectedFile ? selectedFile.name : 'Seret dan letakkan file Excel ke sini, atau klik untuk memilih'}
                                            </p>
                                            <p className="text-[11px] text-slate-400">Mendukung format .xlsx, .xls, atau .csv (Maksimal 10MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept=".xlsx, .xls, .csv"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="fileUploadInput"
                                        />
                                        <label htmlFor="fileUploadInput">
                                            <span className="inline-block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold px-4 py-2 rounded-xl shadow-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200">
                                                Pilih Berkas dari Komputer
                                            </span>
                                        </label>
                                    </div>

                                    {selectedFile && (
                                        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                                                <span>File siap diproses: <strong className="font-bold">{selectedFile.name}</strong></span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedFile(null)}
                                                className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold"
                                            >
                                                Ganti
                                            </button>
                                        </div>
                                    )}

                                    <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-start gap-3">
                                        <AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                                            Pastikan struktur kolom pada file Excel Anda sudah sesuai dengan template yang disediakan untuk menghindari kesalahan validasi basis data.
                                        </p>
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Button
                                            type="submit"
                                            disabled={!selectedFile || isUploading}
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl px-6 py-2.5 gap-2 cursor-pointer disabled:opacity-50"
                                        >
                                            {isUploading ? (
                                                <>
                                                    <RefreshCw className="h-4 w-4 animate-spin" /> Memproses Import...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="h-4 w-4" /> Mulai Import Data {selectedCategory}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}