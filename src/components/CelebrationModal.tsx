import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, RotateCcw, ArrowRight, Award } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  onNext?: () => void;
  targetLabel: string;
  earnedStars: number;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  onNext,
  targetLabel,
  earnedStars = 3,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0D9488', '#F59E0B', '#38BDF8', '#EC4899', '#84CC16'],
        });
      } catch {
        // fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 flex flex-col items-center text-center transform scale-100 transition-all">
        {/* Ikon Penghargaan */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 shadow-inner">
          <Award className="w-9 h-9" />
        </div>

        <span className="text-xs font-bold text-teal-700 tracking-wider uppercase mb-1">
          Latihan Berhasil
        </span>

        <h3 className="text-2xl font-extrabold text-slate-800">
          Hebat Sekali!
        </h3>

        <p className="text-xs text-slate-600 mt-1 max-w-xs leading-relaxed">
          Kamu telah melatih bunyi <span className="font-bold text-teal-700">"{targetLabel}"</span> dengan penuh semangat.
        </p>

        {/* Bintang Pencapaian */}
        <div className="flex items-center justify-center gap-2 my-5">
          {[1, 2, 3].map(starIndex => (
            <div
              key={starIndex}
              className={`p-2 rounded-xl transition-transform ${
                starIndex <= earnedStars
                  ? 'bg-amber-100 text-amber-500 scale-110'
                  : 'bg-slate-100 text-slate-300'
              }`}
            >
              <Star
                className={`w-7 h-7 ${
                  starIndex <= earnedStars ? 'fill-amber-400' : 'fill-none'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col gap-2.5 w-full mt-2">
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold rounded-xl text-sm transition-colors shadow-md"
            >
              <span>Lanjut Materi Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Latih Lagi Bunyi Ini</span>
          </button>
        </div>
      </div>
    </div>
  );
};
