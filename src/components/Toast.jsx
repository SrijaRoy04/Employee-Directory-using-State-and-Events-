import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  };

  const bgStyles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    error: 'bg-rose-50 border-rose-200 text-rose-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center space-x-3 px-4 py-3 rounded-2xl border shadow-xl ${
          bgStyles[toast.type] || bgStyles.info
        } max-w-sm`}
      >
        <div>{icons[toast.type] || icons.info}</div>
        <p className="text-sm font-medium flex-1">{toast.message}</p>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-700 p-0.5 rounded cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
