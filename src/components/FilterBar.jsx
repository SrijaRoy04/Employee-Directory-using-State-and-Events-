import React from 'react';
import { Search, X, Filter, RotateCcw } from 'lucide-react';

export default function FilterBar({
  searchTerm,
  onSearchChange,
  onClearSearch,
  selectedDepartment,
  onDepartmentChange,
  departments,
  employees,
  onResetAll,
}) {
  // Calculate count for each department
  const getDeptCount = (deptName) => {
    if (deptName === 'All Departments') return employees.length;
    return employees.filter((e) => e.department === deptName).length;
  };

  const isFiltered = selectedDepartment !== 'All Departments' || searchTerm.trim() !== '';

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs mb-6 space-y-4">
      {/* Search Input and Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            id="employee-search-input"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search by name, ID (e.g., FRM-101), or phone..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all placeholder:text-stone-400"
          />
          {searchTerm && (
            <button
              onClick={onClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Department Select & Reset */}
        <div className="flex items-center gap-2">
          <div className="relative sm:hidden flex-1">
            <select
              value={selectedDepartment}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="w-full pl-3 pr-8 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name} ({getDeptCount(dept.name)})
                </option>
              ))}
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={onResetAll}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-red-600 bg-stone-100 hover:bg-red-50 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Department Filter Pills (Desktop & Tablet) */}
      <div className="hidden sm:flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mr-2 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {departments.map((dept) => {
          const isSelected = selectedDepartment === dept.name;
          const count = getDeptCount(dept.name);
          return (
            <button
              key={dept.id}
              onClick={() => onDepartmentChange(dept.name)}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-700/20'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              <span>{dept.name}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-stone-200 text-stone-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
