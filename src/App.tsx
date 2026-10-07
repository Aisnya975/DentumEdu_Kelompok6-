import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Materi } from './pages/Materi';
import { Belajar } from './pages/Belajar';
import { Latihan } from './pages/Latihan';
import { Progres } from './pages/Progres';
import { Guru } from './pages/Guru';
import { Pengaturan } from './pages/Pengaturan';
import { Uji } from './pages/Uji';
import { Tentang } from './pages/Tentang';
import { BookOpen, Sparkles, HeartHandshake, ShieldCheck, Activity } from 'lucide-react';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/materi" element={<Materi />} />
            <Route path="/belajar/:id" element={<Belajar />} />
            <Route path="/latihan/:id" element={<Latihan />} />
            <Route path="/progres" element={<Progres />} />
            <Route path="/guru" element={<Guru />} />
            <Route path="/pengaturan" element={<Pengaturan />} />
            <Route path="/uji" element={<Uji />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* ========================================================
            FOOTER BERWARNA TEAL SESUAI REFERENSI GAMBAR WONDERLEARN
        ======================================================== */}
        <footer className="bg-gradient-to-b from-[#0F766E] to-[#115E59] text-white pt-12 pb-8 border-t-4 border-teal-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-teal-600/60">
              {/* Kolom 1: Brand & Tagline */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-300 to-teal-200 text-teal-950 flex items-center justify-center font-black shadow-md">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display text-2xl font-bold tracking-tight text-white block">
                      DENTUM-EDU
                    </span>
                    <span className="text-xs text-teal-200 font-medium">
                      Media Inklusif Artikulasi Visual-Taktil
                    </span>
                  </div>
                </div>
                <p className="text-xs text-teal-100 max-w-sm leading-relaxed mt-2">
                  Mendampingi anak tunarungu mengeksplorasi potensi bunyi dan vokalisasi melalui keajaiban visualisasi mulut, bahasa isyarat, dan getaran haptik.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-teal-200">
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>100% Pemrosesan Lokal di Browser Tanpa Rekaman Server</span>
                </div>
              </div>

              {/* Kolom 2: Tautan Menu */}
              <div>
                <h4 className="font-display text-sm font-bold text-white mb-3 tracking-wide">
                  Menu Utama
                </h4>
                <ul className="space-y-2 text-xs text-teal-100 font-medium">
                  <li><Link to="/" className="hover:text-amber-300 transition-colors">Beranda</Link></li>
                  <li><Link to="/materi" className="hover:text-amber-300 transition-colors">Daftar Modul Belajar</Link></li>
                  <li><Link to="/latihan/vokal-a" className="hover:text-amber-300 transition-colors">Sensor Vokalisasi</Link></li>
                  <li><Link to="/progres" className="hover:text-amber-300 transition-colors">Buku Catatan Progres</Link></li>
                </ul>
              </div>

              {/* Kolom 3: Untuk Guru & Ortu */}
              <div>
                <h4 className="font-display text-sm font-bold text-white mb-3 tracking-wide">
                  Guru & Orang Tua
                </h4>
                <ul className="space-y-2 text-xs text-teal-100 font-medium">
                  <li><Link to="/guru" className="hover:text-amber-300 transition-colors">Panduan Pendampingan</Link></li>
                  <li><Link to="/pengaturan" className="hover:text-amber-300 transition-colors">Pengaturan Sensitivitas</Link></li>
                  <li><Link to="/tentang" className="hover:text-amber-300 transition-colors">Batasan & Etika Sistem</Link></li>
                  <li><Link to="/uji" className="hover:text-amber-300 transition-colors">Uji Perangkat (/uji)</Link></li>
                </ul>
              </div>

              {/* Kolom 4: Kotak Catatan Pembelajaran */}
              <div>
                <h4 className="font-display text-sm font-bold text-white mb-3 tracking-wide">
                  Metode 3 Langkah
                </h4>
                <div className="bg-teal-800/80 p-3.5 rounded-2xl border border-teal-600/50 text-xs text-teal-100 space-y-1.5">
                  <div><strong>1. LIHAT:</strong> Cermati animasi bibir & isyarat tangan.</div>
                  <div><strong>2. TIRU:</strong> Posisikan bibir & lidah rileks.</div>
                  <div><strong>3. RASAKAN:</strong> Hembuskan suara & rasakan getaran.</div>
                </div>
              </div>
            </div>

            {/* Bottom Bar Footer */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-200">
              <p>© 2026 DENTUM-EDU. Prototipe Media Pembelajaran Ramah Anak Tunarungu.</p>
              <div className="flex items-center gap-4 text-xs">
                <Link to="/tentang" className="hover:text-white transition-colors">Tentang</Link>
                <span>·</span>
                <Link to="/pengaturan" className="hover:text-white transition-colors">Aksesibilitas</Link>
                <span>·</span>
                <Link to="/uji" className="hover:text-white transition-colors">Diagnostik QA</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
