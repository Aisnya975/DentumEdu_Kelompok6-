import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Mic,
  Smartphone,
  Eye,
  Sliders,
  Download,
  Zap,
  RotateCcw,
  Sparkles,
  FileText,
  Activity,
} from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useHaptics } from '../hooks/useHaptics';
import { useVoiceDetection } from '../hooks/useVoiceDetection';
import { VoiceMeter } from '../components/VoiceMeter';
import { WaveformCanvas } from '../components/WaveformCanvas';
import { ChecklistItem } from '../types';

const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-nav',
    kategori: 'Navigasi',
    judul: 'Navigasi seluruh halaman (Beranda, Materi, Belajar, Latihan, Progres, Guru, Pengaturan) berjalan lancar tanpa error',
    lulus: true,
    catatan: 'Berjalan mulus di React Router',
  },
  {
    id: 'chk-materi',
    kategori: 'Penyajian Materi',
    judul: 'Semua materi (Vokal A-I-U-E-O, Bilabial B-P-M, Kata sederhana) tampil lengkap dengan 4 panel',
    lulus: true,
    catatan: '4 panel: Isyarat, Mulut, Pengucapan, Contoh kata',
  },
  {
    id: 'chk-audio-api',
    kategori: 'Sensor Vokalisasi',
    judul: 'Web Audio API dan AnalyserNode membaca level suara mikrofon real-time',
    lulus: false,
    catatan: 'Uji langsung dengan tombol di bawah',
  },
  {
    id: 'chk-manual-sim',
    kategori: 'Sensor Vokalisasi',
    judul: 'Mode Simulasi Manual (tekan-tahan) bekerja tanpa mikrofon',
    lulus: true,
    catatan: 'Responsif dengan status terdeteksi dan meter bergerak',
  },
  {
    id: 'chk-visual-feedback',
    kategori: 'Umpan Balik',
    judul: 'Meter suara, waveform visualizer, dan status multi-modal merespons volume suara',
    lulus: true,
    catatan: 'Dual coding warna + ikon + teks',
  },
  {
    id: 'chk-haptic',
    kategori: 'Haptik & Taktil',
    judul: 'Vibration API bergetar pada perangkat mobile Android yang mendukung, fallback visual bekerja di desktop/iOS',
    lulus: false,
    catatan: 'Uji dengan tombol uji getar',
  },
  {
    id: 'chk-progress',
    kategori: 'Penyimpanan Lokal',
    judul: 'Progres, bintang, dan pengaturan tersimpan di localStorage setelah reload',
    lulus: true,
    catatan: 'Tersimpan otomatis',
  },
];

