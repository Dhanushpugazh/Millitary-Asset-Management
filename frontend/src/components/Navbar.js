import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <Link to="/">Dashboard</Link> | <Link to="/users">Users</Link> | <Link to="/assets">Assets</Link> | <Link to="/assignments">Assignments</Link> | <Link to="/bases">Bases</Link> | <Link to="/auditlogs">Audit Logs</Link> | <Link to="/equipment-types">Equipment Types</Link> | <Link to="/asset-movements">Asset Movements</Link> | <Link to="/expenditures">Expenditures</Link>
    </nav>
  );
}

export default Navbar;
