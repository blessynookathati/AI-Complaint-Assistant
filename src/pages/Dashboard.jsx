import React from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  TrendingUp,
  MapPin,
  Sparkles,
  ShieldAlert,
  Eye,
  Filter
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { CategoryChart } from '../components/CategoryChart';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';
import { useComplaints } from '../context/ComplaintContext';
import { MOCK_HOTSPOTS } from '../data/mockHotspots';

export function Dashboard() {
  const {
    complaints,
    metrics,
    setActiveTab,
    setSelectedComplaint,
    updateStatus
  } = useComplaints();

  // Urgent active emergencies
  const activeEmergencies = complaints.filter(c => c.isEmergency && c.status !== 'Completed');

  // Recent 6 complaints
  const recentComplaints = [...complaints].slice(0, 6);

  // Top hotspots
  const topHotspots = MOCK_HOTSPOTS.slice(0, 3);

  return (
    <div className="page-container">
      {/* Welcome Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.75rem', color: '#0f172a', fontWeight: 800 }}>
            Smart City Grievance Intelligence
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '2px' }}>
            Predictive civic triage, workflow orchestration & municipal SLA monitoring
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveTab('submit')}
            className="btn btn-primary"
          >
            Lodge Citizen Complaint
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className="btn btn-outline"
          >
            Manage All Issues
          </button>
        </div>
      </div>

      {/* Emergency Alert Banner if any active hazard */}
      {activeEmergencies.length > 0 && (
        <div className="emergency-banner">
          <div className="emergency-banner-content">
            <ShieldAlert size={28} className="emergency-icon-pulse" />
            <div className="emergency-banner-text">
              <h4>
                {activeEmergencies.length} High-Risk Civic Emergency Alert{activeEmergencies.length > 1 ? 's' : ''} Requiring Action
              </h4>
              <p>
                Potential public safety or structural hazards detected by CivicBERT AI Triage. Review suggested response protocols.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('emergency')}
            className="btn btn-danger btn-sm"
          >
            View Emergency Deck <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Top Key Metrics Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Complaints"
          value={metrics.totalComplaints}
          subtext="+12% from previous week"
          icon={FileText}
          theme="teal"
          trend="positive"
        />
        <StatCard
          title="To Do (Pending)"
          value={metrics.toDoCount}
          subtext="Unassigned / Queue"
          icon={Clock}
          theme="blue"
        />
        <StatCard
          title="In Progress"
          value={metrics.inProgressCount}
          subtext="Under ground action"
          icon={Clock}
          theme="amber"
        />
        <StatCard
          title="Completed"
          value={metrics.completedCount}
          subtext={`${Math.round((metrics.completedCount / (metrics.totalComplaints || 1)) * 100)}% resolution rate`}
          icon={CheckCircle2}
          theme="emerald"
          trend="positive"
        />
        <StatCard
          title="Critical / Urgent"
          value={metrics.criticalCount}
          subtext={`${metrics.emergencyCount} active emergencies`}
          icon={AlertTriangle}
          theme="rose"
        />
      </div>

      {/* Main Grid: Category Distribution & Hotspots Section */}
      <div className="dashboard-grid-2">
        {/* Category Chart */}
        <div>
          <CategoryChart />
        </div>

        {/* Recurring Issues & Hotspots Preview */}
        <div className="civic-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="civic-card-header">
            <div className="civic-card-title">
              <Flame size={20} color="#ea580c" />
              <span>Predictive Hotspots</span>
            </div>
            <button
              onClick={() => setActiveTab('hotspots')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.75rem', padding: '3px 8px' }}
            >
              All Hotspots <ArrowRight size={12} />
            </button>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '14px' }}>
            Wards with repeat complaints within 48h identified by spatial clustering models:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {topHotspots.map((spot) => (
              <div
                key={spot.id}
                onClick={() => setActiveTab('hotspots')}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderLeft: `4px solid ${spot.riskLevel === 'Critical' ? '#ef4444' : '#f59e0b'}`,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a' }}>{spot.location}</strong>
                  <span
                    className="badge"
                    style={{
                      fontSize: '0.7rem',
                      backgroundColor: spot.riskLevel === 'Critical' ? '#fef2f2' : '#fefce8',
                      color: spot.riskLevel === 'Critical' ? '#b91c1c' : '#a16207'
                    }}
                  >
                    {spot.riskLevel} Risk
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={12} /> {spot.ward} &bull; {spot.recurringCount} repeat grievances
                </div>
                <div style={{ fontSize: '0.75rem', color: '#0d9488', marginTop: '6px', fontWeight: 600 }}>
                  Primary: {spot.primaryIssue}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '16px',
              padding: '10px 12px',
              backgroundColor: '#f0fdfa',
              borderRadius: '8px',
              border: '1px solid #ccfbf1',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              color: '#0f766e'
            }}
          >
            <Sparkles size={14} />
            <span>AI suggests preventative crew dispatch to Bellandur Junction.</span>
          </div>
        </div>
      </div>

      {/* Recent Complaints Table */}
      <div className="civic-card">
        <div className="civic-card-header">
          <div className="civic-card-title">
            <FileText size={20} color="#0d9488" />
            <span>Recent Citizen Grievances</span>
          </div>
          <button
            onClick={() => setActiveTab('complaints')}
            className="btn btn-outline btn-sm"
          >
            View All in Management Console <ArrowRight size={14} />
          </button>
        </div>

        <div className="table-responsive">
          <table className="civic-table">
            <thead>
              <tr>
                <th>Grievance ID</th>
                <th>Issue & Description</th>
                <th>Category</th>
                <th>Ward / Location</th>
                <th>Priority</th>
                <th>Department</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentComplaints.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span
                      className="complaint-id-link"
                      onClick={() => setSelectedComplaint(c)}
                      title="Inspect full details"
                    >
                      {c.id}
                    </span>
                  </td>
                  <td className="table-desc-cell">
                    <div className="table-desc-title">
                      {c.isEmergency && <AlertTriangle size={13} color="#ef4444" />}
                      <span>{c.title}</span>
                    </div>
                    <div className="table-desc-text">{c.description}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                      {c.category}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem', color: '#1e293b' }}>{c.location}</div>
                  </td>
                  <td>
                    <PriorityBadge priority={c.priority} />
                  </td>
                  <td>
                    <span style={{ fontSize: '0.78rem', color: '#475569' }}>
                      {c.department}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={c.status} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => setSelectedComplaint(c)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '4px 8px' }}
                        title="View Full Details"
                      >
                        <Eye size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
