import React, { useState } from 'react';
import { ComplaintProvider, useComplaints } from './context/ComplaintContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ComplaintModal } from './components/ComplaintModal';
import { ToastContainer } from './components/Toast';

import { Dashboard } from './pages/Dashboard';
import { SubmitComplaint } from './pages/SubmitComplaint';
import { ComplaintManagement } from './pages/ComplaintManagement';
import { AIAnalysis } from './pages/AIAnalysis';
import { EmergencyAlerts } from './pages/EmergencyAlerts';
import { HotspotAnalytics } from './pages/HotspotAnalytics';

import './index.css';
import './styles/components.css';

function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeTab, selectedComplaint, setSelectedComplaint } = useComplaints();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'submit':
        return <SubmitComplaint />;
      case 'complaints':
        return <ComplaintManagement />;
      case 'ai-analysis':
        return <AIAnalysis />;
      case 'emergency':
        return <EmergencyAlerts />;
      case 'hotspots':
        return <HotspotAnalytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main App Content Area */}
      <div className="main-content">
        <Navbar onMenuToggle={() => setMobileOpen(prev => !prev)} />
        <main>{renderActivePage()}</main>
      </div>

      {/* Complaint Inspection Detail Modal */}
      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}

      {/* Floating Notification Toasts */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ComplaintProvider>
      <MainLayout />
    </ComplaintProvider>
  );
}
