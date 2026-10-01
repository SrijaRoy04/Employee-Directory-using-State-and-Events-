import React from 'react';
import { Sprout, UserPlus, Users } from 'lucide-react';

export default function Navbar({ totalCount, onOpenAddModal }) {
  return (
    <header className="bg-emerald-800 text-white shadow-lg sticky top-0 z-30 border-b border-emerald-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner">
              <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  GreenHarvest
                </span>
                <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-emerald-700/80 text-emerald-200 border border-emerald-600 font-semibold tracking-wider">
                  Farms
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 hidden sm:block">
                Staff & Workforce Directory Management System
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-emerald-900/60 border border-emerald-700 text-emerald-100 text-sm">
              <Users className="w-4 h-4 text-emerald-300" />
              <span>Total Staff:</span>
              <span className="font-bold text-white px-2 py-0.5 rounded bg-emerald-700">
                {totalCount}
              </span>
            </div>

            <button
              id="btn-add-employee"
              onClick={onOpenAddModal}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-md hover:shadow-emerald-500/20 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Add Employee</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
