import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const Toast = ({ toasts }) => {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-bold animate-fade-in ${
            toast.type === 'success'
              ? 'bg-emerald-600 shadow-emerald-900/30'
              : 'bg-rose-600 shadow-rose-900/30'
          }`}
        >
          {toast.type === 'success'
            ? <CheckCircle2 className="w-4 h-4 shrink-0" />
            : <AlertCircle className="w-4 h-4 shrink-0" />
          }
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Toast;
