import { useState, useEffect, useRef, useCallback } from 'react';
import { VoiceStatus, AppSettings } from '../types';

interface UseVoiceDetectionOptions {
  settings: AppSettings;
  targetDurationMs?: number;
  onSuccess?: () => void;
  onSoundStart?: () => void;
  onSoundOngoing?: () => void;
  onWarning?: (type: 'too_quiet' | 'too_loud') => void;
}

export function useVoiceDetection({
  settings,
  targetDurationMs = 350,
  onSuccess,
  onSoundStart,
  onSoundOngoing,
  onWarning,
}: UseVoiceDetectionOptions) {
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const [volumeLevel, setVolumeLevel] = useState<number>(0); // 0 - 100
  const [sustainedDurationMs, setSustainedDurationMs] = useState<number>(0);
  const [noiseFloor, setNoiseFloor] = useState<number>(10);
  const [isCalibrated, setIsCalibrated] = useState<boolean>(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [isManualSimulating, setIsManualSimulating] = useState<boolean>(false);
  const [audioDataArray, setAudioDataArray] = useState<Uint8Array>(new Uint8Array(64));

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const calibrationSamplesRef = useRef<number[]>([]);
  const calibrationStartTimeRef = useRef<number | null>(null);
  const soundDetectionStartTimeRef = useRef<number | null>(null);
  const successTriggeredRef = useRef<boolean>(false);
  const lastOngoingHapticTimeRef = useRef<number>(0);
  const manualIntervalRef = useRef<number | null>(null);

  // Bersihkan audio stream dan context
  const cleanupAudio = useCallback(() => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (manualIntervalRef.current) {
      window.clearInterval(manualIntervalRef.current);
      manualIntervalRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  }, []);

  // Mulai Kalibrasi
  const startCalibration = useCallback(() => {
    setStatus('calibrating');
    calibrationSamplesRef.current = [];
    calibrationStartTimeRef.current = performance.now();
  }, []);

  // Mulai mendengarkan dengan mikrofon riil
  const startListening = useCallback(async () => {
    cleanupAudio();
    setMicError(null);
    successTriggeredRef.current = false;
    setSustainedDurationMs(0);
    setVolumeLevel(0);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('NOT_SUPPORTED');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      mediaStreamRef.current = stream;

      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      audioContextRef.current = audioCtx;

      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.65;
      source.connect(analyser);
      analyserRef.current = analyser;

      startCalibration();

      const timeDomainData = new Uint8Array(analyser.frequencyBinCount);
      const freqData = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteTimeDomainData(timeDomainData);
        analyserRef.current.getByteFrequencyData(freqData);

        // Ambil sampel frekuensi untuk canvas visualizer
        setAudioDataArray(new Uint8Array(freqData.slice(0, 32)));

        // Hitung RMS
        let sumSquares = 0;
        for (let i = 0; i < timeDomainData.length; i++) {
          const norm = (timeDomainData[i] - 128) / 128;
          sumSquares += norm * norm;
        }
        const rms = Math.sqrt(sumSquares / timeDomainData.length);
        // Skala 0-100 dengan kurva logaritmik halus
        const rawScore = Math.min(100, Math.round(rms * 320));

        const now = performance.now();

        // 1. TAHAP KALIBRASI (2000 ms)
        if (calibrationStartTimeRef.current !== null) {
          const elapsed = now - calibrationStartTimeRef.current;
          calibrationSamplesRef.current.push(rawScore);

          setVolumeLevel(rawScore);

          if (elapsed >= 2000) {
            // Selesai kalibrasi
            const avgNoise = Math.round(
              calibrationSamplesRef.current.reduce((a, b) => a + b, 0) /
              Math.max(1, calibrationSamplesRef.current.length)
            );
            const calculatedNoiseFloor = Math.max(5, Math.min(avgNoise, 35));
            setNoiseFloor(calculatedNoiseFloor);
            setIsCalibrated(true);
            calibrationStartTimeRef.current = null;
            setStatus('listening');
          }

          animFrameIdRef.current = requestAnimationFrame(loop);
          return;
        }

        // 2. TAHAP DETEKSI VOKALISASI REAL-TIME
        setVolumeLevel(rawScore);

        const currentThreshold = Math.max(
          noiseFloor + settings.noiseFloorMargin,
          settings.sensitivitas
        );

        if (rawScore > 88) {
          // Terlalu keras
          setStatus('too_loud');
          onWarning?.('too_loud');
          soundDetectionStartTimeRef.current = null;
          setSustainedDurationMs(0);
        } else if (rawScore >= currentThreshold) {
          // Suara berada di zona terdeteksi baik
          if (!soundDetectionStartTimeRef.current) {
            soundDetectionStartTimeRef.current = now;
            setStatus('detected');
            onSoundStart?.();
          }

          const currentDuration = now - soundDetectionStartTimeRef.current;
          setSustainedDurationMs(Math.round(currentDuration));

          // Kirim haptic denyut setiap 180ms saat bersuara
          if (now - lastOngoingHapticTimeRef.current > 180) {
            lastOngoingHapticTimeRef.current = now;
            onSoundOngoing?.();
          }

          // Cek apakah mencapai durasi minimal (sukses)
          if (currentDuration >= targetDurationMs && !successTriggeredRef.current) {
            successTriggeredRef.current = true;
            setStatus('success');
            onSuccess?.();
          }
        } else if (rawScore > noiseFloor + 2) {
          // Suara ada tapi terlalu pelan
          setStatus('too_quiet');
          onWarning?.('too_quiet');
          soundDetectionStartTimeRef.current = null;
          setSustainedDurationMs(0);
        } else {
          // Hening / mendengarkan
          setStatus('listening');
          soundDetectionStartTimeRef.current = null;
          setSustainedDurationMs(0);
        }

        animFrameIdRef.current = requestAnimationFrame(loop);
      };

      animFrameIdRef.current = requestAnimationFrame(loop);
    } catch (err: unknown) {
      const errorObj = err as { name?: string; message?: string };
      let message = 'Mikrofon tidak dapat diakses.';
      if (errorObj?.name === 'NotAllowedError' || errorObj?.name === 'PermissionDeniedError') {
        message = 'Izin mikrofon ditolak oleh browser. Aktifkan izin di ikon gembok peramban atau gunakan Mode Simulasi Manual.';
      } else if (errorObj?.name === 'NotFoundError') {
        message = 'Perangkat mikrofon tidak ditemukan. Gunakan Mode Simulasi Manual.';
      } else if (errorObj?.message === 'NOT_SUPPORTED') {
        message = 'Browser tidak mendukung Web Audio API. Gunakan Mode Simulasi Manual.';
      }
      setMicError(message);
      setStatus('idle');
    }
  }, [
    cleanupAudio,
    startCalibration,
    noiseFloor,
    settings.noiseFloorMargin,
    settings.sensitivitas,
    targetDurationMs,
    onSoundStart,
    onSoundOngoing,
    onSuccess,
    onWarning,
  ]);

  // Hentikan deteksi
  const stopListening = useCallback(() => {
    cleanupAudio();
    setStatus('idle');
    setVolumeLevel(0);
    setSustainedDurationMs(0);
    setIsManualSimulating(false);
  }, [cleanupAudio]);

  // SIMULASI MANUAL (Tekan & Tahan) untuk pengujian/demo tanpa mic
  const startManualSimulation = useCallback(() => {
    setIsManualSimulating(true);
    setStatus('detected');
    successTriggeredRef.current = false;
    soundDetectionStartTimeRef.current = performance.now();
    onSoundStart?.();

    if (manualIntervalRef.current) {
      window.clearInterval(manualIntervalRef.current);
    }

    manualIntervalRef.current = window.setInterval(() => {
      const now = performance.now();
      const duration = soundDetectionStartTimeRef.current
        ? now - soundDetectionStartTimeRef.current
        : 0;

      // Simulasi fluktuasi level alami 55 - 75
      const simLevel = Math.round(58 + Math.sin(duration / 120) * 12);
      setVolumeLevel(simLevel);
      setSustainedDurationMs(Math.round(duration));

      // Simulasi array frekuensi visualizer
      const fakeArray = new Uint8Array(32);
      for (let i = 0; i < 32; i++) {
        fakeArray[i] = Math.round(80 + Math.random() * 120);
      }
      setAudioDataArray(fakeArray);

      if (now - lastOngoingHapticTimeRef.current > 180) {
        lastOngoingHapticTimeRef.current = now;
        onSoundOngoing?.();
      }

      if (duration >= targetDurationMs && !successTriggeredRef.current) {
        successTriggeredRef.current = true;
        setStatus('success');
        onSuccess?.();
      }
    }, 40);
  }, [targetDurationMs, onSoundStart, onSoundOngoing, onSuccess]);

  const stopManualSimulation = useCallback(() => {
    if (manualIntervalRef.current) {
      window.clearInterval(manualIntervalRef.current);
      manualIntervalRef.current = null;
    }
    setIsManualSimulating(false);
    if (status !== 'success') {
      setStatus('idle');
      setVolumeLevel(0);
      setSustainedDurationMs(0);
    }
  }, [status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, [cleanupAudio]);

  return {
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
  };
}
