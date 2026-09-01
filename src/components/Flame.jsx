import React from 'react';

export default function Flame({ isLit, size = 32 }) {
  if (!isLit) return null;

  return (
    <div 
      className="flame-container"
      style={{
        position: 'absolute',
        top: `-${size * 0.95}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${size}px`,
        height: `${size * 1.1}px`,
        pointerEvents: 'none',
        zIndex: 10
      }}
    >
      <svg
        viewBox="0 0 100 120"
        className="flame-svg"
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 16px rgba(244, 63, 94, 0.6))'
        }}
      >
        {/* Outer Flame */}
        <path
          d="M 50 0 C 70 30 90 60 90 85 C 90 105 72 120 50 120 C 28 120 10 105 10 85 C 10 60 30 30 50 0 Z"
          fill="#F59E0B"
          className="flame-outer"
        />
        {/* Inner Flame */}
        <path
          d="M 50 25 C 62 45 75 68 75 85 C 75 100 64 110 50 110 C 36 110 25 100 25 85 C 25 68 38 45 50 25 Z"
          fill="#FDE047"
          className="flame-inner"
        />
        {/* Flame Core */}
        <path
          d="M 50 55 C 57 70 65 82 65 92 C 65 102 58 106 50 106 C 42 106 35 102 35 92 C 35 82 43 70 50 55 Z"
          fill="#FFFFFF"
          className="flame-core"
        />
      </svg>

      {/* Little floating spark particles */}
      <span className="spark spark-1" />
      <span className="spark spark-2" />
    </div>
  );
}
