import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

export default function CelebrationOverlay({ title, subtitle, onContinue }) {
  useEffect(() => {
    // Fire festive confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FB7185', '#F43F5E', '#FBBF24']
    });

    fire(0.2, {
      spread: 60,
      colors: ['#60A5FA', '#34D399', '#A78BFA']
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#FFF', '#FFD1DC']
    });

    // Secondary burst after 600ms
    const timer = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 }
      });
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="celebration-overlay animate-fade-in">
      <div className="celebration-badge">
        <Sparkles size={20} className="sparkle-icon" />
        <span>yeyy lilinnya mati semuaa, pintel banget anak ciapa ciiii 😗</span>
        <Sparkles size={20} className="sparkle-icon" />
      </div>

      <h1 className="celebration-title">{title}</h1>
      <p className="celebration-subtitle">{subtitle}</p>

      <div className="celebration-floating-hearts">
        <Heart size={24} className="heart-float h-1" />
        <Heart size={32} className="heart-float h-2" />
        <Heart size={20} className="heart-float h-3" />
      </div>

      <button className="btn-primary btn-glow" onClick={onContinue}>
        coba pencettt
      </button>
    </div>
  );
}
