import React from 'react';

// Cascading fluid wave ribbons with individual gradients, paths, speeds, and staggered delays
const WAVES = [
  {
    id: 'wave-amber',
    gradientId: 'grad-amber',
    stop1: '#f59e0b',
    stop2: '#fbbf24',
    stop3: 'rgba(245, 158, 11, 0)',
    opacity: 0.55,
    duration: '16s',
    delay: '0s',
    blur: '18px',
    height: 440,
    path: 'M0,100 C360,220, 680,20, 1020,160 C1340,290, 1560,70, 1800,180 L1800,480 L0,480 Z',
  },
  {
    id: 'wave-indigo',
    gradientId: 'grad-indigo',
    stop1: '#6366f1',
    stop2: '#a855f7',
    stop3: 'rgba(99, 102, 241, 0)',
    opacity: 0.52,
    duration: '21s',
    delay: '-5s',
    blur: '24px',
    height: 480,
    path: 'M0,140 C280,30, 590,240, 920,80 C1220,-30, 1520,220, 1800,110 L1800,520 L0,520 Z',
  },
  {
    id: 'wave-cyan',
    gradientId: 'grad-cyan',
    stop1: '#06b6d4',
    stop2: '#3b82f6',
    stop3: 'rgba(6, 182, 212, 0)',
    opacity: 0.48,
    duration: '18s',
    delay: '-10s',
    blur: '20px',
    height: 420,
    path: 'M0,80 C340,230, 640,40, 960,170 C1280,310, 1560,90, 1800,140 L1800,460 L0,460 Z',
  },
  {
    id: 'wave-rose',
    gradientId: 'grad-rose',
    stop1: '#f43f5e',
    stop2: '#ec4899',
    stop3: 'rgba(244, 63, 94, 0)',
    opacity: 0.50,
    duration: '24s',
    delay: '-15s',
    blur: '22px',
    height: 460,
    path: 'M0,160 C320,50, 620,260, 940,110 C1260,-40, 1540,190, 1800,160 L1800,500 L0,500 Z',
  },
  {
    id: 'wave-emerald',
    gradientId: 'grad-emerald',
    stop1: '#10b981',
    stop2: '#14b8a6',
    stop3: 'rgba(16, 185, 129, 0)',
    opacity: 0.45,
    duration: '19s',
    delay: '-8s',
    blur: '26px',
    height: 450,
    path: 'M0,110 C380,20, 710,230, 1040,80 C1360,-60, 1600,180, 1800,130 L1800,470 L0,470 Z',
  },
  {
    id: 'wave-gold',
    gradientId: 'grad-gold',
    stop1: '#eab308',
    stop2: '#fb923c',
    stop3: 'rgba(234, 179, 8, 0)',
    opacity: 0.50,
    duration: '17s',
    delay: '-12s',
    blur: '18px',
    height: 410,
    path: 'M0,90 C300,240, 600,50, 920,180 C1240,320, 1550,60, 1800,150 L1800,450 L0,450 Z',
  },
];

export default function FallingColorBackground() {
  return (
    <>
      {/* Rich Multi-color Ambient Background Lighting */}
      <div className="ambient-glow-left-warm" />
      <div className="ambient-glow-top-right" />
      <div className="ambient-glow-bottom" />
      <div className="ambient-glow-rose" />
      <div className="ambient-glow-emerald" />

      {/* Cascading Falling Color Waves Container */}
      <div className="falling-waves-container" aria-hidden="true">
        {WAVES.map((w) => (
          <div
            key={w.id}
            className="falling-wave-ribbon"
            style={{
              height: `${w.height}px`,
              filter: `blur(${w.blur})`,
              opacity: w.opacity,
              animationDuration: w.duration,
              animationDelay: w.delay,
            }}
          >
            <svg
              className="wave-svg-graphic"
              viewBox="0 0 1800 480"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={w.gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={w.stop1} stopOpacity="0.85" />
                  <stop offset="45%" stopColor={w.stop2} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={w.stop3} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={w.path} fill={`url(#${w.gradientId})`} />
            </svg>
          </div>
        ))}
      </div>
    </>
  );
}

