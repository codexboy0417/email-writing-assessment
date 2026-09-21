import React, { useState, useEffect } from 'react';
import { getSessionHistory } from '../services/api.js';
import { getSessionId } from '../utils/session.js';
import { Award, Clock, ArrowRight, RefreshCw, Calendar, FileText } from 'lucide-react';

export default function HistoryPage({ onStartAssessment, onSelectAttempt }) {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    setLoading(true);
    setError(null);
    try {
      const sessionId = getSessionId();
      const data = await getSessionHistory(sessionId);
      setHistory(data);
    } catch (err) {
      setError(err.message || 'Failed to load assessment history.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <RefreshCw size={28} className="animate-spin" color="#4f46e5" style={{ margin: '0 auto 16px' }} />
        <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Loading your attempt history...</p>
      </div>
    );
  }

  const { totalAttempts = 0, totalPoints = 0, attempts = [] } = history || {};
  const avgScore = totalAttempts > 0 ? Math.round(totalPoints / totalAttempts) : 0;

  return (
    <div>
      {/* Stats Header Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div style={{
          background: 'var(--glass-card-bg)',
          border: '1px solid var(--glass-card-border)',
          borderRadius: '18px',
          padding: '20px 24px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Total Attempts
          </span>
          <p style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            {totalAttempts}
          </p>
        </div>

        <div style={{
          background: 'var(--glass-card-bg)',
          border: '1px solid var(--glass-card-border)',
          borderRadius: '18px',
          padding: '20px 24px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Cumulative Points
          </span>
          <p style={{ fontSize: '28px', fontWeight: 800, color: '#4f46e5', marginTop: '4px' }}>
            {totalPoints} <span style={{ fontSize: '14px', fontWeight: 600 }}>pts</span>
          </p>
        </div>

        <div style={{
          background: 'var(--glass-card-bg)',
          border: '1px solid var(--glass-card-border)',
          borderRadius: '18px',
          padding: '20px 24px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Average Score
          </span>
          <p style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            {avgScore} <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>/ 100</span>
          </p>
        </div>
      </div>

      {/* Attempts List */}
      <div style={{
        background: 'var(--glass-card-bg)',
        border: '1px solid var(--glass-card-border)',
        borderRadius: 'var(--radius-card)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Previous Attempts
          </h3>
          <button className="action-chip primary" onClick={onStartAssessment} style={{ padding: '8px 18px' }}>
            <span>New Attempt</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {attempts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <FileText size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px', opacity: 0.6 }} />
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              No attempts yet in this browser session.
            </p>
            <button className="action-chip primary" onClick={onStartAssessment}>
              Start Your First Assessment
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {attempts.map((attempt) => {
              const formattedDate = new Date(attempt.submittedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={attempt.attemptId}
                  onClick={() => onSelectAttempt && onSelectAttempt(attempt.attemptId)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(225, 232, 245, 0.8)',
                    transition: 'all 0.2s',
                    cursor: onSelectAttempt ? 'pointer' : 'default'
                  }}
                  className="attempt-row-hover"
                >
                  <div style={{ minWidth: 0, flex: 1, paddingRight: '16px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {attempt.scenario}
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Subject: {attempt.subject}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '99px',
                        fontSize: '13px',
                        fontWeight: 700,
                        background: attempt.totalScore >= 80 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                        color: attempt.totalScore >= 80 ? '#059669' : '#4f46e5'
                      }}>
                        {attempt.totalScore} / 100
                      </span>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {formattedDate}
                      </span>
                    </div>

                    {onSelectAttempt && (
                      <ArrowRight size={16} color="var(--text-muted)" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
