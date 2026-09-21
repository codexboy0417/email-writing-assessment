import React from 'react';
import { Award, Mail, Sparkles } from 'lucide-react';

export default function Header({ totalPoints = 0, currentView = 'landing', onViewChange }) {
  return (
    <header className="top-nav">
      <div className="nav-pill-badge" onClick={() => onViewChange('landing')} style={{ cursor: 'pointer' }}>
        <Mail size={16} color="#4f46e5" />
        <span>Email Evaluator v1.0</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="points-pill" title="Cumulative assessment points accumulated across all your submissions">
          <Award size={15} color="#f59e0b" />
          <span>{totalPoints} Points</span>
        </div>

        {currentView !== 'assessment' && (
          <button
            className="action-chip primary"
            onClick={() => onViewChange('assessment')}
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            <Sparkles size={14} />
            <span>New Test</span>
          </button>
        )}
      </div>
    </header>
  );
}
