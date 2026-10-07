import React, { useState } from 'react';
import { RotateCcw, Play, Pause, Hand, Info } from 'lucide-react';
import { IsyaratData, SistemIsyarat } from '../types';

interface SignPanelProps {
  label: string;
  isyaratData: IsyaratData;
  activeSystem: SistemIsyarat;
  onSystemChange?: (sys: SistemIsyarat) => void;
  speed?: 'normal' | 'lambat';
}

export const SignPanel: React.FC<SignPanelProps> = ({
  label,
  isyaratData,
  activeSystem,
  onSystemChange,
  speed = 'normal',
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<'normal' | 'lambat'>(speed);
  const [assetLoadFailed, setAssetLoadFailed] = useState(false);

  const activeMediaUrl = activeSystem === 'sibi' ? isyaratData.sibi : isyaratData.bisindo;

  // Render ilustrasi gesture isyarat tangan vektor edukatif
  const renderSignIllustration = () => {
    return (
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full select-none"
        aria-label={`Isyarat tangan ${label}`}
      >
        <rect width="200" height="200" rx="16" fill="#F0FDFA" />
        {/* Lengan dasar */}
        <path d="M 85 190 L 85 140 L 115 140 L 115 190 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
        
        {/* Telapak & Jemari berdasarkan huruf */}
        <g transform="translate(10, 0)">
          {/* Telapak tangan dasar */}
          <rect x="70" y="85" width="45" height="55" rx="10" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
          
          {label.toUpperCase() === 'A' && (
            <g>
              {/* Mengepal empat jari */}
              <rect x="70" y="80" width="38" height="32" rx="6" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              {/* Ibu jari tegak menempel di samping */}
              <rect x="108" y="70" width="12" height="45" rx="6" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
              <line x1="72" y1="90" x2="105" y2="90" stroke="#B45309" strokeWidth="1.5" />
              <line x1="72" y1="100" x2="105" y2="100" stroke="#B45309" strokeWidth="1.5" />
            </g>
          )}

          {label.toUpperCase() === 'I' && (
            <g>
              {/* Kepalan dengan kelingking tegak */}
              <rect x="70" y="85" width="40" height="40" rx="8" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              {/* Jari kelingking tegak */}
              <rect x="70" y="35" width="9" height="55" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
              {/* Ibu jari melipat di depan */}
              <path d="M 85 95 C 100 95, 105 105, 95 115" stroke="#D97706" strokeWidth="3" fill="none" />
            </g>
          )}

          {label.toUpperCase() === 'U' && (
            <g>
              {/* Dua jari telunjuk dan tengah tegak rapat */}
              <rect x="75" y="88" width="38" height="38" rx="8" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              <rect x="80" y="32" width="11" height="60" rx="5" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
              <rect x="93" y="32" width="11" height="60" rx="5" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
            </g>
          )}

          {label.toUpperCase() === 'O' && (
            <g>
              {/* Jari melingkar membentuk O */}
              <ellipse cx="90" cy="80" rx="26" ry="32" fill="none" stroke="#D97706" strokeWidth="12" />
            </g>
          )}

          {label.toUpperCase() === 'E' && (
            <g>
              {/* Ujung jari menekuk ke ibu jari */}
              <rect x="72" y="80" width="42" height="42" rx="6" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              <path d="M 74 65 Q 95 60 110 75" fill="none" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}

          {label.toUpperCase() === 'B' && (
            <g>
              {/* Empat jari tegak, jempol lipat */}
              <rect x="74" y="32" width="38" height="65" rx="6" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
              <line x1="83" y1="35" x2="83" y2="90" stroke="#D97706" strokeWidth="1.5" />
              <line x1="93" y1="35" x2="93" y2="90" stroke="#D97706" strokeWidth="1.5" />
              <line x1="102" y1="35" x2="102" y2="90" stroke="#D97706" strokeWidth="1.5" />
              <path d="M 72 105 Q 90 100 95 110" stroke="#D97706" strokeWidth="4" fill="none" />
            </g>
          )}

          {label.toUpperCase() === 'P' && (
            <g>
              {/* Telunjuk menunjuk bawah, tengah mendatar */}
              <rect x="75" y="80" width="35" height="35" rx="6" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              <rect x="80" y="80" width="10" height="48" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
              <rect x="90" y="85" width="35" height="10" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
            </g>
          )}

          {label.toUpperCase() === 'M' && (
            <g>
              {/* Tiga jari melipat di atas jempol */}
              <rect x="70" y="70" width="45" height="40" rx="8" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
              <line x1="82" y1="70" x2="82" y2="105" stroke="#D97706" strokeWidth="2" />
              <line x1="95" y1="70" x2="95" y2="105" stroke="#D97706" strokeWidth="2" />
              <path d="M 72 108 Q 92 108 95 118" stroke="#B45309" strokeWidth="3" fill="none" />
            </g>
          )}

          {/* Fallback default untuk kata seperti Mama, Papa, Bola, Buku, dsb */}
          {['A','I','U','E','O','B','P','M'].indexOf(label.toUpperCase()) === -1 && (
            <g>
              <circle cx="92" cy="70" r="28" fill="#FEF08A" stroke="#D97706" strokeWidth="2" />
              <path d="M 80 70 Q 92 60 104 70" stroke="#B45309" strokeWidth="3" fill="none" />
              <text x="92" y="76" textAnchor="middle" fill="#92400E" fontSize="14" fontWeight="bold">
                {label}
              </text>
            </g>
          )}
        </g>

        {/* Lingkaran badge huruf */}
        <circle cx="34" cy="34" r="20" fill="#0D9488" />
        <text x="34" y="40" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
          {label.slice(0, 2)}
        </text>
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
      {/* Header Panel & Pilihan Sistem Isyarat */}
      <div className="flex items-center justify-between w-full mb-3 pb-2 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Hand className="w-3.5 h-3.5 text-teal-600" />
          Bahasa Isyarat
        </span>

        {/* Toggle Sistem SIBI vs BISINDO */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => onSystemChange?.('bisindo')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeSystem === 'bisindo'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Bahasa Isyarat Indonesia (alami)"
          >
            BISINDO
          </button>
          <button
            type="button"
            onClick={() => onSystemChange?.('sibi')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeSystem === 'sibi'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Sistem Isyarat Bahasa Indonesia"
          >
            SIBI
          </button>
        </div>
      </div>

      {/* Frame Visual / Media */}
      <div className="relative w-64 h-64 flex items-center justify-center bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
        {/* Bila ada media file fisik di public/media/isyarat/ dan tidak error */}
        {!assetLoadFailed ? (
          <img
            src={`/${isyaratData.gambar}`}
            alt={`Bahasa isyarat untuk ${label}`}
            className="w-full h-full object-contain p-2"
            onError={() => setAssetLoadFailed(true)}
          />
        ) : (
          renderSignIllustration()
        )}

        {/* Badge Sistem Isyarat */}
        <div className="absolute top-2 right-2 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
          {activeSystem.toUpperCase()}
        </div>
      </div>

      {/* Keterangan Gerakan */}
      <div className="mt-3 flex items-start gap-1.5 px-2 max-w-xs text-center justify-center">
        <Info className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          {isyaratData.deskripsiGerakan || `Bentuk isyarat tangan untuk ${label} dalam ${activeSystem.toUpperCase()}.`}
        </p>
      </div>

      {/* Kontrol Putar / Lambat */}
      <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-slate-100 w-full">
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-800 hover:bg-teal-100 rounded-lg text-xs font-semibold transition-colors"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'Jeda' : 'Putar'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setIsPlaying(true);
            setAssetLoadFailed(false);
          }}
          className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-xs transition-colors"
          title="Ulangi isyarat"
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
        >
          {playbackSpeed === 'lambat' ? '0.5x Lambat' : '1.0x Normal'}
        </button>
      </div>
    </div>
  );
};
