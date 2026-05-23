import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';

const API_BASE = "";

const DebugHistory = ({ userId, isOpen, onToggle, usageCount = 0 }) => {
  const { token, user, logout } = useAuth();
  const [debugs, setDebugs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDebugHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/debug-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId })
      });
      if (response.ok) {
        const data = await response.json();
        setDebugs(data.debugs || []);
      }
    } catch (err) {
      console.error('[DebugHistory] Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && token) fetchDebugHistory();
  }, [isOpen, userId, token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <>
      {/* Toggle button — always visible */}
      <button
        onClick={onToggle}
        className="sidebar-toggle"
        title={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>
            <path d="M15 9l-3 3 3 3"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>
            <path d="M14 9l3 3-3 3"/>
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Top: New Debug button */}
        <div className="sidebar-top">
          <button className="sidebar-new-btn" onClick={() => window.location.reload()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Debug
          </button>
        </div>

        {/* History list */}
        <div className="sidebar-history">
          <div className="sidebar-history-label">Recent Sessions</div>
          {loading ? (
            <div className="sidebar-empty">Loading...</div>
          ) : debugs.length === 0 ? (
            <div className="sidebar-empty">No sessions yet</div>
          ) : (
            <div className="sidebar-list">
              {debugs.map((debug, i) => (
                <div key={debug.id || i} className="sidebar-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.5 }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <div className="sidebar-item-content">
                    <div className="sidebar-item-title">
                      {debug.language} — {debug.preview || 'Debug session'}
                    </div>
                    <div className="sidebar-item-time">{formatDate(debug.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: User info + usage */}
        <div className="sidebar-bottom">
          <div className="sidebar-usage">
            <div className="sidebar-usage-bar">
              <div
                className="sidebar-usage-fill"
                style={{ width: `${Math.min(100, (usageCount / 50) * 100)}%` }}
              />
            </div>
            <div className="sidebar-usage-text">
              {usageCount}/50 debugs today
            </div>
          </div>
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {user?.display_name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.display_name}</div>
              <div className="sidebar-user-email">{user?.email}</div>
            </div>
            <button onClick={logout} className="sidebar-logout-btn" title="Logout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DebugHistory;
