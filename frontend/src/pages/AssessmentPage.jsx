import React, { useState, useEffect } from 'react';
import { getRandomScenario, submitAssessment } from '../services/api.js';
import { getSessionId } from '../utils/session.js';
import { RefreshCw, Send, AlertCircle, Sparkles } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AssessmentPage({ onSubmitSuccess }) {
  const [scenario, setScenario] = useState(null);
  const [loadingScenario, setLoadingScenario] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    loadScenario();
  }, []);

  async function loadScenario() {
    setLoadingScenario(true);
    setError(null);
    try {
      const data = await getRandomScenario();
      setScenario(data);
      // Pre-fill a professional sample recipient if relevant to context
      if (data?.category === 'Customer Support') {
        setTo('customer@clientdomain.com');
      } else if (data?.category === 'Workplace Request' || data?.category === 'Status Update') {
        setTo('manager@company.com');
      } else if (data?.category === 'Job Application') {
        setTo('recruiter@company.com');
      } else {
        setTo('recipient@organization.com');
      }
    } catch (err) {
      setError(err.message || 'Failed to load a scenario. Please check your backend connection.');
    } finally {
      setLoadingScenario(false);
    }
  }

  function validate() {
    const errs = {};
    if (!to.trim()) {
      errs.to = 'Recipient email address (To) is required.';
    } else if (!EMAIL_REGEX.test(to.trim())) {
      errs.to = 'Please enter a valid email address (e.g. name@company.com).';
    }

    if (!subject.trim()) {
      errs.subject = 'Subject line is required.';
    } else if (subject.trim().length > 200) {
      errs.subject = 'Subject line cannot exceed 200 characters.';
    }

    if (!body.trim()) {
      errs.body = 'Email body cannot be empty.';
    } else if (body.trim().length < 15) {
      errs.body = 'Please compose a more complete email (at least 15 characters).';
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    if (!scenario?.id) {
      setError('No scenario loaded. Please refresh scenario.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const sessionId = getSessionId();
      const result = await submitAssessment({
        sessionId,
        scenarioId: scenario.id,
        to: to.trim(),
        subject: subject.trim(),
        body: body.trim()
      });

      if (onSubmitSuccess) {
        onSubmitSuccess(result);
      }
    } catch (err) {
      setError(err.message || 'Evaluation failed. Please try again.');
      setSubmitting(false);
    }
  }

  if (loadingScenario) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <RefreshCw size={28} className="animate-spin" color="#4f46e5" style={{ margin: '0 auto 16px' }} />
        <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Retrieving your email scenario...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Scenario Banner Card */}
      {scenario && (
        <div className="scenario-banner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
            <div>
              <span className="category-tag">{scenario.category || 'General Scenario'}</span>
              <h2 className="scenario-title">{scenario.scenario}</h2>
              <p className="scenario-context">{scenario.context}</p>
            </div>
            <button
              type="button"
              className="action-chip glass"
              onClick={loadScenario}
              disabled={submitting}
              title="Load a different random scenario"
              style={{ flexShrink: 0, padding: '6px 14px', fontSize: '12px' }}
            >
              <RefreshCw size={12} />
              <span>Change Scenario</span>
            </button>
          </div>
        </div>
      )}

      {/* Error alert if any */}
      {error && (
        <div style={{
          background: 'var(--color-danger-bg)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '14px',
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--color-danger)',
          fontSize: '14px'
        }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Email Writing Workspace */}
      <form onSubmit={handleSubmit} style={{ background: 'var(--glass-card-bg)', padding: '28px', borderRadius: 'var(--radius-card)', border: '1px solid var(--glass-card-border)', boxShadow: 'var(--shadow-card)' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="email-to">
            To <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Recipient)</span>
          </label>
          <input
            id="email-to"
            type="email"
            className="glass-input"
            placeholder="e.g. manager@company.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={submitting}
          />
          {validationErrors.to && (
            <span style={{ fontSize: '12px', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
              {validationErrors.to}
            </span>
          )}
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label className="form-label" htmlFor="email-subject" style={{ margin: 0 }}>
              Subject Line
            </label>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {subject.length} / 200 chars
            </span>
          </div>
          <input
            id="email-subject"
            type="text"
            className="glass-input"
            placeholder="e.g. Request for Time Off - Friday, Oct 24"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={200}
            disabled={submitting}
          />
          {validationErrors.subject && (
            <span style={{ fontSize: '12px', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
              {validationErrors.subject}
            </span>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label className="form-label" htmlFor="email-body" style={{ margin: 0 }}>
              Email Body
            </label>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {body.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            id="email-body"
            className="glass-input glass-textarea"
            placeholder="Write your email here... Remember to include a proper salutation, clear message body, and professional sign-off."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={submitting}
          />
          {validationErrors.body && (
            <span style={{ fontSize: '12px', color: 'var(--color-danger)', marginTop: '4px', display: 'block' }}>
              {validationErrors.body}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '14px' }}>
          <button
            type="submit"
            className="action-chip primary"
            disabled={submitting}
            style={{ padding: '12px 28px', fontSize: '14px', opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? (
              <>
                <Sparkles size={16} className="animate-spin" />
                <span>Evaluating Email with AI...</span>
              </>
            ) : (
              <>
                <Send size={15} />
                <span>Submit for Evaluation</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
