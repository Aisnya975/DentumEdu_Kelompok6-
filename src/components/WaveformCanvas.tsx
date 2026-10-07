import React, { useEffect, useRef } from 'react';

interface WaveformCanvasProps {
  dataArray: Uint8Array;
  isActive: boolean;
  isDetected: boolean;
}

export const WaveformCanvas: React.FC<WaveformCanvasProps> = ({
  dataArray,
  isActive,
  isDetected,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Garis dasar horizontal
    ctx.beginPath();
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    if (!isActive || dataArray.length === 0) {
      // Garis datar hening
      ctx.beginPath();
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 2;
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      return;
    }

    const barWidth = width / dataArray.length;
    const centerY = height / 2;

    // Gambar batang simetris
    for (let i = 0; i < dataArray.length; i++) {
      const val = dataArray[i];
      // Normalisasi tinggi 0 sampai centerY
      const barHeight = Math.max(3, (val / 255) * (height * 0.45));
      const x = i * barWidth;

      // Warna dinamis: lebih hijau/teal bila terdeteksi
      ctx.fillStyle = isDetected ? '#0D9488' : '#38BDF8';

      // Batang atas dan bawah dari pusat
      ctx.fillRect(x + 1, centerY - barHeight, Math.max(2, barWidth - 2), barHeight * 2);
    }
  }, [dataArray, isActive, isDetected]);

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 shadow-2xs">
      <div className="flex items-center justify-between px-2 mb-1">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Visualisasi Gelombang Suara
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          {isActive ? '● LIVE' : 'OFFLINE'}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={360}
        height={60}
        className="w-full h-14 rounded-lg bg-white border border-slate-100"
      />
    </div>
  );
};
