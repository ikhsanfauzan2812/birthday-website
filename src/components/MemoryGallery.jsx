import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Calendar } from 'lucide-react';

export default function MemoryGallery({ memories = [], onReadMessage }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  if (!memories || memories.length === 0) return null;

  const currentMemory = memories[currentIndex];

  return (
    <div className="memory-gallery-container animate-fade-in">
      <div className="gallery-header">
        <h2 className="gallery-title">My Memories Gwehh</h2>
        <p className="gallery-subtitle">Setiap detik bersamamu adalah kenangan manis yang selalu aku syukuri, aww slebew.</p>
      </div>

      {/* Polaroid Card */}
      <div className="polaroid-card-wrapper">
        {/* Tape Accent */}
        <div className="polaroid-tape" />

        <div className="polaroid-card">
          <div className="polaroid-image-frame">
            <img
              src={currentMemory.image}
              alt={currentMemory.caption}
              className="polaroid-img"
              loading="lazy"
            />
            <span className="polaroid-date-tag">
              <Calendar size={12} /> {currentIndex + 1} dari {memories.length}
            </span>
          </div>

          <div className="polaroid-content">
            <p className="polaroid-caption">{currentMemory.caption}</p>
          </div>
        </div>
      </div>

      {/* Gallery Controls & Navigation */}
      <div className="gallery-controls">
        <button
          className="btn-icon-nav"
          onClick={handlePrev}
          aria-label="Foto Sebelumnya"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="gallery-dots">
          {memories.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>

        <button
          className="btn-icon-nav"
          onClick={handleNext}
          aria-label="Foto Selanjutnya"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Final Message Unlock Button */}
      <div className="gallery-footer-action">
        <button className="btn-primary btn-sparkle" onClick={onReadMessage}>
          Baca ini dongss
        </button>
      </div>
    </div>
  );
}
