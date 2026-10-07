import React from 'react';
import {
  Sliders,
  Smartphone,
  Eye,
  Hand,
  RotateCcw,
  Volume2,
  Check,
  Zap,
} from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useHaptics } from '../hooks/useHaptics';

export const Pengaturan: React.FC = () => {
  const { settings, updateSetting, resetSettings } = useSettings();
  const { isVibrationSupported, visualRippleActive, triggerHaptic } = useHaptics(settings);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-bold text-teal-700 tracking-wider uppercase mb-1">
            Konfigurasi Aplikasi
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sliders className="w-7 h-7 text-teal-700" />
            <span>Pengaturan & Aksesibilitas</span>
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Sesuaikan sensitivitas sensor vokalisasi, getaran haptik, dan tampilan sesuai kebutuhan anak.
          </p>
        </div>

        <button
          type="button"
          onClick={resetSettings}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Kembalikan Default</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* 1. SENSOR VOKALISASI */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <Volume2 className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">
              Sensor Vokalisasi & Mikrofon
            </h2>
          </div>

          <div className="space-y-5">
            {/* Slider Sensitivitas */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-800">
                  Ambang Batas Suara (Sensitivitas)
                </label>
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {settings.sensitivitas}%
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2">
                Geser ke kiri untuk anak dengan suara lembut/pelan, geser ke kanan bila di ruangan bising.
              </p>
              <input
                type="range"
                min="15"
                max="75"
                value={settings.sensitivitas}
                onChange={e => updateSetting('sensitivitas', Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                <span>Sangat Peka (15%)</span>
                <span>Sedang (35%)</span>
                <span>Ketat (75%)</span>
              </div>
            </div>

            {/* Durasi Minimal Vokalisasi */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-800">
                  Durasi Tahan Suara Minimal
                </label>
                <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {settings.durasiMinimalMs} ms
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2">
                Lama hembusan suara stabil agar deteksi dinyatakan berhasil.
              </p>
              <input
                type="range"
                min="200"
                max="700"
                step="50"
                value={settings.durasiMinimalMs}
                onChange={e => updateSetting('durasiMinimalMs', Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* 2. GETARAN HAPTIK & TAKTIL */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900">
                Umpan Balik Getaran Haptik
              </h2>
            </div>

            {/* Status Dukungan */}
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              isVibrationSupported ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
            }`}>
              {isVibrationSupported ? 'Vibration API Didukung' : 'Simulasi Visual Layar'}
            </span>
          </div>

          <div className="space-y-5">
            {/* Toggle Aktifkan Haptik */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Aktifkan Simulasi Haptik
                </span>
                <span className="text-xs text-slate-500">
                  Memberikan sensasi getar saat vokalisasi berlangsung.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.hapticEnabled}
                onChange={e => updateSetting('hapticEnabled', e.target.checked)}
                className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
              />
            </div>

            {/* Kekuatan Getar */}
            {settings.hapticEnabled && (
              <div className="pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 block mb-2">
                  Tingkat Kekuatan Getar
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['rendah', 'sedang', 'tinggi'] as const).map(strength => (
                    <button
                      key={strength}
                      type="button"
                      onClick={() => updateSetting('hapticStrength', strength)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-colors flex items-center justify-center gap-1.5 ${
                        settings.hapticStrength === strength
                          ? 'bg-amber-400 text-slate-900 shadow-2xs font-extrabold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {settings.hapticStrength === strength && <Check className="w-3.5 h-3.5" />}
                      <span>{strength}</span>
                    </button>
                  ))}
                </div>

                {/* Tombol Uji Getar Langsung */}
                <div className="mt-4 flex items-center justify-between p-3 bg-amber-50 rounded-2xl border border-amber-200">
                  <span className="text-xs text-amber-900 font-medium">
                    Coba rasakan getaran di tanganmu sekarang:
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerHaptic('success')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold rounded-xl text-xs transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Uji Getar Sukses</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. BAHASA ISYARAT & ANIMASI */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <Hand className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">
              Bahasa Isyarat & Kecepatan Animasi
            </h2>
          </div>

          <div className="space-y-4">
            {/* Pilihan BISINDO vs SIBI */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Sistem Bahasa Isyarat Standar
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateSetting('sistemIsyarat', 'bisindo')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    settings.sistemIsyarat === 'bisindo'
                      ? 'bg-teal-50 border-teal-400 shadow-2xs'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">BISINDO</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Bahasa Isyarat Indonesia (umum digunakan komunitas tuli sehari-hari)
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => updateSetting('sistemIsyarat', 'sibi')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    settings.sistemIsyarat === 'sibi'
                      ? 'bg-teal-50 border-teal-400 shadow-2xs'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">SIBI</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Sistem Isyarat Bahasa Indonesia (sistem tata isyarat formal kurikulum)
                  </div>
                </button>
              </div>
            </div>

            {/* Kecepatan Animasi Mulut */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Kecepatan Animasi Mulut
                </span>
                <span className="text-xs text-slate-500">
                  Gunakan mode lambat agar gerakan bibir dan lidah lebih mudah dicermati.
                </span>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => updateSetting('kecepatanAnimasi', 'normal')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                    settings.kecepatanAnimasi === 'normal'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  1.0x Normal
                </button>
                <button
                  type="button"
                  onClick={() => updateSetting('kecepatanAnimasi', 'lambat')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                    settings.kecepatanAnimasi === 'lambat'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  0.5x Lambat
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. AKSESIBILITAS TAMPILAN */}
        <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
            <Eye className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">
              Aksesibilitas Tampilan
            </h2>
          </div>

          <div className="space-y-4">
            {/* Ukuran Teks */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Ukuran Teks
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['S', 'M', 'L', 'XL'] as const).map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => updateSetting('ukuranTeks', size)}
                    className={`py-2 rounded-xl text-xs font-bold transition-colors ${
                      settings.ukuranTeks === size
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {size} {size === 'M' && '(Standar)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Kontras Tinggi */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Mode Kontras Tinggi
                </span>
                <span className="text-xs text-slate-500">
                  Mempertajam batas visual dan warna teks untuk kemudahan membaca.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.kontrasTinggi}
                onChange={e => updateSetting('kontrasTinggi', e.target.checked)}
                className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
              />
            </div>

            {/* Kurangi Gerakan */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Kurangi Gerakan (Reduce Motion)
                </span>
                <span className="text-xs text-slate-500">
                  Mengurangi animasi berkedip dan transisi cepat.
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.kurangiGerakan}
                onChange={e => updateSetting('kurangiGerakan', e.target.checked)}
                className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
