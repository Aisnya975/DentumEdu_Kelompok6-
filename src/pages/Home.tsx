import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Smartphone,
  BookOpen,
  Volume2,
  Mic,
  Smile,
  Hand,
  CheckCircle2,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Flame,
  Award,
  Layers,
  Heart,
  HelpCircle,
} from 'lucide-react';

import heroImg from '../assets/images/hero_dentum_magical_1791368383363.jpg';
import bunnyImg from '../assets/images/mascot_bunny_guide_1791368400698.jpg';

export const Home: React.FC = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const storyCards = [
    {
      id: 'vokal-a',
      title: 'Petualangan Huruf A',
      sub: 'Apel Manis Berwarna Merah',
      tag: 'Vokal Terbuka Lebar',
      tagColor: 'bg-rose-50 text-rose-700',
      bgColor: 'from-rose-500/80 to-amber-500/80',
      icon: '🍎',
      desc: 'Buka mulutmu selebar-lebarnya dan hembuskan suara dari leher hangatmu!',
    },
    {
      id: 'vokal-i',
      title: 'Kisah Huruf I & Ikan Ceria',
      sub: 'Ikan Berenang di Air Jernih',
      tag: 'Senyum Gigi Rapat',
      tagColor: 'bg-sky-50 text-sky-700',
      bgColor: 'from-sky-500/80 to-blue-600/80',
      icon: '🐟',
      desc: 'Tarik sudut bibir ke samping seperti tersenyum manis kepada temanmu!',
    },
    {
      id: 'konsonan-b',
      title: 'Letupan Balon Huruf B',
      sub: 'Bola Bundar Melompat Tinggi',
      tag: 'Katup Bibir Bilabial',
      tagColor: 'bg-teal-50 text-teal-700',
      bgColor: 'from-teal-500/80 to-emerald-600/80',
      icon: '🎈',
      desc: 'Rapatkan kedua bibir rapat-rapat, lalu lepaskan dengan letupan bergetar!',
    },
    {
      id: 'kata-mama',
      title: 'Kasih Sayang Kata Mama',
      sub: 'Pelukan Hangat Penuh Cinta',
      tag: 'Rangkaian Dua Ketukan',
      tagColor: 'bg-purple-50 text-purple-700',
      bgColor: 'from-purple-500/80 to-pink-500/80',
      icon: '💖',
      desc: 'Satukan bibir tertutup (M) lalu buka lebar (A) dalam dua irama lembut.',
    },
  ];

  const handlePrevStory = () => {
    setActiveStoryIndex(prev => (prev > 0 ? prev - 1 : storyCards.length - 1));
  };

  const handleNextStory = () => {
    setActiveStoryIndex(prev => (prev < storyCards.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F0FDF4]/30 overflow-x-hidden">
      {/* ========================================================
          1. HERO SECTION (SESUAI REFERENSI MAGICAL WONDERLEARN)
      ======================================================== */}
      <section className="relative pt-8 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-[#E0F2FE] via-[#F0FDF4]/60 to-white">
        {/* Dekorasi Awan Halus Latar Belakang */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Header Title Bubbly & Friendly seperti "Let Curiosity Lead the Way" */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-xs border border-teal-200/80 rounded-full text-xs font-extrabold text-teal-800 shadow-xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Media Pembelajaran Inklusif Anak Tunarungu</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-teal-900 tracking-tight leading-[1.1] text-balance">
              Sentuh, Rasakan, & <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-700 via-sky-600 to-amber-500 bg-clip-text text-transparent">
                Bunyikan Suaramu!
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
              Dunia petualangan visual-taktil yang menyenangkan untuk melatih artikulasi wicara melalui animasi bentuk mulut, bahasa isyarat, dan getaran nyata.
            </p>

            {/* Tombol Utama Emas Melingkar */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/materi"
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-98 text-slate-900 font-display font-extrabold text-base rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2.5"
              >
                <span>Mulai Petualangan Suara</span>
                <Sparkles className="w-4 h-4 fill-slate-900 text-slate-900" />
              </Link>
            </div>

            {/* Gambar Hero Fantasi Edukasi (Seperti Rumah Pohon & Pulau Terapung di Referensi) */}
            <div className="mt-10 w-full max-w-5xl rounded-[36px] overflow-hidden border-4 border-white shadow-2xl bg-teal-50 relative group">
              <img
                src={heroImg}
                alt="Petualangan Belajar Artikulasi DENTUM-EDU"
                className="w-full h-auto object-cover aspect-16/9 group-hover:scale-101 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end justify-between p-6 sm:p-8 text-left text-white">
                <div className="max-w-xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                    Pendekatan Multi-Modal Ramah Anak
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold">
                    Lihat Bentuk Bibir · Tiru Isyarat · Rasakan Getarannya
                  </h3>
                </div>
                <Link
                  to="/materi"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-xs font-bold text-white transition-colors"
                >
                  <span>Buka Modul</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Kartu Floating Putih Memanjang Bawah Hero (Sesuai Referensi) */}
            <div className="mt-6 w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-full border border-teal-100 shadow-md py-3 px-6 flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">🛡️</span>
                <span>Bebas Iklan & Aman</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <span className="text-amber-500">⭐</span>
                <span>Isyarat BISINDO & SIBI</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <span className="text-sky-600">👄</span>
                <span>Animasi Mulut SVG</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <span className="text-rose-500">📳</span>
                <span>Sensor & Getaran Taktil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. EXPLORE BY TOPIC (JELAJAHI BERDASARKAN KATEGORI)
          Dengan Maskot Kelinci & Papan Petunjuk Kayu
      ======================================================== */}
      <section className="py-16 bg-[#F8FAFC] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-display text-sm font-bold text-amber-600 uppercase tracking-wider flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Jelajahi Materi <Sparkles className="w-3.5 h-3.5" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mt-1">
              Pilih Ruang Belajarmu
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Maskot Kelinci Lucu Membaca Buku + Papan Petunjuk Kayu (Persis Komposisi Referensi) */}
            <div className="lg:col-span-4 flex items-center justify-center gap-4">
              <div className="w-40 sm:w-48 rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-amber-50/50 p-2">
                <img
                  src={bunnyImg}
                  alt="Maskot Kelinci Cerdas DENTUM-EDU"
                  className="w-full h-auto object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Papan Arah Kayu Bertingkat */}
              <div className="flex flex-col gap-2">
                <div className="bg-[#B45309] text-amber-100 font-display font-extrabold text-xs px-4 py-2 rounded-xl shadow-md border-b-4 border-[#78350F] transform -rotate-2">
                  1. LIHAT 👀
                </div>
                <div className="bg-[#D97706] text-white font-display font-extrabold text-xs px-4 py-2 rounded-xl shadow-md border-b-4 border-[#92400E] transform rotate-1">
                  2. TIRU 👄
                </div>
                <div className="bg-[#0D9488] text-teal-100 font-display font-extrabold text-xs px-4 py-2 rounded-xl shadow-md border-b-4 border-[#115E59] transform -rotate-1">
                  3. RASAKAN 📳
                </div>
              </div>
            </div>

            {/* Grid 6 Kartu Kategori Kotak Pastel Glossy (Seperti Math Magic, Science Lab, Reading Land) */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {/* Kategori 1: Vokal */}
              <Link
                to="/materi"
                className="group flex flex-col items-center text-center p-5 rounded-3xl bg-amber-100/70 hover:bg-amber-100 border-2 border-amber-200 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
                  🗣️
                </div>
                <span className="font-display font-bold text-sm text-amber-950">
                  Vokal A, I, U, E, O
                </span>
                <span className="text-[11px] text-amber-800 font-medium mt-0.5">
                  5 Bunyi Dasar
                </span>
              </Link>

              {/* Kategori 2: Bilabial */}
              <Link
                to="/materi"
                className="group flex flex-col items-center text-center p-5 rounded-3xl bg-sky-100/70 hover:bg-sky-100 border-2 border-sky-200 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
                  👄
                </div>
                <span className="font-display font-bold text-sm text-sky-950">
                  Bilabial B, P, M
                </span>
                <span className="text-[11px] text-sky-800 font-medium mt-0.5">
                  Gerakan Bibir
                </span>
              </Link>

              {/* Kategori 3: Kata Sederhana */}
              <Link
                to="/materi"
                className="group flex flex-col items-center text-center p-5 rounded-3xl bg-teal-100/70 hover:bg-teal-100 border-2 border-teal-200 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
                  📖
                </div>
                <span className="font-display font-bold text-sm text-teal-950">
                  Kata Sederhana
                </span>
                <span className="text-[11px] text-teal-800 font-medium mt-0.5">
                  Mama, Bola, Buku
                </span>
              </Link>

              {/* Kategori 4: Latihan Sensor */}
              <Link
                to="/latihan/vokal-a"
                className="group flex flex-col items-center text-center p-5 rounded-3xl bg-pink-100/70 hover:bg-pink-100 border-2 border-pink-200 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
                  🎙️
                </div>
                <span className="font-display font-bold text-sm text-pink-950">
                  Sensor Vokalisasi
                </span>
                <span className="text-[11px] text-pink-800 font-medium mt-0.5">
                  Uji Suara Mikrofon
                </span>
              </Link>

              {/* Kategori 5: Bahasa Isyarat */}
              <Link
                to="/belajar/vokal-a"
                className="group flex flex-col items-center text-center p-5 rounded-3xl bg-purple-100/70 hover:bg-purple-100 border-2 border-purple-200 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
                  🤟
                </div>
                <span className="font-display font-bold text-sm text-purple-950">
                  Bahasa Isyarat
                </span>
                <span className="text-[11px] text-purple-800 font-medium mt-0.5">
                  BISINDO & SIBI
                </span>
              </Link>

              {/* Kategori 6: Haptik & Getaran */}
              <Link
                to="/uji"
                className="group flex flex-col items-center text-center p-5 rounded-3xl bg-orange-100/70 hover:bg-orange-100 border-2 border-orange-200 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl mb-3 group-hover:scale-110 transition-transform">
                  📳
                </div>
                <span className="font-display font-bold text-sm text-orange-950">
                  Simulasi Haptik
                </span>
                <span className="text-[11px] text-orange-800 font-medium mt-0.5">
                  Getaran di Ponsel
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. MAGICAL STORIES (MATERI UNGGULAN & CERITA BUNYI)
          Carousel Kartu Ilustrasi dengan Panah Biru Lingkaran
      ======================================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-display text-sm font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Eksplorasi Bunyi <Sparkles className="w-3.5 h-3.5" />
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                Materi Unggulan & Cerita Bunyi
              </h2>
            </div>

            <Link
              to="/materi"
              className="hidden sm:inline-flex px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-full text-xs transition-colors border border-sky-200"
            >
              Lihat Semua Modul (14)
            </Link>
          </div>

          {/* Grid Kartu Ilustrasi (4 Kartu Cerita) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {storyCards.map(story => (
              <Link
                key={story.id}
                to={`/belajar/${story.id}`}
                className="group flex flex-col justify-between rounded-3xl bg-white border border-slate-200 hover:border-teal-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Visual Header Kartu Berwarna */}
                <div className={`h-40 bg-gradient-to-br ${story.bgColor} flex items-center justify-center relative p-4 text-white`}>
                  <div className="text-6xl drop-shadow-md group-hover:scale-115 transition-transform duration-300">
                    {story.icon}
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-900 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs">
                    {story.title}
                  </div>
                </div>

                {/* Konten Teks Kartu */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {story.sub}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {story.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${story.tagColor}`}>
                      {story.tag}
                    </span>
                    <span className="text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Buka ➔
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigasi Panah Carousel Lingkaran Biru (Sesuai Referensi) */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrevStory}
              className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-md transition-colors"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3].map(dot => (
                <span
                  key={dot}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    dot === activeStoryIndex ? 'bg-sky-500 w-6' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNextStory}
              className="w-10 h-10 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center shadow-md transition-colors"
              aria-label="Berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. PLAY & LEARN (LATIHAN & PERMAINAN INTERAKTIF)
          5 Kartu dengan Tombol Putar Hijau Bulat di Bagian Bawah
      ======================================================== */}
      <section className="py-16 bg-[#F0FDF4]/50 border-t border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-display text-sm font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Latihan Mandiri <Sparkles className="w-3.5 h-3.5" />
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                Latihan Sambil Bermain
              </h2>
            </div>

            <Link
              to="/materi"
              className="hidden sm:inline-flex px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold rounded-full text-xs transition-colors"
            >
              Lihat Semua Modul Latihan
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Game Card 1 */}
            <Link
              to="/belajar/vokal-a"
              className="group flex flex-col items-center justify-between p-4 rounded-3xl bg-white border-2 border-emerald-100 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all text-center"
            >
              <div className="w-full aspect-square rounded-2xl bg-amber-50 flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
                🪞
              </div>
              <span className="font-display font-bold text-xs text-slate-900">
                Cermin Bentuk Bibir
              </span>
              <div className="mt-3 w-8 h-8 rounded-full bg-emerald-500 group-hover:bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>
            </Link>

            {/* Game Card 2 */}
            <Link
              to="/latihan/konsonan-p"
              className="group flex flex-col items-center justify-between p-4 rounded-3xl bg-white border-2 border-emerald-100 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all text-center"
            >
              <div className="w-full aspect-square rounded-2xl bg-sky-50 flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
                🎈
              </div>
              <span className="font-display font-bold text-xs text-slate-900">
                Tiupan Angin Huruf P
              </span>
              <div className="mt-3 w-8 h-8 rounded-full bg-emerald-500 group-hover:bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>
            </Link>

            {/* Game Card 3 */}
            <Link
              to="/belajar/konsonan-m"
              className="group flex flex-col items-center justify-between p-4 rounded-3xl bg-white border-2 border-emerald-100 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all text-center"
            >
              <div className="w-full aspect-square rounded-2xl bg-yellow-50 flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
                🐝
              </div>
              <span className="font-display font-bold text-xs text-slate-900">
                Dengungan Huruf M
              </span>
              <div className="mt-3 w-8 h-8 rounded-full bg-emerald-500 group-hover:bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>
            </Link>

            {/* Game Card 4 */}
            <Link
              to="/latihan/vokal-a"
              className="group flex flex-col items-center justify-between p-4 rounded-3xl bg-white border-2 border-emerald-100 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all text-center"
            >
              <div className="w-full aspect-square rounded-2xl bg-teal-50 flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
                🎙️
              </div>
              <span className="font-display font-bold text-xs text-slate-900">
                Lab Sensor Vokalisasi
              </span>
              <div className="mt-3 w-8 h-8 rounded-full bg-emerald-500 group-hover:bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>
            </Link>

            {/* Game Card 5 */}
            <Link
              to="/progres"
              className="group flex flex-col items-center justify-between p-4 rounded-3xl bg-white border-2 border-emerald-100 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all text-center"
            >
              <div className="w-full aspect-square rounded-2xl bg-purple-50 flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
                ⭐
              </div>
              <span className="font-display font-bold text-xs text-slate-900">
                Kartu Bintang & Lencana
              </span>
              <div className="mt-3 w-8 h-8 rounded-full bg-emerald-500 group-hover:bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. FEATURED ADVENTURES (BANNER PANGGUNG SENSOR VOKALISASI)
          Banner Mengambang Biru Cerah (Persis "Island of Imagination")
      ======================================================== */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-gradient-to-r from-sky-100 via-teal-100 to-amber-100 p-8 sm:p-12 border-2 border-sky-200 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Dekorasi Awan di Sudut */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/40 rounded-full blur-xl pointer-events-none" />

            <div className="flex-1 text-left z-10">
              <span className="font-display text-xs font-bold text-sky-800 uppercase tracking-wider block mb-1">
                ✦ Petualangan Utama Sensor Vokalisasi ✦
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Pulau Suara & Getaran Ajaib
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 max-w-xl leading-relaxed">
                Ajak anak mengeksplorasi hembusan suaranya ke mikrofon perangkat! Sensor akan membaca kekuatan nada, memancarkan animasi riak gelombang warna, dan mengalirkan getaran ritmis di telapak tangan.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/latihan/vokal-a"
                  className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-display font-extrabold text-sm rounded-full shadow-md flex items-center gap-2 transition-transform hover:scale-102"
                >
                  <span>Mulai Petualangan Sensor</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/uji"
                  className="px-5 py-3.5 bg-white/80 hover:bg-white text-slate-700 font-bold text-xs rounded-full border border-slate-300 transition-colors"
                >
                  Uji Dukungan Perangkat (/uji)
                </Link>
              </div>
            </div>

            {/* Ilustrasi Kotak Sensor Visualizer Mini */}
            <div className="w-full lg:w-80 bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-sky-200 shadow-md text-center shrink-0 z-10">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Simulasi Sensor Real-Time
              </div>
              <div className="w-24 h-24 mx-auto rounded-full bg-teal-50 border-4 border-teal-500 flex flex-col items-center justify-center mb-3">
                <Mic className="w-7 h-7 text-teal-600 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-teal-800 mt-0.5">READY</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                Sistem mendeteksi keberadaan dan hembusan suara secara visual tanpa ketergantungan audio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. LOVED BY PARENTS & TEACHERS (TESTIMONI PENDAMPING)
      ======================================================== */}
      <section className="py-16 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="font-display text-sm font-bold text-amber-600 uppercase tracking-wider flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Pendampingan Kasih <Sparkles className="w-3.5 h-3.5" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mt-1">
              Disukai Guru & Orang Tua
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimoni 1 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "Anak saya tunarungu sangat senang melihat animasi bentuk bibir dan merasakan getaran di ponsel saat membunyikan vokal. Rasa percaya dirinya bertambah!"
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">Ibu Sarah Melani</div>
                  <div className="text-[10px] text-slate-400">Orang Tua Murid SLB-B</div>
                </div>
                <div className="flex text-amber-400 text-xs">★★★★★</div>
              </div>
            </div>

            {/* Testimoni 2 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "Sangat terbantu dengan panel BISINDO dan penampang vokal traktus. Penjelasan sederhana memudahkan saya saat mendampingi sesi artikulasi di kelas."
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">Pak Daniel R.</div>
                  <div className="text-[10px] text-slate-400">Guru Pendidikan Khusus</div>
                </div>
                <div className="flex text-amber-400 text-xs">★★★★★</div>
              </div>
            </div>

            {/* Testimoni 3 */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "Pendekatan visual-taktil ini murni ramah privasi karena suara tidak dikirim ke internet. Fitur simulasi manual sangat membantu saat murid di rumah tanpa mic."
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-slate-900">Ibu Priya S.</div>
                  <div className="text-[10px] text-slate-400">Terapis Wicara Mitra</div>
                </div>
                <div className="flex text-amber-400 text-xs">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. LEARNING ON THE GO (RESPONSIF MOBILE & HAPTIK)
      ======================================================== */}
      <section className="py-14 bg-gradient-to-r from-teal-50 via-sky-50 to-amber-50 border-t border-teal-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 mx-auto rounded-3xl bg-amber-400 text-slate-900 flex items-center justify-center text-2xl shadow-md mb-4">
            📱
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
            Dapat Diakses Langsung di Ponsel & Tablet
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Buka website DENTUM-EDU melalui peramban Chrome di smartphone Android untuk merasakan getaran haptik fisik nyata di telapak tangan anak.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/guru"
              className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-full text-xs shadow-xs transition-colors"
            >
              Baca Panduan Guru & Ortu
            </Link>
            <Link
              to="/pengaturan"
              className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold rounded-full text-xs transition-colors"
            >
              Atur Sensitivitas & Getaran
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
