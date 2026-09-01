import { useState, useRef, useCallback, useEffect } from 'react';

export function useMicrophoneDetection({
  threshold = 0.15,
  duration = 200,
  onBlowDetected
}) {
  const [permissionState, setPermissionState] = useState('idle'); // 'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported'
  const [volume, setVolume] = useState(0);
  const [isBlowing, setIsBlowing] = useState(false);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const blowStartTimeRef = useRef(null);
  const onBlowDetectedRef = useRef(onBlowDetected);

  useEffect(() => {
    onBlowDetectedRef.current = onBlowDetected;
  }, [onBlowDetected]);

  const stopListening = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    setVolume(0);
    setIsBlowing(false);
    blowStartTimeRef.current = null;
  }, []);

  const startListening = useCallback(async () => {
    // Check if mediaDevices is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionState('unsupported');
      return false;
    }

    setPermissionState('requesting');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: false, // Turned off noise suppression to catch wind/blow turbulence better
          autoGainControl: false
        }
      });

      streamRef.current = stream;

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const source = audioCtx.createMediaStreamSource(stream);
      
      // Bandpass filter tuned for blowing turbulence (100Hz - 800Hz)
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 400; // Center frequency
      filter.Q.value = 1.0;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.3;
      analyserRef.current = analyser;

      source.connect(filter);
      filter.connect(analyser);

      setPermissionState('granted');

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const analyzeAudio = () => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate Average Volume / Energy Level
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const normalizedVolume = Math.min(1, average / 128); // 0 to 1

        setVolume(normalizedVolume);

        const now = Date.now();
        if (normalizedVolume >= threshold) {
          if (!blowStartTimeRef.current) {
            blowStartTimeRef.current = now;
          } else if (now - blowStartTimeRef.current >= duration) {
            setIsBlowing(true);
            if (onBlowDetectedRef.current) {
              onBlowDetectedRef.current();
            }
            blowStartTimeRef.current = null; // Reset blow trigger
          }
        } else {
          blowStartTimeRef.current = null;
          setIsBlowing(false);
        }

        animFrameRef.current = requestAnimationFrame(analyzeAudio);
      };

      analyzeAudio();
      return true;
    } catch (err) {
      console.warn("Microphone access denied or error:", err);
      setPermissionState('denied');
      stopListening();
      return false;
    }
  }, [threshold, duration, stopListening]);

  // Clean up hardware resources on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    permissionState,
    volume,
    isBlowing,
    startListening,
    stopListening
  };
}
