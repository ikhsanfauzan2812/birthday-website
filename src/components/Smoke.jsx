import React from 'react';

export default function Smoke({ isActive, size = 30 }) {
  if (!isActive) return null;

  return (
    <div
      className="smoke-container"
      style={{
        position: 'absolute',
        top: `-${size * 1.4}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${size * 1.2}px`,
        height: `${size * 1.5}px`,
        pointerEvents: 'none',
        zIndex: 12
      }}
    >
      {/* SVG Smoke Wisps */}
      <svg
        viewBox="0 0 100 120"
        className="smoke-svg"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <path
          d="M 50 110 Q 30 80 50 50 T 50 10"
          fill="none"
          stroke="rgba(220, 220, 230, 0.75)"
          strokeWidth="10"
          strokeLinecap="round"
          className="smoke-wisp smoke-wisp-1"
        />
        <path
          d="M 45 110 Q 65 70 45 40 T 55 5"
          fill="none"
          stroke="rgba(240, 240, 250, 0.6)"
          strokeWidth="7"
          strokeLinecap="round"
          className="smoke-wisp smoke-wisp-2"
        />
      </svg>
      
      {/* Little celebration magic dots when candle is blown */}
      <div className="puff-particle p-1" />
      <div className="puff-particle p-2" />
      <div className="puff-particle p-3" />
    </div>
  );
}
