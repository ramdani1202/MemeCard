# Kartu Ajaib 🎴

Game koleksi kartu berbasis PWA (Progressive Web App) — bisa diinstal dari Chrome
seperti aplikasi native, dan otomatis update setiap kamu push perubahan ke GitHub.

## Alur game (sesuai desain)

1. **Buat akun** — cukup isi username
2. **Beranda** — tombol untuk ambil 4 kartu gratis pertama
3. **Buka paket** — 4 kartu tertutup ditampilkan, disentuh → kartu berputar (flip 3D)
4. **Kartu terpilih** — membesar dan terbuka secara acak, menampilkan rarity & sparkle
5. **Koleksi** — semua kartu yang sudah didapat tersimpan dan bisa dilihat lagi

## Menjalankan di komputer kamu

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Deploy ke GitHub Pages (supaya bisa diinstal & auto-update)

### 1. Setup awal (sekali saja)

1. Buat repo baru di GitHub, misalnya bernama `kartu-ajaib`
2. Buka `vite.config.js`, pastikan baris ini sesuai nama repo kamu:
   ```js
   const BASE_PATH = '/kartu-ajaib/'
   ```
   Ganti `kartu-ajaib` dengan nama repo kamu yang sebenarnya.
3. Push semua file project ini ke repo tersebut:
   ```bash
   git init
   git add .
   git commit -m "Setup awal Kartu Ajaib"
   git branch -M main
   git remote add origin https://github.com/USERNAME-KAMU/kartu-ajaib.git
   git push -u origin main
   ```
4. Di GitHub, buka repo → **Settings** → **Pages** → bagian "Build and deployment" →
   pilih Source: **GitHub Actions**
5. Tunggu 1-2 menit, cek tab **Actions** di repo untuk lihat progress deploy
6. Setelah selesai, app kamu bisa diakses di:
   `https://USERNAME-KAMU.github.io/kartu-ajaib/`

### 2. Cara install ke HP/Chrome

1. Buka link di atas lewat Chrome (Android) atau Chrome/Edge (desktop)
2. Chrome akan menampilkan opsi "Install app" / "Tambah ke layar Utama"
   (atau klik ikon install di address bar pada desktop)
3. App akan muncul seperti aplikasi native, lengkap dengan ikon sendiri

### 3. Cara kerja auto-update (PENTING — ini yang kamu minta)

Setiap kali kamu:
```bash
git add .
git commit -m "update gambar kartu"
git push
```

GitHub Actions otomatis build ulang dan deploy versi baru ke GitHub Pages
(lihat file `.github/workflows/deploy.yml`).

Di sisi user yang sudah install app:
- Service worker (`vite-plugin-pwa` dengan `registerType: 'autoUpdate'`) akan
  **otomatis mengecek versi baru** setiap kali app dibuka/difokuskan
- Kalau ada versi baru, langsung diterapkan tanpa perlu klik apa pun
- User **tidak perlu** uninstall app atau clear cache Chrome secara manual
- Cukup tutup app lalu buka lagi (atau app akan refresh sendiri di background)

Ini dikonfigurasi di dua tempat:
- `vite.config.js` → `registerType: 'autoUpdate'`, `skipWaiting: true`, `clientsClaim: true`
- `src/main.jsx` → `registerSW()` dengan `immediate: true` dan auto-apply saat `onNeedRefresh`

## Mengganti gambar kartu dengan gambar asli kamu

Saat ini kartu memakai SVG + emoji sebagai placeholder (sesuai catatan "sementara
pake svg aja" di desain awal). Untuk ganti dengan gambar asli:

1. Upload gambar kartu kamu ke folder `public/kartu/` (misal: `public/kartu/naga-pelangi.png`)
2. Buka `src/data/kartu.js`, tambahkan field `gambar` di tiap entri:
   ```js
   { id: 'k07', nama: 'Naga Pelangi', rarity: 'LEGENDA', gambar: '/kartu-ajaib/kartu/naga-pelangi.png' }
   ```
3. Buka `src/components/Kartu.jsx`, di komponen `DepanKartu`, ganti elemen
   `<text>{kartu.emoji}</text>` dengan `<image href={kartu.gambar} .../>` — saya bisa
   bantu sesuaikan bagian ini begitu gambar kamu siap.

## Struktur project

```
src/
  components/
    Kartu.jsx           → komponen kartu SVG dengan animasi flip 3D
    LayarAkun.jsx        → layar buat akun
    LayarBeranda.jsx     → layar utama + tombol ambil paket
    LayarBukaPaket.jsx   → layar pilih & buka kartu
    LayarKoleksi.jsx     → layar lihat semua kartu terkumpul
    Dekorasi.jsx         → elemen SVG dekoratif (sparkle, bintang, awan)
  data/
    kartu.js             → data kartu, logika rarity, & penyimpanan lokal
  App.jsx                 → mengatur alur antar layar
vite.config.js             → konfigurasi PWA & auto-update
.github/workflows/deploy.yml → auto-deploy saat push ke GitHub
```

## Kustomisasi lanjutan

- **Tambah/ubah kartu**: edit `DAFTAR_KARTU` di `src/data/kartu.js`
- **Ubah peluang rarity**: edit angka `berat` di `RARITAS` (`src/data/kartu.js`)
- **Ubah warna tema**: edit variabel CSS di `src/index.css` (bagian `:root`)
- **Jumlah kartu per paket**: ubah di `handleBukaPaket` dalam `src/App.jsx`
