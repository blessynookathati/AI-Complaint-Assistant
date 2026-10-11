import React from 'react';
import { CircleDot, Clock, CheckCircle2 } from 'lucide-react';

export function StatusBadge({ status, onClick, isInteractive = false }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'To Do':
        return {
          icon: CircleDot,
          bg: '#eff6ff',
          text: '#1d4ed8',
          border: '#bfdbfe',
          dot: '#3b82f6'
        };
      case 'In Progress':
        return {
          icon: Clock,
          bg: '#fffbeb',
          text: '#b45309',
          border: '#fde68a',
          dot: '#f59e0b'
        };
      case 'Completed':
        return {
          icon: CheckCircle2,
          bg: '#ecfdf5',
          text: '#047857',
          border: '#a7f3d0',
          dot: '#10b981'
        };
      default:
        return {
          icon: CircleDot,
          bg: '#f1f5f9',
          text: '#475569',
          border: '#cbd5e1',
          dot: '#94a3b8'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span
      onClick={isInteractive ? onClick : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
        cursor: isInteractive ? 'pointer' : 'default',
        transition: 'all 0.15s ease',
        userSelect: 'none'
      }}
      title={isInteractive ? 'Click to change status' : status}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: config.dot
        }}
      />
      <Icon size={12} strokeWidth={2.5} />
      <span>{status}</span>
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const getPriorityConfig = () => {
    switch (priority) {
      case 'Critical':
        return {
          bg: '#fef2f2',
          text: '#b91c1c',
          border: '#fecaca',
          dot: '#ef4444'
        };
      case 'High':
        return {
          bg: '#fff7ed',
          text: '#c2410c',
          border: '#fed7aa',
          dot: '#f97316'
        };
      case 'Medium':
        return {
          bg: '#fefce8',
          text: '#a16207',
          border: '#fef08a',
          dot: '#eab308'
        };
      case 'Low':
        return {
          bg: '#f0fdf4',
          text: '#15803d',
          border: '#bbf7d0',
          dot: '#22c55e'
        };
      default:
        return {
          bg: '#f8fafc',
          text: '#475569',
          border: '#e2e8f0',
          dot: '#94a3b8'
        };
    }
  };

  const config = getPriorityConfig();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 9px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '700',
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
        letterSpacing: '0.02em'
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: config.dot
        }}
      />
      {priority}
    </span>
  );
}
