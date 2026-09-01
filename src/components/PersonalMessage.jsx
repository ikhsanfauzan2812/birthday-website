import React from 'react';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';

export default function PersonalMessage({ title, message, recipientName, onRestart }) {
  return (
    <div className="personal-message-container animate-fade-in">
      <div className="message-letter-card">
        {/* Wax seal accent */}
        <div className="wax-seal">
          <Heart size={20} fill="#FFF" color="#FFF" />
        </div>

        <h2 className="message-title">{title}</h2>
        <div className="message-divider" />

        <div className="message-body">
          {message.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="message-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="message-signature">
          <p className="signature-text">Dengan penuh kasih & cinta ❤️</p>
          <div className="signature-sparkles">
            <Sparkles size={16} color="#FB7185" />
          </div>
        </div>
      </div>

      {/* Restart Button */}
      <div className="message-actions">
        <button className="btn-secondary" onClick={onRestart}>
          <RotateCcw size={16} /> Tiup Lilin Lagi 🎂
        </button>
      </div>
    </div>
  );
}
