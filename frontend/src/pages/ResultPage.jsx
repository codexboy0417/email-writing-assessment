import React from 'react';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

export default function ResultPage({ result, onTryAgain, onViewHistory }) {
  if (!result) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ color: 'var(--text-muted)' }}>No recent assessment result found.</p>
        <button className="action-chip primary" onClick={onTryAgain} style={{ marginTop: '16px' }}>
          Take Assessment
        </button>
      </div>
    );
  }

  const { totalScore = 0, scores = {}, feedback = {}, pointsAdded = 0, totalPoints = 0 } = result;

  // Grade badge styling based on score
  const getBadgeStyle = (score) => {
    if (score >= 85) return { text: 'Excellent', color: '#059669', bg: '#ecfdf5' };
    if (score >= 70) return { text: 'Good', color: '#4f46e5', bg: '#eef2ff' };
    if (score >= 50) return { text: 'Developing', color: '#d97706', bg: '#fffbeb' };
    return { text: 'Needs Improvement', color: '#dc2626', bg: '#fef2f2' };
  };

  const badge = getBadgeStyle(totalScore);

  const criteria = [
    { key: 'subject', label: 'Subject Line', score: scores.subject || 0, max: 20 },
    { key: 'structure', label: 'Email Structure', score: scores.structure || 0, max: 15 },
    { key: 'content', label: 'Content Relevance', score: scores.content || 0, max: 20 },
    { key: 'tone', label: 'Tone & Etiquette', score: scores.tone || 0, max: 25 },
    { key: 'grammar', label: 'Grammar & Mechanics', score: scores.grammar || 0, max: 20 },
  ];

  return (
    <div>
      {/* Top Score Banner */}
      <div style={{
        background: 'var(--glass-card-bg)',
        border: '1px solid var(--glass-card-border)',
        borderRadius: 'var(--radius-card)',
        padding: '32px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(79, 70, 229, 0.25)'
          }}>
            <span style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1 }}>{totalScore}</span>
            <span style={{ fontSize: '11px', opacity: 0.85, fontWeight: 600 }}>OUT OF 100</span>
          </div>

          <div>
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '99px',
              fontSize: '12px',
              fontWeight: 700,
              color: badge.color,
              background: badge.bg,
              marginBottom: '8px'
            }}>
              {badge.text}
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Assessment Evaluation
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
              +{pointsAdded} points added to your cumulative session score.
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(15, 23, 42, 0.04)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          borderRadius: '16px',
          padding: '16px 24px',
          textAlign: 'right'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>
            TOTAL CUMULATIVE SCORE
          </span>
          <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {totalPoints} <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>pts</span>
          </span>
        </div>
      </div>

      {/* 5-Criteria Breakdown Grid */}
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
        Performance by Criteria
      </h3>
      <div className="scores-grid">
        {criteria.map((item) => {
          const pct = Math.round((item.score / item.max) * 100);
          return (
            <div key={item.key} className="score-criterion-card">
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                {item.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span className="score-value">{item.score}</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>/ {item.max}</span>
              </div>
              <div className="score-bar-track">
                <div className="score-bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Actionable Feedback Panels */}
      <div className="feedback-container">
        <div className="feedback-card strengths">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-success)' }}>
            <CheckCircle2 size={18} />
            <h4 style={{ fontSize: '15px', fontWeight: 700 }}>What You Did Well</h4>
          </div>
          <ul className="feedback-list">
            {feedback.strengths?.map((str, idx) => (
              <li key={idx}>
                <span style={{ color: 'var(--color-success)' }}>•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="feedback-card improvements">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-warning)' }}>
            <AlertTriangle size={18} />
            <h4 style={{ fontSize: '15px', fontWeight: 700 }}>Areas for Improvement</h4>
          </div>
          <ul className="feedback-list">
            {feedback.improvements?.map((imp, idx) => (
              <li key={idx}>
                <span style={{ color: 'var(--color-warning)' }}>•</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <button className="action-chip glass" onClick={onViewHistory}>
          <Award size={14} />
          <span>View All Attempts</span>
        </button>

        <button className="action-chip primary" onClick={onTryAgain} style={{ padding: '10px 24px' }}>
          <RotateCcw size={14} />
          <span>Practice Another Scenario</span>
        </button>
      </div>
    </div>
  );
}
