import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  Building2,
  Sparkles,
  AlertTriangle,
  Phone,
  User,
  ExternalLink,
  Trash2,
  CheckCircle,
  Clock,
  CircleDot
} from 'lucide-react';
import { PriorityBadge, StatusBadge } from './StatusBadge';
import { useComplaints } from '../context/ComplaintContext';

export function ComplaintModal({ complaint, onClose }) {
  const { updateStatus, deleteComplaint } = useComplaints();

  if (!complaint) return null;

  const handleStatusChange = (newStatus) => {
    updateStatus(complaint.id, newStatus);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete grievance ${complaint.id}?`)) {
      deleteComplaint(complaint.id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="complaint-id-link" style={{ fontSize: '0.95rem', padding: '4px 10px' }}>
              {complaint.id}
            </span>
            <PriorityBadge priority={complaint.priority} />
            {complaint.isEmergency && (
              <span className="badge" style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                <AlertTriangle size={12} /> Emergency Hazard
              </span>
            )}
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#0f172a' }}>
            {complaint.title}
          </h2>

          {/* Quick Status Switcher Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Current Status:</span>
              <StatusBadge status={complaint.status} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Transition to:</span>
              <button
                onClick={() => handleStatusChange('To Do')}
                disabled={complaint.status === 'To Do'}
                className="btn btn-outline btn-sm"
                style={{
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  backgroundColor: complaint.status === 'To Do' ? '#e2e8f0' : undefined
                }}
              >
                <CircleDot size={12} /> To Do
              </button>
              <button
                onClick={() => handleStatusChange('In Progress')}
                disabled={complaint.status === 'In Progress'}
                className="btn btn-outline btn-sm"
                style={{
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  backgroundColor: complaint.status === 'In Progress' ? '#fde68a' : undefined
                }}
              >
                <Clock size={12} /> In Progress
              </button>
              <button
                onClick={() => handleStatusChange('Completed')}
                disabled={complaint.status === 'Completed'}
                className="btn btn-outline btn-sm"
                style={{
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  backgroundColor: complaint.status === 'Completed' ? '#a7f3d0' : undefined
                }}
              >
                <CheckCircle size={12} /> Completed
              </button>
            </div>
          </div>

          {/* Core Info Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              marginBottom: '20px',
              fontSize: '0.85rem'
            }}
          >
            <div style={{ padding: '10px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Building2 size={13} /> Assigned Department
              </span>
              <strong style={{ color: '#0f172a', display: 'block', marginTop: '3px' }}>{complaint.department}</strong>
            </div>

            <div style={{ padding: '10px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={13} /> Ward / Location
              </span>
              <strong style={{ color: '#0f172a', display: 'block', marginTop: '3px' }}>{complaint.location}</strong>
              {complaint.coordinates && (
                <span style={{ fontSize: '0.72rem', color: '#0d9488', fontFamily: 'monospace' }}>
                  GPS: {complaint.coordinates}
                </span>
              )}
            </div>

            <div style={{ padding: '10px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={13} /> Registered Date
              </span>
              <strong style={{ color: '#0f172a', display: 'block', marginTop: '3px' }}>{complaint.date}</strong>
            </div>

            <div style={{ padding: '10px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <User size={13} /> Citizen Informant
              </span>
              <strong style={{ color: '#0f172a', display: 'block', marginTop: '3px' }}>{complaint.citizenName}</strong>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{complaint.citizenPhone}</span>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '6px' }}>Detailed Grievance Description</h4>
            <p style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.6, backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              {complaint.description}
            </p>
          </div>

          {/* Attached Photo Evidence */}
          {complaint.photoUrl && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '8px' }}>Geo-tagged Visual Evidence</h4>
              <div
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  maxHeight: '260px',
                  position: 'relative'
                }}
              >
                <img
                  src={complaint.photoUrl}
                  alt={complaint.title}
                  style={{ width: '100%', maxHeight: '260px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          )}

          {/* AI Grievance Intelligence Box */}
          <div className="ai-preview-box" style={{ marginBottom: '20px' }}>
            <div className="ai-preview-header">
              <div className="ai-badge-header">
                <Sparkles size={16} color="#0d9488" />
                <span>CivicBERT Triage Diagnostics (Simulated AI Prediction)</span>
              </div>
              <span className="demo-tag">Inference Model</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '10px' }}>
              <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Model Confidence:</span>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f766e' }}>
                  {complaint.aiPrediction?.categoryConfidence || 95.4}%
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Urgency SLA:</span>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                  {complaint.aiPrediction?.urgencyLevel || 'Standard 48h'}
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Sentiment / Stress Score:</span>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#b91c1c' }}>
                  {complaint.aiPrediction?.sentimentScore || -0.75} (Negative)
                </div>
              </div>
            </div>

            {/* Extracted Hazards */}
            {complaint.aiPrediction?.extractedHazards && complaint.aiPrediction.extractedHazards.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569' }}>Detected Risk Entities:</span>
                <div className="ai-tags-row">
                  {complaint.aiPrediction.extractedHazards.map((h, i) => (
                    <span key={i} className="ai-chip">
                      <AlertTriangle size={11} color="#f59e0b" /> {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Timeline History */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '10px' }}>Resolution Audit Trail</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: '2px solid #e2e8f0', paddingLeft: '16px', marginLeft: '6px' }}>
              {complaint.timeline?.map((step, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      left: '-23px',
                      top: '2px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: idx === complaint.timeline.length - 1 ? '#0d9488' : '#94a3b8',
                      border: '2px solid #ffffff'
                    }}
                  />
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                    {step.step}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {step.time} &bull; {step.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            onClick={handleDelete}
            className="btn btn-outline"
            style={{ color: '#dc2626', borderColor: '#fecaca', marginRight: 'auto' }}
          >
            <Trash2 size={15} /> Delete Grievance
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}
