import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Mic,
  MessageSquare,
  Sparkles,
  Info,
  CheckCircle,
  HelpCircle,
  Hand,
  Eye,
} from 'lucide-react';
import rawMateri from '../data/materi.json';
import { MateriItem } from '../types';
import { MouthAnimation } from '../components/MouthAnimation';
import { SignPanel } from '../components/SignPanel';
import { useSettings } from '../hooks/useSettings';
import { useProgress } from '../hooks/useProgress';

const materiList = rawMateri as MateriItem[];

export const Belajar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { settings, updateSetting } = useSettings();
  const { isUnlocked } = useProgress();

  const currentIndex = materiList.findIndex(m => m.id === id);
  const currentItem = currentIndex !== -1 ? materiList[currentIndex] : materiList[0];

  const prevItem = currentIndex > 0 ? materiList[currentIndex - 1] : null;
  const nextItem = currentIndex < materiList.length - 1 ? materiList[currentIndex + 1] : null;

  const [activeSignSystem, setActiveSignSystem] = useState(settings.sistemIsyarat);

  const handleSystemChange = (sys: 'sibi' | 'bisindo') => {
    setActiveSignSystem(sys);
    updateSetting('sistemIsyarat', sys);
  };

  const goToExercise = () => {
    navigate(`/latihan/${currentItem.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Bar Navigasi Atas Antarmateri */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-teal-100">
        <Link
          to="/materi"
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors bg-white px-4 py-2 rounded-full border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Katalog Materi</span>
        </Link>

        {/* Indikator Urutan */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full">
            Modul {currentItem.urutan} dari {materiList.length}
          </span>
          <div className="flex items-center gap-1.5">
            {prevItem ? (
              <button
                type="button"
                onClick={() => navigate(`/belajar/${prevItem.id}`)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200 shadow-2xs"
                title={`Sebelumnya: ${prevItem.label}`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : null}

            {nextItem ? (
              <button
                type="button"
                onClick={() => navigate(`/belajar/${nextItem.id}`)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200 shadow-2xs"
                title={`Berikutnya: ${nextItem.label}`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Header Judul Materi dengan Desain Ceria */}
      <div className="bg-gradient-to-r from-teal-50 via-sky-50 to-amber-50 rounded-[32px] p-6 sm:p-8 border-2 border-white shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-teal-600 to-sky-400 text-white flex items-center justify-center font-display font-extrabold text-3xl sm:text-4xl shadow-lg shrink-0">
            {currentItem.label}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-teal-800 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Modul Artikulasi · {currentItem.kategori}</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Belajar Bunyi "{currentItem.label}"
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Contoh kata pengenalan: <strong className="text-teal-900">{currentItem.contoh.kata}</strong> ({currentItem.contoh.arti})
            </p>
          </div>
        </div>

        {/* Tombol Cepat Latihan */}
        <button
          type="button"
          onClick={goToExercise}
          className="px-7 py-4 bg-amber-400 hover:bg-amber-300 active:scale-98 text-slate-900 font-display font-extrabold rounded-full text-sm transition-all shadow-md flex items-center justify-center gap-2 group self-start sm:self-auto shrink-0"
        >
          <Mic className="w-4 h-4 text-slate-900 group-hover:scale-115 transition-transform" />
          <span>Mulai Latihan Suara</span>
          <ArrowRight className="w-4 h-4 text-slate-900" />
        </button>
      </div>

      {/* 4 PANEL SALING MELENGKAPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {/* PANEL 1: BAHASA ISYARAT */}
        <div className="flex flex-col">
          <SignPanel
            label={currentItem.label}
            isyaratData={currentItem.isyarat}
            activeSystem={activeSignSystem}
            onSystemChange={handleSystemChange}
            speed={settings.kecepatanAnimasi}
          />
        </div>

        {/* PANEL 2: VISUALISASI MULUT */}
        <div className="flex flex-col">
          <MouthAnimation
            animasiKey={currentItem.mulut.animasi}
            mulutData={currentItem.mulut}
            speed={settings.kecepatanAnimasi}
          />
        </div>

        {/* PANEL 3: CARA PENGUCAPAN */}
        <div className="flex flex-col bg-white rounded-3xl border-2 border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <MessageSquare className="w-4 h-4 text-teal-600" />
            <h3 className="font-display text-xs font-bold text-slate-700 uppercase tracking-wider">
              Cara Pengucapan
            </h3>
          </div>

          <div className="space-y-3 flex-1">
            {currentItem.pengucapan.map((langkah, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                  {langkah}
                </p>
              </div>
            ))}
          </div>

          {/* Organ Artikulasi */}
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
            <div className="text-[11px] text-slate-500 font-bold mb-1 uppercase tracking-wider">
              Posisi Organ Artikulasi:
            </div>
            {currentItem.mulut.posisiBibir && (
              <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700">
                <span className="font-bold text-teal-800">Bibir:</span> {currentItem.mulut.posisiBibir}
              </div>
            )}
            {currentItem.mulut.posisiLidah && (
              <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700">
                <span className="font-bold text-teal-800">Lidah:</span> {currentItem.mulut.posisiLidah}
              </div>
            )}
            {currentItem.mulut.posisiRahang && (
              <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700">
                <span className="font-bold text-teal-800">Rahang:</span> {currentItem.mulut.posisiRahang}
              </div>
            )}
          </div>
        </div>

        {/* PANEL 4: KATA / CONTOH BENDA */}
        <div className="flex flex-col bg-white rounded-3xl border-2 border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="font-display text-xs font-bold text-slate-700 uppercase tracking-wider">
              Contoh Kata & Benda
            </h3>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 bg-teal-50/60 rounded-3xl border border-teal-100">
            <div className="w-24 h-24 rounded-3xl bg-white border-2 border-teal-200 flex items-center justify-center shadow-md mb-3 font-display text-4xl font-extrabold text-teal-700">
              {currentItem.label}
            </div>

            <div className="font-display text-2xl font-black text-slate-900 tracking-tight">
              {currentItem.contoh.kata}
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1">
              {currentItem.contoh.arti}
            </p>
          </div>

          {/* Tips Taktil */}
          <div className="mt-4 p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-left">
            <span className="text-[11px] font-bold text-amber-900 block mb-0.5">
              Tips Taktil untuk Pendamping:
            </span>
            <p className="text-[11px] text-amber-800 leading-snug">
              Bimbing anak meletakkan telapak tangan di leher atau di depan bibir agar merasakan hembusan udara hangat dan getaran bunyi.
            </p>
          </div>
        </div>
      </div>

      {/* Tombol Besar di Bawah */}
      <div className="mt-10 p-8 bg-gradient-to-r from-teal-800 to-[#115E59] rounded-[36px] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border-2 border-teal-400">
        <div>
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
            Siap Mencoba Suaramu?
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-black">
            Latih Bunyi "{currentItem.label}" dengan Sensor Vokalisasi
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
            Buka halaman latihan untuk melihat meter visual bergerak real-time dan rasakan getaran di smartphone saat kamu bersuara.
          </p>
        </div>

        <button
          type="button"
          onClick={goToExercise}
          className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-display font-extrabold rounded-full text-base transition-transform hover:scale-102 shadow-lg flex items-center gap-3 shrink-0"
        >
          <Mic className="w-5 h-5 text-slate-900" />
          <span>Mulai Latihan Sekarang</span>
          <ArrowRight className="w-5 h-5 text-slate-900" />
        </button>
      </div>
    </div>
  );
};
