import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Eye, Layers } from 'lucide-react';
import { MulutData } from '../types';

interface MouthAnimationProps {
  animasiKey: string;
  mulutData?: MulutData;
  speed?: 'normal' | 'lambat';
}

export const MouthAnimation: React.FC<MouthAnimationProps> = ({
  animasiKey,
  mulutData,
  speed = 'normal',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'depan' | 'samping'>('depan');
  const [playbackSpeed, setPlaybackSpeed] = useState<'normal' | 'lambat'>(speed);
  const [frame, setFrame] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    setPlaybackSpeed(speed);
  }, [speed]);

  // Loop frame animasi
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = playbackSpeed === 'lambat' ? 90 : 45;
    const interval = setInterval(() => {
      frameRef.current = (frameRef.current + 1) % 100;
      setFrame(frameRef.current);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const resetAnimation = () => {
    frameRef.current = 0;
    setFrame(0);
    setIsPlaying(true);
  };

  // Nilai interpolasi siklus 0 - 1
  const t = (Math.sin((frame / 100) * Math.PI * 2) + 1) / 2;

  // Render Tampak Depan berdasarkan phoneme
  const renderFrontView = () => {
    switch (animasiKey) {
      case 'a': {
        // Mulut terbuka lebar
        const openY = 32 + t * 24;
        return (
          <g>
            {/* Wajah dasar */}
            <circle cx="150" cy="150" r="110" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="4" />
            {/* Pipi merona */}
            <circle cx="80" cy="150" r="14" fill="#FDA4AF" opacity="0.5" />
            <circle cx="220" cy="150" r="14" fill="#FDA4AF" opacity="0.5" />
            {/* Hidung */}
            <path d="M 144 115 Q 150 125 156 115" stroke="#F87171" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Rongga mulut */}
            <ellipse cx="150" cy="170" rx={45 + t * 5} ry={openY} fill="#881337" stroke="#4C0519" strokeWidth="3" />
            {/* Gigi atas */}
            <path d="M 125 145 Q 150 148 175 145 L 170 152 Q 150 155 130 152 Z" fill="#FFFFFF" />
            {/* Lidah rileks di dasar */}
            <ellipse cx="150" cy={175 + openY * 0.4} rx="30" ry="14" fill="#FB7185" />
            {/* Bibir tebal luar */}
            <path
              d={`M 95 170 C 120 ${140 - t * 6}, 180 ${140 - t * 6}, 205 170 C 180 ${200 + t * 18}, 120 ${200 + t * 18}, 95 170 Z`}
              fill="none"
              stroke="#E11D48"
              strokeWidth="10"
              strokeLinejoin="round"
            />
          </g>
        );
      }
      case 'i': {
        // Senyum lebar menyamping
        const smileWidth = 55 + t * 15;
        return (
          <g>
            <circle cx="150" cy="150" r="110" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="4" />
            <circle cx="75" cy="145" r="14" fill="#FDA4AF" opacity="0.5" />
            <circle cx="225" cy="145" r="14" fill="#FDA4AF" opacity="0.5" />
            <path d="M 144 115 Q 150 125 156 115" stroke="#F87171" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Rongga mulut tipis mendatar */}
            <ellipse cx="150" cy="165" rx={smileWidth} ry="16" fill="#881337" />
            {/* Deretan gigi terlihat jelas */}
            <rect x={150 - smileWidth * 0.8} y="156" width={smileWidth * 1.6} height="18" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="150" y1="156" x2="150" y2="174" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Bibir senyum */}
            <path
              d={`M ${150 - smileWidth - 10} 165 Q 150 150 ${150 + smileWidth + 10} 165 Q 150 185 ${150 - smileWidth - 10} 165 Z`}
              fill="none"
              stroke="#E11D48"
              strokeWidth="9"
              strokeLinejoin="round"
            />
          </g>
        );
      }
      case 'u': {
        // Bibir membulat moncong ke depan
        const puckRadius = 18 - t * 4;
        return (
          <g>
            <circle cx="150" cy="150" r="110" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="4" />
            <circle cx="80" cy="150" r="14" fill="#FDA4AF" opacity="0.5" />
            <circle cx="220" cy="150" r="14" fill="#FDA4AF" opacity="0.5" />
            <path d="M 144 115 Q 150 125 156 115" stroke="#F87171" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Kerutan pipi saat moncong */}
            <path d="M 115 160 Q 120 170 115 180" stroke="#FDA4AF" strokeWidth="3" fill="none" />
            <path d="M 185 160 Q 180 170 185 180" stroke="#FDA4AF" strokeWidth="3" fill="none" />
            {/* Rongga mulut kecil bulat */}
            <circle cx="150" cy="170" r={puckRadius} fill="#881337" />
            {/* Bibir bulat tebal */}
            <circle cx="150" cy="170" r={puckRadius + 14} fill="none" stroke="#E11D48" strokeWidth="11" />
          </g>
        );
      }
      case 'e': {
        // Terbuka sedang santai
        const openE = 20 + t * 8;
        return (
          <g>
            <circle cx="150" cy="150" r="110" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="4" />
            <circle cx="80" cy="150" r="14" fill="#FDA4AF" opacity="0.5" />
            <circle cx="220" cy="150" r="14" fill="#FDA4AF" opacity="0.5" />
            <path d="M 144 115 Q 150 125 156 115" stroke="#F87171" strokeWidth="3" fill="none" />
            <ellipse cx="150" cy="168" rx="46" ry={openE} fill="#881337" />
            <rect x="120" y="158" width="60" height="10" rx="2" fill="#FFFFFF" />
            <path
              d={`M 98 168 Q 150 ${152 - t * 4} 202 168 Q 150 ${184 + t * 6} 98 168 Z`}
              fill="none"
              stroke="#E11D48"
              strokeWidth="9"
            />
          </g>
        );
      }
      case 'o': {
        // Oval melingkar vertikal besar
        const radiusY = 32 + t * 10;
        return (
          <g>
            <circle cx="150" cy="150" r="110" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="4" />
            <circle cx="80" cy="150" r="14" fill="#FDA4AF" opacity="0.5" />
            <circle cx="220" cy="150" r="14" fill="#FDA4AF" opacity="0.5" />
            <path d="M 144 115 Q 150 125 156 115" stroke="#F87171" strokeWidth="3" fill="none" />
            <ellipse cx="150" cy="170" rx="30" ry={radiusY} fill="#881337" />
            <ellipse cx="150" cy="170" rx="38" ry={radiusY + 12} fill="none" stroke="#E11D48" strokeWidth="10" />
          </g>
        );
      }
      case 'b':
      case 'p':
      case 'm':
      case 'mama':
      case 'papa':
      case 'bola':
      case 'buku':
      case 'makan':
      case 'minum':
      default: {
        // Bilabial & kata: Siklus katup bibir rapat -> buka letup
        const isClosed = t < 0.45;
        const mouthGap = isClosed ? 0 : (t - 0.45) * 35;
        const isPlosiveP = animasiKey === 'p' || animasiKey === 'papa';
        return (
          <g>
            <circle cx="150" cy="150" r="110" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="4" />
            <circle cx="80" cy="150" r="14" fill="#FDA4AF" opacity="0.5" />
            <circle cx="220" cy="150" r="14" fill="#FDA4AF" opacity="0.5" />
            <path d="M 144 115 Q 150 125 156 115" stroke="#F87171" strokeWidth="3" fill="none" />

            {/* Efek letupan angin untuk bunyi P */}
            {isPlosiveP && !isClosed && (
              <g opacity="0.7">
                <path d="M 215 160 Q 235 150 250 155" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 218 170 Q 240 170 255 170" stroke="#38BDF8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 215 180 Q 235 190 250 185" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* Rongga mulut */}
            {mouthGap > 0 ? (
              <ellipse cx="150" cy="170" rx="38" ry={mouthGap} fill="#881337" />
            ) : (
              <line x1="110" y1="170" x2="190" y2="170" stroke="#9F1239" strokeWidth="4" />
            )}

            {/* Bibir atas & bawah */}
            <path
              d={`M 105 170 Q 150 ${162 - mouthGap * 0.4} 195 170 Q 150 ${178 + mouthGap * 0.5} 105 170 Z`}
              fill={isClosed ? '#E11D48' : 'none'}
              stroke="#E11D48"
              strokeWidth="9"
              strokeLinejoin="round"
            />
          </g>
        );
      }
    }
  };

  // Render Penampang Samping (Lateral Cross-Section Vokal Traktus)
  const renderLateralView = () => {
    // Parameter artikulasi samping
    const jawDrop = (animasiKey === 'a' || animasiKey === 'mama') ? t * 18 :
                    (animasiKey === 'o' || animasiKey === 'bola') ? t * 12 :
                    (animasiKey === 'i') ? 4 :
                    (animasiKey === 'u' || animasiKey === 'buku') ? 6 :
                    t * 10;

    const tongueUp = (animasiKey === 'i' || animasiKey === 'minum') ? 22 :
                     (animasiKey === 'u' || animasiKey === 'buku') ? 16 :
                     (animasiKey === 'a') ? 4 : 10;

    const hasVocalCordVibration = mulutData?.getaranPitaSuara ?? true;

    return (
      <g>
        {/* Latar rongga kepala */}
        <rect width="300" height="300" fill="#F8FAFC" rx="16" />

        {/* Profil kepala & hidung luar */}
        <path
          d="M 110 50 C 180 50, 220 80, 220 120 L 220 140 C 235 150, 245 155, 230 165 C 220 170, 215 170, 215 175 C 215 185, 210 195, 210 210 L 210 260"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="3"
        />

        {/* Langit-langit mulut (Palatum keras & lunak) */}
        <path
          d="M 190 155 Q 160 145 130 155 Q 110 165 95 185"
          fill="none"
          stroke="#64748B"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <text x="135" y="140" fill="#64748B" fontSize="10" fontWeight="bold">Langit-langit</text>

        {/* Gigi atas */}
        <path d="M 194 158 L 194 172 L 188 172 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />

        {/* Rahang bawah & Gigi bawah bergerak mengikuti jawDrop */}
        <g transform={`translate(0, ${jawDrop})`}>
          <path d="M 190 185 L 190 172 L 185 172 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M 195 190 Q 180 205 150 215" fill="none" stroke="#CBD5E1" strokeWidth="4" />
        </g>

        {/* Lidah fleksibel (Warna merah muda) */}
        <path
          d={`M 115 220 Q 130 ${200 - tongueUp} 165 ${180 - tongueUp * 0.5 + jawDrop * 0.3} Q 185 ${185 + jawDrop} 165 ${210 + jawDrop} Z`}
          fill="#FDA4AF"
          stroke="#F43F5E"
          strokeWidth="3.5"
        />
        <text x="145" y={225 + jawDrop * 0.4} fill="#BE123C" fontSize="11" fontWeight="bold">Lidah</text>

        {/* Pita suara (Vocal folds di laring) */}
        <rect x="90" y="235" width="22" height="14" rx="4" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
        <text x="45" y="246" fill="#475569" fontSize="10" fontWeight="bold">Pita Suara</text>

        {/* Gelombang getaran pita suara jika bergetar */}
        {hasVocalCordVibration && (
          <g opacity={0.4 + t * 0.6}>
            <circle cx="101" cy="242" r={6 + t * 5} fill="none" stroke="#F59E0B" strokeWidth="2.5" />
            <circle cx="101" cy="242" r={12 + t * 6} fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="40" y="264" fill="#D97706" fontSize="9" fontWeight="bold">● GETAR AKTIF</text>
          </g>
        )}

        {/* Aliran udara / Panah nafas */}
        <path
          d="M 101 225 Q 115 190 145 175 Q 180 170 210 170"
          fill="none"
          stroke="#0EA5E9"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          opacity="0.8"
        />
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
      {/* Tab Pilihan Sudut Pandang */}
      <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-teal-600" />
          Bentuk Artikulasi Mulut
        </span>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode('depan')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'depan'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tampak Depan
          </button>
          <button
            type="button"
            onClick={() => setViewMode('samping')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'samping'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Penampang Samping
          </button>
        </div>
      </div>

      {/* Kanvas Animasi SVG */}
      <div className="relative w-64 h-64 flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full select-none"
          aria-label={`Visualisasi mulut untuk ${animasiKey}`}
        >
          {viewMode === 'depan' ? renderFrontView() : renderLateralView()}
        </svg>

        {/* Badge status getar pita suara */}
        {mulutData?.getaranPitaSuara && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-amber-500/10 border border-amber-300 px-2 py-0.5 rounded-full text-[11px] font-semibold text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
            Pita Suara Bergetar
          </div>
        )}
      </div>

      {/* Deskripsi Singkat */}
      <p className="mt-3 text-xs text-center text-slate-600 font-medium px-2 max-w-xs">
        {mulutData?.deskripsi || 'Perhatikan gerakan bibir dan rongga mulut.'}
      </p>

      {/* Kontrol Navigasi Animasi */}
      <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-slate-100 w-full">
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-800 hover:bg-teal-100 rounded-lg text-xs font-semibold transition-colors"
          title={isPlaying ? 'Jeda animasi' : 'Putar animasi'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Jeda' : 'Putar'}</span>
        </button>

        <button
          type="button"
          onClick={resetAnimation}
          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs transition-colors"
          title="Ulangi animasi dari awal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setPlaybackSpeed(playbackSpeed === 'normal' ? 'lambat' : 'normal')}
          className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            playbackSpeed === 'lambat'
              ? 'bg-amber-100 text-amber-800 border border-amber-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          title="Mode lambat untuk pengamatan detail"
        >
          {playbackSpeed === 'lambat' ? '0.5x Lambat' : '1.0x Normal'}
        </button>
      </div>
    </div>
  );
};
