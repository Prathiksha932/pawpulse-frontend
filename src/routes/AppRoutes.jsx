import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Public pages
import Home from '../pages/public/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Unauthorized from '../pages/public/Unauthorized';
import NotFound from '../pages/public/NotFound';

// Owner pages
import OwnerDashboard from '../pages/owner/OwnerDashboard';
import MyAnimals from '../pages/owner/MyAnimals';

// Doctor pages
import DoctorDashboard from '../pages/doctor/DoctorDashboard';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';

import DashboardLayout from '../layouts/DashboardLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Owner-only routes */}
      <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/animals" element={<MyAnimals />} />
      </Route>

      {/* Doctor-only routes */}
      <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      </Route>

      {/* Admin-only routes */}
      <Route element={<ProtectedRoute allowedRoles={['clinic_admin', 'super_admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      // AppRoutes.jsx — updated structure
    <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
    <Route element={<DashboardLayout />}>
    <Route path="/owner/dashboard" element={<OwnerDashboard />} />
    <Route path="/owner/animals" element={<MyAnimals />} />
    </Route>
    </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;