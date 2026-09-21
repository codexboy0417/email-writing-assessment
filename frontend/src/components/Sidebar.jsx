import React from 'react';
import { Home, Edit3, History, Sparkles } from 'lucide-react';

export default function Sidebar({ currentView, onViewChange }) {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-nav-group">
        <button
          className={`nav-icon-btn ${currentView === 'landing' ? 'active' : ''}`}
          onClick={() => onViewChange('landing')}
          title="Home / Overview"
          aria-label="Home"
        >
          <Home size={20} />
        </button>

        <button
          className={`nav-icon-btn ${currentView === 'assessment' ? 'active' : ''}`}
          onClick={() => onViewChange('assessment')}
          title="Take Assessment"
          aria-label="Assessment"
        >
          <Edit3 size={20} />
        </button>

        <button
          className={`nav-icon-btn ${currentView === 'history' ? 'active' : ''}`}
          onClick={() => onViewChange('history')}
          title="Attempt History & Points"
          aria-label="History"
        >
          <History size={20} />
        </button>
      </div>

      <div className="brand-badge" title="Email Assessment Platform">
        <Sparkles size={20} />
      </div>
    </aside>
  );
}
