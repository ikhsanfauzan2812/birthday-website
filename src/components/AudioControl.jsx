import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import bgmSong from '../assets/songs/bgm.mp3';

export default function AudioControl({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(bgmSong);
    audio.loop = true; // Ensure continuous smooth looping for the 15-second track
    audio.volume = 0.45;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // When user clicks "Mulai 🎂", attempt to start music automatically
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [autoPlayTrigger, isPlaying]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <button
      className={`audio-toggle-btn ${isPlaying ? 'playing' : ''}`}
      onClick={toggleAudio}
      title={isPlaying ? "Matikan Musik" : "Nyalakan Musik"}
      aria-label="Toggle Background Music"
    >
      {isPlaying ? (
        <Volume2 size={20} className="volume-icon spin-subtle" />
      ) : (
        <VolumeX size={20} className="volume-icon" />
      )}
    </button>
  );
}
