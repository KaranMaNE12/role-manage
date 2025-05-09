import { Outlet } from 'react-router-dom';

export default function AdminPanel() {
  return (
    <div className="p-6">
      <Outlet />
    </div>
  );
}
