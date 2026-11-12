import React from 'react';

const Timer = ({ timeLeft }) => {
  return (
    <div
      style={{
        color: timeLeft <= 5 ? '#d32f2f' : '#2e7d32',
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '16px'
      }}
    >
      Còn {timeLeft} giây
    </div>
  );
};

export default Timer;
