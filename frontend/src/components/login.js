
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Login({ onLogin }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await fetch('http://localhost:5000/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password }),
//     });

//     if (!response.ok) {
//       const data = await response.json();
//       alert(data.message || 'Login failed');
//       return;
//     }

//     const data = await response.json();

//     // Save role to localStorage and call onLogin
//     localStorage.setItem('role', data.role.toLowerCase().replace(' ', ''));
//     onLogin(data.role.toLowerCase().replace(' ', ''));
//     navigate('/dashboard');
//   } catch (error) {
//     alert('Error connecting to server');
//   }
// };


//   return (
//     <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
//       <h2>Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: '1rem' }}>
//           <label>Username:</label>
//           <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%' }} />
//         </div>
//         <div style={{ marginBottom: '1rem' }}>
//           <label>Password:</label>
//           <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%' }} />
//         </div>
//         <button type="submit" style={{ width: '100%' }}>Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // reset error before trying login

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Login failed');
        return;
      }

      const data = await response.json();

      // Normalize role string: lowercase and remove spaces
      const normalizedRole = data.role.toLowerCase().replace(/\s/g, '');

      // Save role to localStorage and notify parent component
      localStorage.setItem('role', normalizedRole);
      onLogin(normalizedRole);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '100px auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Username:</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%' }}
            autoComplete="username"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%' }}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" style={{ width: '100%' }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;