import React from 'react';
import { formatScore } from '../data';

const ScoreInfo = ({ score, bet }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 'bold', fontSize: '16px' }}>
      <div>Điểm hiện có: {formatScore(score)}</div>
      <div>Đang cược: {formatScore(bet)}</div>
    </div>
  );
};

export default ScoreInfo;
