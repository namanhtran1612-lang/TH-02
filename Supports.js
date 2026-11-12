import React from 'react';

const Supports = ({ status, supports, insuranceActive, onUsePreview, onUseInsurance, onUseHint }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
      <button
        type="button"
        onClick={onUsePreview}
        disabled={supports.previewUsed || status !== 'betting'}
        style={{ padding: '8px 14px', backgroundColor: '#0288d1', color: '#fff', border: 'none' }}
      >
        Xem trước
      </button>

      <button
        type="button"
        onClick={onUseInsurance}
        disabled={supports.insuranceUsed || status === 'revealed'}
        style={{
          padding: '8px 14px',
          backgroundColor: insuranceActive ? '#ef6c00' : '#f57c00',
          color: '#fff',
          border: 'none'
        }}
      >
        {insuranceActive ? 'Đã bảo hiểm' : 'Bảo hiểm'}
      </button>

      <button
        type="button"
        onClick={onUseHint}
        disabled={supports.hintUsed || status !== 'answering'}
        style={{ padding: '8px 14px', backgroundColor: '#7b1fa2', color: '#fff', border: 'none' }}
      >
        Gợi ý
      </button>
    </div>
  );
};

export default Supports;
