import React, { useState } from 'react';
import {
  Kanban,
  Table as TableIcon,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ArrowLeft,
  Eye,
  AlertTriangle,
  RotateCcw,
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  CircleDot
} from 'lucide-react';
import { CATEGORIES, DEPARTMENTS } from '../data/initialComplaints';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';
import { useComplaints } from '../context/ComplaintContext';

export function ComplaintManagement() {
  const {
    complaints,
    updateStatus,
    setSelectedComplaint,
    searchQuery,
    setSearchQuery,
    setActiveTab
  } = useComplaints();

  // View state: 'kanban' | 'table'
  const [viewMode, setViewMode] = useState('kanban');

  // Filter States
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  // Filter Complaints
  const filteredComplaints = complaints.filter((c) => {
    // Search query matching
    const matchesSearch =
      !searchQuery ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Status matching
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

    // Category matching
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;

    // Priority matching
    const matchesPriority = priorityFilter === 'All' || c.priority === priorityFilter;

    // Department matching
    const matchesDepartment = departmentFilter === 'All' || c.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority && matchesDepartment;
  });

  // Group by status for Kanban columns
  const todoComplaints = filteredComplaints.filter((c) => c.status === 'To Do');
  const inProgressComplaints = filteredComplaints.filter((c) => c.status === 'In Progress');
  const completedComplaints = filteredComplaints.filter((c) => c.status === 'Completed');

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setCategoryFilter('All');
    setPriorityFilter('All');
    setDepartmentFilter('All');
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Roads & Potholes': return { bg: '#f0fdfa', text: '#0d9488' };
      case 'Streetlights & Electrical': return { bg: '#eff6ff', text: '#2563eb' };
      case 'Drainage & Sewerage': return { bg: '#eef2ff', text: '#4f46e5' };
      case 'Garbage & Solid Waste': return { bg: '#fffbeb', text: '#d97706' };
      case 'Water Supply & Contamination': return { bg: '#ecfeff', text: '#0891b2' };
      case 'Public Health & Sanitation': return { bg: '#fef2f2', text: '#dc2626' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  return (
    <div className="page-container">
      {/* Top Header & Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.6rem', color: '#0f172a' }}>Complaint Operations & Workflow</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            Triaged citizen issues &bull; Showing {filteredComplaints.length} of {complaints.length} records
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* View Toggle */}
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: '#f1f5f9',
              borderRadius: '8px',
              padding: '3px',
              border: '1px solid #e2e8f0'
            }}
          >
            <button
              onClick={() => setViewMode('kanban')}
              className={`btn btn-sm ${viewMode === 'kanban' ? 'btn-primary' : 'btn-outline'}`}
              style={{
                border: 'none',
                boxShadow: viewMode === 'kanban' ? undefined : 'none',
                backgroundColor: viewMode === 'kanban' ? undefined : 'transparent',
                color: viewMode === 'kanban' ? '#ffffff' : '#64748b'
              }}
            >
              <Kanban size={15} />
              <span>Kanban Board</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-outline'}`}
              style={{
                border: 'none',
                boxShadow: viewMode === 'table' ? undefined : 'none',
                backgroundColor: viewMode === 'table' ? undefined : 'transparent',
                color: viewMode === 'table' ? '#ffffff' : '#64748b'
              }}
            >
              <TableIcon size={15} />
              <span>Table View</span>
            </button>
          </div>

          <button
            onClick={() => setActiveTab('submit')}
            className="btn btn-primary btn-sm"
          >
            <Plus size={15} />
            <span>New Grievance</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div
        className="civic-card"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 240px', minWidth: '220px' }}>
            <Search size={16} className="quick-search-icon" />
            <input
              type="text"
              placeholder="Search by ID, keyword, address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '36px', paddingY: '8px', fontSize: '0.85rem' }}
            />
          </div>

          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['All', 'To Do', 'In Progress', 'Completed'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`btn btn-sm ${statusFilter === s ? 'btn-secondary' : 'btn-outline'}`}
                style={{ fontSize: '0.78rem', padding: '6px 12px' }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Reset Filters */}
          {(searchQuery || statusFilter !== 'All' || categoryFilter !== 'All' || priorityFilter !== 'All' || departmentFilter !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="btn btn-outline btn-sm"
              style={{ color: '#dc2626', borderColor: '#fecaca', fontSize: '0.78rem' }}
            >
              <RotateCcw size={13} /> Reset Filters
            </button>
          )}
        </div>

        {/* Sub-Filters: Category, Priority, Department */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div>
            <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>
              Filter by Category
            </label>
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ fontSize: '0.8rem', padding: '6px 10px' }}
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>
              Filter by Priority
            </label>
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{ fontSize: '0.8rem', padding: '6px 10px' }}
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>
              Assigned Department
            </label>
            <select
              className="form-select"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              style={{ fontSize: '0.8rem', padding: '6px 10px' }}
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* VIEW 1: KANBAN BOARD VIEW (Matches reference Image 1) */}
      {viewMode === 'kanban' && (
        <div className="kanban-view">
          {/* Column 1: To Do */}
          <div className="kanban-column">
            <div className="kanban-col-header">
              <div className="kanban-col-title">
                <CircleDot size={18} color="#2563eb" />
                <span>To Do</span>
              </div>
              <span className="col-count-pill">{todoComplaints.length}</span>
            </div>

            {todoComplaints.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94a3b8', fontSize: '0.85rem' }}>
                No pending grievances in this view
              </div>
            ) : (
              todoComplaints.map((c) => {
                const catTheme = getCategoryColor(c.category);
                return (
                  <div
                    key={c.id}
                    className="kanban-card"
                    onClick={() => setSelectedComplaint(c)}
                  >
                    <div className="kanban-card-top">
                      <span
                        className="badge"
                        style={{ backgroundColor: catTheme.bg, color: catTheme.text, fontSize: '0.7rem' }}
                      >
                        {c.category}
                      </span>
                      <PriorityBadge priority={c.priority} />
                    </div>

                    <div className="kanban-card-title">{c.title}</div>
                    <div className="kanban-card-desc">{c.description}</div>

                    <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={12} color="#0d9488" />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.location}
                      </span>
                    </div>

                    <div className="kanban-card-footer">
                      <span className="complaint-id-link" style={{ fontSize: '0.72rem' }}>
                        {c.id}
                      </span>

                      <div
                        className="kanban-status-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => updateStatus(c.id, 'In Progress')}
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: '0.7rem', padding: '3px 8px' }}
                          title="Start resolution process"
                        >
                          Start <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Column 2: In Progress */}
          <div className="kanban-column">
            <div className="kanban-col-header">
              <div className="kanban-col-title">
                <Clock size={18} color="#d97706" />
                <span>In Progress</span>
              </div>
              <span className="col-count-pill">{inProgressComplaints.length}</span>
            </div>

            {inProgressComplaints.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94a3b8', fontSize: '0.85rem' }}>
                No grievances currently in progress
              </div>
            ) : (
              inProgressComplaints.map((c) => {
                const catTheme = getCategoryColor(c.category);
                return (
                  <div
                    key={c.id}
                    className="kanban-card"
                    onClick={() => setSelectedComplaint(c)}
                  >
                    <div className="kanban-card-top">
                      <span
                        className="badge"
                        style={{ backgroundColor: catTheme.bg, color: catTheme.text, fontSize: '0.7rem' }}
                      >
                        {c.category}
                      </span>
                      <PriorityBadge priority={c.priority} />
                    </div>

                    <div className="kanban-card-title">{c.title}</div>
                    <div className="kanban-card-desc">{c.description}</div>

                    <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={12} color="#0d9488" />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.location}
                      </span>
                    </div>

                    <div className="kanban-card-footer">
                      <span className="complaint-id-link" style={{ fontSize: '0.72rem' }}>
                        {c.id}
                      </span>

                      <div
                        className="kanban-status-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => updateStatus(c.id, 'To Do')}
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: '0.7rem', padding: '3px 6px' }}
                          title="Move back to To Do"
                        >
                          <ArrowLeft size={11} />
                        </button>
                        <button
                          onClick={() => updateStatus(c.id, 'Completed')}
                          className="btn btn-primary btn-sm"
                          style={{ fontSize: '0.7rem', padding: '3px 8px', backgroundColor: '#10b981', borderColor: '#059669' }}
                          title="Mark resolved"
                        >
                          Resolve <CheckCircle2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Column 3: Completed */}
          <div className="kanban-column">
            <div className="kanban-col-header">
              <div className="kanban-col-title">
                <CheckCircle2 size={18} color="#059669" />
                <span>Completed</span>
              </div>
              <span className="col-count-pill">{completedComplaints.length}</span>
            </div>

            {completedComplaints.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94a3b8', fontSize: '0.85rem' }}>
                No completed grievances in this view
              </div>
            ) : (
              completedComplaints.map((c) => {
                const catTheme = getCategoryColor(c.category);
                return (
                  <div
                    key={c.id}
                    className="kanban-card"
                    style={{ opacity: 0.9, backgroundColor: '#fcfdfd' }}
                    onClick={() => setSelectedComplaint(c)}
                  >
                    <div className="kanban-card-top">
                      <span
                        className="badge"
                        style={{ backgroundColor: catTheme.bg, color: catTheme.text, fontSize: '0.7rem' }}
                      >
                        {c.category}
                      </span>
                      <PriorityBadge priority={c.priority} />
                    </div>

                    <div className="kanban-card-title">{c.title}</div>
                    <div className="kanban-card-desc">{c.description}</div>

                    <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={12} color="#0d9488" />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.location}
                      </span>
                    </div>

                    <div className="kanban-card-footer">
                      <span className="complaint-id-link" style={{ fontSize: '0.72rem' }}>
                        {c.id}
                      </span>

                      <div
                        className="kanban-status-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => updateStatus(c.id, 'In Progress')}
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: '0.7rem', padding: '3px 8px' }}
                          title="Reopen into In Progress"
                        >
                          <ArrowLeft size={11} /> Reopen
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: DATA TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="civic-card">
          <div className="table-responsive">
            <table className="civic-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Title & Description</th>
                  <th>Category</th>
                  <th>Ward / Location</th>
                  <th>Priority</th>
                  <th>Assigned Department</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                      No complaints match the selected filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <span
                          className="complaint-id-link"
                          onClick={() => setSelectedComplaint(c)}
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
                        {c.coordinates && (
                          <div style={{ fontSize: '0.7rem', color: '#0d9488', fontFamily: 'monospace' }}>
                            {c.coordinates}
                          </div>
                        )}
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
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {c.date}
                        </span>
                      </td>

                      <td>
                        {/* Interactive Status Selector inside Table */}
                        <select
                          className="form-select"
                          value={c.status}
                          onChange={(e) => updateStatus(c.id, e.target.value)}
                          style={{
                            fontSize: '0.78rem',
                            padding: '4px 8px',
                            width: '120px',
                            fontWeight: 600,
                            backgroundColor:
                              c.status === 'Completed'
                                ? '#ecfdf5'
                                : c.status === 'In Progress'
                                ? '#fffbeb'
                                : '#eff6ff'
                          }}
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedComplaint(c)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '4px 8px' }}
                          title="View Full Inspection Details"
                        >
                          <Eye size={13} /> Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
