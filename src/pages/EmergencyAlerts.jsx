import React from 'react';
import {
  AlertOctagon,
  ShieldAlert,
  Clock,
  MapPin,
  Building2,
  CheckCircle2,
  Phone,
  Eye,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Siren
} from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';
import { PriorityBadge, StatusBadge } from '../components/StatusBadge';

export function EmergencyAlerts() {
  const { complaints, updateStatus, setSelectedComplaint } = useComplaints();

  // All complaints flagged as emergency
  const emergencyComplaints = complaints.filter(c => c.isEmergency);

  // Active (unresolved) emergencies
  const activeEmergencies = emergencyComplaints.filter(c => c.status !== 'Completed');
  const resolvedEmergencies = emergencyComplaints.filter(c => c.status === 'Completed');

  // Suggested actions mapping based on category
  const getProtocolAction = (category) => {
    switch (category) {
      case 'Streetlights & Electrical':
        return {
          protocol: 'Code Electrical Hazard (SLA 2-4h)',
          action: 'Dispatch BESCOM/Electrical rapid line-crew to isolate sector transformer, install hazard barricade, and string replacement cables.'
        };
      case 'Roads & Potholes':
        return {
          protocol: 'Highway Collision Prevention (SLA 4-6h)',
          action: 'Erect illuminated reflective warning pylons immediately and dispatch rapid cold-mix asphalt patch truck.'
        };
      case 'Drainage & Sewerage':
      case 'Water Supply & Contamination':
        return {
          protocol: 'Hydraulic Crisis Protocol (SLA 3-5h)',
          action: 'Close isolation feeder valves to stop loss, position Super-Sucker suction pumps, and issue resident safety advisory.'
        };
      case 'Public Health & Sanitation':
        return {
          protocol: 'Chemical / Toxic Runoff Protocol (SLA 2h)',
          action: 'Alert Municipal Health Officer, extract drain effluent samples, and issue containment order to the industrial source.'
        };
      default:
        return {
          protocol: 'Municipal Rapid Intervention (SLA 6h)',
          action: 'Dispatch Zone Nodal squad for on-site assessment and barrier deployment.'
        };
    }
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <h1 style={{ fontSize: '1.6rem', color: '#0f172a' }}>Emergency Civic Hazards & SLA Escalation</h1>
          <span className="badge" style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
            {activeEmergencies.length} Active Hazard{activeEmergencies.length !== 1 ? 's' : ''}
          </span>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
          Real-time hazard monitoring for life-threatening or severe structural infrastructure failures
        </p>
      </div>

      {/* Government Safety Disclaimer Banner */}
      <div
        style={{
          backgroundColor: '#fff7ed',
          border: '1px solid #fed7aa',
          borderRadius: '10px',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <Siren size={22} color="#ea580c" />
        <div style={{ fontSize: '0.84rem', color: '#9a3412' }}>
          <strong>Municipal Protocol Notice (Demo Simulation):</strong> This emergency incident panel demonstrates civic triage algorithms for high-vulnerability reports. In this academic/final-year prototype, all protocols and escalations are simulated locally — no real-world external SMS, police, or medical dispatches are initiated.
        </div>
      </div>

      {/* Active Emergencies Feed */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertOctagon size={20} color="#dc2626" />
            <span>Active High-Priority Incidents ({activeEmergencies.length})</span>
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Automated SLA Clock Active
          </span>
        </div>

        {activeEmergencies.length === 0 ? (
          <div
            className="civic-card"
            style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f0fdfa', borderColor: '#ccfbf1' }}
          >
            <ShieldCheck size={40} color="#059669" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.1rem', color: '#0f766e', marginBottom: '4px' }}>
              All Emergency Hazards Resolved!
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              There are currently no active critical civic hazard alerts in the municipal queue.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeEmergencies.map((c) => {
              const protocol = getProtocolAction(c.category);

              return (
                <div
                  key={c.id}
                  className="civic-card"
                  style={{
                    borderLeft: '5px solid #ef4444',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="complaint-id-link" onClick={() => setSelectedComplaint(c)}>
                        {c.id}
                      </span>
                      <PriorityBadge priority="Critical" />
                      <StatusBadge status={c.status} />
                      <span className="badge" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
                        {c.category}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => setSelectedComplaint(c)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '4px 10px' }}
                      >
                        <Eye size={13} /> Full Dossier
                      </button>
                      {c.status === 'To Do' && (
                        <button
                          onClick={() => updateStatus(c.id, 'In Progress')}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 10px' }}
                        >
                          Mobilize Crew <ArrowRight size={13} />
                        </button>
                      )}
                      {c.status === 'In Progress' && (
                        <button
                          onClick={() => updateStatus(c.id, 'Completed')}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '4px 10px', backgroundColor: '#10b981', borderColor: '#059669' }}
                        >
                          Resolve Hazard <CheckCircle2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '8px' }}>
                    {c.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, marginBottom: '16px' }}>
                    {c.description}
                  </p>

                  {/* Hazard Trigger Box */}
                  <div
                    style={{
                      backgroundColor: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      marginBottom: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b91c1c', fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px' }}>
                      <AlertTriangle size={14} /> Reason for Emergency Alert:
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#991b1b' }}>
                      {c.emergencyReason || 'Urgent public hazard flagged by citizen and confirmed by NLP triage parser.'}
                    </div>
                  </div>

                  {/* Suggested Next Action Protocol */}
                  <div
                    style={{
                      backgroundColor: '#f0fdfa',
                      border: '1px solid #ccfbf1',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      marginBottom: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f766e', fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px' }}>
                      <Building2 size={14} /> Recommended Action: {protocol.protocol}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#134e4a' }}>
                      {protocol.action}
                    </div>
                  </div>

                  {/* Location & Metadata footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} color="#0d9488" /> {c.location}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Building2 size={13} /> {c.department}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ea580c', fontWeight: 600 }}>
                      <Clock size={13} /> Target Resolution SLA: 4 Hours
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Resolved Emergency Archive */}
      {resolvedEmergencies.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#10b981" />
            <span>Resolved Emergency Hazards ({resolvedEmergencies.length})</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {resolvedEmergencies.map((c) => (
              <div
                key={c.id}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: 0.85
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="complaint-id-link" onClick={() => setSelectedComplaint(c)} style={{ fontSize: '0.75rem' }}>
                      {c.id}
                    </span>
                    <strong style={{ fontSize: '0.88rem', color: '#1e293b' }}>{c.title}</strong>
                    <StatusBadge status="Completed" />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                    {c.location} &bull; {c.department}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedComplaint(c)}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
