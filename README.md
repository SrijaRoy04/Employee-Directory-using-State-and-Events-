# GreenHarvest Farms - Employee Directory

A React web application built to manage farm employee workforce data, demonstrating the core concepts of React:
- **`useState()` State Management**
- **Event Handling (`onChange`, `onSubmit`, `onClick`, keyboard events)**
- **Conditional Rendering (Modals, Empty States, Badges, Error States)**

---

## Farm Employee Data Model
Each farm employee contains the following maintained attributes:
1. **Name**: Full Name of the employee.
2. **Employee ID**: Unique identifier (e.g. `FRM-101`).
3. **Department Name**: Department within the farm operations (e.g., *Crop Production*, *Livestock & Dairy*, *Horticulture & Greenhouse*, *Farm Machinery & Maintenance*, *Logistics & Supply Chain*, *Administration & Accounts*).
4. **Gender**: Male, Female, Other.
5. **Phone Number**: Direct contact number.
6. **Local Address**: Residential / staff quarter address on or near the farm.
7. **Permanent Address**: Legal hometown / permanent residence address (includes helper checkbox to copy local address if identical).

---

## Features Implemented
1. **Add Employee**:
   - Modal form with validation checks (name length, duplicate Employee ID check, required fields, phone formatting).
   - "Same as Local Address" toggle that auto-syncs addresses in real time.
2. **Delete Employee**:
   - Safe confirmation modal displaying the employee's name and ID before removal from state.
3. **Edit Employee Details**:
   - Click "Edit" on any employee card to open the pre-populated form and update details.
4. **Search Employee**:
   - Instant real-time search across Name, Employee ID, Phone number, and Addresses with a one-click clear button.
5. **Employee Count**:
   - Displays live total employees count, matching search count, active departments count, and gender ratio metrics.
6. **Department Filter**:
   - Interactive department pill buttons (with individual live counts) and mobile dropdown selector.
7. **Empty State & Data Persistence**:
   - Illustrated empty state when no records match filter/search.
   - Automatically synchronizes with browser `localStorage`.
   - "Reset Sample Data" button to restore demo records anytime.

---

## How to Run Locally

1. Open a terminal in this directory:
   ```bash
   cd C:\Users\iampr\.gemini\antigravity\scratch\farm-employee-directory
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at the URL shown in the terminal (usually `http://localhost:5173/`).
