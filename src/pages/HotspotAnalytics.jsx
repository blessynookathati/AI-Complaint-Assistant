import React, { useState } from 'react';
import {
  Flame,
  MapPin,
  TrendingUp,
  BarChart3,
  AlertTriangle,
  Compass,
  Building,
  CheckCircle,
  Clock,
  Layers,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { MOCK_HOTSPOTS, MONTHLY_TREND_DATA } from '../data/mockHotspots';
import { useComplaints } from '../context/ComplaintContext';

export function HotspotAnalytics() {
  const { setActiveTab, setSearchQuery } = useComplaints();
  const [selectedZone, setSelectedZone] = useState('All');

  const filteredHotspots = selectedZone === 'All'
    ? MOCK_HOTSPOTS
    : MOCK_HOTSPOTS.filter(h => h.zone.toLowerCase().includes(selectedZone.toLowerCase()));

  const handleInspectWard = (ward) => {
    setSearchQuery(ward);
    setActiveTab('complaints');
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <h1 style={{ fontSize: '1.6rem', color: '#0f172a' }}>Municipal Hotspot & Spatial Risk Analytics</h1>
          <span className="demo-tag">Predictive Model</span>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
          Spatial DBSCAN clustering identifying recurring civic grievance corridors across city wards
        </p>
      </div>

      {/* Demo Disclaimer */}
      <div
        style={{
          backgroundColor: '#f0fdfa',
          border: '1px solid #99f6e4',
          borderRadius: '10px',
          padding: '12px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <Sparkles size={20} color="#0d9488" />
        <div style={{ fontSize: '0.84rem', color: '#0f766e' }}>
          <strong>Sample Analytics Notice:</strong> The geographic clusters, risk indexes, and monthly trends shown on this page are generated from synthetic smart-city spatial simulation data to demonstrate recurring issue tracking.
        </div>
      </div>

      {/* Top Stat Summary for Hotspots */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card rose">
          <div className="stat-info">
            <span className="stat-label">Critical Hazard Corridors</span>
            <span className="stat-value">2</span>
            <span className="stat-sub">Bellandur & Peenya Industrial</span>
          </div>
          <div className="stat-icon-wrapper rose">
            <Flame size={22} />
          </div>
        </div>

        <div className="stat-card amber">
          <div className="stat-info">
            <span className="stat-label">Recurring Complaints</span>
            <span className="stat-value">59</span>
            <span className="stat-sub positive">+14% recurrence rate</span>
          </div>
          <div className="stat-icon-wrapper amber">
            <TrendingUp size={22} />
          </div>
        </div>

        <div className="stat-card teal">
          <div className="stat-info">
            <span className="stat-label">Monitored Zones</span>
            <span className="stat-value">5 Wards</span>
            <span className="stat-sub">Across 3 City Divisions</span>
          </div>
          <div className="stat-icon-wrapper teal">
            <Compass size={22} />
          </div>
        </div>

        <div className="stat-card emerald">
          <div className="stat-info">
            <span className="stat-label">Mean Resolution SLA</span>
            <span className="stat-value">28.2 hrs</span>
            <span className="stat-sub positive">Down from 34.5 hrs</span>
          </div>
          <div className="stat-icon-wrapper emerald">
            <Clock size={22} />
          </div>
        </div>
      </div>

      {/* Monthly Trend & Zone Filter */}
      <div className="dashboard-grid-2" style={{ marginBottom: '24px' }}>
        {/* Monthly Reported vs Resolved Chart */}
        <div className="civic-card">
          <div className="civic-card-header">
            <div className="civic-card-title">
              <BarChart3 size={20} color="#0d9488" />
              <span>Grievance Volume & Resolution Velocity (6-Month Trend)</span>
            </div>
            <span className="demo-tag">Monthly</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '18px' }}>
            Comparison between citizen grievance intake vs municipal resolution closures:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {MONTHLY_TREND_DATA.map((item) => {
              const maxVal = 380;
              const repPct = Math.round((item.reported / maxVal) * 100);
              const resPct = Math.round((item.resolved / maxVal) * 100);

              return (
                <div key={item.month}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                    <strong style={{ color: '#0f172a' }}>{item.month}</strong>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Reported: <strong>{item.reported}</strong> | Resolved: <strong style={{ color: '#10b981' }}>{item.resolved}</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '4px', height: '10px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${resPct}%`,
                        backgroundColor: '#10b981',
                        borderRadius: '4px',
                        transition: 'width 0.4s ease'
                      }}
                      title={`Resolved: ${item.resolved}`}
                    />
                    <div
                      style={{
                        width: `${Math.max(0, repPct - resPct)}%`,
                        backgroundColor: '#f59e0b',
                        borderRadius: '4px',
                        transition: 'width 0.4s ease'
                      }}
                      title={`Backlog pending: ${item.reported - item.resolved}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '0.75rem', color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#10b981' }} />
              Resolved & Closed
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#f59e0b' }} />
              Carried-over Backlog
            </span>
          </div>
        </div>

        {/* Spatial Grid Breakdown */}
        <div className="civic-card">
          <div className="civic-card-header">
            <div className="civic-card-title">
              <Compass size={20} color="#0d9488" />
              <span>Municipal Zone Vulnerability Index</span>
            </div>
            <span className="demo-tag">GIS Heatmap</span>
          </div>

          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
            {['All', 'East', 'West', 'South'].map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`btn btn-sm ${selectedZone === zone ? 'btn-secondary' : 'btn-outline'}`}
                style={{ fontSize: '0.78rem', padding: '4px 10px' }}
              >
                {zone} {zone !== 'All' ? 'Zone' : ''}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredHotspots.map((h) => (
              <div
                key={h.id}
                onClick={() => handleInspectWard(h.ward)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0d9488'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{h.location}</strong>
                  <span
                    className="badge"
                    style={{
                      fontSize: '0.72rem',
                      backgroundColor: h.riskLevel === 'Critical' ? '#fef2f2' : h.riskLevel === 'High' ? '#fff7ed' : '#fefce8',
                      color: h.riskLevel === 'Critical' ? '#b91c1c' : h.riskLevel === 'High' ? '#c2410c' : '#a16207'
                    }}
                  >
                    Risk: {h.riskScore}/100
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{h.ward} ({h.zone})</span>
                  <span style={{ color: '#0d9488', fontWeight: 600 }}>{h.statusTrend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Hotspots Grid */}
      <h2 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '16px' }}>
        Identified Civic Clusters & Preventative Engineering Action Plans
      </h2>

      <div className="hotspot-card-grid">
        {filteredHotspots.map((h) => (
          <div
            key={h.id}
            className={`hotspot-card ${
              h.riskLevel === 'Critical'
                ? 'high-risk'
                : h.riskLevel === 'High'
                ? 'medium-risk'
                : 'moderate-risk'
            }`}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span className="complaint-id-link" style={{ fontSize: '0.75rem' }}>
                  {h.id} &bull; {h.ward}
                </span>
                <span
                  className="badge"
                  style={{
                    backgroundColor: h.riskLevel === 'Critical' ? '#fef2f2' : '#fff7ed',
                    color: h.riskLevel === 'Critical' ? '#dc2626' : '#ea580c',
                    fontSize: '0.72rem'
                  }}
                >
                  {h.riskLevel} Risk ({h.riskScore} pts)
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '6px' }}>
                {h.location}
              </h3>

              <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={13} color="#0d9488" /> {h.zone} &bull; Primary Issue: <strong>{h.primaryIssue}</strong>
              </div>

              <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '8px 12px', marginBottom: '14px' }}>
                <div className="hotspot-stat-row">
                  <span style={{ color: '#64748b' }}>Total Correlated Issues:</span>
                  <strong>{h.totalComplaints}</strong>
                </div>
                <div className="hotspot-stat-row">
                  <span style={{ color: '#64748b' }}>48h Repeat Recurrences:</span>
                  <strong style={{ color: '#ea580c' }}>{h.recurringCount} incidents</strong>
                </div>
                <div className="hotspot-stat-row">
                  <span style={{ color: '#64748b' }}>Mean Ward Resolution:</span>
                  <strong>{h.avgResolutionHours} hours</strong>
                </div>
              </div>

              <div style={{ backgroundColor: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f766e', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                  Preventative Municipal Directive
                </span>
                <p style={{ fontSize: '0.8rem', color: '#134e4a', lineHeight: 1.4 }}>
                  {h.recommendation}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleInspectWard(h.ward)}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>View {h.ward} Complaints in Console</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
