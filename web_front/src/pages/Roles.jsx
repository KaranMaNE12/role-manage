import { useState, useEffect } from 'react';
import { createRole, fetchPermissions, fetchRoles } from '../Services/api';

export default function Roles() {
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [list, setList] = useState([]);

  const handleToggle = (perm) => {
    setSelected(selected.includes(perm) ? selected.filter(p => p !== perm) : [...selected, perm]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRole({ name, permissions: selected });
    setName('');
    setSelected([]);
    loadRoles();
  };

  const loadPermissions = async () => {
    const res = await fetchPermissions();
    setPermissions(res.data);
  };

  const loadRoles = async () => {
    const res = await fetchRoles();
    setList(res.data);
  };

  useEffect(() => {
    loadPermissions();
    loadRoles();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Role</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input className="border p-2 mr-2 w-64" value={name} onChange={(e) => setName(e.target.value)} placeholder="Role Name" />
        <div className="grid grid-cols-2 gap-2 my-4">
          {permissions.map(p => (
            <label key={p._id} className="flex items-center">
              <input type="checkbox" checked={selected.includes(p._id)} onChange={() => handleToggle(p._id)} className="mr-2" />
              {p.name}
            </label>
          ))}
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add Role</button>
      </form>
      <ul className="space-y-2">
        {list.map(r => <li key={r._id} className="border p-2 rounded">{r.name}</li>)}
      </ul>
    </div>
  );
}
