import React, { useState, useEffect } from 'react';
import { LEVELS, MULTIPLIERS, MIN_BET, MAX_BET, BET_STEP, formatScore, formatMultiplier } from '../data';
import { validateBet } from '../utils';

const BetPanel = ({ currentQuestion, currentIndex, totalQuestions, score, onPlaceBet, showPreview }) => {
  const [bet, setBet] = useState(MIN_BET);
  const { topic, level, question } = currentQuestion;
  const errorMsg = validateBet(bet, score);

  useEffect(() => {
    const handleKey = (e) => {
      const maxAllowed = Math.floor(Math.min(MAX_BET, score) / BET_STEP) * BET_STEP;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setBet((prev) => {
          const current = Number(prev) || MIN_BET;
          const next = current + BET_STEP;
          return next > maxAllowed ? Math.max(MIN_BET, maxAllowed) : next;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setBet((prev) => {
          const current = Number(prev) || MIN_BET;
          const next = current - BET_STEP;
          return next < MIN_BET ? MIN_BET : next;
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (!validateBet(bet, score)) {
          onPlaceBet(Number(bet));
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [bet, score, onPlaceBet]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMsg) {
      onPlaceBet(Number(bet));
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fafafa' }}>
      <h2 style={{ marginTop: 0, color: '#1b5e20' }}>
        Câu {currentIndex + 1}/{totalQuestions} – {topic} – {LEVELS[level]} ({formatMultiplier(MULTIPLIERS[level])})
      </h2>
      <p style={{ fontSize: '17px', fontWeight: 'bold' }}>Điểm hiện có: {formatScore(score)}</p>

      {showPreview && (
        <div style={{ padding: '12px', backgroundColor: '#e1f5fe', borderLeft: '4px solid #0288d1', marginBottom: '16px' }}>
          <strong>Xem trước câu hỏi:</strong> {question}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label htmlFor="betInput" style={{ fontWeight: '600', marginRight: '10px' }}>
            Mức cược:
          </label>
          <input
            id="betInput"
            type="number"
            step={BET_STEP}
            value={bet}
            onChange={(e) => setBet(e.target.value === '' ? '' : Number(e.target.value))}
            style={{ padding: '8px', fontSize: '16px', width: '130px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {errorMsg && (
          <p style={{ color: '#d32f2f', fontSize: '14px', margin: '6px 0 12px 0' }}>{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={Boolean(errorMsg)}
          style={{
            padding: '10px 22px',
            fontSize: '16px',
            backgroundColor: '#2e7d32',
            color: '#fff',
            border: 'none'
          }}
        >
          Đặt cược
        </button>
      </form>
      <p style={{ fontSize: '13px', color: '#666', marginTop: '14px', marginBottom: 0 }}>
        Mẹo: Dùng phím mũi tên ↑ / ↓ để tăng giảm 100 điểm, nhấn Enter để đặt cược nhanh.
      </p>
    </div>
  );
};

export default BetPanel;
