import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Star,
  RotateCcw,
  Award,
  CheckCircle2,
  Calendar,
  Flame,
  Download,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import rawMateri from '../data/materi.json';
import { MateriItem } from '../types';
import { useProgress } from '../hooks/useProgress';

const materiList = rawMateri as MateriItem[];

const BADGE_DEFINITIONS: Record<string, { label: string; desc: string; icon: string }> = {
  suara_pertama: {
    label: 'Suara Pertama',
    desc: 'Menyelesaikan 1 latihan vokalisasi',
    icon: '🌱',
  },
  penjelajah_vokal: {
    label: 'Penjelajah Bunyi',
    desc: 'Mencoba setidaknya 5 materi artikulasi',
    icon: '🚀',
  },
  juara_vokal: {
    label: 'Juara Vokal',
    desc: 'Menyelesaikan semua vokal A, I, U, E, O',
    icon: '👑',
  },
  ahli_bibir: {
    label: 'Ahli Bilabial',
    desc: 'Menyelesaikan latihan bibir B, P, M',
    icon: '👄',
  },
  kata_emas: {
    label: 'Perangkai Kata',
    desc: 'Berhasil melatih pengucapan kata sederhana',
    icon: '📖',
  },
  bintang_keemasan: {
    label: 'Bintang Emas 3x',
    desc: 'Memperoleh bintang 3 penuh di 3 materi berbeda',
    icon: '⭐',
  },
};

export const Progres: React.FC = () => {
  const { progress, resetProgress, exportProgressJson } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const materiDone = Object.values(progress.materi).filter(m => m.status === 'selesai');
  const totalPercobaan = Object.values(progress.materi).reduce((acc, m) => acc + m.percobaan, 0);
  const totalSukses = Object.values(progress.materi).reduce((acc, m) => acc + m.sukses, 0);
  const totalBintang = Object.values(progress.materi).reduce((acc, m) => acc + m.bintang, 0);

  const completionPercent = Math.round((materiDone.length / materiList.length) * 100);

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header Progres */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="text-xs font-bold text-teal-700 tracking-wider uppercase mb-1">
            Buku Catatan Belajar
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Progres & Pencapaian Anak
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-xl">
            Pantau jejak latihan, koleksi bintang penghargaan, dan lencana yang telah dikumpulkan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportProgressJson}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor JSON</span>
          </button>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progres</span>
          </button>
        </div>
      </div>

      {/* Ringkasan Statistik Kartu */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Materi Selesai
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-mono">
            {materiDone.length} <span className="text-sm font-normal text-slate-400">/ {materiList.length}</span>
          </div>
          <div className="mt-2 text-xs font-semibold text-teal-700">
            {completionPercent}% Terlatih
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Bintang
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-500 mt-2 font-mono flex items-center gap-1">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            <span>{totalBintang}</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Maks. {materiList.length * 3} bintang
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Latihan
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 font-mono">
            {totalPercobaan}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {totalSukses} vokalisasi berhasil
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Lencana Diraih
          </div>
          <div className="text-2xl sm:text-3xl font-black text-teal-700 mt-2 font-mono">
            {progress.lencana.length} <span className="text-sm font-normal text-slate-400">/ {Object.keys(BADGE_DEFINITIONS).length}</span>
          </div>
          <div className="mt-2 text-xs text-teal-700 font-semibold">
            Pencapaian Aktif
          </div>
        </div>
      </div>

      {/* Lencana Pencapaian */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Koleksi Lencana Pencapaian</span>
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Setiap tonggak kemajuan memberikan penghargaan visual yang menyemangati anak.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(BADGE_DEFINITIONS).map(([key, info]) => {
            const isEarned = progress.lencana.includes(key);
            return (
              <div
                key={key}
                className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all ${
                  isEarned
                    ? 'bg-amber-50/70 border-amber-300 shadow-2xs'
                    : 'bg-slate-50 border-slate-200/80 opacity-40'
                }`}
              >
                <div className="text-3xl mb-2 select-none">{info.icon}</div>
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {info.label}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 leading-snug">
                  {info.desc}
                </div>
                {isEarned && (
                  <span className="mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Tercapai
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Rincian Riwayat Materi */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Status Tiap Materi Artikulasi
        </h2>

        <div className="divide-y divide-slate-100">
          {materiList.map(item => {
            const p = progress.materi[item.id] || {
              id: item.id,
              status: 'belum',
              percobaan: 0,
              sukses: 0,
              bintang: 0,
            };

            return (
              <div
                key={item.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 rounded-xl px-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-slate-100 font-bold text-slate-800 flex items-center justify-center text-sm shrink-0">
                    {item.label}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>Bunyi {item.label}</span>
                      <span className="text-xs text-slate-400 font-normal capitalize">({item.kategori})</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Contoh: {item.contoh.kata} · Dicoba {p.percobaan}x ({p.sukses} sukses)
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  {/* Rating Bintang */}
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3].map(s => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= p.bintang ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Tombol Latihan */}
                  <Link
                    to={`/belajar/${item.id}`}
                    className="px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <span>Buka</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Konfirmasi Reset Progres */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Reset Semua Catatan Progres?
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-5">
              Semua bintang, jumlah percobaan, dan lencana akan dikembalikan ke awal. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="flex-1 py-2.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs"
              >
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
