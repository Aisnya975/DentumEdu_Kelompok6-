export type KategoriMateri = 'vokal' | 'konsonan' | 'kata';

export type SistemIsyarat = 'sibi' | 'bisindo';

export interface IsyaratData {
  sibi: string;
  bisindo: string;
  gambar: string;
  deskripsiGerakan?: string;
}

export interface MulutData {
  animasi: string;
  deskripsi: string;
  posisiBibir?: string;
  posisiLidah?: string;
  posisiRahang?: string;
  getaranPitaSuara?: boolean;
}

export interface ContohData {
  kata: string;
  gambar: string;
  arti?: string;
}

export interface MateriItem {
  id: string;
  kategori: KategoriMateri;
  label: string;
  urutan: number;
  isyarat: IsyaratData;
  mulut: MulutData;
  pengucapan: string[];
  contoh: ContohData;
  targetDurasiMs?: number;
  catatanTambahan?: string;
}

export interface MateriProgress {
  id: string;
  status: 'belum' | 'sedang' | 'selesai';
  percobaan: number;
  sukses: number;
  bintang: number; // 0 sampai 3
  terakhirDicoba?: string;
}

export interface UserProgressState {
  materi: Record<string, MateriProgress>;
  totalSesi: number;
  lencana: string[];
}

export interface AppSettings {
  sensitivitas: number; // 10 - 90 (ambang deteksi)
  durasiMinimalMs: number; // default 300ms
  hapticEnabled: boolean;
  hapticStrength: 'rendah' | 'sedang' | 'tinggi';
  sistemIsyarat: SistemIsyarat;
  kecepatanAnimasi: 'normal' | 'lambat';
  ukuranTeks: 'S' | 'M' | 'L' | 'XL';
  kontrasTinggi: boolean;
  kurangiGerakan: boolean;
  bukaSemuaMateri: boolean;
  noiseFloorMargin: number; // default 8
}

export type VoiceStatus = 'idle' | 'calibrating' | 'listening' | 'detected' | 'too_quiet' | 'too_loud' | 'success';

export interface ChecklistItem {
  id: string;
  kategori: string;
  judul: string;
  lulus: boolean;
  catatan: string;
}
