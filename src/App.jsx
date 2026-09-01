import React, { useState, useEffect, useCallback, useRef } from 'react';
import BirthdayCake from './components/BirthdayCake';
import MicrophoneIndicator from './components/MicrophoneIndicator';
import CelebrationOverlay from './components/CelebrationOverlay';
import MemoryGallery from './components/MemoryGallery';
import PersonalMessage from './components/PersonalMessage';
import AudioControl from './components/AudioControl';
import { useMicrophoneDetection } from './hooks/useMicrophoneDetection';
import { birthdayContent } from './data/birthdayContent';
import { memories } from './data/memories';
import { Sparkles, Heart } from 'lucide-react';
import './App.css';

const STAGES = {
  INTRO: 'INTRO',
  MIC_PROMPT: 'MIC_PROMPT',
  BLOWING: 'BLOWING',
  CELEBRATION: 'CELEBRATION',
  MEMORIES: 'MEMORIES',
  MESSAGE: 'MESSAGE'
};

const TOTAL_CANDLES = birthdayContent.totalCandleRounds || 3;

export default function App() {
  const [stage, setStage] = useState(STAGES.INTRO);
  const [candleRound, setCandleRound] = useState(0); // 0, 1, 2
  const [candles, setCandles] = useState([]);
  const [musicTrigger, setMusicTrigger] = useState(false);
  const blowTimeoutRef = useRef(null);

  // Initialize candles array based on TOTAL_CANDLES
  const resetCandlesState = useCallback(() => {
    const initialCandles = Array.from({ length: TOTAL_CANDLES }, (_, i) => ({
      id: i + 1,
      isLit: true,
      wasJustBlown: false
    }));
    setCandles(initialCandles);
    setCandleRound(0);
  }, []);

  useEffect(() => {
    resetCandlesState();
  }, [resetCandlesState]);

  // Candle Extinguish Handler
  const extinguishCurrentCandle = useCallback(() => {
    setCandles((prevCandles) => {
      const nextCandles = [...prevCandles];

      // Find the first lit candle or candle at index `candleRound`
      const targetIndex = nextCandles.findIndex((c) => c.isLit);
      if (targetIndex !== -1) {
        nextCandles[targetIndex] = {
          ...nextCandles[targetIndex],
          isLit: false,
          wasJustBlown: true
        };
      }
      return nextCandles;
    });

    // Advance round or trigger celebration after brief smoke delay
    if (blowTimeoutRef.current) clearTimeout(blowTimeoutRef.current);

    blowTimeoutRef.current = setTimeout(() => {
      // Clear wasJustBlown smoke
      setCandles((prev) =>
        prev.map((c) => ({ ...c, wasJustBlown: false }))
      );

      setCandleRound((prevRound) => {
        const nextRound = prevRound + 1;
        if (nextRound >= TOTAL_CANDLES) {
          // All candles blown! Stop mic and go to celebration
          setStage(STAGES.CELEBRATION);
        }
        return nextRound;
      });
    }, 1200);
  }, []);

  // Web Audio Microphone Hook
  const {
    permissionState,
    volume,
    startListening,
    stopListening
  } = useMicrophoneDetection({
    threshold: 0.14,
    duration: 220,
    onBlowDetected: extinguishCurrentCandle
  });

  // Stop mic hardware track as soon as we transition past blowing stage
  useEffect(() => {
    if (stage !== STAGES.BLOWING && stage !== STAGES.MIC_PROMPT) {
      stopListening();
    }
  }, [stage, stopListening]);

  // Stage Handlers
  const handleStartExperience = async () => {
    setMusicTrigger(true);
    setStage(STAGES.MIC_PROMPT);
    // Attempt mic request immediately on user touch
    const success = await startListening();
    if (success) {
      setStage(STAGES.BLOWING);
    }
  };

  const handleRequestMicAgain = async () => {
    const success = await startListening();
    if (success) {
      setStage(STAGES.BLOWING);
    }
  };

  const handleManualBlow = () => {
    if (stage === STAGES.MIC_PROMPT) {
      setStage(STAGES.BLOWING);
    }
    extinguishCurrentCandle();
  };

  const handleRestart = () => {
    resetCandlesState();
    setStage(STAGES.INTRO);
  };

  // Determine current prompt text for candle blowing
  const currentPrompt =
    birthdayContent.candlePrompts[candleRound] ||
    birthdayContent.candlePrompts[birthdayContent.candlePrompts.length - 1];

  return (
    <div className="app-container">
      {/* Background Floating Decorative Particles */}
      <div className="bg-decorations">
        <div className="floating-bubble b-1" />
        <div className="floating-bubble b-2" />
        <div className="floating-bubble b-3" />
        <Heart size={18} className="floating-heart h-bg-1" />
        <Heart size={24} className="floating-heart h-bg-2" />
        <Sparkles size={20} className="floating-sparkle s-bg-1" />
      </div>

      {/* Top Header Audio Control */}
      <header className="app-header">
        <div className="brand-badge">
          <Heart size={16} fill="#F43F5E" color="#F43F5E" />
          <span>Untukmu Bububb!</span>
        </div>
        <AudioControl autoPlayTrigger={musicTrigger} />
      </header>

      {/* Main Interactive Stage Container */}
      <main className="main-content">
        {/* STAGE 0: INTRO */}
        {stage === STAGES.INTRO && (
          <div className="intro-card animate-fade-in">
            <div className="intro-badge">
              <Sparkles size={16} /> Pitli Day <Sparkles size={16} />
            </div>

            <h1 className="intro-title">{birthdayContent.introTitle}</h1>
            <p className="intro-subtitle">{birthdayContent.introSubtitle}</p>

            {/* Cartoon Cake Preview */}
            <div className="cake-preview-box">
              <BirthdayCake
                candles={candles}
                isFloating={true}
              />
            </div>

            <button className="btn-primary btn-bounce" onClick={handleStartExperience}>
              {birthdayContent.startButtonText}
            </button>
          </div>
        )}

        {/* STAGE 1 & 2: MIC PROMPT / BLOWING */}
        {(stage === STAGES.MIC_PROMPT || stage === STAGES.BLOWING) && (
          <div className="blowing-stage-container animate-fade-in">
            {/* Stage Cake */}
            <div className="active-cake-stage">
              <BirthdayCake
                candles={candles}
                onCandleClick={(index) => {
                  if (candles[index]?.isLit) {
                    extinguishCurrentCandle();
                  }
                }}
                isInteractive={true}
                isFloating={true}
              />
            </div>

            {/* Mic / Blow Controller UI */}
            <MicrophoneIndicator
              permissionState={permissionState}
              volume={volume}
              promptText={currentPrompt}
              onManualBlow={handleManualBlow}
              onRequestMic={handleRequestMicAgain}
            />
          </div>
        )}

        {/* STAGE 3: CELEBRATION */}
        {stage === STAGES.CELEBRATION && (
          <CelebrationOverlay
            title={birthdayContent.celebrationTitle}
            subtitle={birthdayContent.celebrationSubtitle}
            onContinue={() => setStage(STAGES.MEMORIES)}
          />
        )}

        {/* STAGE 4: MEMORIES GALLERY */}
        {stage === STAGES.MEMORIES && (
          <MemoryGallery
            memories={memories}
            onReadMessage={() => setStage(STAGES.MESSAGE)}
          />
        )}

        {/* STAGE 5: PERSONAL MESSAGE */}
        {stage === STAGES.MESSAGE && (
          <PersonalMessage
            title={birthdayContent.finalMessageTitle}
            message={birthdayContent.finalMessage}
            recipientName={birthdayContent.recipientName}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer credits */}
      <footer className="app-footer">
        <p>Dibuat sama Isang dengan ❤️ buat bubub</p>
      </footer>
    </div>
  );
}
