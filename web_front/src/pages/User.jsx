import { useState, useEffect } from 'react';
import { createUser, fetchUsers, fetchRoles } from '../Services/api';

export default function Users() {
  const [form, setForm] = useState({ username: '', password: '', roles: [] });
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleRole = (roleId) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter((r) => r !== roleId)
        : [...prev.roles, roleId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form);
    setForm({ username: '', password: '', roles: [] });
    loadUsers();
  };

  const loadRoles = async () => {
    const res = await fetchRoles();
    setRoles(res.data);
  };

  const loadUsers = async () => {
    const res = await fetchUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadRoles();
    loadUsers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div className="grid grid-cols-2 gap-2">
          {roles.map((role) => (
            <label key={role._id} className="flex items-center">
              <input
                type="checkbox"
                checked={form.roles.includes(role._id)}
                onChange={() => toggleRole(role._id)}
                className="mr-2"
              />
              {role.name}
            </label>
          ))}
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create User</button>
      </form>

      <h2 className="text-xl font-semibold mt-10 mb-4">User List</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id} className="bg-gray-100 p-3 rounded shadow">
            <div className="font-semibold">{user.username}</div>
            <div className="text-sm text-gray-600">
              Roles: {user.roles?.map((r) => r.name).join(', ') || 'None'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}