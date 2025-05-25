// src/components/Unauthorized.js
import React from 'react';

function Unauthorized() {
  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold text-red-600">Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
}

export default Unauthorized;
