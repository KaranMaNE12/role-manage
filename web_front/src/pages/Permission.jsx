import { useState, useEffect } from 'react';
import { createPermission, fetchPermissions } from '../Services/api';

export default function Permissions() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);

  const loadPermissions = async () => {
    const res = await fetchPermissions();
    setList(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPermission({ name });
    setName('');
    loadPermissions();
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Permission</h1>
      <form onSubmit={handleSubmit} className="flex mb-6">
        <input className="border p-2 mr-2 flex-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Permission Name" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>
      <ul className="space-y-2">
        {list.map(p => <li key={p._id} className="border p-2 rounded">{p.name}</li>)}
      </ul>
    </div>
  );
}
