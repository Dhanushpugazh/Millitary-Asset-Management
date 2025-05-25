import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/dashboard', {
      params: { startDate: '2025-01-01', endDate: '2025-12-31' }
    })
    .then(res => setData(res.data))
    .catch(console.error);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Opening Balance: {data.openingBalance}</p>
      <p>Closing Balance: {data.closingBalance}</p>

      <h3>Net Movement</h3>
      <ul>
        <li>Purchases: {data.netMovement.purchases}</li>
        <li>Transfer In: {data.netMovement.transferIn}</li>
        <li>Transfer Out: {data.netMovement.transferOut}</li>
      </ul>

      <p>Assigned: {data.assigned}</p>
      <p>Expended: {data.expended}</p>

      <h3>Models</h3>
      <ul>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/assets">Assets</Link></li>
        <li><Link to="/assignments">Assignments</Link></li>
        <li><Link to="/bases">Bases</Link></li>
        <li><Link to="/equipment-types">Equipment Types</Link></li>
        <li><Link to="/asset-movements">Asset Movements</Link></li>
        <li><Link to="/expenditures">Expenditures</Link></li>
        <li><Link to="/audit-logs">Audit Logs</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;