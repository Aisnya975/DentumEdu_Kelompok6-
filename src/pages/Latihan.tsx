import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Mic,
  MicOff,
  ArrowLeft,
  Volume2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Sliders,
  Hand,
} from 'lucide-react';
import rawMateri from '../data/materi.json';
import { MateriItem } from '../types';
import { useVoiceDetection } from '../hooks/useVoiceDetection';
import { useHaptics } from '../hooks/useHaptics';
import { useProgress } from '../hooks/useProgress';
import { useSettings } from '../hooks/useSettings';
import { VoiceMeter } from '../components/VoiceMeter';
import { WaveformCanvas } from '../components/WaveformCanvas';
import { HapticIndicator } from '../components/HapticIndicator';
import { CelebrationModal } from '../components/CelebrationModal';
import { MouthAnimation } from '../components/MouthAnimation';

const materiList = rawMateri as MateriItem[];

export const Latihan: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { settings } = useSettings();
  const { recordAttempt, getMaterialProgress } = useProgress();
  const { isVibrationSupported, visualRippleActive, triggerHaptic } = useHaptics(settings);

  const currentIndex = materiList.findIndex(m => m.id === id);
  const currentItem = currentIndex !== -1 ? materiList[currentIndex] : materiList[0];
  const nextItem = currentIndex < materiList.length - 1 ? materiList[currentIndex + 1] : null;

  const [sessionAttempts, setSessionAttempts] = useState(0);
  const [sessionSuccesses, setSessionSuccesses] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);

  // Setup deteksi suara
  const {
    status,
    volumeLevel,
    sustainedDurationMs,
    noiseFloor,
    isCalibrated,
    micError,
    audioDataArray,
    isManualSimulating,
    startListening,
    stopListening,
    startCalibration,
    startManualSimulation,
    stopManualSimulation,
  } = useVoiceDetection({
    settings,
    targetDurationMs: currentItem.targetDurasiMs || 350,
    onSuccess: () => {
      triggerHaptic('success');
      setSessionSuccesses(s => s + 1);
      setSessionAttempts(a => a + 1);
      recordAttempt(currentItem.id, true);
      setShowCelebration(true);
    },
    onSoundStart: () => {
      triggerHaptic('start');
    },
    onSoundOngoing: () => {
      triggerHaptic('pulse');
    },
    onWarning: () => {
      triggerHaptic('warning');
    },
  });

  const isSensorActive = status !== 'idle';
  const effectiveThreshold = Math.max(noiseFloor + settings.noiseFloorMargin, settings.sensitivitas);

  const handleStartMic = () => {
    // Tampilkan penjelasan ramah jika belum pernah
    if (!isCalibrated && !micError) {
      setShowPermissionPrompt(true);
    } else {
      startListening();
    }
  };

  const handleConfirmMicPermission = () => {
    setShowPermissionPrompt(false);
    startListening();
  };

  const handleRetryExercise = () => {
    setShowCelebration(false);
    if (!isSensorActive) {
      startListening();
    }
  };

  const handleNextExercise = () => {
    setShowCelebration(false);
    stopListening();
    if (nextItem) {
      navigate(`/belajar/${nextItem.id}`);
    } else {
      navigate('/progres');
    }
  };

  // Bersihkan audio saat keluar
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Bar Atas & Pengingat Materi */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
        <Link
          to={`/belajar/${currentItem.id}`}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Penjelasan {currentItem.label}</span>
        </Link>

        {/* Skor Sesi Latihan */}
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            Sukses Sesi: <strong>{sessionSuccesses}</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span>Percobaan: <strong>{sessionAttempts}</strong></span>
        </div>
      </div>

      {/* Grid Utama Latihan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Kiri: Target Bunyi & Pengingat Visual Kecil */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Kartu Target */}
          <div className="bg-white rounded-[32px] p-6 border-2 border-slate-200 shadow-sm text-left">
            <span className="font-display text-xs font-bold text-teal-700 tracking-wider uppercase block mb-1">
              ✦ Target Latihan Vokalisasi ✦
            </span>
            <div className="flex items-center gap-4 my-3">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-teal-600 to-sky-400 text-white flex items-center justify-center font-display font-black text-3xl shadow-md">
                {currentItem.label}
              </div>
              <div>
                <h1 className="font-display text-2xl font-black text-slate-900 tracking-tight">
                  Bunyi "{currentItem.label}"
                </h1>
                <p className="text-xs text-slate-500 font-semibold">
                  Contoh kata: <strong className="text-slate-800">{currentItem.contoh.kata}</strong>
                </p>
              </div>
            </div>

            {/* Pengingat Singkat Cara Pengucapan */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="font-display text-xs font-bold text-slate-700 block mb-2">
                Pengingat Artikulasi:
              </span>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                {currentItem.pengucapan.slice(0, 3).map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Miniatur Mulut & Haptik */}
          <div className="bg-white rounded-[32px] p-5 border-2 border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-display text-xs font-bold text-slate-500 uppercase tracking-wider">
                Panduan Bentuk Mulut
              </span>
              <Link
                to={`/belajar/${currentItem.id}`}
                className="text-xs font-bold text-teal-700 hover:underline"
              >
                Lihat Detail
              </Link>
            </div>
            <div className="w-full flex justify-center py-1">
              <div className="scale-85 origin-center">
                <MouthAnimation animasiKey={currentItem.mulut.animasi} mulutData={currentItem.mulut} />
              </div>
            </div>
          </div>

          {/* Status Haptik & Getaran */}
          <HapticIndicator
            isSupported={isVibrationSupported}
            isRippling={visualRippleActive}
            settings={settings}
            onTest={() => triggerHaptic('pulse')}
          />
        </div>

        {/* Kolom Kanan: Panggung Sensor Vokalisasi & Umpan Balik Visual */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-[36px] p-6 sm:p-10 border-2 border-slate-200 shadow-sm">
            {/* Disclaimer Penting di Atas */}
            <div className="mb-6 flex items-start gap-3 p-4 bg-amber-50/80 border border-amber-300 rounded-2xl text-xs text-amber-950">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Catatan Sistem:</strong> Media ini mendeteksi keberadaan dan hembusan suara (volume & durasi), bukan menilai keakuratan pengucapan fonem. Gunakan bersama bimbingan guru atau orang tua.
              </div>
            </div>

            {/* Pengukur Suara Utama */}
            <div className="my-4">
              <VoiceMeter
                level={volumeLevel}
                threshold={effectiveThreshold}
                status={status}
                sustainedDurationMs={sustainedDurationMs}
                targetDurationMs={currentItem.targetDurasiMs || 350}
              />
            </div>

            {/* Kanvas Gelombang Visualizer */}
            <div className="mt-6 mb-8">
              <WaveformCanvas
                dataArray={audioDataArray}
                isActive={isSensorActive || isManualSimulating}
                isDetected={status === 'detected' || status === 'success'}
              />
            </div>

            {/* Error mikrofon jika ada */}
            {micError && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                <div className="flex-1">
                  <div className="font-bold">Akses Mikrofon Terkendala</div>
                  <p className="mt-0.5">{micError}</p>
                  <p className="mt-2 font-medium">
                    Jangan khawatir! Kamu tetap bisa menggunakan <strong>Mode Simulasi Manual</strong> di bawah untuk mencoba latihan.
                  </p>
                </div>
              </div>
            )}

            {/* KONTROL UTAMA SENSOR */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-100">
              {/* Tombol Mikrofon Riil */}
              {!isSensorActive ? (
                <button
                  type="button"
                  onClick={handleStartMic}
                  className="w-full sm:w-auto px-9 py-4 bg-teal-700 hover:bg-teal-800 active:scale-98 text-white font-display font-extrabold rounded-full text-base transition-all shadow-md flex items-center justify-center gap-3"
                >
                  <Mic className="w-5 h-5" />
                  <span>Mulai Rekam Suara</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopListening}
                  className="w-full sm:w-auto px-9 py-4 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-display font-extrabold rounded-full text-base transition-all shadow-md flex items-center justify-center gap-3"
                >
                  <MicOff className="w-5 h-5" />
                  <span>Hentikan Sensor</span>
                </button>
              )}

              {/* MODE SIMULASI MANUAL (Tekan & Tahan) */}
              <button
                type="button"
                onMouseDown={startManualSimulation}
                onMouseUp={stopManualSimulation}
                onMouseLeave={stopManualSimulation}
                onTouchStart={startManualSimulation}
                onTouchEnd={stopManualSimulation}
                className={`w-full sm:w-auto px-7 py-4 rounded-full text-sm font-display font-extrabold transition-all border-2 select-none flex items-center justify-center gap-2 ${
                  isManualSimulating
                    ? 'bg-amber-400 text-slate-900 border-amber-500 scale-98 shadow-inner'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 shadow-sm'
                }`}
                title="Tekan dan tahan untuk meniru suara saat tidak menggunakan mikrofon"
              >
                <Flame className={`w-4 h-4 ${isManualSimulating ? 'text-rose-600' : 'text-amber-700'}`} />
                <span>
                  {isManualSimulating ? 'Lepas untuk Berhenti' : 'Tekan & Tahan: Simulasikan Suara'}
                </span>
              </button>
            </div>

            {/* Kalibrasi Ulang Kebisingan */}
            {isSensorActive && (
              <div className="mt-5 flex items-center justify-center gap-4 text-xs text-slate-500 font-medium">
                <span>Ambang Suara: {effectiveThreshold}%</span>
                <span>·</span>
                <span>Noise Floor: {noiseFloor}%</span>
                <span>·</span>
                <button
                  type="button"
                  onClick={startCalibration}
                  className="text-teal-700 hover:underline font-bold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Kalibrasi Ulang Suasana
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Izin Mikrofon Ramah */}
      {showPermissionPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-left">
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center mb-4">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Izin Penggunaan Mikrofon
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              DENTUM-EDU memerlukan mikrofon hanya untuk mengukur ada/tidaknya hembusan suara dan kekuatan vokalisasi anak.
            </p>
            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
              ✓ Suara diolah langsung di perangkat (Web Audio API lokal)<br />
              ✓ Tidak ada suara yang direkam atau dikirim ke internet<br />
              ✓ Privasi anak 100% terjaga
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPermissionPrompt(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmMicPermission}
                className="px-5 py-2.5 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-xl transition-colors shadow-xs"
              >
                Lanjutkan & Izinkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Perayaan Keberhasilan */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        onRetry={handleRetryExercise}
        onNext={nextItem ? handleNextExercise : undefined}
        targetLabel={currentItem.label}
        earnedStars={3}
      />
    </div>
  );
};
