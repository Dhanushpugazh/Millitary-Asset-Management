import axios from 'axios';

export const fetchExpenditures = () => {
  return axios.get('http://localhost:5000/expenditures');
};

import React, { useEffect, useState } from 'react';
import { fetchExpenditures } from '../api/expenditures';

const Expenditures = () => {
  const [expenditures, setExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenditures()
      .then(response => {
        setExpenditures(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error fetching expenditures');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Expenditures</h2>
      <ul>
        {expenditures.map(item => (
          <li key={item.id}>{item.name} - Quantity: {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Expenditures;
