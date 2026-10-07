import React from 'react';
import {
  Info,
  ShieldCheck,
  Heart,
  Eye,
  Hand,
  Sparkles,
  BookOpen,
  Users,
  ExternalLink,
} from 'lucide-react';

export const Tentang: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-bold text-teal-700 tracking-wider uppercase mb-1">
          Mengenal DENTUM-EDU
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Tentang DENTUM-EDU
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Media pembelajaran mandiri berbasis web dengan pendekatan visual-taktil untuk anak tunarungu.
        </p>
      </div>

      {/* Peringatan Utama Batasan Sistem */}
      <div className="p-6 bg-amber-50/90 border border-amber-300 rounded-3xl mb-8 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
          <strong className="block text-base font-bold text-amber-900 mb-1">
            Penegasan Batasan Sistem & Etika Penggunaan
          </strong>
          DENTUM-EDU dirancang murni sebagai <strong>media pendukung latihan</strong>, bukan pengganti guru pendidikan luar biasa (SLB), orang tua, maupun terapis wicara berlisensi. Sistem sensor mikrofon (Web Audio API) hanya mengukur adanya hembusan suara, kekuatan, dan durasi berkelanjutan. Sistem <strong>tidak mengklaim menilai kebenaran fonem</strong> secara linguistik. Keberhasilan anak bertumpu pada bimbingan interaktif bersama pendamping manusia.
        </div>
      </div>

      <div className="space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
        {/* Latar Belakang & Masalah */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <span>Latar Belakang & Filosofi Pendekatan Visual-Taktil</span>
          </h2>
          <p className="mb-3">
            Anak dengan hambatan pendengaran (tunarungu) sering mengalami kesulitan dalam latihan artikulasi karena mereka tidak dapat mendengar suara mereka sendiri untuk melakukan koreksi pendengaran (auditory feedback loop). Metode konvensional sangat bergantung pada petunjuk visual dan sensasi kinestetik/taktil.
          </p>
          <p>
            DENTUM-EDU menghadirkan pendekatan multi-modal terintegrasi:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100">
              <Eye className="w-5 h-5 text-teal-700 mb-2" />
              <strong className="block text-slate-900 text-xs mb-1">Visualisasi Anatomi</strong>
              <p className="text-[11px] text-slate-600">
                Animasi tampak depan bibir dan penampang lateral vokal traktus (posisi lidah, rahang, dan getaran pita suara).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
              <Hand className="w-5 h-5 text-amber-700 mb-2" />
              <strong className="block text-slate-900 text-xs mb-1">Bahasa Isyarat Alami</strong>
              <p className="text-[11px] text-slate-600">
                Penyajian isyarat BISINDO dan SIBI sebagai jembatan komunikasi bahasa ibu anak tuli.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
              <Sparkles className="w-5 h-5 text-sky-700 mb-2" />
              <strong className="block text-slate-900 text-xs mb-1">Umpan Balik Taktil</strong>
              <p className="text-[11px] text-slate-600">
                Simulasi haptik bergetar di ponsel pintar untuk menggantikan persepsi pendengaran dengan sentuhan fisik.
              </p>
            </div>
          </div>
        </section>

        {/* Spesifikasi Teknis Prototipe */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-teal-600" />
            <span>Spesifikasi & Keunggulan Prototipe Web</span>
          </h2>
          <ul className="space-y-2 list-disc list-inside text-slate-600 text-xs sm:text-sm">
            <li><strong>Zero Backend & Privasi Terjaga:</strong> Tidak ada audio yang disimpan ke server eksternal; pemrosesan sinyal dilakukan 100% di browser via AnalyserNode.</li>
            <li><strong>Ringan & Bebas Dependensi Berat:</strong> Seluruh animasi mulut dan isyarat dioptimalkan menggunakan format SVG interaktif.</li>
            <li><strong>Mode Simulasi Manual:</strong> Memastikan latihan tetap dapat didemonstrasikan di perangkat tanpa mikrofon.</li>
            <li><strong>Aksesibilitas Tinggi:</strong> Sesuai prinsip WCAG dengan kontras tinggi, mode bebas animasi cepat, dan target sentuh besar (&ge; 48px).</li>
          </ul>
        </section>

        {/* Tim Pengembang & Referensi */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" />
            <span>Tim Pengembang & Referensi Ilmiah</span>
          </h2>
          <p className="mb-4">
            DENTUM-EDU dikembangkan dengan semangat inklusivitas pendidikan khusus bagi anak berkebutuhan khusus di Indonesia.
          </p>
          <div className="space-y-2 text-xs text-slate-500">
            <div>1. Somad, P. & Hernawati, T. (1995). <em>Ortopedagogik Anak Tunarungu</em>. Departemen Pendidikan dan Kebudayaan.</div>
            <div>2. Bunawan, L. & Yuwati, C.S. (2000). <em>Penguasaan Bahasa pada Anak Tunarungu</em>. Yayasan Santi Rama.</div>
            <div>3. W3C Web Content Accessibility Guidelines (WCAG) 2.2.</div>
          </div>
        </section>
      </div>
    </div>
  );
};
