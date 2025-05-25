// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Bases() {
//   const [bases, setBases] = useState([]);
//   const [form, setForm] = useState({ name: '', location: '' });
//   const [editingId, setEditingId] = useState(null);

//   const fetchBases = async () => {
//     const res = await axios.get('http://localhost:5000/api/bases');
//     setBases(res.data);
//   };

//   useEffect(() => {
//     fetchBases();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingId) {
//       await axios.put(`http://localhost:5000/api/bases/${editingId}`, form);
//     } else {
//       await axios.post('http://localhost:5000/api/bases', form);
//     }
//     setForm({ name: '', location: '' });
//     setEditingId(null);
//     fetchBases();
//   };

//   const handleEdit = (base) => {
//     setForm({ name: base.name, location: base.location });
//     setEditingId(base.id);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/bases/${id}`);
//     fetchBases();
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">Bases</h2>
//       <form onSubmit={handleSubmit} className="space-x-2 mb-4">
//         <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required className="border p-1" />
//         <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Location" required className="border p-1" />
//         <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">{editingId ? 'Update' : 'Create'}</button>
//       </form>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-2 py-1">ID</th>
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Location</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bases.map(base => (
//             <tr key={base.id}>
//               <td className="border px-2 py-1">{base.id}</td>
//               <td className="border px-2 py-1">{base.name}</td>
//               <td className="border px-2 py-1">{base.location}</td>
//               <td className="border px-2 py-1 space-x-2">
//                 <button onClick={() => handleEdit(base)} className="text-blue-500">Edit</button>
//                 <button onClick={() => handleDelete(base.id)} className="text-red-500">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Bases;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Bases() {
  const [bases, setBases] = useState([]);
  const [form, setForm] = useState({ name: '', location: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchBases = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bases');
      setBases(res.data);
    } catch (err) {
      console.error('Failed to fetch bases:', err);
    }
  };

  useEffect(() => {
    fetchBases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/bases/${editingId}`, form);
      } else {
        await axios.post('http://localhost:5000/api/bases', form);
      }
      setForm({ name: '', location: '' });
      setEditingId(null);
      fetchBases();
    } catch (err) {
      console.error('Failed to submit base:', err);
    }
  };

  const handleEdit = (base) => {
    setForm({ name: base.name, location: base.location });
    setEditingId(base.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bases/${id}`);
      fetchBases();
    } catch (err) {
      console.error('Failed to delete base:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Bases</h2>
      <form onSubmit={handleSubmit} className="space-x-2 mb-4">
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
          className="border p-1"
        />
        <input
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
          placeholder="Location"
          required
          className="border p-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
          {editingId ? 'Update' : 'Create'}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Location</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bases.map(base => (
            <tr key={base.id}>
              <td className="border px-2 py-1">{base.id}</td>
              <td className="border px-2 py-1">{base.name}</td>
              <td className="border px-2 py-1">{base.location}</td>
              <td className="border px-2 py-1 space-x-2">
                <button onClick={() => handleEdit(base)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(base.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bases;
