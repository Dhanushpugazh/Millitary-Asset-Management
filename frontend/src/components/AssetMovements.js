import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AssetMovements() {
  const [movements, setMovements] = useState([]);
  const [form, setForm] = useState({ asset_id: '', from_base_id: '', to_base_id: '', quantity: '', movement_date: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchMovements = async () => {
    const res = await axios.get('http://localhost:5000/api/assetmovements')
    setMovements(res.data);
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editingId) {
      await axios.put(`http://localhost:5000/api/assetmovements/${editingId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/assetmovements', form);
    }
    setForm({ asset_id: '', from_base_id: '', to_base_id: '', quantity: '', movement_date: '' });
    setEditingId(null);
    fetchMovements();
  } catch (err) {
    console.error('Failed to save asset movement:', err.response ? err.response.data : err.message);
  }
};

  const handleEdit = (item) => {
    setForm({
      asset_id: item.asset_id,
      from_base_id: item.from_base_id,
      to_base_id: item.to_base_id,
      quantity: item.quantity,
      movement_date: item.movement_date,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/assetmovements/${id}`);
    fetchMovements();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Asset Movements</h2>
      <form onSubmit={handleSubmit} className="space-x-2 mb-4">
        <input value={form.asset_id} onChange={e => setForm({ ...form, asset_id: e.target.value })} placeholder="Asset ID" required className="border p-1" />
        <input value={form.from_base_id} onChange={e => setForm({ ...form, from_base_id: e.target.value })} placeholder="From Base ID" required className="border p-1" />
        <input value={form.to_base_id} onChange={e => setForm({ ...form, to_base_id: e.target.value })} placeholder="To Base ID" required className="border p-1" />
        <input value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" required className="border p-1" />
        <input type="date" value={form.movement_date} onChange={e => setForm({ ...form, movement_date: e.target.value })} required className="border p-1" />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">{editingId ? 'Update' : 'Create'}</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Asset ID</th>
            <th className="border px-2 py-1">From Base</th>
            <th className="border px-2 py-1">To Base</th>
            <th className="border px-2 py-1">Quantity</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movements.map(item => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.id}</td>
              <td className="border px-2 py-1">{item.asset_id}</td>
              <td className="border px-2 py-1">{item.from_base?.name || item.from_base_id}</td>
              <td className="border px-2 py-1">{item.to_base?.name || item.to_base_id}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
              <td className="border px-2 py-1"> {item.movement_date ? item.movement_date.split('T')[0] : ''} </td>
              <td className="border px-2 py-1 space-x-2">
                <button onClick={() => handleEdit(item)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetMovements;
