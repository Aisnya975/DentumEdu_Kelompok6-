import { useState, useCallback, useRef } from 'react';
import { AppSettings } from '../types';

export type HapticType = 'start' | 'pulse' | 'success' | 'warning';

export function useHaptics(settings: AppSettings) {
  const isVibrationSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;
  const [visualRippleActive, setVisualRippleActive] = useState(false);
  const rippleTimerRef = useRef<number | null>(null);

  // Skala durasi berdasarkan pengaturan kekuatan
  const getMultiplier = useCallback(() => {
    switch (settings.hapticStrength) {
      case 'rendah':
        return 0.6;
      case 'tinggi':
        return 1.4;
      case 'sedang':
      default:
        return 1.0;
    }
  }, [settings.hapticStrength]);

  const triggerVisualFeedback = useCallback((durationMs: number = 300) => {
    setVisualRippleActive(true);
    if (rippleTimerRef.current) {
      window.clearTimeout(rippleTimerRef.current);
    }
    rippleTimerRef.current = window.setTimeout(() => {
      setVisualRippleActive(false);
    }, durationMs);
  }, []);

  const triggerHaptic = useCallback((type: HapticType) => {
    // Selalu aktifkan visual fallback
    triggerVisualFeedback(type === 'success' ? 500 : 250);

    if (!settings.hapticEnabled) return;

    if (!isVibrationSupported) {
      return;
    }

    const mult = getMultiplier();

    try {
      switch (type) {
        case 'start': {
          // Getaran pendek tanda suara mulai masuk
          const p = Math.round(40 * mult);
          navigator.vibrate(p);
          break;
        }
        case 'pulse': {
          // Ritme getar pendek saat vokalisasi berlanjut
          const on = Math.round(50 * mult);
          const off = 30;
          navigator.vibrate([on, off, on]);
          break;
        }
        case 'success': {
          // Pola perayaan sukses [100, 50, 100, 50, 200]
          const p = [
            Math.round(100 * mult),
            50,
            Math.round(100 * mult),
            50,
            Math.round(200 * mult),
          ];
          navigator.vibrate(p);
          break;
        }
        case 'warning': {
          // Pola getar ganda untuk terlalu keras/pelan
          const p = [
            Math.round(120 * mult),
            80,
            Math.round(120 * mult),
          ];
          navigator.vibrate(p);
          break;
        }
      }
    } catch {
      // Browser mungkin memblokir karena tidak ada user gesture
    }
  }, [settings.hapticEnabled, isVibrationSupported, getMultiplier, triggerVisualFeedback]);

  const stopHaptic = useCallback(() => {
    if (isVibrationSupported) {
      try {
        navigator.vibrate(0);
      } catch {
        // ignore
      }
    }
    setVisualRippleActive(false);
  }, [isVibrationSupported]);

  return {
    isVibrationSupported,
    visualRippleActive,
    triggerHaptic,
    stopHaptic,
  };
}
