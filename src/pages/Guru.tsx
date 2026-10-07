import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldAlert,
  Sliders,
  Download,
  Key,
  Unlock,
  Lock,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  FileText,
  FileCheck,
} from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useProgress } from '../hooks/useProgress';
import rawMateri from '../data/materi.json';
import { MateriItem } from '../types';

const materiList = rawMateri as MateriItem[];

export const Guru: React.FC = () => {
  const { settings, updateSetting } = useSettings();
  const { progress, exportProgressJson } = useProgress();

  // Pengaman PIN sederhana (default: 1234 atau jawaban matematika 5 + 3 = 8)
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleUnlockPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1234' || pinInput.trim() === '8') {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const exportSummaryText = () => {
    const lines = [
      '========================================',
      'RINGKASAN PROGRES LATIHAN DENTUM-EDU',
      `Tanggal Unduh: ${new Date().toLocaleDateString('id-ID')}`,
      '========================================',
      '',
      `Total Sesi Latihan: ${progress.totalSesi}`,
      `Lencana Diraih: ${progress.lencana.join(', ') || 'Belum ada'}`,
      '',
      'RINCIAN MATERI:',
    ];

    materiList.forEach(m => {
      const p = progress.materi[m.id];
      const status = p ? (p.status === 'selesai' ? 'Selesai' : 'Sedang') : 'Belum';
      const bintang = p ? `${p.bintang} bintang` : '0 bintang';
      const coba = p ? `${p.percobaan}x coba (${p.sukses}x sukses)` : '0x';
      lines.push(`- Bunyi ${m.label} (${m.contoh.kata}): [${status}] | ${bintang} | ${coba}`);
    });

    lines.push('');
    lines.push('Catatan: Hasil ini mencatat deteksi vokalisasi sensor, bukan evaluasi fonetik medis.');

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `laporan_dentum_edu_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="text-xs font-bold text-teal-700 tracking-wider uppercase mb-1">
            Pendamping Edukasi
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HeartHandshake className="w-8 h-8 text-teal-700" />
            <span>Panel Guru & Orang Tua</span>
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Panduan metodologis mendampingi anak tunarungu berlatih artikulasi visual-taktil serta pengaturan lanjutan.
          </p>
        </div>

        {/* Tombol Ekspor Laporan */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportSummaryText}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Unduh Laporan Teks (.txt)</span>
          </button>
          <button
            type="button"
            onClick={exportProgressJson}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-teal-50 border border-teal-200 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor JSON</span>
          </button>
        </div>
      </div>

      {/* Peringatan Etika & Batasan Sistem */}
      <div className="p-5 bg-amber-50/90 border border-amber-300 rounded-3xl mb-8 flex items-start gap-3.5 text-xs text-amber-950">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block text-sm font-bold text-amber-900 mb-0.5">
            Prinsip Utama: DENTUM-EDU Bukan Pengganti Terapis Wicara
          </strong>
          Media ini adalah sarana pendukung latihan mandiri di rumah atau kelas. Sensor Web Audio hanya membaca aktivitas hembusan/kekuatan suara (amplitudo dan kontinuitas), bukan menilai apakah fonem dibunyikan secara presisi menurut kaidah fonetik. Penilaian ketepatan artikulasi tetap membutuhkan bimbingan aktif guru SLB, orang tua, atau terapis wicara berlisensi.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Kiri: Panduan Praktis Mendampingi Anak */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <span>Panduan Pendampingan Visual-Taktil</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <strong className="text-teal-800 font-bold block mb-1">
                  1. Sentuhan Taktil pada Tubuh (Haptic Feedback Alami)
                </strong>
                Bimbing anak meletakkan telapak tangannya di <strong>leher bagian bawah (tenggorokan)</strong> saat melatih bunyi vokal (A, I, U, E, O) dan bunyi bersuara (B, M) untuk merasakan getaran pita suara. Untuk bunyi letup tak bersuara (seperti P), letakkan tangan di <strong>depan bibir</strong> untuk merasakan hembusan angin dingin.
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <strong className="text-teal-800 font-bold block mb-1">
                  2. Cermin Pendamping
                </strong>
                Sediakan cermin kecil di samping layar agar anak dapat membandingkan bentuk bibir aslinya dengan model animasi mulut SVG di layar.
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <strong className="text-teal-800 font-bold block mb-1">
                  3. Penguatan Positif & Minimalkan Tekanan
                </strong>
                Target awal bukanlah kesempurnaan fonem, melainkan keberanian anak mengeluarkan vokalisasi dan merasakan sensasi getaran tubuhnya sendiri. Rayakan setiap usaha anak dengan ekspresi hangat dan bahasa isyarat penyemangat.
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <strong className="text-teal-800 font-bold block mb-1">
                  4. Mengatasi Kebisingan Ruangan
                </strong>
                Jika latihan dilakukan di kelas yang ramai, jalankan kalibrasi 2 detik di halaman latihan, atau sesuaikan slider sensitivitas di panel pengaturan agar mikrofon tidak terpicu suara di luar anak.
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Pengaturan Lanjutan Guru (Dilindungi PIN) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-teal-600" />
                <span>Pengaturan Khusus Guru</span>
              </h2>

              <div className="text-xs">
                {isUnlocked ? (
                  <span className="text-teal-700 font-bold flex items-center gap-1">
                    <Unlock className="w-3.5 h-3.5" /> Terbuka
                  </span>
                ) : (
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Terkunci
                  </span>
                )}
              </div>
            </div>

            {!isUnlocked ? (
              <form onSubmit={handleUnlockPin} className="space-y-4 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
                  Masukkan PIN pengaman untuk mengakses pengaturan lanjutan (Default PIN: <strong>1234</strong> atau hitung <strong>5 + 3 = ?</strong>).
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    PIN Guru / Hasil Hitungan
                  </label>
                  <input
                    type="password"
                    value={pinInput}
                    onChange={e => setPinInput(e.target.value)}
                    placeholder="Ketik 1234 atau 8"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                  />
                  {pinError && (
                    <p className="text-xs text-rose-600 mt-1 font-semibold">
                      PIN salah. Gunakan 1234 atau 8.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
                >
                  Buka Pengaturan Guru
                </button>
              </form>
            ) : (
              <div className="space-y-5 pt-2">
                {/* Opsi Buka Semua Materi */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Buka Semua Modul Materi
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Nonaktifkan penguncian bertahap agar anak bebas memilih materi apa pun.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.bukaSemuaMateri}
                    onChange={e => updateSetting('bukaSemuaMateri', e.target.checked)}
                    className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
                  />
                </div>

                {/* Sensitivitas Cepat */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-800">
                      Ambang Sensitivitas Suara
                    </span>
                    <span className="text-xs font-mono font-bold text-teal-700">
                      {settings.sensitivitas}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Nilai lebih rendah = sensor lebih mudah terpicu suara pelan.
                  </p>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={settings.sensitivitas}
                    onChange={e => updateSetting('sensitivitas', Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>

                {/* Target Durasi Minimal */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-800">
                      Durasi Vokalisasi Minimal
                    </span>
                    <span className="text-xs font-mono font-bold text-teal-700">
                      {settings.durasiMinimalMs} ms
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Berapa milidetik anak harus menahan suaranya agar dihitung sukses.
                  </p>
                  <input
                    type="range"
                    min="150"
                    max="800"
                    step="50"
                    value={settings.durasiMinimalMs}
                    onChange={e => updateSetting('durasiMinimalMs', Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setIsUnlocked(false)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Kunci Kembali Panel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
