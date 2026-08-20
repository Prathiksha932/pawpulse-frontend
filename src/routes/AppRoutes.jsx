import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';

// Public pages
import Home from '../pages/public/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Unauthorized from '../pages/public/Unauthorized';
import NotFound from '../pages/public/NotFound';

// Owner pages
import OwnerDashboard from '../pages/owner/OwnerDashboard';
import MyAnimals from '../pages/owner/MyAnimals';
import BookAppointment from '../pages/owner/BookAppointment';
import MyAppointments from '../pages/owner/MyAppointments';
import AnimalPrescriptions from '../pages/owner/AnimalPrescriptions';
import MedicalHistory from '../pages/owner/MedicalHistory';

// Doctor pages
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import DoctorProfileSetup from '../pages/doctor/DoctorProfileSetup';
import IssuePrescription from '../pages/doctor/IssuePrescription';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';

// Shared
import ConsultationChat from '../pages/shared/ConsultationChat';

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
        <Route element={<DashboardLayout />}>
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/animals" element={<MyAnimals />} />
          <Route path="/owner/book-appointment" element={<BookAppointment />} />
          <Route path="/owner/appointments" element={<MyAppointments />} />
          <Route path="/owner/animals/:animalId/prescriptions" element={<AnimalPrescriptions />} />
          <Route path="/owner/animals/:animalId/medical-history" element={<MedicalHistory />} />
        </Route>
      </Route>

      {/* Doctor-only routes */}
      <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/profile-setup" element={<DoctorProfileSetup />} />
          <Route path="/doctor/consultations/:consultationId/prescribe" element={<IssuePrescription />} />
        </Route>
      </Route>

      {/* Admin-only routes */}
      <Route element={<ProtectedRoute allowedRoles={['clinic_admin', 'super_admin']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Shared: reachable by any authenticated user (Owner or Doctor) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/consultations/:id/chat" element={<ConsultationChat />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;