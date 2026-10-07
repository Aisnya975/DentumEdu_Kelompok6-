import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Sparkles,
  BookOpen,
  Search,
  Volume2,
  HeartHandshake,
  Activity,
  Smile,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Beranda', to: '/' },
    { label: 'Materi', to: '/materi' },
    { label: 'Latihan', to: '/latihan/vokal-a' },
    { label: 'Progres', to: '/progres' },
    { label: 'Guru & Ortu', to: '/guru' },
    { label: 'Tentang', to: '/tentang' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Zone: Logo ramah anak sesuai referensi */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 via-sky-400 to-amber-300 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6 drop-shadow-xs" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-teal-900 leading-none">
              DENTUM-EDU
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-teal-600 tracking-wide mt-0.5">
              Lihat · Tiru · Rasakan
            </span>
          </div>
        </Link>

        {/* Center Nav Links: Teks bersih dengan hover lembut */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors py-1 ${
                isActive(link.to)
                  ? 'text-teal-700 font-bold border-b-2 border-teal-600'
                  : 'hover:text-teal-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions: Tombol pencarian & pill badges seperti referensi */}
        <div className="hidden md:flex items-center gap-3">
          {/* Tombol Uji Perangkat */}
          <Link
            to="/uji"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 flex items-center justify-center transition-colors"
            title="Uji Sensor Mikrofon & Getaran (/uji)"
          >
            <Activity className="w-4 h-4" />
          </Link>

          {/* Tombol Kuning Emas: Masuk / Mulai Belajar */}
          <Link
            to="/materi"
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 font-bold rounded-full text-xs transition-transform hover:scale-102 shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-900" />
            <span>Mulai Belajar</span>
          </Link>

          {/* Tombol Hijau Teal: Panduan Guru */}
          <Link
            to="/guru"
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold rounded-full text-xs transition-transform hover:scale-102 shadow-xs flex items-center gap-1.5"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Panduan Ortu</span>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/materi"
            className="px-3.5 py-1.5 bg-amber-400 text-slate-900 font-bold rounded-full text-xs shadow-xs"
          >
            Mulai
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-teal-700 rounded-xl hover:bg-slate-100"
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-teal-100 bg-white px-5 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors ${
                isActive(link.to)
                  ? 'bg-teal-50 text-teal-800'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/guru"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-teal-600 text-white rounded-xl text-xs font-bold"
            >
              Panduan Guru & Orang Tua
            </Link>
            <Link
              to="/uji"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold"
            >
              Uji Sensor & Mikrofon (/uji)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
