import React from 'react';
import { Phone, MapPin, Home, Edit3, Trash2, ShieldCheck, User } from 'lucide-react';

const DEPARTMENT_COLORS = {
  'Crop Production': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Livestock & Dairy': 'bg-amber-50 text-amber-700 border-amber-200',
  'Horticulture & Greenhouse': 'bg-purple-50 text-purple-700 border-purple-200',
  'Farm Machinery & Maintenance': 'bg-blue-50 text-blue-700 border-blue-200',
  'Logistics & Supply Chain': 'bg-teal-50 text-teal-700 border-teal-200',
  'Administration & Accounts': 'bg-rose-50 text-rose-700 border-rose-200',
};

const GENDER_BADGE = {
  Male: 'bg-sky-50 text-sky-700 border-sky-200',
  Female: 'bg-rose-50 text-rose-700 border-rose-200',
  Other: 'bg-violet-50 text-violet-700 border-violet-200',
};

export default function EmployeeCard({ employee, onEdit, onDelete }) {
  const deptStyle =
    DEPARTMENT_COLORS[employee.department] || 'bg-stone-50 text-stone-700 border-stone-200';
  const genderStyle =
    GENDER_BADGE[employee.gender] || 'bg-stone-50 text-stone-700 border-stone-200';

  // Get initials
  const initials = employee.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-300 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Top Banner / Header Info */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3">
            {/* Initials Avatar */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold flex items-center justify-center text-base shadow-sm ring-2 ring-emerald-100">
              {initials || <User className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                {employee.name}
              </h3>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                  {employee.empId}
                </span>
                {employee.designation && (
                  <span className="text-xs text-stone-500 font-medium truncate max-w-[140px]">
                    {employee.designation}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-col items-end gap-1.5">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${deptStyle} text-right whitespace-nowrap`}
            >
              {employee.department}
            </span>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${genderStyle}`}
            >
              {employee.gender}
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-4 pt-3 border-t border-stone-100 space-y-2.5 text-xs text-stone-600">
          {/* Phone */}
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-stone-500">Phone:</span>
              <a
                href={`tel:${employee.phone}`}
                className="font-mono font-semibold text-emerald-700 hover:underline"
              >
                {employee.phone}
              </a>
            </div>
          </div>

          {/* Local Address */}
          <div className="flex items-start space-x-2.5">
            <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center text-stone-500 shrink-0 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-medium text-stone-500 block">Local Address:</span>
              <p className="text-stone-800 leading-snug line-clamp-2">{employee.localAddress}</p>
            </div>
          </div>

          {/* Permanent Address */}
          <div className="flex items-start space-x-2.5">
            <div className="w-6 h-6 rounded-md bg-stone-100 flex items-center justify-center text-stone-500 shrink-0 mt-0.5">
              <Home className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-medium text-stone-500 block">Permanent Address:</span>
              <p className="text-stone-800 leading-snug line-clamp-2">
                {employee.permanentAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="bg-stone-50/80 px-5 py-3 border-t border-stone-100 flex items-center justify-between text-xs">
        <span className="text-[11px] text-stone-400">
          Added {employee.joinedDate || 'Recently'}
        </span>
        <div className="flex items-center space-x-2">
          {/* Edit Button */}
          <button
            onClick={() => onEdit(employee)}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-semibold border border-emerald-200 transition-colors cursor-pointer"
            title="Edit employee details"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(employee)}
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-rose-700 bg-rose-50 hover:bg-rose-100 font-semibold border border-rose-200 transition-colors cursor-pointer"
            title="Delete employee"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