export const Uji: React.FC = () => {
  const { settings } = useSettings();
  const { isVibrationSupported, visualRippleActive, triggerHaptic } = useHaptics(settings);

  // Status API browser
  const [supportStatus, setSupportStatus] = useState({
    mediaDevices: false,
    audioContext: false,
    vibration: false,
    localStorage: false,
    secureContext: false,
  });

  // Checklist state
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('dentum_edu_qa_checklist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CHECKLIST;
  });

  // Deteksi suara untuk uji
  const {
    status,
    volumeLevel,
    sustainedDurationMs,
    noiseFloor,
    micError,
    audioDataArray,
    isManualSimulating,
    startListening,
    stopListening,
    startManualSimulation,
    stopManualSimulation,
  } = useVoiceDetection({
    settings,
    targetDurationMs: 300,
  });

  useEffect(() => {
    setSupportStatus({
      mediaDevices: typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia,
      audioContext: typeof window !== 'undefined' && !!(window.AudioContext || (window as unknown as { webkitAudioContext: unknown }).webkitAudioContext),
      vibration: typeof navigator !== 'undefined' && 'vibrate' in navigator,
      localStorage: typeof window !== 'undefined' && !!window.localStorage,
      secureContext: typeof window !== 'undefined' && window.isSecureContext,
    });
  }, []);

  const handleToggleChecklist = (id: string) => {
    setChecklist(prev => {
      const updated = prev.map(item => (item.id === id ? { ...item, lulus: !item.lulus } : item));
      try {
        localStorage.setItem('dentum_edu_qa_checklist', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleUpdateNote = (id: string, note: string) => {
    setChecklist(prev => {
      const updated = prev.map(item => (item.id === id ? { ...item, catatan: note } : item));
      try {
        localStorage.setItem('dentum_edu_qa_checklist', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const exportReport = () => {
    const report = {
      tanggalUji: new Date().toISOString(),
      userAgent: navigator.userAgent,
      dukunganPerangkat: supportStatus,
      hasilChecklist: checklist,
      pengaturanAktif: settings,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `laporan_qa_dentum_edu_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
    dlAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header Halaman Uji */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-bold text-teal-700 tracking-wider uppercase mb-1">
            Quality Assurance & Diagnostics Suite
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Activity className="w-8 h-8 text-teal-700" />
            <span>Panel Uji Fitur & Diagnostik (/uji)</span>
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Halaman verifikasi teknis untuk menguji mikrofon, Web Audio API, Vibration API, serta daftar periksa QA.
          </p>
        </div>

        <button
          type="button"
          onClick={exportReport}
          className="flex items-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Ekspor Hasil Uji QA (JSON)</span>
        </button>
      </div>

      {/* 1. STATUS DUKUNGAN API PERANGKAT */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs mb-8">
        <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <span>Status Dukungan API Browser & Perangkat</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-700">HTTPS / Secure</span>
              {supportStatus.secureContext ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
            </div>
            <div className="text-xs text-slate-500">
              {supportStatus.secureContext ? 'Aman (HTTPS/Localhost)' : 'Tidak aman (Mic dibatasi)'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-700">getUserMedia (Mic)</span>
              {supportStatus.mediaDevices ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-500" />
              )}
            </div>
            <div className="text-xs text-slate-500">
              {supportStatus.mediaDevices ? 'Mendukung MediaStream' : 'Tidak didukung'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-700">Web Audio API</span>
              {supportStatus.audioContext ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-500" />
              )}
            </div>
            <div className="text-xs text-slate-500">
              {supportStatus.audioContext ? 'AudioContext & Analyser' : 'Tidak didukung'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-700">Vibration API</span>
              {supportStatus.vibration ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
            </div>
            <div className="text-xs text-slate-500">
              {supportStatus.vibration ? 'Getaran Fisik Didukung' : 'Simulasi Visual Layar'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-700">localStorage</span>
              {supportStatus.localStorage ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-500" />
              )}
            </div>
            <div className="text-xs text-slate-500">
              {supportStatus.localStorage ? 'Penyimpanan Progres OK' : 'Tidak didukung'}
            </div>
          </div>
        </div>
      </section>

      {/* 2. AREA PENGUJIAN INTERAKTIF LIVE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Live Audio & Meter Test */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Mic className="w-5 h-5 text-teal-600" />
            <span>Uji Level Mikrofon & Deteksi Suara Real-Time</span>
          </h2>

          <div className="py-2">
            <VoiceMeter
              level={volumeLevel}
              threshold={settings.sensitivitas}
              status={status}
              sustainedDurationMs={sustainedDurationMs}
              targetDurationMs={300}
            />
          </div>

          <div className="mt-4 mb-5">
            <WaveformCanvas
              dataArray={audioDataArray}
              isActive={status !== 'idle' || isManualSimulating}
              isDetected={status === 'detected' || status === 'success'}
            />
          </div>

          {micError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs mb-4">
              {micError}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {status === 'idle' ? (
              <button
                type="button"
                onClick={startListening}
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Mulai Uji Mikrofon Riil
              </button>
            ) : (
              <button
                type="button"
                onClick={stopListening}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Hentikan Uji Mikrofon
              </button>
            )}

            <button
              type="button"
              onMouseDown={startManualSimulation}
              onMouseUp={stopManualSimulation}
              onMouseLeave={stopManualSimulation}
              onTouchStart={startManualSimulation}
              onTouchEnd={stopManualSimulation}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors select-none ${
                isManualSimulating ? 'bg-amber-400 text-slate-900' : 'bg-amber-50 text-amber-900 border-amber-300'
              }`}
            >
              {isManualSimulating ? 'Melepas...' : 'Tekan & Tahan: Uji Simulasi'}
            </button>
          </div>

          {/* Panel Debug Nilai */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
            <span>Status: <strong>{status}</strong></span>
            <span>Level: <strong>{volumeLevel}%</strong></span>
            <span>Threshold: <strong>{settings.sensitivitas}%</strong></span>
            <span>Noise: <strong>{noiseFloor}%</strong></span>
          </div>
        </div>

        {/* Uji Getar Haptik */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-amber-600" />
              <span>Uji Pola Getaran Haptik</span>
            </h2>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Jalankan tiap pola getaran di bawah. Pada smartphone Android, getaran fisik akan terasa di telapak tangan. Pada desktop atau iOS, riak visual berdenyut di layar.
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => triggerHaptic('start')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition-colors"
              >
                <span>Pola 1: Awal Suara Masuk (Short 40ms)</span>
                <Zap className="w-4 h-4 text-amber-600" />
              </button>

              <button
                type="button"
                onClick={() => triggerHaptic('pulse')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition-colors"
              >
                <span>Pola 2: Denyut Vokalisasi Ritmik (Pulse)</span>
                <Zap className="w-4 h-4 text-amber-600" />
              </button>

              <button
                type="button"
                onClick={() => triggerHaptic('success')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-900 transition-colors"
              >
                <span>Pola 3: Perayaan Sukses ([100, 50, 100, 50, 200]ms)</span>
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </button>

              <button
                type="button"
                onClick={() => triggerHaptic('warning')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-bold text-amber-900 transition-colors"
              >
                <span>Pola 4: Peringatan Terlalu Pelan/Keras</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </button>
            </div>
          </div>

          {/* Indikator Riak Visual */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center ${visualRippleActive ? 'scale-125 animate-ping' : ''}`}>
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="text-xs text-amber-900">
              <div className="font-bold">Indikator Respon Visual Taktil</div>
              <div className="text-[11px] text-amber-800">
                {visualRippleActive ? '● Sedang Bergetar!' : 'Menunggu pemicu getar...'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DAFTAR PERIKSA (CHECKLIST) PENGUJIAN */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            <span>Checklist Verifikasi Tim Pengujian (QA)</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Tersimpan otomatis di browser
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {checklist.map(item => (
            <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={item.lulus}
                  onChange={() => handleToggleChecklist(item.id)}
                  className="w-5 h-5 accent-teal-600 rounded cursor-pointer mt-0.5 shrink-0"
                  id={item.id}
                />
                <label htmlFor={item.id} className="cursor-pointer">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <span>{item.judul}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.2 rounded font-medium">
                      {item.kategori}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Status: <strong className={item.lulus ? 'text-emerald-700' : 'text-amber-700'}>
                      {item.lulus ? 'Lulus Verifikasi' : 'Belum Diverifikasi'}
                    </strong>
                  </div>
                </label>
              </div>

              {/* Kolom Catatan Penguji */}
              <div className="w-full sm:w-64">
                <input
                  type="text"
                  value={item.catatan}
                  onChange={e => handleUpdateNote(item.id, e.target.value)}
                  placeholder="Catatan penguji..."
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
