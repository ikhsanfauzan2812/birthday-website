import React from 'react';
import { Mic, MicOff, Wind } from 'lucide-react';

export default function MicrophoneIndicator({
  permissionState,
  volume = 0,
  promptText,
  onManualBlow,
  onRequestMic
}) {
  const isGranted = permissionState === 'granted';
  const isDenied = permissionState === 'denied' || permissionState === 'unsupported';
  const isRequesting = permissionState === 'requesting';

  // Calculate dynamic scale ring based on real-time microphone volume input
  const pulseScale = 1 + Math.min(volume * 1.5, 0.8);
  const pulseOpacity = 0.3 + Math.min(volume * 0.7, 0.7);

  return (
    <div className="mic-indicator-card">
      {/* Prompt Banner */}
      <h2 className="mic-prompt-text">{promptText}</h2>

      {/* Audio Reactive Visualizer */}
      <div className="mic-visualizer-wrapper">
        {/* Dynamic Volume Pulse Rings */}
        {isGranted && (
          <>
            <div
              className="pulse-ring pulse-ring-1"
              style={{
                transform: `scale(${pulseScale})`,
                opacity: pulseOpacity
              }}
            />
            <div
              className="pulse-ring pulse-ring-2"
              style={{
                transform: `scale(${1 + (pulseScale - 1) * 1.5})`,
                opacity: pulseOpacity * 0.6
              }}
            />
          </>
        )}

        {/* Central Icon Button */}
        <div className={`mic-circle-btn ${isGranted ? 'listening' : ''} ${isDenied ? 'denied' : ''}`}>
          {isGranted ? (
            <Wind className="mic-icon wind-animate" size={32} />
          ) : isDenied ? (
            <MicOff className="mic-icon" size={32} />
          ) : (
            <Mic className="mic-icon" size={32} />
          )}
        </div>
      </div>

      {/* Live Volume Meter Bar */}
      {isGranted && (
        <div className="volume-meter-container">
          <div className="volume-meter-label">Tingkat Suara Tiupan</div>
          <div className="volume-meter-track">
            <div
              className="volume-meter-fill"
              style={{
                width: `${Math.min(100, volume * 100 * 2.5)}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Action Controls */}
      <div className="mic-actions">
        {!isGranted && !isDenied && (
          <button className="btn-primary" onClick={onRequestMic} disabled={isRequesting}>
            {isRequesting ? 'Meminta Izin...' : 'Nyalakan Mic 🎤'}
          </button>
        )}

        {/* Manual Blow Button always available as fallback */}
        <button className="btn-secondary" onClick={onManualBlow}>
          Tiup Manual 💨
        </button>
      </div>

      {isDenied && (
        <p className="mic-denied-notice">
          Izin mic tidak aktif. Gunakan tombol "Tiup Manual" di atas ya! ✨
        </p>
      )}
    </div>
  );
}
