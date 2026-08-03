import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinksByRole = {
    owner: [
      { to: '/owner/dashboard', label: 'Dashboard' },
      { to: '/owner/animals', label: 'My Animals' },
    ],
    doctor: [{ to: '/doctor/dashboard', label: 'Dashboard' }],
    clinic_admin: [{ to: '/admin/dashboard', label: 'Dashboard' }],
    super_admin: [{ to: '/admin/dashboard', label: 'Dashboard' }],
  };

  const links = navLinksByRole[user?.role] || [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 border-r border-gray-200 bg-white p-6">
        <h2 className="mb-8 text-xl font-bold text-blue-600">PawPulse</h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <span className="text-sm text-gray-600">Welcome, {user?.fullName}</span>
          <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">
            Log out
          </button>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;