import React from 'react';
import { Users, Filter, Briefcase, Award } from 'lucide-react';

export default function StatsOverview({
  totalCount,
  filteredCount,
  selectedDepartment,
  searchTerm,
  departments,
  employees,
}) {
  const isFiltered = selectedDepartment !== 'All Departments' || searchTerm.trim() !== '';

  // Calculate gender counts
  const maleCount = employees.filter((e) => e.gender === 'Male').length;
  const femaleCount = employees.filter((e) => e.gender === 'Female').length;
  const otherCount = employees.filter((e) => e.gender === 'Other').length;

  // Active departments count
  const activeDepartmentsCount = new Set(employees.map((e) => e.department)).size;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* Total Employees */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500 mb-1">
            Total Employees
          </p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {totalCount}
            </span>
            <span className="text-xs text-stone-400">on roll</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
      </div>

      {/* Filtered Results Count */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500 mb-1">
            {isFiltered ? 'Matching Search' : 'Active View'}
          </p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-700">
              {filteredCount}
            </span>
            {isFiltered && (
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                Filtered
              </span>
            )}
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
          <Filter className="w-6 h-6" />
        </div>
      </div>

      {/* Active Departments */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500 mb-1">
            Active Units
          </p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {activeDepartmentsCount}
            </span>
            <span className="text-xs text-stone-400">departments</span>
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
          <Briefcase className="w-6 h-6" />
        </div>
      </div>

      {/* Workforce Diversity / Breakdown */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500 mb-1">
            Gender Ratio
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {maleCount}M
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-pink-50 text-pink-700 border border-pink-200">
              {femaleCount}F
            </span>
            {otherCount > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                {otherCount}O
              </span>
            )}
          </div>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <Award className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
