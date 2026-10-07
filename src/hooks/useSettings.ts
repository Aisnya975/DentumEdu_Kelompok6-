import { useState, useEffect, useCallback } from 'react';
import { AppSettings } from '../types';

const SETTINGS_STORAGE_KEY = 'dentum_edu_settings_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  sensitivitas: 35, // Ambang batas deteksi suara (0-100)
  durasiMinimalMs: 300, // Durasi minimum suara stabil agar terdeteksi
  hapticEnabled: true,
  hapticStrength: 'sedang',
  sistemIsyarat: 'bisindo', // BISINDO default umum di komunitas tuli Indonesia
  kecepatanAnimasi: 'normal',
  ukuranTeks: 'M',
  kontrasTinggi: false,
  kurangiGerakan: false,
  bukaSemuaMateri: false,
  noiseFloorMargin: 10,
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // localStorage mungkin penuh atau private browsing
    }

    // Terapkan kelas aksesibilitas ke elemen root
    const root = document.documentElement;
    if (settings.kontrasTinggi) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (settings.kurangiGerakan) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Terapkan ukuran font
    root.classList.remove('text-size-s', 'text-size-m', 'text-size-l', 'text-size-xl');
    root.classList.add(`text-size-${settings.ukuranTeks.toLowerCase()}`);
  }, [settings]);

  const updateSetting = useCallback(<K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    updateSetting,
    resetSettings,
  };
}
