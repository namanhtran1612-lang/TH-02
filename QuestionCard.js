import React from 'react';
import { LEVELS, MULTIPLIERS, formatMultiplier } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({ questionData, currentIndex, totalQuestions, selectedOption, isRevealed, onSelectAnswer }) => {
  const { topic, level, question, options, answer } = questionData;

  return (
    <div>
      <h3 style={{ margin: '0 0 10px 0', color: '#1b5e20' }}>
        Câu {currentIndex + 1}/{totalQuestions} – {topic} – {LEVELS[level]} ({formatMultiplier(MULTIPLIERS[level])})
      </h3>
      <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>{question}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {options.map((opt, idx) => (
          <AnswerButton
            key={idx}
            index={idx}
            optionText={opt}
            selectedOption={selectedOption}
            correctOption={answer}
            isRevealed={isRevealed}
            onSelect={onSelectAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
