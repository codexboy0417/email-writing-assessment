import React from 'react';
import { Send, CheckCircle2, TrendingUp, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export default function LandingPage({ onStartAssessment, onViewHistory, totalPoints = 0 }) {
  return (
    <div>
      <div style={{ maxWidth: '720px' }}>
        <h1 className="hero-heading">
          Ready to Master Professional Email Communication?
        </h1>
        <p className="hero-subtitle">
          Practice realistic workplace scenarios. Get an objective score out of 100 based on your Subject line, Structure, Content relevance, Tone, and Grammar.
        </p>
      </div>

      {/* 3 Feature Cards matching reference aesthetic */}
      <div className="feature-cards-grid">
        <div className="feature-card">
          <div>
            <div className="card-icon-wrap" style={{ background: '#eff6ff', color: '#3b82f6' }}>
              <Send size={24} />
            </div>
            <p className="feature-card-text">
              Tackle dynamic workplace scenarios: from asking for time off to de-escalating customer complaints.
            </p>
          </div>
          <span className="feature-card-footer">Realistic Scenarios</span>
        </div>

        <div className="feature-card">
          <div>
            <div className="card-icon-wrap" style={{ background: '#ecfdf5', color: '#10b981' }}>
              <CheckCircle2 size={24} />
            </div>
            <p className="feature-card-text">
              Instant AI evaluation across 5 criteria: Subject, Structure, Content, Tone, and Grammar.
            </p>
          </div>
          <span className="feature-card-footer">Automated Marking</span>
        </div>

        <div className="feature-card">
          <div>
            <div className="card-icon-wrap" style={{ background: '#fef3c7', color: '#f59e0b' }}>
              <TrendingUp size={24} />
            </div>
            <p className="feature-card-text">
              Accumulate points with every attempt. Review detailed strengths and targeted recommendations.
            </p>
          </div>
          <span className="feature-card-footer">Cumulative Growth</span>
        </div>
      </div>

      {/* Bottom Action / Workspace Bar */}
      <div className="bottom-bar-panel">
        <div className="prompt-chips-group">
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
            Popular Scenarios:
          </span>
          <span className="action-chip glass">Ask for time off</span>
          <span className="action-chip glass">Damaged product response</span>
          <span className="action-chip glass">Interview follow-up</span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="action-chip glass" onClick={onViewHistory}>
            History ({totalPoints} pts)
          </button>
          <button className="action-chip primary" onClick={onStartAssessment}>
            <span>Start Assessment</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
