import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ asset_id: '', quantity: '', assigned_date: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchAssignments = async () => {
    const res = await axios.get('https://military-asset-management-fy15.onrender.com/api/assignments');
    setAssignments(res.data);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);
   
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/assignments/${editingId}`, form);
    } else {
      await axios.post('http://localhost:5000/api/assignments', form);
    }
    setForm({ asset_id: '', quantity: '', assigned_date: '' });
    setEditingId(null);
    fetchAssignments();
  };

  const handleEdit = (item) => {
    setForm({ asset_id: item.asset_id, quantity: item.quantity, assigned_date: item.assigned_date });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/assignments/${id}`);
    fetchAssignments();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Assignments</h2>
      <form onSubmit={handleSubmit} className="space-x-2 mb-4">
        <input value={form.asset_id} onChange={e => setForm({ ...form, asset_id: e.target.value })} placeholder="Asset ID" required className="border p-1" />
        <input value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" required className="border p-1" />
        <input type="date" value={form.assigned_date} onChange={e => setForm({ ...form, assigned_date: e.target.value })} required className="border p-1" />
        <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">{editingId ? 'Update' : 'Create'}</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Asset ID</th>
            <th className="border px-2 py-1">Quantity</th>
            <th className="border px-2 py-1">Assigned Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(item => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.id}</td>
              <td className="border px-2 py-1">{item.asset_id}</td>
              <td className="border px-2 py-1">{item.quantity}</td>
              <td className="border px-2 py-1">{item.assigned_date}</td>
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

export default Assignments;
