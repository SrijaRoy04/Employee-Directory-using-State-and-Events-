import React, { useState, useEffect } from 'react';
import { X, User, Hash, Briefcase, Phone, MapPin, Home, CheckCircle2, AlertCircle } from 'lucide-react';
import { GENDERS } from '../data/initialEmployees';

export default function EmployeeModal({
  isOpen,
  onClose,
  onSubmit,
  employeeToEdit,
  departments,
  existingEmployees,
}) {
  const isEditing = Boolean(employeeToEdit);

  // Form State using useState
  const [formData, setFormData] = useState({
    name: '',
    empId: '',
    department: '',
    gender: 'Male',
    phone: '',
    localAddress: '',
    permanentAddress: '',
    designation: '',
  });

  const [sameAsLocal, setSameAsLocal] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Populate form if editing or reset if adding
  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name || '',
        empId: employeeToEdit.empId || '',
        department: employeeToEdit.department || '',
        gender: employeeToEdit.gender || 'Male',
        phone: employeeToEdit.phone || '',
        localAddress: employeeToEdit.localAddress || '',
        permanentAddress: employeeToEdit.permanentAddress || '',
        designation: employeeToEdit.designation || '',
      });
      setSameAsLocal(
        employeeToEdit.localAddress &&
        employeeToEdit.localAddress === employeeToEdit.permanentAddress
      );
    } else {
      // Auto-generate next suggested employee ID (e.g. FRM-107)
      const nextNum = existingEmployees.length + 101;
      setFormData({
        name: '',
        empId: `FRM-${nextNum}`,
        department: departments[1]?.name || 'Crop Production',
        gender: 'Male',
        phone: '',
        localAddress: '',
        permanentAddress: '',
        designation: '',
      });
      setSameAsLocal(false);
    }
    setErrors({});
    setTouched({});
  }, [employeeToEdit, isOpen]);

  if (!isOpen) return null;

  // Validation function
  const validate = (dataToValidate) => {
    const errs = {};

    if (!dataToValidate.name.trim()) {
      errs.name = 'Full name is required';
    } else if (dataToValidate.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!dataToValidate.empId.trim()) {
      errs.empId = 'Employee ID is required';
    } else {
      // Check for duplicate empId if adding, or if editing and changed to an existing one
      const duplicate = existingEmployees.find(
        (e) =>
          e.empId.toLowerCase() === dataToValidate.empId.trim().toLowerCase() &&
          (!isEditing || e.id !== employeeToEdit.id)
      );
      if (duplicate) {
        errs.empId = 'Employee ID already exists. Please choose a unique ID.';
      }
    }

    if (!dataToValidate.department || dataToValidate.department === 'All Departments') {
      errs.department = 'Please select a valid department';
    }

    if (!dataToValidate.gender) {
      errs.gender = 'Please select gender';
    }

    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!dataToValidate.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!phoneRegex.test(dataToValidate.phone.trim().replace(/\s+/g, ''))) {
      errs.phone = 'Please enter a valid phone number (8-15 digits)';
    }

    if (!dataToValidate.localAddress.trim()) {
      errs.localAddress = 'Local address is required';
    }

    if (!dataToValidate.permanentAddress.trim()) {
      errs.permanentAddress = 'Permanent address is required';
    }

    return errs;
  };

  // Event Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    // If "Same as local address" is enabled and localAddress changed, sync permanentAddress
    if (sameAsLocal && name === 'localAddress') {
      updated.permanentAddress = value;
    }

    setFormData(updated);

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validate(formData);
    if (validationErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleSameAddressToggle = (e) => {
    const isChecked = e.target.checked;
    setSameAsLocal(isChecked);
    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        permanentAddress: prev.localAddress,
      }));
      setErrors((prev) => ({ ...prev, permanentAddress: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({
        name: true,
        empId: true,
        department: true,
        phone: true,
        localAddress: true,
        permanentAddress: true,
      });
      return;
    }

    onSubmit({
      ...formData,
      id: isEditing ? employeeToEdit.id : `emp-${Date.now()}`,
      joinedDate: isEditing ? employeeToEdit.joinedDate : new Date().toISOString().split('T')[0],
    });
  };

  // Filter out "All Departments" for selection dropdown
  const selectableDepts = departments.filter((d) => d.id !== 'all');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/60 flex items-center justify-center border border-emerald-500/30">
              <User className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {isEditing ? 'Edit Employee Details' : 'Add New Farm Employee'}
              </h2>
              <p className="text-xs text-emerald-200">
                {isEditing
                  ? `Updating record for ${employeeToEdit.empId}`
                  : 'Enter comprehensive farm worker details below'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-700/50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Row 1: Full Name & Employee ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Ramesh Patel"
                  className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                    errors.name ? 'border-red-400 bg-red-50/30' : 'border-stone-300'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Employee ID <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="empId"
                  value={formData.empId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. FRM-101"
                  className={`w-full px-3.5 py-2 text-sm font-mono rounded-xl border ${
                    errors.empId ? 'border-red-400 bg-red-50/30' : 'border-stone-300'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
              </div>
              {errors.empId && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.empId}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Department & Designation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Department Name <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                  errors.department ? 'border-red-400 bg-red-50/30' : 'border-stone-300'
                } bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              >
                <option value="">Select Department</option>
                {selectableDepts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.department}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Role / Designation <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Field Agronomist / Supervisor"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Row 3: Gender & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-3 pt-1">
                {GENDERS.map((g) => (
                  <label key={g} className="flex items-center space-x-1.5 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="accent-emerald-600 w-4 h-4 cursor-pointer"
                    />
                    <span className="font-medium text-stone-700">{g}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. 9876543210"
                className={`w-full px-3.5 py-2 text-sm font-mono rounded-xl border ${
                  errors.phone ? 'border-red-400 bg-red-50/30' : 'border-stone-300'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Local Address */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
              <span>
                Local Address <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] text-stone-400 font-normal">
                Farm staff quarter or local residence
              </span>
            </label>
            <textarea
              name="localAddress"
              rows={2}
              value={formData.localAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. Staff Quarters Block A-12, GreenHarvest Estate, Pune"
              className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                errors.localAddress ? 'border-red-400 bg-red-50/30' : 'border-stone-300'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none`}
            />
            {errors.localAddress && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.localAddress}
              </p>
            )}
          </div>

          {/* Checkbox: Permanent address is same as local address */}
          <div className="flex items-center space-x-2 py-0.5">
            <input
              type="checkbox"
              id="sameAddressCheck"
              checked={sameAsLocal}
              onChange={handleSameAddressToggle}
              className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <label
              htmlFor="sameAddressCheck"
              className="text-xs font-medium text-stone-700 cursor-pointer select-none"
            >
              Permanent address is same as local address
            </label>
          </div>

          {/* Permanent Address */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
              <span>
                Permanent Address <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] text-stone-400 font-normal">
                Hometown / legal permanent residence
              </span>
            </label>
            <textarea
              name="permanentAddress"
              rows={2}
              value={formData.permanentAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={sameAsLocal}
              placeholder="e.g. Village Khed, Taluka Shirur, Dist. Pune, Maharashtra - 410505"
              className={`w-full px-3.5 py-2 text-sm rounded-xl border ${
                errors.permanentAddress ? 'border-red-400 bg-red-50/30' : 'border-stone-300'
              } ${sameAsLocal ? 'bg-stone-100 text-stone-500' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none`}
            />
            {errors.permanentAddress && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.permanentAddress}
              </p>
            )}
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-6 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEditing ? 'Update Employee' : 'Save Employee'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
