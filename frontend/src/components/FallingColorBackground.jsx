import React from 'react';

// Pre-defined particles with rich color palettes, sizes, positions, delays and durations
const PARTICLES = [
  { id: 1, left: '3%', size: 30, color: 'radial-gradient(circle, #f59e0b 0%, rgba(245, 158, 11, 0.45) 70%, transparent 100%)', duration: '14s', delay: '-3s', blur: '4px', shadow: '0 0 16px rgba(245, 158, 11, 0.5)' },
  { id: 2, left: '8%', size: 13, color: 'radial-gradient(circle, #818cf8 0%, rgba(99, 102, 241, 0.65) 80%, transparent 100%)', duration: '11s', delay: '-8s', blur: '1px', shadow: '0 0 12px rgba(99, 102, 241, 0.6)' },
  { id: 3, left: '13%', size: 46, color: 'radial-gradient(circle, #fb7185 0%, rgba(244, 63, 94, 0.4) 70%, transparent 100%)', duration: '19s', delay: '-1s', blur: '8px', shadow: '0 0 20px rgba(244, 63, 94, 0.45)' },
  { id: 4, left: '18%', size: 16, color: 'radial-gradient(circle, #38bdf8 0%, rgba(6, 182, 212, 0.55) 80%, transparent 100%)', duration: '12s', delay: '-6s', blur: '2px', shadow: '0 0 14px rgba(6, 182, 212, 0.5)' },
  { id: 5, left: '24%', size: 38, color: 'radial-gradient(circle, #34d399 0%, rgba(16, 185, 129, 0.4) 70%, transparent 100%)', duration: '17s', delay: '-11s', blur: '6px', shadow: '0 0 18px rgba(16, 185, 129, 0.4)' },
  { id: 6, left: '30%', size: 11, color: 'radial-gradient(circle, #c084fc 0%, rgba(168, 85, 247, 0.65) 80%, transparent 100%)', duration: '10s', delay: '-4s', blur: '1px', shadow: '0 0 12px rgba(168, 85, 247, 0.6)' },
  { id: 7, left: '36%', size: 54, color: 'radial-gradient(circle, #fcd34d 0%, rgba(245, 158, 11, 0.35) 70%, transparent 100%)', duration: '22s', delay: '-14s', blur: '12px', shadow: '0 0 24px rgba(245, 158, 11, 0.4)' },
  { id: 8, left: '42%', size: 15, color: 'radial-gradient(circle, #f43f5e 0%, rgba(244, 63, 94, 0.55) 80%, transparent 100%)', duration: '13s', delay: '-9s', blur: '2px', shadow: '0 0 14px rgba(244, 63, 94, 0.55)' },
  { id: 9, left: '48%', size: 34, color: 'radial-gradient(circle, #6366f1 0%, rgba(99, 102, 241, 0.4) 70%, transparent 100%)', duration: '16s', delay: '-2s', blur: '5px', shadow: '0 0 18px rgba(99, 102, 241, 0.45)' },
  { id: 10, left: '54%', size: 18, color: 'radial-gradient(circle, #2dd4bf 0%, rgba(20, 184, 166, 0.55) 80%, transparent 100%)', duration: '12s', delay: '-7s', blur: '2px', shadow: '0 0 14px rgba(20, 184, 166, 0.5)' },
  { id: 11, left: '60%', size: 44, color: 'radial-gradient(circle, #e879f9 0%, rgba(217, 70, 239, 0.4) 70%, transparent 100%)', duration: '18s', delay: '-13s', blur: '8px', shadow: '0 0 20px rgba(217, 70, 239, 0.45)' },
  { id: 12, left: '66%', size: 12, color: 'radial-gradient(circle, #fbbf24 0%, rgba(245, 158, 11, 0.65) 80%, transparent 100%)', duration: '11s', delay: '-5s', blur: '1px', shadow: '0 0 12px rgba(245, 158, 11, 0.6)' },
  { id: 13, left: '72%', size: 40, color: 'radial-gradient(circle, #38bdf8 0%, rgba(56, 189, 248, 0.4) 70%, transparent 100%)', duration: '17s', delay: '-10s', blur: '7px', shadow: '0 0 18px rgba(56, 189, 248, 0.45)' },
  { id: 14, left: '78%', size: 16, color: 'radial-gradient(circle, #f43f5e 0%, rgba(244, 63, 94, 0.55) 80%, transparent 100%)', duration: '13s', delay: '-3s', blur: '2px', shadow: '0 0 14px rgba(244, 63, 94, 0.55)' },
  { id: 15, left: '84%', size: 50, color: 'radial-gradient(circle, #a855f7 0%, rgba(168, 85, 247, 0.4) 70%, transparent 100%)', duration: '20s', delay: '-15s', blur: '10px', shadow: '0 0 22px rgba(168, 85, 247, 0.45)' },
  { id: 16, left: '90%', size: 16, color: 'radial-gradient(circle, #10b981 0%, rgba(16, 185, 129, 0.55) 80%, transparent 100%)', duration: '12s', delay: '-8s', blur: '2px', shadow: '0 0 14px rgba(16, 185, 129, 0.5)' },
  { id: 17, left: '95%', size: 32, color: 'radial-gradient(circle, #f59e0b 0%, rgba(245, 158, 11, 0.45) 70%, transparent 100%)', duration: '15s', delay: '-4s', blur: '5px', shadow: '0 0 16px rgba(245, 158, 11, 0.5)' },
  { id: 18, left: '6%', size: 24, color: 'radial-gradient(circle, #ec4899 0%, rgba(236, 72, 153, 0.5) 80%, transparent 100%)', duration: '14s', delay: '-12s', blur: '3px', shadow: '0 0 16px rgba(236, 72, 153, 0.5)' },
  { id: 19, left: '50%', size: 22, color: 'radial-gradient(circle, #06b6d4 0%, rgba(6, 182, 212, 0.55) 80%, transparent 100%)', duration: '13s', delay: '-11s', blur: '3px', shadow: '0 0 14px rgba(6, 182, 212, 0.5)' },
  { id: 20, left: '81%', size: 26, color: 'radial-gradient(circle, #eab308 0%, rgba(234, 179, 8, 0.5) 80%, transparent 100%)', duration: '15s', delay: '-6s', blur: '4px', shadow: '0 0 16px rgba(234, 179, 8, 0.5)' },
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

      {/* Floating / Falling Color Particles Container */}
      <div className="falling-particles-container" aria-hidden="true">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="falling-drop"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              boxShadow: p.shadow,
              filter: `blur(${p.blur})`,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
    </>
  );
}
