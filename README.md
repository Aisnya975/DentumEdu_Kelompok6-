# DENTUM-EDU

> **Media Pembelajaran Visual-Taktil Artikulasi dan Vokalisasi untuk Anak Tunarungu**

DENTUM-EDU adalah prototipe website inklusif yang dirancang untuk mendukung latihan artikulasi bagi anak tunarungu (D/deaf & hard of hearing) dengan pendekatan multi-modal visual-taktil. Sistem mengintegrasikan materi vokal, konsonan bilabial, kata sederhana, bahasa isyarat (BISINDO & SIBI), visualisasi gerakan mulut SVG (depan dan penampang lateral traktus vokal), simulasi sensor vokalisasi berbasis Web Audio API, serta simulasi vibrasi haptik.

---

## ⚠️ Pernyataan Etika & Batasan Sistem

1. **Bukan Pengganti Terapis/Guru**: DENTUM-EDU adalah media pendukung latihan mandiri di rumah atau sekolah, bukan pengganti guru SLB, orang tua, atau terapis wicara profesional.
2. **Deteksi Keberadaan Suara, Bukan Ketepatan Fonem**: Sensor vokalisasi mengukur amplitudo hembusan udara (RMS/dB) dan durasi suara secara real-time. Sistem **tidak mengklaim menilai kebenaran fonetik fonem**. Penilaian ketepatan tetap memerlukan bimbingan guru dan orang tua.
3. **Privasi 100% di Perangkat**: Seluruh pemrosesan sinyal mikrofon dilakukan secara lokal di peramban pengguna melalui Web Audio API tanpa pengiriman data rekaman ke server luar.

---

## 🚀 Fitur Utama

- **Penyajian Materi Terpadu**: Vokal (A, I, U, E, O), konsonan bilabial (B, P, M), dan kata sederhana (Mama, Papa, Bola, Buku, Makan, Minum).
- **4 Panel Saling Melengkapi**:
  1. *Panel Bahasa Isyarat*: Opsi BISINDO dan SIBI dengan kontrol kecepatan putar.
  2. *Panel Visualisasi Mulut*: Animasi SVG tampak depan (bibir) & penampang samping (gerakan rahang, lidah, serta getaran pita suara).
  3. *Panel Cara Pengucapan*: Bahasa sederhana tanpa istilah fonetik audio yang memerlukan pendengaran.
  4. *Panel Contoh Kata & Benda*: Teks kontras tinggi dan tips taktil bagi pendamping.
- **Sensor Vokalisasi Real-Time**:
  - Web Audio API (`AnalyserNode`) menghitung level suara 0–100%.
  - Kalibrasi kebisingan latar (noise floor) 2 detik.
  - Mode Simulasi Manual (tekan-dan-tahan) untuk demo tanpa mikrofon.
- **Umpan Balik Visual & Haptik**:
  - Pengukur suara melingkar (Voice Meter) dengan status multi-modal (Ikon + Teks + Warna).
  - Visualizer gelombang suara (Canvas Waveform).
  - Pola getaran `navigator.vibrate` (awal, ritmis, sukses, peringatan) dengan fallback getaran visual di layar (iOS / Desktop).
- **Progres & Pencapaian**: Bintang per materi, lencana prestasi, penyimpanan `localStorage`, dan ekspor data JSON/teks.
- **Panel Guru & Pengaturan**: Proteksi PIN ringan, panduan pendampingan taktil, penyesuaian sensitivitas, dan opsi aksesibilitas (ukuran teks, kontras tinggi, reduce motion).
- **Halaman Uji Fitur (`/uji`)**: Diagnostic suite untuk memverifikasi dukungan Web Audio, mikrofon, getaran, serta checklist pengujian QA interaktif.

---

## 🛠️ Instalasi & Menjalankan Proyek

### Prasyarat
- Node.js versi 18 atau lebih baru
- npm atau pnpm/yarn

### 1. Kloning & Masuk ke Folder Proyek
```bash
git clone <repository-url>
cd dentum-edu
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban di `http://localhost:3000` (atau port yang tertera di terminal).

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build akan tersimpan di direktori `dist/` dan siap dideploy.

---

## 📂 Cara Mengganti Aset Isyarat & Mulut

Semua aset media fisik diatur agar mudah diganti oleh anggota tim bagian bahasa/linguistik:

1. **Aset Bahasa Isyarat**:
   - Letakkan video (`.mp4`) atau gambar (`.png`) di:
     - `public/media/isyarat/sibi/<id>.mp4` (untuk SIBI)
     - `public/media/isyarat/bisindo/<id>.mp4` (untuk BISINDO)
   - *Catatan*: Jika file fisik belum dimasukkan, komponen `SignPanel.tsx` secara otomatis menampilkan ilustrasi vektor interaktif SVG.
2. **Aset Contoh Benda**:
   - Letakkan gambar ilustrasi benda di `public/media/contoh/<nama_benda>.png`.
3. **Data & Skema Materi**:
   - Konfigurasi teks dan tahapan pengucapan tersimpan rapi di `src/data/materi.json`.

---

## 📱 Catatan Batasan Teknis & Cara Menguji di HP

1. **Vibration API pada iOS**:
   - Apple WebKit (iOS Safari) saat ini **tidak mendukung** `navigator.vibrate`.
   - DENTUM-EDU secara otomatis mengaktifkan **Fallback Haptik Visual** (animasi riak gelombang taktil pada ikon telapak tangan dan layar) saat dijalankan di perangkat Apple atau browser desktop.
   - Getaran fisik penuh dapat dirasakan di **Android Chrome / Edge / Firefox**.
2. **Izin Mikrofon & HTTPS**:
   - Browser modern membatasi akses mikrofon (`getUserMedia`) hanya pada konteks aman (**HTTPS** atau **localhost**).
   - Jika diakses melalui HTTP biasa selain localhost, mikrofon akan diblokir browser. Gunakan **Mode Simulasi Manual** atau deploy ke hosting ber-HTTPS.
3. **Cara Menguji Langsung di HP Android**:
   - Jika di jaringan Wi-Fi yang sama: jalankan `npm run dev -- --host` lalu buka IP komputer di HP (misal `https://<ip-lokal>:3000`).
   - Atau deploy gratis ke Vercel/Netlify dengan HTTPS aktif otomatis.

---

## 🌐 Saran Deploy Gratis (Vercel & Netlify)

### Deploy ke Vercel:
1. Pasang Vercel CLI: `npm i -g vercel`
2. Jalankan: `vercel`
3. Konfigurasi build otomatis mendeteksi Vite (`npm run build`, output: `dist`).

### Deploy ke Netlify:
1. Seret folder `dist/` ke dashboard Netlify Drop, atau sambungkan dengan repositori GitHub.
2. Tambahkan file `public/_redirects` berisi `/*    /index.html   200` agar URL routing browser bekerja saat dimuat ulang.

---

## 🧪 Verifikasi & QA

Kunjungi rute khusus pengujian:
```
/uji
```
Halaman ini menyajikan pemeriksaan real-time API mikrofon, Web Audio, Vibration API, serta daftar periksa kelayakan rilis.
