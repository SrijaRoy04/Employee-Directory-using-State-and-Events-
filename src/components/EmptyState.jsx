import React from 'react';
import { SearchX, UserPlus, RotateCcw } from 'lucide-react';

export default function EmptyState({
  hasFilters,
  onResetFilters,
  onOpenAddModal,
}) {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-dashed border-stone-300 shadow-xs max-w-xl mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-bold text-stone-900 mb-1">
        {hasFilters ? 'No matching farm employees found' : 'No employees in directory'}
      </h3>

      <p className="text-sm text-stone-500 max-w-md mx-auto mb-6">
        {hasFilters
          ? "We couldn't find any employees matching your search criteria or department filter. Try adjusting your search query or reset filters."
          : 'Get started by adding your first farm worker or team member to the directory.'}
      </p>

      <div className="flex items-center justify-center gap-3">
        {hasFilters ? (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        ) : null}

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>
    </div>
  );
}
