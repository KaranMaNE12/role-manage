import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import AdminPanel from './components/AdminPanel';
import Placeholder from './pages/Placeholder';
import Permissions from './pages/Permission';
import Roles from './pages/Roles';
import Users from './pages/User';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Placeholder />} />
        <Route path="page/:name" element={<Placeholder />} />
        <Route path="admin" element={<AdminPanel />}>
          <Route path="permissions" element={<Permissions />} />
          <Route path="roles" element={<Roles />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;