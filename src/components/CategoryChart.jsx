import React from 'react';
import { BarChart3, PieChart } from 'lucide-react';
import { CATEGORIES } from '../data/initialComplaints';
import { useComplaints } from '../context/ComplaintContext';

export function CategoryChart() {
  const { complaints, setActiveTab, setSearchQuery } = useComplaints();

  // Compute category counts
  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = complaints.filter(c => c.category === cat).length;
    return acc;
  }, {});

  const total = complaints.length || 1;

  // Color map for categories
  const categoryColors = {
    'Roads & Potholes': '#0d9488',
    'Streetlights & Electrical': '#3b82f6',
    'Drainage & Sewerage': '#6366f1',
    'Garbage & Solid Waste': '#f59e0b',
    'Water Supply & Contamination': '#06b6d4',
    'Public Health & Sanitation': '#ef4444',
    'Horticulture & Encroachments': '#10b981'
  };

  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  const handleCategoryFilter = (cat) => {
    setSearchQuery(cat);
    setActiveTab('complaints');
  };

  return (
    <div className="civic-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="civic-card-header">
        <div className="civic-card-title">
          <BarChart3 size={20} color="#0d9488" />
          <span>Complaints by Civic Category</span>
        </div>
        <span className="demo-tag">Distribution</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1, justifyContent: 'space-around' }}>
        {sortedCategories.map(([category, count]) => {
          const percentage = Math.round((count / total) * 100);
          const color = categoryColors[category] || '#64748b';

          return (
            <div
              key={category}
              onClick={() => handleCategoryFilter(category)}
              style={{
                cursor: 'pointer',
                padding: '6px 8px',
                borderRadius: '8px',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              title={`Click to view all ${category} complaints`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: color }} />
                  {category}
                </span>
                <span style={{ color: '#64748b', fontWeight: 600 }}>
                  {count} <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>({percentage}%)</span>
                </span>
              </div>

              {/* Progress track */}
              <div
                style={{
                  height: '8px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${percentage}%`,
                    backgroundColor: color,
                    borderRadius: '9999px',
                    transition: 'width 0.4s ease-out'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.78rem',
          color: '#64748b'
        }}
      >
        <span>* Click any category bar to filter grievance records</span>
        <span style={{ fontWeight: 600, color: '#0f766e' }}>Total: {complaints.length} Records</span>
      </div>
    </div>
  );
}
