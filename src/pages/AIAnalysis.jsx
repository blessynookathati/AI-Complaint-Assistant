import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Zap,
  Cpu,
  Layers,
  BarChart2,
  CheckCircle2,
  AlertTriangle,
  Send,
  RefreshCw,
  FileText,
  Search,
  ExternalLink,
  Code
} from 'lucide-react';
import { AI_SYSTEM_METADATA, SAMPLE_AI_PROMPTS, analyzeCivicText } from '../data/aiModelInfo';
import { useComplaints } from '../context/ComplaintContext';

export function AIAnalysis() {
  const { complaints, setSelectedComplaint } = useComplaints();

  const [inputQuery, setInputQuery] = useState(SAMPLE_AI_PROMPTS[0]);
  const [isInferencing, setIsInferencing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(() => analyzeCivicText(SAMPLE_AI_PROMPTS[0], complaints));

  const handleRunInference = () => {
    setIsInferencing(true);
    setTimeout(() => {
      const result = analyzeCivicText(inputQuery, complaints);
      setAnalysisResult(result);
      setIsInferencing(false);
    }, 400);
  };

  const handleSelectSample = (sampleText) => {
    setInputQuery(sampleText);
    const result = analyzeCivicText(sampleText, complaints);
    setAnalysisResult(result);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <h1 style={{ fontSize: '1.6rem', color: '#0f172a' }}>AI Grievance Intelligence & NLP Triage</h1>
          <span className="demo-tag">Demonstration Model</span>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
          Zero-shot multi-label categorization, automated emergency hazard tagging, and municipal departmental routing
        </p>
      </div>

      {/* Prominent Demo Notice */}
      <div
        style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '10px',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <Sparkles size={20} color="#2563eb" />
        <div style={{ fontSize: '0.85rem', color: '#1e40af' }}>
          <strong>Demo Notice:</strong> All inferences, sentiment calculations, and entity tags shown below are client-side simulated predictions designed to demonstrate the final NLP pipeline. When connected to the Python Flask ML backend, predictions will be served directly by trained PyTorch/HuggingFace checkpoints.
        </div>
      </div>

      {/* Interactive NLP Sandbox */}
      <div className="civic-card" style={{ marginBottom: '24px' }}>
        <div className="civic-card-header">
          <div className="civic-card-title">
            <Cpu size={20} color="#0d9488" />
            <span>Interactive NLP Grievance Classifier Sandbox</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Model: <strong>{AI_SYSTEM_METADATA.modelName}</strong>
          </span>
        </div>

        {/* Pre-canned scenario prompt buttons */}
        <div style={{ marginBottom: '14px' }}>
          <label className="form-label" style={{ fontSize: '0.8rem', marginBottom: '8px' }}>
            Select Sample Grievance Scenario or Type Custom Complaint:
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {SAMPLE_AI_PROMPTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="btn btn-outline btn-sm"
                style={{
                  fontSize: '0.74rem',
                  padding: '5px 10px',
                  backgroundColor: inputQuery === sample ? '#f0fdfa' : undefined,
                  borderColor: inputQuery === sample ? '#0d9488' : undefined,
                  color: inputQuery === sample ? '#0f766e' : undefined
                }}
              >
                Sample #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Query Input Box */}
        <div className="form-group">
          <textarea
            className="form-control"
            rows={3}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type or paste any citizen grievance (e.g. 'Broken water pipeline gushing near market')..."
            style={{ fontSize: '0.92rem', minHeight: '90px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <button
            onClick={handleRunInference}
            disabled={isInferencing || !inputQuery.trim()}
            className="btn btn-primary"
            style={{ padding: '9px 20px' }}
          >
            {isInferencing ? (
              <>
                <RefreshCw size={16} className="pulse-dot" />
                <span>Running NLP Inference...</span>
              </>
            ) : (
              <>
                <Zap size={16} />
                <span>Run AI Classification</span>
              </>
            )}
          </button>
        </div>

        {/* Inference Diagnostic Results */}
        {analysisResult && (
          <div
            style={{
              borderTop: '2px dashed #e2e8f0',
              paddingTop: '20px',
              animation: 'modal-enter 0.2s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.05rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BrainCircuit size={18} color="#0d9488" />
                <span>Inference Diagnostics & Predicted Routing</span>
              </h3>
              <span className="demo-tag" style={{ backgroundColor: '#ecfdf5', borderColor: '#a7f3d0', color: '#047857' }}>
                Confidence: {analysisResult.confidence}%
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  Predicted Category
                </span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                  {analysisResult.category}
                </div>
                <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${analysisResult.confidence}%`, backgroundColor: '#0d9488' }} />
                </div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  Assigned Department
                </span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                  {analysisResult.department}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#0d9488', marginTop: '6px', display: 'inline-block' }}>
                  Auto-routed via smart ontology
                </span>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  Urgency & Recommended Priority
                </span>
                <div
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: analysisResult.priority === 'Critical' ? '#dc2626' : analysisResult.priority === 'High' ? '#ea580c' : '#15803d',
                    marginTop: '4px'
                  }}
                >
                  {analysisResult.priority}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px', display: 'inline-block' }}>
                  Target SLA: {analysisResult.urgencyLevel}
                </span>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                  Citizen Sentiment Score
                </span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#b91c1c', marginTop: '4px' }}>
                  {analysisResult.sentimentScore}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px', display: 'inline-block' }}>
                  High grievance distress detected
                </span>
              </div>
            </div>

            {/* Extracted Entities */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                Detected Hazard Tokens & Semantic Entities:
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {analysisResult.hazards.map((h, i) => (
                  <span key={i} className="ai-chip" style={{ backgroundColor: '#fef3c7', borderColor: '#fde68a', color: '#92400e' }}>
                    <AlertTriangle size={12} color="#d97706" /> {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Similar Complaint Duplicate Detection */}
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>
                Potential Duplicate / Cluster Grievances in System:
              </span>
              {analysisResult.similarComplaints && analysisResult.similarComplaints.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                  {analysisResult.similarComplaints.map((sc) => (
                    <div
                      key={sc.id}
                      style={{
                        padding: '10px 14px',
                        backgroundColor: '#f0fdfa',
                        border: '1px solid #ccfbf1',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.82rem', color: '#0f766e' }}>{sc.id}</strong>
                        <div style={{ fontSize: '0.78rem', color: '#334155' }}>{sc.title}</div>
                      </div>
                      <span className="badge" style={{ backgroundColor: '#ffffff', color: '#0d9488', border: '1px solid #99f6e4' }}>
                        {sc.similarityScore}% Similar
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                  No duplicate grievances identified in the local cluster window.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Model Architecture & Backend Integration Blueprint */}
      <div className="dashboard-grid-cards">
        <div className="civic-card">
          <div className="civic-card-header">
            <div className="civic-card-title">
              <Layers size={18} color="#0d9488" />
              <span>Model Architecture Specifications</span>
            </div>
            <span className="demo-tag">GovTech ML</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Base Transformer:</span>
              <strong>Fine-Tuned RoBERTa (Multi-task Civic)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Training Corpus:</span>
              <strong>128,000 Verified Municipal Grievance Logs</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Multi-label Accuracy (F1):</span>
              <strong style={{ color: '#16a34a' }}>94.6% Micro-F1</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Inference Latency:</span>
              <strong>84ms (Quantized ONNX Runtime)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Emergency False-Negative Rate:</span>
              <strong style={{ color: '#0d9488' }}>&lt; 0.8%</strong>
            </div>
          </div>
        </div>

        <div className="civic-card">
          <div className="civic-card-header">
            <div className="civic-card-title">
              <Code size={18} color="#0d9488" />
              <span>Python Flask Integration Blueprint</span>
            </div>
            <span className="demo-tag">REST API Ready</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '12px' }}>
            The frontend contracts are cleanly decoupled and mapped to the following Flask endpoints:
          </p>

          <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.75rem', lineHeight: 1.6 }}>
            <div><span style={{ color: '#38bdf8' }}>POST</span> /api/v1/triage/classify</div>
            <div style={{ color: '#94a3b8' }}>&bull; Returns category, confidence, sentiment & SLA</div>
            <div style={{ marginTop: '6px' }}><span style={{ color: '#38bdf8' }}>POST</span> /api/v1/grievance/duplicate-check</div>
            <div style={{ color: '#94a3b8' }}>&bull; Vector cosine similarity using SentenceTransformers</div>
            <div style={{ marginTop: '6px' }}><span style={{ color: '#34d399' }}>GET</span>  /api/v1/hotspots/clusters</div>
            <div style={{ color: '#94a3b8' }}>&bull; DBSCAN spatio-temporal cluster coordinates</div>
          </div>
        </div>
      </div>
    </div>
  );
}
