# SALE — Laravel 13 + React & Inertia.js Starter Kit

[![Laravel Version](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React Version](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-3.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

Aplikasi web modern berbasis **Laravel 13**, **React 19**, **Inertia.js v3**, dan **TypeScript**. Dilengkapi dengan sistem autentikasi lengkap dan aman menggunakan **Laravel Fortify** (termasuk 2FA dan Passkeys/WebAuthn), UI modern berbasis **Tailwind CSS v4** & **Radix UI**, serta tooling pengembang yang komprehensif.

---

## 🚀 Fitur Utama

- **⚡ Full-stack Modern SPA (Single Page Application)**:
  - Menggunakan **Inertia.js v3** untuk menghubungkan backend Laravel langsung dengan frontend React tanpa perlu menulis REST API / GraphQL manual.
  - **React 19** + **TypeScript** untuk performa dan keamanan tipe data (_type-safety_).
  - Bundler kilat menggunakan **Vite 8** + React Compiler.

- **🔐 Autentikasi Komprehensif (Laravel Fortify)**:
  - Registrasi & Login pengguna.
  - Reset & Pemulihan Password.
  - Verifikasi Email.
  - **Two-Factor Authentication (2FA)** dengan QR Code, Authenticator App (TOTP), dan recovery codes.
  - **Passkeys (WebAuthn)** untuk login cepat & aman menggunakan biometrik / hardware security keys.

- **🎨 Desain & UI Modern**:
  - **Tailwind CSS v4** (Engine Oxide terbaru).
  - Komponen aksesibel berbasis **Radix UI** dan ikon dari **Lucide React**.
  - Tema Tampilan (**Light**, **Dark**, dan **System Mode**).
  - Notifikasi toast menggunakan **Sonner**.

- **⚙️ Halaman Pengaturan (Settings)**:
  - Profil Pengguna (Edit Nama & Email).
  - Pengaturan Keamanan (Ubah Password, Kelola 2FA, Kelola Passkeys, Sesi Aktif).
  - Pengaturan Tampilan / Appearance.

- **🛠️ Developer Experience (DX) & Code Quality**:
  - **Larastan / PHPStan**: Analisis statis PHP.
  - **Laravel Pint**: Formatter kode PHP otomatis sesuai standar PSR.
  - **ESLint 9** & **Prettier**: Linter dan formatter kode TypeScript/React.
  - **Laravel Wayfinder**: Routing helper otomatis untuk TypeScript.
  - **Laravel Sail & Pail**: Integrasi Docker dan real-time log viewer.

---

## 📂 Struktur Direktori

```text
SALE/
├── app/
│   ├── Actions/Fortify/       # Logic autentikasi, registrasi, reset password, 2FA
│   ├── Http/
│   │   ├── Controllers/       # Controller aplikasi & settings
│   │   ├── Middleware/        # Middleware Inertia & Autentikasi
│   │   └── Requests/          # Form Request Validation
│   ├── Models/                # Eloquent Models (User, dll.)
│   └── Providers/             # Service Providers (Fortify, AppServiceProvider)
├── config/                    # Konfigurasi Laravel & Fortify
├── database/
│   ├── factories/             # Database model factories
│   ├── migrations/            # Migrasi database (Users, Passkeys, 2FA, dll.)
│   └── seeders/               # Database seeders
├── resources/
│   ├── css/                   # Global CSS & Tailwind configuration
│   └── js/
│       ├── components/        # Komponen UI Reusable (Radix UI / custom)
│       ├── hooks/             # Custom React Hooks
│       ├── layouts/           # Layouts aplikasi (AppLayout, AuthLayout, SettingsLayout)
│       ├── lib/               # Utilities & helper functions
│       ├── pages/             # Halaman Inertia (Auth, Settings, Dashboard, Welcome)
│       └── types/             # TypeScript type definitions
├── routes/
│   ├── console.php            # Artisan console routes
│   ├── settings.php           # Rute pengaturan profil & keamanan
│   └── web.php                # Rute web utama
├── tests/                     # Automated feature & unit tests
├── composer.json              # Dependensi PHP & Composer scripts
├── package.json               # Dependensi Node.js & NPM scripts
└── vite.config.ts             # Konfigurasi Vite & Inertia
```

---

## 📋 Prasyarat Sistem

Pastikan environment Anda memenuhi kebutuhan berikut:

- **PHP**: `^8.3` atau lebih tinggi
- **Composer**: `^2.0`
- **Node.js**: `^20.x` atau `^22.x` (dan **npm** / **pnpm**)
- **Database**: SQLite (default), MySQL, PostgreSQL, atau MariaDB

---

## 🛠️ Panduan Instalasi & Menjalankan Project

### 1. Clone Repositori
```bash
git clone <url-repository>
cd SALE
```

### 2. Setup Otomatis (Rekomendasi)
Project ini menyediakan script setup otomatis:
```bash
composer run setup
```
> Script di atas akan otomatis menginstal package composer, menyalin file `.env`, membuat `APP_KEY`, menjalankan migrasi database, menginstal dependensi npm, dan melakukan build frontend.

---

### 3. Setup Manual (Alternatif)

Jika ingin menjalankan langkah demi langkah:

1. **Instal dependensi backend:**
   ```bash
   composer install
   ```

2. **Konfigurasi Environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Jalankan Migrasi Database:**
   ```bash
   # Buat database SQLite jika belum ada (opsional jika menggunakan SQLite)
   touch database/database.sqlite

   php artisan migrate
   ```

4. **Instal dependensi frontend:**
   ```bash
   npm install
   ```

---

## 💻 Menjalankan Server Pengembangan (Dev Mode)

Jalankan backend Laravel dan frontend Vite secara bersamaan:

```bash
composer run dev
```
Atau jalankan secara terpisah di 2 terminal:
```bash
# Terminal 1 (Laravel backend)
php artisan serve

# Terminal 2 (Vite dev server)
npm run dev
```

Aplikasi dapat diakses melalui browser di: **`http://localhost:8000`**

---

## 🧪 Skrip & Perintah yang Tersedia

### Backend (PHP / Composer)
| Perintah | Deskripsi |
| :--- | :--- |
| `composer run dev` | Menjalankan server Laravel & Vite secara bersamaan |
| `composer run lint` | Merapikan format kode PHP menggunakan Laravel Pint |
| `composer run lint:check` | Memeriksa format kode PHP tanpa mengubah file |
| `composer run types:check`| Menjalankan Larastan / PHPStan static analysis |
| `composer run test` | Menjalankan lint, type check, dan PHPUnit tests |
| `composer run ci:check` | Menjalankan seluruh verifikasi CI (linting, types, format, tests) |

### Frontend (Node / NPM)
| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan Vite dev server dengan HMR |
| `npm run build` | Melakukan compile & bundle aset frontend untuk production |
| `npm run format` | Memformat kode React & CSS menggunakan Prettier |
| `npm run format:check` | Memeriksa formatting file resources dengan Prettier |
| `npm run lint` | Memperbaiki error linter TypeScript & React dengan ESLint |
| `npm run lint:check` | Menjalankan pemeriksaan ESLint |
| `npm run types:check` | Memeriksa type errors TypeScript (`tsc --noEmit`) |

---

## 🛡️ Lisensi

Proyek ini menggunakan lisensi terbuka [MIT License](LICENSE).
