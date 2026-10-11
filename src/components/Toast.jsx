import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useComplaints } from '../context/ComplaintContext';

export function ToastContainer() {
  const { toasts, removeToast } = useComplaints();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 size={18} color="#10b981" />;
            case 'danger':
              return <AlertCircle size={18} color="#ef4444" />;
            default:
              return <Info size={18} color="#0d9488" />;
          }
        };

        return (
          <div key={toast.id} className={`toast ${toast.type}`}>
            {getIcon()}
            <span style={{ flex: 1, color: '#0f172a', fontWeight: 500 }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94a3b8',
                padding: '2px',
                display: 'flex'
              }}
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
