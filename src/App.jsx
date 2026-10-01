import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import FilterBar from './components/FilterBar';
import EmployeeCard from './components/EmployeeCard';
import EmployeeModal from './components/EmployeeModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';
import { INITIAL_EMPLOYEES, DEPARTMENTS } from './data/initialEmployees';
import { Sparkles, Users } from 'lucide-react';

const STORAGE_KEY = 'greenharvest_employees_v1';

export default function App() {
  // 1. Core State using useState()
  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load employees from localStorage:', e);
    }
    return INITIAL_EMPLOYEES;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [employees]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // 2. Event Handlers
  // Search input change event
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear search input event
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Department filter change event
  const handleDepartmentChange = (deptName) => {
    setSelectedDepartment(deptName);
  };

  // Reset all filters event
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('All Departments');
  };

  // Add / Edit Modal trigger events
  const handleOpenAddModal = () => {
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setEmployeeToEdit(emp);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmployeeToEdit(null);
  };

  // Delete flow trigger events
  const handleOpenDeleteModal = (emp) => {
    setEmployeeToDelete(emp);
  };

  const handleCloseDeleteModal = () => {
    setEmployeeToDelete(null);
  };

  // Form Submission Event (Handles both Add and Edit)
  const handleFormSubmit = (submittedData) => {
    if (employeeToEdit) {
      // Edit Existing Employee
      setEmployees((prevList) =>
        prevList.map((emp) => (emp.id === submittedData.id ? submittedData : emp))
      );
      showToast(`Updated details for ${submittedData.name} (${submittedData.empId})`);
    } else {
      // Add New Employee to State
      setEmployees((prevList) => [submittedData, ...prevList]);
      showToast(`Successfully added ${submittedData.name} to directory!`);
    }
    handleCloseModal();
  };

  // Confirm Delete Event
  const handleConfirmDelete = (id) => {
    const deleted = employees.find((e) => e.id === id);
    setEmployees((prevList) => prevList.filter((emp) => emp.id !== id));
    handleCloseDeleteModal();
    showToast(`Removed ${deleted?.name || 'employee'} from directory.`, 'info');
  };

  // Reset sample dataset helper
  const handleRestoreDefaults = () => {
    if (window.confirm('Restore initial demo farm employee records?')) {
      setEmployees(INITIAL_EMPLOYEES);
      setSearchTerm('');
      setSelectedDepartment('All Departments');
      showToast('Sample dataset restored', 'info');
    }
  };

  // 3. Filtering and Derived Calculation
  const filteredEmployees = employees.filter((employee) => {
    // Search query matching
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      employee.name.toLowerCase().includes(query) ||
      employee.empId.toLowerCase().includes(query) ||
      employee.phone.includes(query) ||
      employee.localAddress.toLowerCase().includes(query) ||
      employee.permanentAddress.toLowerCase().includes(query);

    // Department matching
    const matchesDepartment =
      selectedDepartment === 'All Departments' ||
      employee.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const hasActiveFilters =
    searchTerm.trim() !== '' || selectedDepartment !== 'All Departments';

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Navigation */}
      <Navbar
        totalCount={employees.length}
        onOpenAddModal={handleOpenAddModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Banner Introduction */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Farm Workforce Directory
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <Sparkles className="w-3 h-3 mr-1" />
                Live State
              </span>
            </div>
            <p className="text-sm text-stone-500 mt-1">
              Manage farm employees, department assignments, addresses, and staff contacts in real time.
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRestoreDefaults}
              className="text-xs text-stone-500 hover:text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              title="Reset to default sample farm dataset"
            >
              Reset Sample Data
            </button>
          </div>
        </div>

        {/* 1. Employee Count & Statistics Overview */}
        <StatsOverview
          totalCount={employees.length}
          filteredCount={filteredEmployees.length}
          selectedDepartment={selectedDepartment}
          searchTerm={searchTerm}
          departments={DEPARTMENTS}
          employees={employees}
        />

        {/* 2. Search & Department Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={handleDepartmentChange}
          departments={DEPARTMENTS}
          employees={employees}
          onResetAll={handleResetFilters}
        />

        {/* Active Filter Notice */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between bg-emerald-50/60 border border-emerald-200/70 rounded-xl px-4 py-2.5 mb-6 text-xs text-emerald-900">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Showing {filteredEmployees.length} of {employees.length} employees</span>
              {selectedDepartment !== 'All Departments' && (
                <span className="bg-emerald-200/80 px-2 py-0.5 rounded-md font-medium">
                  Dept: {selectedDepartment}
                </span>
              )}
              {searchTerm && (
                <span className="bg-emerald-200/80 px-2 py-0.5 rounded-md font-medium">
                  Search: "{searchTerm}"
                </span>
              )}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-emerald-700 hover:text-emerald-950 font-bold underline cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* 3. Conditional Rendering: Cards Grid or Empty State */}
        {filteredEmployees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEmployees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onEdit={handleOpenEditModal}
                onDelete={handleOpenDeleteModal}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            hasFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
            onOpenAddModal={handleOpenAddModal}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200/80 py-6 text-center text-xs text-stone-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} GreenHarvest Farms Management. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with</span>
            <span className="font-semibold text-emerald-700">React useState()</span>
            <span>& Event Handlers</span>
          </p>
        </div>
      </footer>

      {/* 4. Conditional Rendering: Modals & Overlays */}
      {isModalOpen && (
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          employeeToEdit={employeeToEdit}
          departments={DEPARTMENTS}
          existingEmployees={employees}
        />
      )}

      {employeeToDelete && (
        <DeleteConfirmModal
          employee={employeeToDelete}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
