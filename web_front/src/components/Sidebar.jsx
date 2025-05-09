import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const permissions = JSON.parse(localStorage.getItem('permissions')) || [];
  const navigate = useNavigate();

  // Mapping permission labels to paths
  const permissionRoutes = {
    'Manage Permissions': '/admin/permissions',
    'Manage Roles': '/admin/roles',
    'Manage Users': '/admin/users',
  };

  return (
    <div className="w-64 bg-white border-r p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul className="space-y-2">
        {permissions.map((perm, i) => (
          <li
            key={i}
            onClick={() => {
              const path = permissionRoutes[perm];
              if (path) {
                navigate(path); // Route to mapped admin page
              } else {
                navigate(`/page/${encodeURIComponent(perm)}`); // Fallback to dynamic page
              }
            }}
            className="cursor-pointer px-4 py-2 hover:bg-blue-100 rounded"
          >
            {perm}
          </li>
        ))}

        <li>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="block p-2 hover:bg-gray-700 w-full text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
