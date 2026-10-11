import React from 'react';
import {
  Menu,
  Search,
  Bell,
  Plus,
  Landmark,
  Radio
} from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

export function Navbar({ onMenuToggle }) {
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    metrics
  } = useComplaints();

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Executive Civic Command Dashboard';
      case 'submit':
        return 'Lodge Citizen Grievance';
      case 'complaints':
        return 'Grievance Operations & Workflow';
      case 'ai-analysis':
        return 'AI Predictive Intelligence & NLP Triage';
      case 'emergency':
        return 'Active Hazard & Emergency Protocols';
      case 'hotspots':
        return 'Municipal Ward Hotspot Analytics';
      default:
        return 'CivicPulse Smart City Operations';
    }
  };

  return (
    <header className="civic-navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-btn"
          onClick={onMenuToggle}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="nav-title-group">
          <h2>{getPageTitle()}</h2>
          <p>
            <span className="pulse-dot" />
            <span>GovNet Ops Live &bull; Municipal Zone 4 Command</span>
          </p>
        </div>
      </div>

      <div className="navbar-right">
        {/* Quick Search */}
        <div className="quick-search">
          <Search size={16} className="quick-search-icon" />
          <input
            type="text"
            placeholder="Search by ID, keyword, ward..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (activeTab !== 'complaints' && activeTab !== 'dashboard') {
                setActiveTab('complaints');
              }
            }}
          />
        </div>

        {/* City Council Badge */}
        <div className="city-badge" title="Designated Smart City Municipal Jurisdiction">
          <Landmark size={15} />
          <span>BBMP Urban Central</span>
        </div>

        {/* Emergency Alert Bell */}
        <button
          onClick={() => setActiveTab('emergency')}
          className="btn btn-outline"
          style={{
            position: 'relative',
            padding: '8px 12px',
            border: metrics.emergencyCount > 0 ? '1px solid #fecaca' : undefined,
            backgroundColor: metrics.emergencyCount > 0 ? '#fef2f2' : undefined,
            color: metrics.emergencyCount > 0 ? '#b91c1c' : undefined
          }}
          title={metrics.emergencyCount > 0 ? `${metrics.emergencyCount} Active Hazards` : 'No Critical Emergencies'}
        >
          <Bell size={18} />
          {metrics.emergencyCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#ef4444',
                color: '#ffffff',
                borderRadius: '50%',
                fontSize: '0.7rem',
                fontWeight: '700',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff'
              }}
            >
              {metrics.emergencyCount}
            </span>
          )}
        </button>

        {/* Action Button: Submit Complaint */}
        {activeTab !== 'submit' && (
          <button
            onClick={() => setActiveTab('submit')}
            className="btn btn-primary"
            style={{ padding: '8px 14px' }}
          >
            <Plus size={16} />
            <span>New Grievance</span>
          </button>
        )}

        {/* Admin Profile */}
        <div className="user-profile" title="Municipal Administrator">
          <div className="user-avatar">RS</div>
          <div className="user-details">
            <div className="user-name">Er. R. Sharma</div>
            <div className="user-role">Nodal Officer &bull; Zone 4</div>
          </div>
        </div>
      </div>
    </header>
  );
}
