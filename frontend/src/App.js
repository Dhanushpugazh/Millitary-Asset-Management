import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Assets from './components/Assets';
import Assignments from './components/Assignments';
import Bases from './components/Bases';
import AuditLogs from './components/AuditLogs';
import EquipmentTypes from './components/EquipmentTypes';
import AssetMovements from './components/AssetMovements';
import Expenditures from './components/Expenditures';
import Login from './components/login';
import Unauthorized from './components/Unauthorized';

function normalizeRole(role) {
  if (!role) return '';
  switch (role.toLowerCase()) {
    case 'admin':
      return 'admin';
    case 'base commander':
      return 'commander';
    case 'logistic officer':
      return 'logistics';
    default:
      return '';
  }
}

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) setRole(savedRole);
  }, []);

  const ProtectedRoute = ({ element, allowedRoles }) => {
    return allowedRoles.includes(role) ? element : <Navigate to="/unauthorized" />;
  };

  // Show Navbar on all paths except login
  const shouldShowNavbar = window.location.pathname !== '/';

  return (
    <Router>
      {shouldShowNavbar && <Navbar />}
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Login onLogin={(r) => {
              const normalized = normalizeRole(r);
              setRole(normalized);
              localStorage.setItem('role', normalized);
            }} />}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                allowedRoles={['admin', 'commander', 'logistics']}
                element={<Dashboard />}
              />
            }
          />
          <Route
            path="/users"
            element={<ProtectedRoute allowedRoles={['admin']} element={<Users />} />}
          />
          <Route
            path="/assets"
            element={<ProtectedRoute allowedRoles={['admin', 'commander']} element={<Assets />} />}
          />
          <Route
            path="/assignments"
            element={<ProtectedRoute allowedRoles={['admin', 'commander']} element={<Assignments />} />}
          />
          <Route
            path="/bases"
            element={<ProtectedRoute allowedRoles={['admin']} element={<Bases />} />}
          />
          <Route
            path="/auditlogs"
            element={<ProtectedRoute allowedRoles={['admin']} element={<AuditLogs />} />}
          />
          <Route
            path="/equipment-types"
            element={<ProtectedRoute allowedRoles={['admin']} element={<EquipmentTypes />} />}
          />
          <Route
            path="/asset-movements"
            element={<ProtectedRoute allowedRoles={['admin', 'logistics']} element={<AssetMovements />} />}
          />
          <Route
            path="/expenditures"
            element={<ProtectedRoute allowedRoles={['admin', 'commander']} element={<Expenditures />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
