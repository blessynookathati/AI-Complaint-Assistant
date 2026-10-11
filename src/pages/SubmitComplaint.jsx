import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Camera,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Check,
  X,
  Send,
  Building2,
  Navigation,
  FileCheck,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES, DEPARTMENTS, WARDS } from '../data/initialComplaints';
import { analyzeCivicText } from '../data/aiModelInfo';
import { useComplaints } from '../context/ComplaintContext';

export function SubmitComplaint() {
  const { addComplaint, setActiveTab, setSelectedComplaint } = useComplaints();

  // Form State
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ward, setWard] = useState(WARDS[2].id);
  const [locationName, setLocationName] = useState('');
  const [coordinates, setCoordinates] = useState('12.97836, 77.64083');
  const [gpsCaptured, setGpsCaptured] = useState(true);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80');
  const [photoPreview, setPhotoPreview] = useState('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80');
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState('');
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');

  // Validation errors
  const [errors, setErrors] = useState({});

  // Submission success state
  const [submittedComplaint, setSubmittedComplaint] = useState(null);

  // Real-time Simulated AI Predictions
  const [aiInsight, setAiInsight] = useState(null);

  useEffect(() => {
    if (description.trim().length > 10 || title.trim().length > 5) {
      const insight = analyzeCivicText(`${title} ${description}`);
      setAiInsight(insight);
      if (insight.isEmergencyRecommendation && !isEmergency) {
        // AI suggests emergency
      }
    } else {
      setAiInsight(null);
    }
  }, [description, title]);

  // Geolocation Capture Handler
  const handleCaptureGPS = () => {
    setGpsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
          setCoordinates(coords);
          setGpsCaptured(true);
          setGpsLoading(false);
          if (!locationName) {
            setLocationName(`Detected GPS Coordinates (${coords})`);
          }
        },
        (err) => {
          // Fallback to high-precision smart-city municipal grid coords
          const sampleCoords = [
            '12.97836, 77.64083 (Indiranagar 100ft Road)',
            '13.00314, 77.56847 (Malleshwaram 15th Cross)',
            '12.91162, 77.63886 (HSR Layout Sector 3)',
            '12.92603, 77.67624 (Bellandur Ring Road)'
          ];
          const picked = sampleCoords[Math.floor(Math.random() * sampleCoords.length)];
          setCoordinates(picked.split(' ')[0]);
          setLocationName(picked);
          setGpsCaptured(true);
          setGpsLoading(false);
        },
        { timeout: 5000 }
      );
    } else {
      setCoordinates('12.97836, 77.64083');
      setGpsCaptured(true);
      setGpsLoading(false);
    }
  };

  // Image Upload Handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset demo photo picker
  const handleSelectSamplePhoto = (sampleType) => {
    const samples = {
      pothole: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
      wire: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80',
      drainage: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=800&auto=format&fit=crop&q=80',
      garbage: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=80'
    };
    const chosen = samples[sampleType];
    setPhotoPreview(chosen);
    setPhotoUrl(chosen);
  };

  const handleApplyAiSuggestions = () => {
    if (aiInsight) {
      setCategory(aiInsight.category);
      if (aiInsight.isEmergencyRecommendation) {
        setIsEmergency(true);
        setEmergencyReason(`AI Hazard Detection: ${aiInsight.hazards.join(', ')}`);
      }
    }
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Please provide a clear complaint title';
    if (!description.trim() || description.length < 15) {
      errs.description = 'Please provide a detailed description (at least 15 characters)';
    }
    if (!gpsCaptured && !coordinates) {
      errs.coordinates = 'Please capture GPS location or provide coordinates';
    }
    if (isEmergency && !emergencyReason.trim()) {
      errs.emergencyReason = 'Please specify the immediate danger or hazard reason';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedWard = WARDS.find(w => w.id === ward);
    const resolvedLocation = locationName.trim()
      ? `${locationName} (${matchedWard?.name || ward})`
      : `${matchedWard?.name || 'Urban Zone'}, ${ward}`;

    const newGrievance = {
      title,
      description,
      category,
      location: resolvedLocation,
      coordinates,
      isEmergency,
      emergencyReason: isEmergency ? emergencyReason : null,
      citizenName: citizenName.trim() || 'Verified Resident',
      citizenPhone: citizenPhone.trim() || '+91 98450 12093',
      photoUrl
    };

    const created = addComplaint(newGrievance);
    setSubmittedComplaint(created);
  };

  const handleResetForm = () => {
    setTitle('');
    setDescription('');
    setSubmittedComplaint(null);
    setErrors({});
    setIsEmergency(false);
    setEmergencyReason('');
  };

  return (
    <div className="page-container">
      <div className="submit-form-wrapper">
        {/* Form Header Box (Matches Image 2) */}
        <div className="form-header-box">
          <div>
            <h1 style={{ fontSize: '1.6rem', color: '#0f172a' }}>Submit New Complaint</h1>
            <p style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📍 GPS + 📷 Photos/Evidence Required</span>
              <span>&bull;</span>
              <span style={{ color: '#0d9488', fontWeight: 600 }}>Integrated with CivicPulse AI Triage</span>
            </p>
          </div>
          <span className="demo-tag">Citizen Portal</span>
        </div>

        {/* Success Modal / Banner */}
        {submittedComplaint ? (
          <div className="civic-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#ecfdf5',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '8px' }}>
              Grievance Registered Successfully!
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
              Your complaint has been ingested by the Municipal Smart City Command Center.
            </p>

            <div
              style={{
                display: 'inline-block',
                backgroundColor: '#f0fdfa',
                border: '1px solid #99f6e4',
                padding: '12px 24px',
                borderRadius: '12px',
                marginBottom: '24px'
              }}
            >
              <span style={{ fontSize: '0.8rem', color: '#0f766e', textTransform: 'uppercase', fontWeight: 700 }}>
                Official Complaint Tracking ID
              </span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f766e', fontFamily: 'monospace' }}>
                {submittedComplaint.id}
              </div>
            </div>

            <div
              style={{
                maxWidth: '480px',
                margin: '0 auto 28px',
                textAlign: 'left',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '16px',
                fontSize: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Assigned Department:</span>
                <strong>{submittedComplaint.department}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>AI Triage Priority:</span>
                <strong style={{ color: submittedComplaint.priority === 'Critical' ? '#dc2626' : '#ea580c' }}>
                  {submittedComplaint.priority}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Estimated SLA Resolution:</span>
                <strong>{submittedComplaint.isEmergency ? '4-6 Hours (Emergency)' : '48-72 Hours'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setSelectedComplaint(submittedComplaint);
                  setActiveTab('complaints');
                }}
                className="btn btn-primary"
              >
                Track in Complaint Management <ArrowRight size={16} />
              </button>
              <button onClick={handleResetForm} className="btn btn-outline">
                Submit Another Complaint
              </button>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="form-card">
            {/* Category Dropdown */}
            <div className="form-group">
              <label className="form-label" htmlFor="complaint-category">
                Category <span className="required">*</span>
              </label>
              <select
                id="complaint-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Complaint Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="complaint-title">
                Complaint Title <span className="required">*</span>
              </label>
              <input
                id="complaint-title"
                type="text"
                className="form-control"
                placeholder="e.g. Deep pothole on 100ft road causing traffic skids"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <div className="form-error">{errors.title}</div>}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="complaint-desc">
                Description <span className="required">*</span>
              </label>
              <textarea
                id="complaint-desc"
                className="form-control"
                placeholder="Describe the civic issue, exact landmark, and any potential hazard to commuters or residents..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <div className="form-error">{errors.description}</div>}
            </div>

            {/* Live AI Intelligence Preview if user typed */}
            {aiInsight && (
              <div className="ai-preview-box">
                <div className="ai-preview-header">
                  <div className="ai-badge-header">
                    <Sparkles size={16} color="#0d9488" />
                    <span>Real-time AI NLP Triage Preview</span>
                  </div>
                  <span className="demo-tag">CivicBERT v2.4</span>
                </div>

                <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '8px' }}>
                  Model suggests category <strong>{aiInsight.category}</strong> with <strong>{aiInsight.confidence}% confidence</strong>.
                  Routing to <strong>{aiInsight.department}</strong>.
                </p>

                <div className="ai-tags-row">
                  <span className="ai-chip">
                    Priority: <strong>{aiInsight.priority}</strong>
                  </span>
                  <span className="ai-chip">
                    SLA: <strong>{aiInsight.urgencyLevel}</strong>
                  </span>
                  {aiInsight.hazards.map((h, i) => (
                    <span key={i} className="ai-chip" style={{ backgroundColor: '#fff7ed', borderColor: '#fed7aa' }}>
                      <AlertTriangle size={11} color="#ea580c" /> {h}
                    </span>
                  ))}
                </div>

                {category !== aiInsight.category && (
                  <button
                    type="button"
                    onClick={handleApplyAiSuggestions}
                    className="btn btn-outline btn-sm"
                    style={{ marginTop: '10px', fontSize: '0.76rem', padding: '4px 8px' }}
                  >
                    Auto-apply AI suggested category & priority
                  </button>
                )}
              </div>
            )}

            {/* Step 1: Capture GPS Location (Matches Image 2) */}
            <div className="gps-box">
              <div className="gps-box-header">
                <Navigation size={18} />
                <span>Step 1: Capture GPS Location *</span>
              </div>

              <div className="gps-action-row">
                <button
                  type="button"
                  onClick={handleCaptureGPS}
                  disabled={gpsLoading}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: '#10b981',
                    borderColor: '#059669',
                    fontSize: '0.85rem',
                    padding: '9px 18px'
                  }}
                >
                  <MapPin size={16} />
                  <span>{gpsLoading ? 'Detecting GPS Satellites...' : '📍 Get Current Location'}</span>
                </button>

                {gpsCaptured && (
                  <div className="gps-coords-display">
                    <Check size={16} color="#059669" strokeWidth={3} />
                    <span>Location: {coordinates}</span>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>
                    Select Municipal Ward
                  </label>
                  <select
                    className="form-select"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                  >
                    {WARDS.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.id} - {w.name} ({w.zone} Zone)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>
                    Street / Landmark Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Near Metro Pillar 142 or 5th Cross"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                  />
                </div>
              </div>
              {errors.coordinates && <div className="form-error">{errors.coordinates}</div>}
            </div>

            {/* Photo / Visual Evidence Upload */}
            <div className="form-group">
              <label className="form-label">
                Upload Visual Evidence (Photo / Geo-tagged image)
              </label>

              <label className="photo-upload-zone" htmlFor="photo-input">
                <Camera size={32} color="#0d9488" style={{ margin: '0 auto 8px', display: 'block' }} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0f172a', display: 'block' }}>
                  Click to browse photo or drag & drop image
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Supports JPG, PNG (Max 5MB). Photo preview is generated immediately.
                </span>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handlePhotoUpload}
                />
              </label>

              {/* Sample Photo Quick Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Quick Test Photos:</span>
                <button
                  type="button"
                  onClick={() => handleSelectSamplePhoto('pothole')}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                >
                  Pothole
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSamplePhoto('wire')}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                >
                  Electrical Wire
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSamplePhoto('drainage')}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                >
                  Sewage
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectSamplePhoto('garbage')}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                >
                  Garbage Dump
                </button>
              </div>

              {/* Real-time Photo Preview */}
              {photoPreview && (
                <div className="photo-preview-box">
                  <img src={photoPreview} alt="Evidence preview" />
                  <button
                    type="button"
                    className="remove-photo-btn"
                    onClick={() => {
                      setPhotoPreview(null);
                      setPhotoUrl(null);
                    }}
                    title="Remove attached photo"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Citizen Details (Optional Contact) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label className="form-label" htmlFor="citizen-name">
                  Citizen Name
                </label>
                <input
                  id="citizen-name"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Ramesh Kumar"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="citizen-phone">
                  Phone / Mobile Number
                </label>
                <input
                  id="citizen-phone"
                  type="tel"
                  className="form-control"
                  placeholder="+91 98450 XXXXX"
                  value={citizenPhone}
                  onChange={(e) => setCitizenPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Emergency Concern Checkbox */}
            <div className="emergency-checkbox-container">
              <input
                id="emergency-checkbox"
                type="checkbox"
                checked={isEmergency}
                onChange={(e) => setIsEmergency(e.target.checked)}
              />
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="emergency-checkbox"
                  style={{ fontWeight: 700, color: '#9a3412', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <AlertTriangle size={16} color="#ea580c" />
                  Flag this as an Immediate Hazard / Emergency Concern
                </label>
                <p style={{ fontSize: '0.78rem', color: '#c2410c', marginTop: '2px' }}>
                  Check this only if there is live electric wire exposure, deep road cave-in causing accidents, or toxic chemical drainage.
                </p>

                {isEmergency && (
                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Specify why this is critical (e.g. 'Near pre-school gate with live spark')"
                      value={emergencyReason}
                      onChange={(e) => setEmergencyReason(e.target.value)}
                      style={{ borderColor: '#fed7aa', backgroundColor: '#ffffff' }}
                    />
                    {errors.emergencyReason && (
                      <div className="form-error" style={{ color: '#dc2626' }}>
                        {errors.emergencyReason}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={handleResetForm}
                className="btn btn-outline"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '11px 24px', fontSize: '0.95rem' }}
              >
                <Send size={16} />
                <span>Register Complaint</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
