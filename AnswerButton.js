import React from 'react';
import { LETTERS } from '../data';

const AnswerButton = ({ index, optionText, selectedOption, correctOption, isRevealed, onSelect }) => {
  let backgroundColor = '#f5f5f5';
  let color = '#222';
  let borderColor = '#ccc';

  if (isRevealed) {
    if (index === correctOption) {
      backgroundColor = '#2e7d32';
      color = '#fff';
      borderColor = '#1b5e20';
    } else if (index === selectedOption) {
      backgroundColor = '#c62828';
      color = '#fff';
      borderColor = '#8e0000';
    }
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      disabled={isRevealed}
      style={{
        padding: '14px 16px',
        fontSize: '16px',
        backgroundColor,
        color,
        border: `2px solid ${borderColor}`,
        textAlign: 'left',
        opacity: isRevealed && index !== correctOption && index !== selectedOption ? 0.65 : 1
      }}
    >
      <strong>{LETTERS[index]}.</strong> {optionText}
    </button>
  );
};

export default AnswerButton;
