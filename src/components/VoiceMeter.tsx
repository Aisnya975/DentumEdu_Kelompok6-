import React from 'react';
import { Mic, ArrowUp, ArrowDown, Check, Star, RefreshCw, VolumeX } from 'lucide-react';
import { VoiceStatus } from '../types';

interface VoiceMeterProps {
  level: number; // 0 - 100
  threshold: number; // 0 - 100
  status: VoiceStatus;
  sustainedDurationMs: number;
  targetDurationMs?: number;
}

export const VoiceMeter: React.FC<VoiceMeterProps> = ({
  level,
  threshold,
  status,
  sustainedDurationMs,
  targetDurationMs = 350,
}) => {
  // Hitung persentase target durasi
  const progressRatio = Math.min(1, sustainedDurationMs / targetDurationMs);
  const progressPercent = Math.round(progressRatio * 100);

  // Parameter visual lingkaran gauge
  const radius = 80;
  const strokeWidth = 14;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Level stroke
  const strokeDashoffset = circumference - (level / 100) * circumference;

  // Tentukan status visual & ikon
  const getStatusDisplay = () => {
    switch (status) {
      case 'calibrating':
        return {
          label: 'Menyesuaikan Suara Ruangan...',
          sub: 'Diam sebentar, sensor sedang membaca kebisingan latar.',
          colorClass: 'text-sky-700 bg-sky-50 border-sky-300',
          meterColor: '#0284C7',
          icon: <RefreshCw className="w-5 h-5 animate-spin text-sky-600" />,
        };
      case 'too_loud':
        return {
          label: 'Suara Terlalu Keras',
          sub: 'Turunkan sedikit volume suaramu.',
          colorClass: 'text-amber-800 bg-amber-50 border-amber-300',
          meterColor: '#D97706',
          icon: <ArrowDown className="w-5 h-5 text-amber-600 stroke-[3]" />,
        };
      case 'too_quiet':
        return {
          label: 'Suara Terlalu Pelan',
          sub: 'Keluarkan hembusan suara lebih kuat lagi.',
          colorClass: 'text-amber-800 bg-amber-50 border-amber-300',
          meterColor: '#F59E0B',
          icon: <ArrowUp className="w-5 h-5 text-amber-600 stroke-[3]" />,
        };
      case 'detected':
        return {
          label: 'Suara Terdeteksi Baik!',
          sub: 'Tahan suaramu sedikit lagi...',
          colorClass: 'text-teal-900 bg-teal-50 border-teal-300',
          meterColor: '#0D9488',
          icon: <Check className="w-5 h-5 text-teal-600 stroke-[3]" />,
        };
      case 'success':
        return {
          label: 'Hebat! Vokalisasi Berhasil!',
          sub: 'Target suara dan durasi tercapai dengan sempurna.',
          colorClass: 'text-emerald-900 bg-emerald-100 border-emerald-400',
          meterColor: '#059669',
          icon: <Star className="w-5 h-5 text-emerald-600 fill-emerald-500" />,
        };
      case 'listening':
        return {
          label: 'Siap Mendengarkan...',
          sub: 'Keluarkan suara sekarang.',
          colorClass: 'text-slate-700 bg-slate-100 border-slate-300',
          meterColor: '#64748B',
          icon: <Mic className="w-5 h-5 text-teal-600 animate-pulse" />,
        };
      case 'idle':
      default:
        return {
          label: 'Sensor Belum Aktif',
          sub: 'Tekan tombol Mulai Rekam atau Simulasikan Suara.',
          colorClass: 'text-slate-600 bg-slate-100 border-slate-200',
          meterColor: '#94A3B8',
          icon: <VolumeX className="w-5 h-5 text-slate-400" />,
        };
    }
  };

  const statusInfo = getStatusDisplay();

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      {/* Pengukur Volume Melingkar Besar */}
      <div className="relative w-56 h-56 flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90 select-none"
        >
          {/* Latar Belakang Lingkaran */}
          <circle
            stroke="#E2E8F0"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          {/* Garis Ambang Batas (Threshold Marker) */}
          <circle
            stroke="#CBD5E1"
            fill="transparent"
            strokeWidth={strokeWidth + 4}
            strokeDasharray={`2 ${circumference}`}
            strokeDashoffset={circumference - (threshold / 100) * circumference}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          {/* Busur Level Suara Aktif */}
          <circle
            stroke={statusInfo.meterColor}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 80ms ease-out' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        {/* Konten Bagian Tengah Gauge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="text-3xl font-extrabold font-mono tracking-tight text-slate-800 tabular-nums">
            {level}%
          </div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
            Kekuatan Suara
          </span>

          {/* Bar indikator durasi yang tercapai */}
          {status === 'detected' && (
            <div className="mt-2 w-28 bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-teal-600 h-full transition-all duration-75 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Indikator Status Multi-Modal (Warna + Ikon + Teks Jelas) */}
      <div
        className={`mt-4 w-full p-3 rounded-xl border flex items-center gap-3 transition-colors ${statusInfo.colorClass}`}
        role="status"
        aria-live="polite"
      >
        <div className="p-2 bg-white rounded-lg shadow-2xs shrink-0">
          {statusInfo.icon}
        </div>
        <div className="flex flex-col text-left">
          <div className="text-sm font-bold tracking-tight">
            {statusInfo.label}
          </div>
          <div className="text-xs opacity-90 leading-tight">
            {statusInfo.sub}
          </div>
        </div>
      </div>
    </div>
  );
};
