import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Public pages
import Home from '../pages/public/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Unauthorized from '../pages/public/Unauthorized';
import NotFound from '../pages/public/NotFound';
import BookAppointment from '../pages/owner/BookAppointment';

// Owner pages
import OwnerDashboard from '../pages/owner/OwnerDashboard';
import MyAnimals from '../pages/owner/MyAnimals';

// Doctor pages
import DoctorDashboard from '../pages/doctor/DoctorDashboard';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';

import DashboardLayout from '../layouts/DashboardLayout';
import MyAppointments from '../pages/owner/MyAppointments';
import DoctorProfileSetup from '../pages/doctor/DoctorProfileSetup';
import ConsultationChat from '../pages/shared/ConsultationChat';
import IssuePrescription from '../pages/doctor/IssuePrescription';
import AnimalPrescriptions from '../pages/owner/AnimalPrescriptions';
import MedicalHistory from '../pages/owner/MedicalHistory';
// inside owner block:
// inside doctor block:

// inside owner block:

// ...

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
        <Route path="/owner/animals/:animalId/prescriptions" element={<AnimalPrescriptions />} />
        <Route path="/owner/animals/:animalId/medical-history" element={<MedicalHistory />} />
      </Route>

      {/* Doctor-only routes */}
      <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/profile-setup" element={<DoctorProfileSetup />} />
        <Route path="/doctor/consultations/:consultationId/prescribe" element={<IssuePrescription />} />

      </Route>

      {/* Admin-only routes */}
      <Route element={<ProtectedRoute allowedRoles={['clinic_admin', 'super_admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      {/* Shared: reachable by any authenticated user (Owner or Doctor) */}
      <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
      <Route path="/consultations/:id/chat" element={<ConsultationChat />} />
    </Route>
    </Route>

      
      // AppRoutes.jsx — updated structure
    <Route element={<ProtectedRoute allowedRoles={['owner']} />}>
    <Route element={<DashboardLayout />}>
    <Route path="/owner/dashboard" element={<OwnerDashboard />} />
    <Route path="/owner/animals" element={<MyAnimals />} />
    <Route path="/owner/book-appointment" element={<BookAppointment />} />
    <Route path="/owner/appointments" element={<MyAppointments />} />
    
// inside the doctor-protected + DashboardLayout block:
    <Route path="/doctor/profile-setup" element={<DoctorProfileSetup />} />


    </Route>
    </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;