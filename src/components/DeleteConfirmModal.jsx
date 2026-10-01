import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({ employee, onClose, onConfirm }) {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-3 text-rose-600 mb-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">Delete Employee</h3>
              <p className="text-xs text-stone-500">This action cannot be undone</p>
            </div>
          </div>

          <p className="text-sm text-stone-600 mb-4">
            Are you sure you want to remove{' '}
            <strong className="text-stone-900 font-semibold">{employee.name}</strong> (
            <span className="font-mono text-emerald-800 font-bold">{employee.empId}</span>) from the
            farm workforce directory?
          </p>

          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 mb-6 text-xs text-stone-600 space-y-1">
            <p>
              <span className="font-semibold text-stone-700">Department:</span>{' '}
              {employee.department}
            </p>
            <p>
              <span className="font-semibold text-stone-700">Phone:</span> {employee.phone}
            </p>
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(employee.id)}
              className="inline-flex items-center space-x-2 px-5 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Yes, Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
