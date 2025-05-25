// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function EquipmentTypes() {
//   const [types, setTypes] = useState([]);
//   const [form, setForm] = useState({ name: '' });
//   const [editingId, setEditingId] = useState(null);

//   const fetchTypes = async () => {
//     const res = await axios.get('http://localhost:5000/api/equipment-types')
//     setTypes(res.data);
//   };

//   useEffect(() => {
//     fetchTypes();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingId) {
//       await axios.put(`http://localhost:5000/api/equipmenttypes/${editingId}`, form);
//     } else {
//       await axios.post('http://localhost:5000/api/equipmenttypes', form);
//     }
//     setForm({ name: '' });
//     setEditingId(null);
//     fetchTypes();
//   };

//   const handleEdit = (type) => {
//     setForm({ name: type.name });
//     setEditingId(type.id);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/equipmenttypes/${id}`);
//     fetchTypes();
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">Equipment Types</h2>
//       <form onSubmit={handleSubmit} className="space-x-2 mb-4">
//         <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required className="border p-1" />
//         <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">{editingId ? 'Update' : 'Create'}</button>
//       </form>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-2 py-1">ID</th>
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {types.map(type => (
//             <tr key={type.id}>
//               <td className="border px-2 py-1">{type.id}</td>
//               <td className="border px-2 py-1">{type.name}</td>
//               <td className="border px-2 py-1 space-x-2">
//                 <button onClick={() => handleEdit(type)} className="text-blue-500">Edit</button>
//                 <button onClick={() => handleDelete(type.id)} className="text-red-500">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default EquipmentTypes;

//----------------------------------------------------(1)
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function EquipmentTypes() {
//   const [types, setTypes] = useState([]);
//   const [form, setForm] = useState({ name: '', description: '' });
//   const [editingId, setEditingId] = useState(null);

//   const fetchTypes = async () => {
//     const res = await axios.get('http://localhost:5000/api/equipmenttypes');
//     setTypes(res.data);
//   };

//   useEffect(() => {
//     fetchTypes();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingId) {
//       await axios.put(`http://localhost:5000/api/equipmenttypes/${editingId}`, form);
//     } else {
//       await axios.post('http://localhost:5000/api/equipmenttypes', form);
//     }
//     setForm({ name: '', description: '' });
//     setEditingId(null);
//     fetchTypes();
//   };

//   const handleEdit = (type) => {
//     setForm({ name: type.name, description: type.description });
//     setEditingId(type.id);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/equipmenttypes/${id}`);
//     fetchTypes();
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">Equipment Types</h2>
//       <form onSubmit={handleSubmit} className="space-y-2 mb-4">
//         <input
//           value={form.name}
//           onChange={e => setForm({ ...form, name: e.target.value })}
//           placeholder="Name"
//           required
//           className="border p-2 w-full"
//         />
//         <textarea
//           value={form.description}
//           onChange={e => setForm({ ...form, description: e.target.value })}
//           placeholder="Description"
//           className="border p-2 w-full"
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           {editingId ? 'Update' : 'Create'}
//         </button>
//       </form>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-2 py-1">ID</th>
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Description</th>
//             <th className="border px-2 py-1">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {types.map(type => (
//             <tr key={type.id}>
//               <td className="border px-2 py-1">{type.id}</td>
//               <td className="border px-2 py-1">{type.name}</td>
//               <td className="border px-2 py-1">{type.description}</td>
//               <td className="border px-2 py-1 space-x-2">
//                 <button onClick={() => handleEdit(type)} className="text-blue-500">Edit</button>
//                 <button onClick={() => handleDelete(type.id)} className="text-red-500">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default EquipmentTypes;


//----------------(2)
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function EquipmentTypes() {
//   const [types, setTypes] = useState([]);
//   const [form, setForm] = useState({ name: '', description: '' });
//   const [editingId, setEditingId] = useState(null);

//   const fetchTypes = async () => {
//     const res = await axios.get('http://localhost:5000/api/equipmenttypes');
//     setTypes(res.data);
//   };

//   useEffect(() => {
//     fetchTypes();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingId) {
//       await axios.put(`http://localhost:5000/api/equipmenttypes/${editingId}`, form);
//     } else {
//       await axios.post('http://localhost:5000/api/equipmenttypes', form);
//     }
//     setForm({ name: '', description: '' });
//     setEditingId(null);
//     fetchTypes();
//   };

//   const handleEdit = (type) => {
//     setForm({ name: type.name, description: type.description || '' });
//     setEditingId(type.id);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/equipmenttypes/${id}`);
//     fetchTypes();
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
//       <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Equipment Types</h2>

//       <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
//           <div style={{ display: 'flex', flexDirection: 'column' }}>
//             <label>Name</label>
//             <input
//               type="text"
//               value={form.name}
//               onChange={e => setForm({ ...form, name: e.target.value })}
//               required
//               placeholder="Enter equipment name"
//               style={{ padding: '8px', fontSize: '14px' }}
//             />
//           </div>
//           <div style={{ display: 'flex', flexDirection: 'column' }}>
//             <label>Description</label>
//             <textarea
//               value={form.description}
//               onChange={e => setForm({ ...form, description: e.target.value })}
//               placeholder="Enter description"
//               style={{ padding: '8px', fontSize: '14px', height: '80px' }}
//             />
//           </div>
//           <button
//             type="submit"
//             style={{
//               width: '120px',
//               padding: '10px',
//               backgroundColor: '#007bff',
//               color: 'white',
//               border: 'none',
//               cursor: 'pointer',
//               marginTop: '10px'
//             }}
//           >
//             {editingId ? 'Update' : 'Create'}
//           </button>
//         </div>
//       </form>

//       <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead style={{ backgroundColor: '#f2f2f2' }}>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {types.map(type => (
//             <tr key={type.id}>
//               <td>{type.id}</td>
//               <td>{type.name}</td>
//               <td>{type.description}</td>
//               <td>
//                 <button onClick={() => handleEdit(type)} style={{ marginRight: '10px', color: 'blue' }}>
//                   Edit
//                 </button>
//                 <button onClick={() => handleDelete(type.id)} style={{ color: 'red' }}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default EquipmentTypes;
//------------------------------------------(3)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EquipmentTypes() {
  const [types, setTypes] = useState([]);
  // Include id in form state to allow editing or entering ID
  const [form, setForm] = useState({ id: '', name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchTypes = async () => {
    const res = await axios.get('http://localhost:5000/api/equipmenttypes');
    setTypes(res.data);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate ID is present when editing or creating
    if (!form.id) {
      alert('ID is required.');
      return;
    }

    // If editing, use PUT with the editingId, else POST new entry
    if (editingId) {
      await axios.put(`http://localhost:5000/api/equipmenttypes/${editingId}`, {
        id: form.id,
        name: form.name,
        description: form.description,
      });
    } else {
      await axios.post('http://localhost:5000/api/equipmenttypes', {
        id: form.id,
        name: form.name,
        description: form.description,
      });
    }

    setForm({ id: '', name: '', description: '' });
    setEditingId(null);
    fetchTypes();
  };

  const handleEdit = (type) => {
    setForm({
      id: type.id,
      name: type.name,
      description: type.description || '',
    });
    setEditingId(type.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/equipmenttypes/${id}`);
    fetchTypes();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Equipment Types</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>ID</label>
            <input
              type="text"
              value={form.id}
              onChange={e => setForm({ ...form, id: e.target.value })}
              required
              placeholder="Enter equipment ID"
              style={{ padding: '8px', fontSize: '14px' }}
              disabled={editingId !== null} // Disable ID input during edit to avoid changing PK
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Enter equipment name"
              style={{ padding: '8px', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Enter description"
              style={{ padding: '8px', fontSize: '14px', height: '80px' }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '120px',
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            {editingId ? 'Update' : 'Create'}
          </button>
        </div>
      </form>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map(type => (
            <tr key={type.id}>
              <td>{type.id}</td>
              <td>{type.name}</td>
              <td>{type.description}</td>
              <td>
                <button onClick={() => handleEdit(type)} style={{ marginRight: '10px', color: 'blue' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(type.id)} style={{ color: 'red' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquipmentTypes;
