// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Assets() {
//   const [assets, setAssets] = useState([]);
//   const [form, setForm] = useState({ name: '', base_id: '', equipment_type_id: '' });
//   const [editingId, setEditingId] = useState(null);
  
//   const fetchAssets = async () => {
//     const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/assets`);
//     //const res = await axios.get('/assets');
//     setAssets(res.data);
//   };

//   useEffect(() => {
//     fetchAssets();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingId) {
//       await axios.put(`http://localhost:5000/api/assets/${editingId}`, form);
//     } else {
//       await axios.post('http://localhost:5000/api/assets', form);
//     }
//     setForm({ name: '', base_id: '', equipment_type_id: '' });
//     setEditingId(null);
//     fetchAssets();
//   };

//   const handleEdit = (asset) => {
//     setForm({ name: asset.name, base_id: asset.base_id, equipment_type_id: asset.equipment_type_id });
//     setEditingId(asset.id);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/assets/${id}`);
//     fetchAssets();
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">Assets</h2>
//       <form onSubmit={handleSubmit} className="space-x-2 mb-4">
//         <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required className="border p-1" />
//         <input value={form.base_id} onChange={e => setForm({ ...form, base_id: e.target.value })} placeholder="Base ID" required className="border p-1" />
//         <input value={form.equipment_type_id} onChange={e => setForm({ ...form, equipment_type_id: e.target.value })} placeholder="Equipment Type ID" required className="border p-1" />
//         <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">{editingId ? 'Update' : 'Create'}</button>
//       </form>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-2 py-1">ID</th>
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Base ID</th>
//             <th className="border px-2 py-1">Equipment Type ID</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {assets.map(asset => (
//             <tr key={asset.id}>
//               <td className="border px-2 py-1">{asset.id}</td>
//               <td className="border px-2 py-1">{asset.name}</td>
//               <td className="border px-2 py-1">{asset.base_id}</td>
//               <td className="border px-2 py-1">{asset.equipment_type_id}</td>
//               <td className="border px-2 py-1 space-x-2">
//                 <button onClick={() => handleEdit(asset)} className="text-blue-500">Edit</button>
//                 <button onClick={() => handleDelete(asset.id)} className="text-red-500">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Assets;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Assets() {
  const [assets, setAssets] = useState([]);
  const [form, setForm] = useState({
    name: '',
    quantity: '',
    base_id: '',
    equipment_type_id: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchAssets = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/assets`);
      setAssets(res.data);
    } catch (err) {
      console.error('Failed to fetch assets:', err);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/assets/${editingId}`, form);
      } else {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/assets`, form);
      }
      setForm({ name: '', quantity: '', base_id: '', equipment_type_id: '' });
      setEditingId(null);
      fetchAssets();
    } catch (err) {
      console.error('Error saving asset:', err);
    }
  };

  const handleEdit = (asset) => {
    setForm({
      name: asset.name,
      quantity: asset.quantity,
      base_id: asset.base_id,
      equipment_type_id: asset.equipment_type_id
    });
    setEditingId(asset.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/assets/${id}`);
      fetchAssets();
    } catch (err) {
      console.error('Error deleting asset:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assets</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-4 mb-6">
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required className="border p-2 rounded" />
        <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" required className="border p-2 rounded" />
        <input type="number" value={form.base_id} onChange={e => setForm({ ...form, base_id: e.target.value })} placeholder="Base ID" required className="border p-2 rounded" />
        <input type="number" value={form.equipment_type_id} onChange={e => setForm({ ...form, equipment_type_id: e.target.value })} placeholder="Equipment Type ID" required className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editingId ? 'Update' : 'Create'}
        </button>
      </form>

      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Base ID</th>
            <th className="border px-4 py-2">Equipment Type ID</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{asset.id}</td>
              <td className="border px-4 py-2">{asset.name}</td>
              <td className="border px-4 py-2">{asset.quantity}</td>
              <td className="border px-4 py-2">{asset.base_id}</td>
              <td className="border px-4 py-2">{asset.equipment_type_id}</td>
              <td className="border px-4 py-2 space-x-2">
                <button onClick={() => handleEdit(asset)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(asset.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Assets;
