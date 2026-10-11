import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COMPLAINTS } from '../data/initialComplaints';
import { analyzeCivicText } from '../data/aiModelInfo';

const ComplaintContext = createContext();

const STORAGE_KEY = 'civicpulse_complaints_v1';

export function ComplaintProvider({ children }) {
  // Load from localStorage or use realistic initial complaints
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse localStorage complaints', e);
    }
    return INITIAL_COMPLAINTS;
  });

  // Current active page tab: 'dashboard', 'submit', 'complaints', 'ai-analysis', 'emergency', 'hotspots'
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Selected complaint for the deep dive modal
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Global search query
  const [searchQuery, setSearchQuery] = useState('');

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Save to localStorage whenever complaints change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [complaints]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Add new complaint
  const addComplaint = (newGrievance) => {
    const newId = `CP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const aiPrediction = analyzeCivicText(newGrievance.description, complaints);

    const fullComplaint = {
      id: newId,
      title: newGrievance.title || 'Civic Grievance',
      description: newGrievance.description,
      category: newGrievance.category || aiPrediction.category,
      location: newGrievance.location || 'Zone 4, Municipal Ward',
      coordinates: newGrievance.coordinates || '12.9716, 77.5946',
      priority: newGrievance.isEmergency ? 'Critical' : (newGrievance.priority || aiPrediction.priority),
      department: newGrievance.department || aiPrediction.department,
      date: new Date().toISOString().substring(0, 10),
      status: 'To Do',
      isEmergency: Boolean(newGrievance.isEmergency),
      emergencyReason: newGrievance.isEmergency 
        ? (newGrievance.emergencyReason || 'Immediate public hazard or safety obstruction')
        : null,
      citizenName: newGrievance.citizenName || 'Verified Citizen',
      citizenPhone: newGrievance.citizenPhone || '+91 98XXX XXXXX',
      photoUrl: newGrievance.photoUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
      aiPrediction: {
        categoryConfidence: aiPrediction.confidence,
        suggestedPriority: aiPrediction.priority,
        suggestedDepartment: aiPrediction.department,
        sentimentScore: aiPrediction.sentimentScore,
        urgencyLevel: aiPrediction.urgencyLevel,
        similarComplaintId: aiPrediction.similarComplaints[0]?.id || null,
        extractedHazards: aiPrediction.hazards
      },
      timeline: [
        { step: 'Grievance Submitted', time: now, note: 'Registered in CivicPulse Smart City Ledger' },
        { step: 'AI Classification Completed', time: now, note: `Model tagged: ${aiPrediction.category} (${aiPrediction.confidence}%)` },
        { step: 'Routed to Department', time: now, note: `Queued for ${aiPrediction.department}` }
      ]
    };

    setComplaints(prev => [fullComplaint, ...prev]);
    addToast(`Complaint #${newId} logged successfully!`, 'success');
    return fullComplaint;
  };

  // Update complaint status: 'To Do' | 'In Progress' | 'Completed'
  const updateStatus = (id, newStatus) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus,
          timeline: [
            ...c.timeline,
            { step: `Status Changed to ${newStatus}`, time: now, note: `Municipal workflow updated by officer` }
          ]
        };
      }
      return c;
    }));

    // Also update selectedComplaint if open in modal
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(prev => ({
        ...prev,
        status: newStatus,
        timeline: [
          ...prev.timeline,
          { step: `Status Changed to ${newStatus}`, time: now, note: `Municipal workflow updated by officer` }
        ]
      }));
    }

    addToast(`Grievance #${id} transitioned to "${newStatus}"`, 'info');
  };

  // Delete complaint
  const deleteComplaint = (id) => {
    setComplaints(prev => prev.filter(c => c.id !== id));
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(null);
    }
    addToast(`Complaint #${id} deleted from ledger`, 'danger');
  };

  // Reset demo complaints to pristine initial dataset
  const resetToDefaultData = () => {
    setComplaints(INITIAL_COMPLAINTS);
    localStorage.removeItem(STORAGE_KEY);
    addToast('Demo complaints ledger reset to initial sample state', 'info');
  };

  // Calculated Metrics
  const totalComplaints = complaints.length;
  const toDoCount = complaints.filter(c => c.status === 'To Do').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const completedCount = complaints.filter(c => c.status === 'Completed').length;
  const criticalCount = complaints.filter(c => c.priority === 'Critical').length;
  const emergencyCount = complaints.filter(c => c.isEmergency && c.status !== 'Completed').length;

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        setComplaints,
        activeTab,
        setActiveTab,
        selectedComplaint,
        setSelectedComplaint,
        searchQuery,
        setSearchQuery,
        addComplaint,
        updateStatus,
        deleteComplaint,
        resetToDefaultData,
        toasts,
        addToast,
        removeToast,
        metrics: {
          totalComplaints,
          toDoCount,
          inProgressCount,
          completedCount,
          criticalCount,
          emergencyCount
        }
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaints() {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
}
