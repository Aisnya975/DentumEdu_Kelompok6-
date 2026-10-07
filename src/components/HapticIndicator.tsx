import React from 'react';
import { Smartphone, Zap, Sparkles } from 'lucide-react';
import { AppSettings } from '../types';

interface HapticIndicatorProps {
  isSupported: boolean;
  isRippling: boolean;
  settings: AppSettings;
  onTest?: () => void;
  compact?: boolean;
}

export const HapticIndicator: React.FC<HapticIndicatorProps> = ({
  isSupported,
  isRippling,
  settings,
  onTest,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-xs">
        <div className="relative flex items-center justify-center">
          <Smartphone className={`w-3.5 h-3.5 ${isRippling ? 'text-amber-500 animate-bounce' : 'text-slate-500'}`} />
          {isRippling && (
            <span className="absolute -inset-1 rounded-full border border-amber-400 animate-ping" />
          )}
        </div>
        <span className="text-[11px] font-medium text-slate-600">
          {isSupported ? `Haptik (${settings.hapticStrength})` : 'Haptik Visual'}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs">
      <div className="flex items-center gap-3">
        {/* Ikon getar dengan animasi gelombang visual riak */}
        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-amber-100/80 text-amber-800 shrink-0">
          <Smartphone className={`w-5 h-5 ${isRippling ? 'text-amber-600 scale-110' : 'text-amber-700'}`} />
          {isRippling && (
            <>
              <span className="absolute inset-0 rounded-lg border-2 border-amber-400 animate-ping opacity-75" />
              <span className="absolute -inset-1 rounded-xl border border-amber-500 animate-pulse" />
            </>
          )}
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-amber-900">
              {isSupported ? 'Sensor Getaran Haptik Aktif' : 'Simulasi Haptik Visual'}
            </span>
            <span className="text-[10px] bg-amber-200/60 text-amber-800 px-1.5 py-0.2 rounded font-semibold capitalize">
              {settings.hapticStrength}
            </span>
          </div>
          <p className="text-[11px] text-amber-800/90 leading-tight">
            {isSupported
              ? 'Getaran ritmis akan terasa di perangkat saat kamu bersuara.'
              : 'Perangkat ini tidak mendukung getaran fisik; getaran disimulasikan secara visual di layar.'}
          </p>
        </div>
      </div>

      {onTest && (
        <button
          type="button"
          onClick={onTest}
          className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 bg-amber-200/60 hover:bg-amber-300 text-amber-900 rounded-lg text-xs font-semibold transition-colors"
          title="Uji getaran sensor"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Uji Getar</span>
        </button>
      )}
    </div>
  );
};
