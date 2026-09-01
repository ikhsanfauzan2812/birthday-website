import React from 'react';
import Candle from './Candle';

export default function BirthdayCake({
  candles = [],
  onCandleClick,
  isInteractive = false,
  isFloating = true
}) {
  const candleColors = ['#F43F5E', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'];

  return (
    <div className={`cake-wrapper ${isFloating ? 'floating-cake' : ''}`}>
      <div className="cake-container">
        {/* Candle Placement Deck */}
        <div className="candles-row">
          {candles.map((candle, index) => (
            <Candle
              key={candle.id || index}
              id={candle.id || index}
              isLit={candle.isLit}
              wasJustBlown={candle.wasJustBlown}
              color={candleColors[index % candleColors.length]}
              onClick={() => onCandleClick && onCandleClick(index)}
              isInteractive={isInteractive && candle.isLit}
            />
          ))}
        </div>

        {/* Vector SVG Cartoon Cake */}
        <div className="cake-svg-container">
          <svg viewBox="0 0 240 200" className="cake-svg">
            <defs>
              <linearGradient id="creamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF1F2" />
                <stop offset="100%" stopColor="#FFE4E6" />
              </linearGradient>

              <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="100%" stopColor="#F43F5E" />
              </linearGradient>

              <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>

              <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#F43F5E" floodOpacity="0.2" />
              </filter>
            </defs>

            {/* Cake Plate */}
            <ellipse cx="120" cy="180" rx="105" ry="14" fill="#E2E8F0" />
            <ellipse cx="120" cy="177" rx="100" ry="12" fill="#FFFFFF" filter="url(#softShadow)" />

            {/* Bottom Tier Base */}
            <rect x="35" y="115" width="170" height="55" rx="14" fill="url(#pinkGrad)" />
            {/* Bottom Tier Drips */}
            <path
              d="M 35 115 Q 45 135 55 115 Q 65 138 75 115 Q 85 135 95 115 Q 105 138 115 115 Q 125 135 135 115 Q 145 138 155 115 Q 165 135 175 115 Q 185 138 195 115 Q 200 125 205 115 L 205 115 L 35 115 Z"
              fill="#FFFFFF"
              opacity="0.9"
            />

            {/* Cute Face on Bottom Tier */}
            {/* Eyes */}
            <circle cx="95" cy="142" r="3.5" fill="#4A3E3D" />
            <circle cx="145" cy="142" r="3.5" fill="#4A3E3D" />
            {/* Eye Highlights */}
            <circle cx="96" cy="141" r="1.2" fill="#FFFFFF" />
            <circle cx="146" cy="141" r="1.2" fill="#FFFFFF" />
            {/* Blush cheeks */}
            <ellipse cx="86" cy="146" rx="5" ry="3" fill="#FF88A5" opacity="0.7" />
            <ellipse cx="154" cy="146" rx="5" ry="3" fill="#FF88A5" opacity="0.7" />
            {/* Happy Smile */}
            <path d="M 113 145 Q 120 151 127 145" fill="none" stroke="#4A3E3D" strokeWidth="2.5" strokeLinecap="round" />

            {/* Top Tier Base */}
            <rect x="55" y="60" width="130" height="55" rx="12" fill="url(#creamGrad)" filter="url(#softShadow)" />

            {/* Frosting Top Trim */}
            <path
              d="M 55 60 Q 65 75 75 60 Q 85 78 95 60 Q 105 75 115 60 Q 125 78 135 60 Q 145 75 155 60 Q 165 78 175 60 Q 180 70 185 60 L 185 60 L 55 60 Z"
              fill="#F43F5E"
            />

            {/* Strawberries / Cherries on Top */}
            <circle cx="70" cy="55" r="7" fill="#F43F5E" />
            <circle cx="70" cy="53" r="2" fill="#FFFFFF" opacity="0.6" />

            <circle cx="120" cy="52" r="8" fill="#E11D48" />
            <circle cx="120" cy="50" r="2.5" fill="#FFFFFF" opacity="0.6" />

            <circle cx="170" cy="55" r="7" fill="#F43F5E" />
            <circle cx="170" cy="53" r="2" fill="#FFFFFF" opacity="0.6" />

            {/* Colorful Sprinkles */}
            <rect x="75" y="80" width="6" height="3" rx="1.5" fill="#F59E0B" transform="rotate(20 75 80)" />
            <rect x="150" y="82" width="6" height="3" rx="1.5" fill="#3B82F6" transform="rotate(-15 150 82)" />
            <rect x="100" y="92" width="6" height="3" rx="1.5" fill="#10B981" transform="rotate(45 100 92)" />
            <rect x="135" y="90" width="6" height="3" rx="1.5" fill="#EC4899" transform="rotate(-30 135 90)" />
            <rect x="65" y="130" width="7" height="3.5" rx="1.5" fill="#FDE047" transform="rotate(30 65 130)" />
            <rect x="170" y="135" width="7" height="3.5" rx="1.5" fill="#60A5FA" transform="rotate(-25 170 135)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
