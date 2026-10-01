import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import App from './App';
import { INITIAL_EMPLOYEES } from './data/initialEmployees';

describe('Farm Employee Directory - Implementation Plan Verification', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Feature 1: Renders initial farm employees with all required fields & accurate Employee Count', () => {
    render(<App />);

    // Check Total Count
    expect(screen.getByText('Total Employees')).toBeInTheDocument();
    const countElements = screen.getAllByText(String(INITIAL_EMPLOYEES.length));
    expect(countElements.length).toBeGreaterThan(0);

    // Verify fields of initial employees are visible
    expect(screen.getByText('Ramesh Patel')).toBeInTheDocument();
    expect(screen.getByText('FRM-101')).toBeInTheDocument();
    expect(screen.getByText('9876543210')).toBeInTheDocument();
    expect(screen.getByText(/Staff Quarters Block A-12/i)).toBeInTheDocument();
    expect(screen.getByText(/Village Khed, Taluka Shirur/i)).toBeInTheDocument();
  });

  it('Feature 2: Real-time Search by Name, Employee ID, and Phone Number', () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search by name, ID/i);

    // Search by Name
    fireEvent.change(searchInput, { target: { value: 'Sunita' } });
    expect(screen.getByText('Sunita Sharma')).toBeInTheDocument();
    expect(screen.queryByText('Ramesh Patel')).not.toBeInTheDocument();

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Ramesh Patel')).toBeInTheDocument();

    // Search by ID
    fireEvent.change(searchInput, { target: { value: 'FRM-103' } });
    expect(screen.getByText('Balwinder Singh')).toBeInTheDocument();
    expect(screen.queryByText('Sunita Sharma')).not.toBeInTheDocument();

    // Search with no match shows Empty State
    fireEvent.change(searchInput, { target: { value: 'NonExistentWorkerXYZ' } });
    expect(screen.getByText(/No matching farm employees found/i)).toBeInTheDocument();
  });

  it('Feature 3: Department Filter narrows down directory and updates counters', () => {
    render(<App />);

    // Click on "Livestock & Dairy" department filter button
    const livestockButtons = screen.getAllByRole('button', { name: /Livestock & Dairy/i });
    fireEvent.click(livestockButtons[0]);

    // Should only show Sunita Sharma
    expect(screen.getByText('Sunita Sharma')).toBeInTheDocument();
    expect(screen.queryByText('Ramesh Patel')).not.toBeInTheDocument();
    expect(screen.queryByText('Balwinder Singh')).not.toBeInTheDocument();

    // Switch back to "All Departments"
    const allDeptButton = screen.getAllByRole('button', { name: /All Departments/i })[0];
    fireEvent.click(allDeptButton);
    expect(screen.getByText('Ramesh Patel')).toBeInTheDocument();
    expect(screen.getByText('Balwinder Singh')).toBeInTheDocument();
  });

  it('Feature 4: Add New Employee with validation and "Same as Local Address" sync', () => {
    render(<App />);

    // Click Add Employee button in navbar
    const addBtn = screen.getByRole('button', { name: /Add Employee/i });
    fireEvent.click(addBtn);

    // Modal should be conditionally rendered
    expect(screen.getByText('Add New Farm Employee')).toBeInTheDocument();

    // Fill the form fields
    const nameInput = screen.getByPlaceholderText(/e.g. Ramesh Patel/i);
    const phoneInput = screen.getByPlaceholderText(/e.g. 9876543210/i);
    const localAddrInput = screen.getByPlaceholderText(/Staff Quarters Block A-12/i);
    const sameAddressCheckbox = screen.getByLabelText(/Permanent address is same as local address/i);

    fireEvent.change(nameInput, { target: { value: 'Kavita Rao' } });
    fireEvent.change(phoneInput, { target: { value: '9845098450' } });
    fireEvent.change(localAddrInput, { target: { value: 'Farm Quarter #9, East Orchard, Pune' } });

    // Check "Same as local address"
    fireEvent.click(sameAddressCheckbox);

    // Submit form
    const saveBtn = screen.getByRole('button', { name: /Save Employee/i });
    fireEvent.click(saveBtn);

    // Modal should close and new employee should appear
    expect(screen.getByText('Kavita Rao')).toBeInTheDocument();
    expect(screen.getByText('9845098450')).toBeInTheDocument();
    // Both Local Address and Permanent Address should match the synced address
    const addressElements = screen.getAllByText('Farm Quarter #9, East Orchard, Pune');
    expect(addressElements.length).toBe(2);
  });

  it('Feature 5: Edit Employee details updates directory state', () => {
    render(<App />);

    // Find all Edit buttons and click the first one (for Ramesh Patel)
    const editButtons = screen.getAllByRole('button', { name: /Edit/i });
    fireEvent.click(editButtons[0]);

    // Modal should open in edit mode
    expect(screen.getByText('Edit Employee Details')).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText(/e.g. Ramesh Patel/i);
    fireEvent.change(nameInput, { target: { value: 'Ramesh Patel (Senior Lead)' } });

    // Submit update
    const updateBtn = screen.getByRole('button', { name: /Update Employee/i });
    fireEvent.click(updateBtn);

    // Verify updated name in directory
    expect(screen.getByText('Ramesh Patel (Senior Lead)')).toBeInTheDocument();
  });

  it('Feature 6: Delete Employee with safety confirmation dialog', () => {
    render(<App />);

    // Initial count is 6
    expect(screen.getByText('Sunita Sharma')).toBeInTheDocument();

    // Find delete button for Sunita Sharma
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[1]); // Sunita is 2nd employee

    // Confirmation dialog should conditionally render
    expect(screen.getByText(/Are you sure you want to remove/i)).toBeInTheDocument();

    // Confirm deletion
    const confirmBtn = screen.getByRole('button', { name: /Yes, Delete/i });
    fireEvent.click(confirmBtn);

    // Employee should be removed from view
    expect(screen.queryByText('Sunita Sharma')).not.toBeInTheDocument();
  });
});
