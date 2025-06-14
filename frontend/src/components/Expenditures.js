import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Expenditures() {
  const [expenditures, setExpenditures] = useState([]);
  const [form, setForm] = useState({ asset_id: '', base_id: '', quantity: '', expenditure_date: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchExpenditures = async () => {
    const res = await axios.get('https://military-asset-management-fy15.onrender.com/expenditures')
    setExpenditures(res.data);
  };

  useEffect(() => {
    fetchExpenditures();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/expenditures/${editingId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/expenditures', form);
    }
    setForm({ asset_id: '', base_id: '', quantity: '', expenditure_date: '' });
    setEditingId(null);
    fetchExpenditures();
  };

  const handleEdit = (item) => {
    setForm({
      asset_id: item.asset_id,
      base_id: item.base_id,
      quantity: item.quantity,
      expenditure_date: item.expenditure_date,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenditures/${id}`);
    fetchExpenditures();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Expenditures</h2>
      <form onSubmit={handleSubmit} className="space-x-2 mb-4">
        <input value={form.asset_id} onChange={e => setForm({ ...form, asset_id: e.target.value })} placeholder="Asset ID" required className="border p-1" />
        <input value={form.base_id} onChange={e => setForm({ ...form, base_id: e.target.value })} placeholder="Base ID" required className="border p-1" />
        <input value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" required className="border p-1" />
        <input type="date" value={form.expenditure_date} onChange={e => setForm({ ...form, expenditure_date: e.target.value })} required className="border p-1" />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">{editingId ? 'Update' : 'Create'}</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Asset ID</th>
            <th className="border px-2 py-1">Base ID</th>
            <th className="border px-2 py-1">Quantity</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenditures.map(item => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.id}</td>
              <td className="border px-2 py-1">{item.asset_id}</td>
              <td className="border px-2 py-1">{item.base_id}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
              <td className="border px-2 py-1">{item.expenditure_date}</td>
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

export default Expenditures;
