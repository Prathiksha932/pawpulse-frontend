import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { useDashboardStats, usePendingDoctors, useApproveDoctor, useAppointmentTrends } from '../../hooks/useAdmin';

const ROLE_COLORS = { owner: '#3b82f6', doctor: '#10b981', clinic_admin: '#f59e0b', super_admin: '#ef4444' };
const STATUS_COLORS = { pending: '#f59e0b', confirmed: '#10b981', completed: '#3b82f6', cancelled: '#9ca3af' };

const AdminDashboard = () => {
  const { data: stats, isLoading: loadingStats } = useDashboardStats();
  const { data: pendingData, isLoading: loadingPending } = usePendingDoctors();
  const { data: trends, isLoading: loadingTrends } = useAppointmentTrends(30);
  const approveDoctorMutation = useApproveDoctor();

  const pendingDoctors = pendingData?.users || [];

  const roleChartData = stats
    ? Object.entries(stats.usersByRole || {}).map(([role, count]) => ({ role, count }))
    : [];

  const statusChartData = stats
    ? Object.entries(stats.appointmentsByStatus || {}).map(([status, count]) => ({ status, count }))
    : [];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Admin Dashboard</h1>

      {!loadingStats && stats && (
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Owners" value={stats.usersByRole?.owner || 0} />
          <StatCard label="Doctors" value={stats.usersByRole?.doctor || 0} />
          <StatCard label="Total Animals" value={stats.totalAnimals} />
          <StatCard label="Pending Approvals" value={stats.pendingDoctorApprovals} highlight />
        </div>
      )}

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">Users by Role</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={roleChartData} dataKey="count" nameKey="role" cx="50%" cy="50%" outerRadius={80} label>
                {roleChartData.map((entry) => (
                  <Cell key={entry.role} fill={ROLE_COLORS[entry.role] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-white p-4 shadow">
          <h3 className="mb-4 text-sm font-semibold text-gray-700">Appointments by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statusChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count">
                {statusChartData.map((entry) => (
                  <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-8 rounded-xl bg-white p-4 shadow">
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Appointment Trends (Last 30 Days)</h3>
        {loadingTrends ? (
          <p className="text-sm text-gray-500">Loading trends...</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-800">Doctors Awaiting Approval</h2>

        {loadingPending && <p className="text-sm text-gray-500">Loading...</p>}
        {!loadingPending && pendingDoctors.length === 0 && (
          <p className="text-sm text-gray-500">No pending approvals right now.</p>
        )}

        <div className="space-y-3">
          {pendingDoctors.map((doctor) => (
            <div key={doctor._id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow">
              <div>
                <p className="font-semibold text-gray-900">{doctor.fullName}</p>
                <p className="text-sm text-gray-600">{doctor.email}</p>
              </div>
              <button
                onClick={() => approveDoctorMutation.mutate(doctor._id)}
                disabled={approveDoctorMutation.isPending}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ label, value, highlight }) => (
  <div className={`rounded-xl p-4 shadow ${highlight ? 'bg-yellow-50' : 'bg-white'}`}>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

export default AdminDashboard;