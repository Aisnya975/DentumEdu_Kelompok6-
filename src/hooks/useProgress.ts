import { useState, useEffect, useCallback } from 'react';
import { UserProgressState, MateriProgress } from '../types';
import rawMateri from '../data/materi.json';

const PROGRESS_STORAGE_KEY = 'dentum_edu_progress_v1';

const INITIAL_PROGRESS: UserProgressState = {
  materi: {},
  totalSesi: 0,
  lencana: [],
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgressState>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Evaluasi pencapaian lencana
  const evaluateBadges = (currentMateri: Record<string, MateriProgress>): string[] => {
    const badges: string[] = [];
    const values = Object.values(currentMateri);
    const completedCount = values.filter(v => v.status === 'selesai').length;

    if (completedCount >= 1) badges.push('suara_pertama'); // Lencana: Suara Pertama!
    if (completedCount >= 5) badges.push('penjelajah_vokal'); // Lencana: Penjelajah Vokal!

    // Cek semua vokal selesai
    const vokalIds = rawMateri.filter(m => m.kategori === 'vokal').map(m => m.id);
    const allVokalDone = vokalIds.every(id => currentMateri[id]?.status === 'selesai');
    if (allVokalDone) badges.push('juara_vokal');

    // Cek semua bilabial selesai
    const bilabialIds = rawMateri.filter(m => m.kategori === 'konsonan').map(m => m.id);
    const allBilabialDone = bilabialIds.every(id => currentMateri[id]?.status === 'selesai');
    if (allBilabialDone) badges.push('ahli_bibir');

    // Cek kata selesai
    const kataIds = rawMateri.filter(m => m.kategori === 'kata').map(m => m.id);
    const someKataDone = kataIds.some(id => currentMateri[id]?.status === 'selesai');
    if (someKataDone) badges.push('kata_emas');

    // Bintang penuh (setidaknya 3 materi 3 bintang)
    const threeStarsCount = values.filter(v => v.bintang === 3).length;
    if (threeStarsCount >= 3) badges.push('bintang_keemasan');

    return badges;
  };

  const recordAttempt = useCallback((id: string, isSuccess: boolean) => {
    setProgress(prev => {
      const current = prev.materi[id] || {
        id,
        status: 'belum',
        percobaan: 0,
        sukses: 0,
        bintang: 0,
        terakhirDicoba: new Date().toISOString(),
      };

      const newPercobaan = current.percobaan + 1;
      const newSukses = isSuccess ? current.sukses + 1 : current.sukses;

      // Hitung rating bintang
      let newBintang = current.bintang;
      if (newSukses >= 3) newBintang = Math.max(newBintang, 3);
      else if (newSukses >= 2) newBintang = Math.max(newBintang, 2);
      else if (newSukses >= 1) newBintang = Math.max(newBintang, 1);

      const newStatus = newSukses >= 1 ? 'selesai' : 'sedang';

      const updatedMateri: Record<string, MateriProgress> = {
        ...prev.materi,
        [id]: {
          id,
          status: newStatus,
          percobaan: newPercobaan,
          sukses: newSukses,
          bintang: newBintang,
          terakhirDicoba: new Date().toISOString(),
        },
      };

      const updatedBadges = evaluateBadges(updatedMateri);

      return {
        ...prev,
        materi: updatedMateri,
        totalSesi: prev.totalSesi + 1,
        lencana: Array.from(new Set([...prev.lencana, ...updatedBadges])),
      };
    });
  }, []);

  const getMaterialProgress = useCallback((id: string): MateriProgress => {
    return progress.materi[id] || {
      id,
      status: 'belum',
      percobaan: 0,
      sukses: 0,
      bintang: 0,
    };
  }, [progress.materi]);

  const isUnlocked = useCallback((id: string, urutan: number, bukaSemuaMateri: boolean): boolean => {
    if (bukaSemuaMateri) return true;
    if (urutan === 1) return true; // Materi pertama selalu terbuka

    // Cari materi sebelum urutan ini
    const prevItem = rawMateri.find(m => m.urutan === urutan - 1);
    if (!prevItem) return true;

    const prevProgress = progress.materi[prevItem.id];
    // Terbuka jika materi sebelumnya minimal sudah pernah dicoba (status 'sedang' atau 'selesai')
    return Boolean(prevProgress && prevProgress.percobaan > 0);
  }, [progress.materi]);

  const resetProgress = useCallback(() => {
    setProgress(INITIAL_PROGRESS);
    try {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const exportProgressJson = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dentum_edu_progres_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [progress]);

  return {
    progress,
    recordAttempt,
    getMaterialProgress,
    isUnlocked,
    resetProgress,
    exportProgressJson,
  };
}
