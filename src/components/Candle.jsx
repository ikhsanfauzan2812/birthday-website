import React from 'react';
import Flame from './Flame';
import Smoke from './Smoke';

export default function Candle({ 
  id, 
  isLit, 
  wasJustBlown, 
  color = '#FB7185',
  stripeColor = '#FFFFFF',
  onClick,
  isInteractive = false
}) {
  return (
    <div 
      className={`candle-wrapper ${isInteractive ? 'interactive' : ''}`}
      onClick={isInteractive ? onClick : undefined}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: isInteractive ? 'pointer' : 'default',
        userSelect: 'none'
      }}
    >
      {/* Flame */}
      <Flame isLit={isLit} />

      {/* Smoke */}
      <Smoke isActive={wasJustBlown} />

      {/* Wick */}
      <div 
        className="candle-wick"
        style={{
          width: '3px',
          height: '10px',
          backgroundColor: '#374151',
          borderRadius: '1px'
        }}
      />

      {/* Candle Body */}
      <div
        className="candle-body"
        style={{
          width: '18px',
          height: '52px',
          background: `repeating-linear-gradient(
            45deg,
            ${color},
            ${color} 8px,
            ${stripeColor} 8px,
            ${stripeColor} 16px
          )`,
          borderRadius: '4px 4px 2px 2px',
          boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.15), 0 4px 6px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
      />

      {/* Candle Base Melt / Shadow */}
      <div
        style={{
          width: '22px',
          height: '4px',
          backgroundColor: 'rgba(244, 63, 94, 0.3)',
          borderRadius: '50%',
          marginTop: '-2px'
        }}
      />
    </div>
  );
}
