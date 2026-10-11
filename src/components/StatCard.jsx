import React from 'react';

export function StatCard({ title, value, subtext, icon: Icon, theme = 'teal', trend }) {
  return (
    <div className={`stat-card ${theme}`}>
      <div className="stat-info">
        <span className="stat-label">{title}</span>
        <span className="stat-value">{value}</span>
        {subtext && (
          <span className={`stat-sub ${trend === 'positive' ? 'positive' : ''}`}>
            {subtext}
          </span>
        )}
      </div>
      {Icon && (
        <div className={`stat-icon-wrapper ${theme}`}>
          <Icon size={22} strokeWidth={2.2} />
        </div>
      )}
    </div>
  );
}
