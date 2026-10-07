import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Volume2,
  Smile,
  BookOpen,
  Sparkles,
  Trophy,
  Lock,
  Unlock,
  Star,
  CheckCircle2,
} from 'lucide-react';
import rawMateri from '../data/materi.json';
import { MateriItem, KategoriMateri } from '../types';
import { MaterialCard } from '../components/MaterialCard';
import { useProgress } from '../hooks/useProgress';
import { useSettings } from '../hooks/useSettings';

const materiList = rawMateri as MateriItem[];

export const Materi: React.FC = () => {
  const navigate = useNavigate();
  const { progress, getMaterialProgress, isUnlocked } = useProgress();
  const { settings, updateSetting } = useSettings();

  const [activeKategori, setActiveKategori] = useState<KategoriMateri | 'semua'>('semua');

  // Filter materi
  const filteredMateri = materiList.filter(item => {
    if (activeKategori === 'semua') return true;
    return item.kategori === activeKategori;
  });

  const totalSelesai = Object.values(progress.materi).filter(m => m.status === 'selesai').length;
  const progressPercent = Math.round((totalSelesai / materiList.length) * 100);

  const handleSelectMaterial = (item: MateriItem) => {
    navigate(`/belajar/${item.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header Banner Ramah Anak Bergradasi Cerah */}
      <div className="bg-gradient-to-r from-amber-100/70 via-sky-100/60 to-teal-100/70 rounded-[36px] p-6 sm:p-10 border-2 border-white shadow-md mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-xs rounded-full text-xs font-extrabold text-teal-800 shadow-2xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Katalog Petualangan Suara</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Pilih Materi Latihan Artikulasi
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-xl font-medium leading-relaxed">
              Mulailah dari vokal dasar (A, I, U, E, O), eksplorasi letupan bibir bilabial (B, P, M), lalu rangkai menjadi kata utuh!
            </p>
          </div>

          {/* Kotak Progres Melingkar Bergaya WonderLearn */}
          <div className="w-full md:w-72 bg-white/95 backdrop-blur-xs p-5 rounded-3xl border border-teal-100 shadow-sm shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
              <span className="flex items-center gap-1.5 text-teal-700">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Pencapaian Belajar</span>
              </span>
              <span className="font-mono text-sm">{totalSelesai}/{materiList.length}</span>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
              <div
                className="bg-gradient-to-r from-teal-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>{progressPercent}% Telah Dilatih</span>
              {settings.bukaSemuaMateri && (
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 font-bold">
                  <Unlock className="w-3 h-3" /> Mode Terbuka
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Filter Kategori dengan Tombol Kapsul Pastel Interaktif */}
        <div className="mt-8 pt-6 border-t border-teal-200/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveKategori('semua')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeKategori === 'semua'
                  ? 'bg-teal-700 text-white shadow-md scale-102'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-slate-900 border border-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Semua Modul ({materiList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveKategori('vokal')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeKategori === 'vokal'
                  ? 'bg-amber-500 text-slate-900 shadow-md scale-102'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Vokal A-I-U-E-O (5)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveKategori('konsonan')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeKategori === 'konsonan'
                  ? 'bg-sky-500 text-white shadow-md scale-102'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Smile className="w-3.5 h-3.5" />
              <span>Bilabial B, P, M (3)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveKategori('kata')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeKategori === 'kata'
                  ? 'bg-teal-600 text-white shadow-md scale-102'
                  : 'bg-white/80 text-slate-700 hover:bg-white hover:text-slate-900 border border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kata Sederhana (6)</span>
            </button>
          </div>

          {/* Toggle Buka Kunci Cepat */}
          <button
            type="button"
            onClick={() => updateSetting('bukaSemuaMateri', !settings.bukaSemuaMateri)}
            className="text-xs bg-white/70 hover:bg-white px-3.5 py-2 rounded-full border border-slate-200 text-slate-600 hover:text-teal-700 flex items-center gap-1.5 font-bold transition-colors shadow-2xs"
          >
            {settings.bukaSemuaMateri ? (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Kunci Kembali Alur Bertahap</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5 text-teal-600" />
                <span>Mode Guru: Buka Semua Modul</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid Kartu Materi Bergaya WonderLearn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMateri.map(item => {
          const itemProgress = getMaterialProgress(item.id);
          const unlocked = isUnlocked(item.id, item.urutan, settings.bukaSemuaMateri);

          return (
            <MaterialCard
              key={item.id}
              item={item}
              progress={itemProgress}
              isUnlocked={unlocked}
              onSelect={handleSelectMaterial}
            />
          );
        })}
      </div>
    </div>
  );
};
