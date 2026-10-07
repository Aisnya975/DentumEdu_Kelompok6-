import React from 'react';
import { Star, Lock, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { MateriItem, MateriProgress } from '../types';

interface MaterialCardProps {
  item: MateriItem;
  progress: MateriProgress;
  isUnlocked: boolean;
  onSelect: (item: MateriItem) => void;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  item,
  progress,
  isUnlocked,
  onSelect,
}) => {
  const isDone = progress.status === 'selesai';
  const isAttempted = progress.percobaan > 0;

  // Warna aksen berdasarkan kategori
  const getCategoryTheme = () => {
    switch (item.kategori) {
      case 'vokal':
        return {
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
          avatarBg: 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-900',
          hoverBorder: 'hover:border-amber-300 hover:shadow-amber-100/50',
        };
      case 'konsonan':
        return {
          badgeBg: 'bg-sky-100 text-sky-900 border-sky-200',
          avatarBg: 'bg-gradient-to-tr from-sky-400 to-teal-300 text-slate-900',
          hoverBorder: 'hover:border-sky-300 hover:shadow-sky-100/50',
        };
      case 'kata':
      default:
        return {
          badgeBg: 'bg-teal-100 text-teal-900 border-teal-200',
          avatarBg: 'bg-gradient-to-tr from-teal-500 to-emerald-400 text-white',
          hoverBorder: 'hover:border-teal-300 hover:shadow-teal-100/50',
        };
    }
  };

  const theme = getCategoryTheme();

  return (
    <div
      onClick={() => isUnlocked && onSelect(item)}
      role="button"
      tabIndex={isUnlocked ? 0 : -1}
      onKeyDown={e => {
        if (isUnlocked && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect(item);
        }
      }}
      className={`relative group rounded-3xl p-6 border-2 text-left transition-all duration-300 flex flex-col justify-between ${
        !isUnlocked
          ? 'bg-slate-50/80 border-slate-200/80 opacity-60 cursor-not-allowed'
          : isDone
          ? `bg-white border-teal-200 shadow-sm hover:shadow-xl hover:-translate-y-1 ${theme.hoverBorder} cursor-pointer`
          : `bg-white border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 ${theme.hoverBorder} cursor-pointer`
      }`}
    >
      <div>
        {/* Header Kartu: Status & Bintang Penghargaan */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${theme.badgeBg}`}>
            {item.kategori} · #{item.urutan}
          </span>

          <div className="flex items-center gap-1">
            {isUnlocked ? (
              <div className="flex items-center text-amber-400">
                {[1, 2, 3].map(s => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= progress.bintang ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
            ) : (
              <span className="flex items-center gap-1 text-xs text-slate-400 font-bold bg-slate-100 px-2.5 py-0.5 rounded-full">
                <Lock className="w-3.5 h-3.5" />
                Terkunci
              </span>
            )}
          </div>
        </div>

        {/* Bagian Utama: Avatar Karakter Huruf Besar */}
        <div className="flex items-center gap-4 my-3">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center font-display font-extrabold text-2xl shrink-0 shadow-md transition-transform group-hover:scale-108 ${
              !isUnlocked ? 'bg-slate-200 text-slate-400' : theme.avatarBg
            }`}
          >
            {item.label}
          </div>

          <div className="flex flex-col">
            <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              Bunyi "{item.label}"
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Contoh kata: <strong className="text-slate-800">{item.contoh.kata}</strong>
            </p>
          </div>
        </div>

        {/* Ringkasan Posisi Bibir / Gerakan */}
        <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          {item.mulut.deskripsi}
        </p>
      </div>

      {/* Footer Kartu: Progres & Tombol Aksi */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs text-slate-500 font-medium">
          {isDone ? (
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Selesai Dilatih
            </span>
          ) : isAttempted ? (
            <span>{progress.percobaan}x dicoba</span>
          ) : (
            <span className="text-slate-400 font-medium">Siap dicoba</span>
          )}
        </div>

        {isUnlocked && (
          <span className="flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:translate-x-1 transition-transform bg-teal-50 px-3 py-1 rounded-full group-hover:bg-teal-100">
            <span>Buka</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </div>
  );
};
