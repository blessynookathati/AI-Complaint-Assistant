import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  ListTodo,
  BrainCircuit,
  AlertOctagon,
  Flame,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

export function Sidebar({ mobileOpen, setMobileOpen }) {
  const { activeTab, setActiveTab, metrics, resetToDefaultData } = useComplaints();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'submit',
      label: 'Submit Complaint',
      icon: PlusCircle,
      badge: null
    },
    {
      id: 'complaints',
      label: 'Complaint Management',
      icon: ListTodo,
      badge: metrics.totalComplaints
    },
    {
      id: 'ai-analysis',
      label: 'AI Grievance Triage',
      icon: BrainCircuit,
      badge: 'CivicBERT'
    },
    {
      id: 'emergency',
      label: 'Emergency Alerts',
      icon: AlertOctagon,
      badge: metrics.emergencyCount > 0 ? metrics.emergencyCount : null,
      badgeType: 'danger'
    },
    {
      id: 'hotspots',
      label: 'Hotspot Analytics',
      icon: Flame,
      badge: '5 Zones'
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      <aside className={`civic-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon-box">
            <ShieldCheck size={24} strokeWidth={2.5} />
          </div>
          <div className="brand-text">
            <h1>CivicPulse <span>AI</span></h1>
            <p>Smart City Ops</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">Operations Console</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-item ${isActive ? 'active' : ''}`}
                id={`nav-${item.id}`}
              >
                <div className="nav-item-content">
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span className={`nav-badge ${item.badgeType === 'danger' ? 'danger' : 'neutral'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="ai-engine-status">
            <div className="ai-engine-status-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Sparkles size={13} color="#2dd4bf" />
                <span>CivicBERT v2.4</span>
              </span>
              <span className="status-indicator">
                <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                Online
              </span>
            </div>
            <p style={{ marginBottom: '10px' }}>
              Simulated edge triage model active. Multi-label civic classifier.
            </p>
            <button
              onClick={resetToDefaultData}
              className="btn btn-outline btn-sm"
              style={{
                width: '100%',
                fontSize: '0.72rem',
                padding: '5px 8px',
                borderColor: '#334155',
                color: '#94a3b8',
                backgroundColor: 'rgba(15, 23, 42, 0.6)'
              }}
              title="Reset complaints to initial sample dataset"
            >
              <RotateCcw size={12} />
              <span>Reset Demo Ledger</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
    </>
  );
}
