import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'law-calc.kr 법률 계산기';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#f8fafc',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: '#c9a84c',
          }}
        />
        <div style={{ fontSize: 64, marginBottom: 16 }}>⚖️</div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: 8,
          }}
        >
          법률 계산기
        </div>
        <div style={{ fontSize: 28, color: '#64748b', marginBottom: 16 }}>
          law-calc.kr
        </div>
        <div style={{ fontSize: 20, color: '#94a3b8' }}>
          대한민국 법률 기준 55개 무료 계산기
        </div>
      </div>
    ),
    { ...size }
  );
}
