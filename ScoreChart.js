import React from 'react';

const ScoreChart = ({ rounds }) => {
  const maxScore = Math.max(...rounds.map((r) => r.scoreAfter), 1);

  return (
    <div style={{ marginTop: '24px' }}>
      <h4>Biểu đồ biến động điểm số</h4>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '16px',
          height: '240px',
          padding: '20px 10px 8px 10px',
          borderBottom: '2px solid #424242',
          backgroundColor: '#fafafa',
          borderRadius: '8px 8px 0 0'
        }}
      >
        {rounds.map((round, idx) => {
          const heightPx = Math.round((round.scoreAfter / maxScore) * 200);
          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '42px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                {round.scoreAfter.toLocaleString('vi-VN')}
              </span>
              <div
                style={{
                  width: '32px',
                  height: `${heightPx}px`,
                  backgroundColor: round.correct ? '#2e7d32' : '#d32f2f',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s'
                }}
              />
              <span style={{ fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>Câu {idx + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreChart;
