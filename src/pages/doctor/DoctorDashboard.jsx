import { useState } from 'react';
import { useAppointments, useUpdateAppointmentStatus } from '../../hooks/useAppointments';




const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-gray-100 text-gray-500',
};

const DoctorDashboard = () => {
  const { data, isLoading, isError, error } = useAppointments();
  const updateStatusMutation = useUpdateAppointmentStatus();
  const [actionError, setActionError] = useState('');

  const handleConfirm = (id) => {
    setActionError('');
    updateStatusMutation.mutate(
      { id, data: { status: 'confirmed' } },
      { onError: (err) => setActionError(err.response?.data?.message || 'Failed to confirm') }
    );
  };

  const handleComplete = (id) => {
    setActionError('');
    updateStatusMutation.mutate(
      { id, data: { status: 'completed' } },
      { onError: (err) => setActionError(err.response?.data?.message || 'Failed to complete') }
    );
  };

  if (isLoading) return <p>Loading your appointments...</p>;
  if (isError) return <p className="text-red-600">{error.response?.data?.message}</p>;

  const appointments = data?.appointments || [];
  const pending = appointments.filter((a) => a.status === 'pending');
  const confirmed = appointments.filter((a) => a.status === 'confirmed');
  const others = appointments.filter((a) => ['completed', 'cancelled'].includes(a.status));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Appointment Queue</h1>

      {actionError && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{actionError}</div>
      )}

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-800">
          Pending Confirmation ({pending.length})
        </h2>
        {pending.length === 0 && <p className="text-sm text-gray-500">Nothing waiting on you right now.</p>}
        <div className="space-y-3">
          {pending.map((appt) => (
            <AppointmentCard key={appt._id} appt={appt}>
              <button
                onClick={() => handleConfirm(appt._id)}
                disabled={updateStatusMutation.isPending}
                className="rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700 disabled:opacity-50"
              >
                Confirm
              </button>
              <button
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: appt._id,
                    data: { status: 'cancelled', cancellationReason: 'Declined by doctor' },
                  })
                }
                className="rounded-lg border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                Decline
              </button>
            </AppointmentCard>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold text-gray-800">
          Confirmed — Upcoming ({confirmed.length})
        </h2>
        {confirmed.length === 0 && <p className="text-sm text-gray-500">Nothing confirmed yet.</p>}
        <div className="space-y-3">
          {confirmed.map((appt) => (
            <AppointmentCard key={appt._id} appt={appt}>
              <button
                onClick={() => handleComplete(appt._id)}
                disabled={updateStatusMutation.isPending}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Mark Completed
              </button>
            </AppointmentCard>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-gray-800">History</h2>
        <div className="space-y-3">
          {others.map((appt) => (
            <AppointmentCard key={appt._id} appt={appt} />
          ))}
        </div>
      </section>
    </div>
  );
};

const AppointmentCard = ({ appt, children }) => (
  <div className="rounded-xl bg-white p-4 shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="font-semibold text-gray-900">
          {appt.ownerId?.fullName} — {appt.animalId?.name}
        </p>
        <p className="text-sm text-gray-600">
          {new Date(appt.appointmentDate).toLocaleDateString()} at {appt.startTime}
        </p>
        <p className="mt-1 text-sm text-gray-500">{appt.reasonForVisit}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[appt.status]}`}>
        {appt.status}
      </span>
    </div>
    {children && <div className="mt-3 flex gap-2 border-t pt-3">{children}</div>}
  </div>
);

export default DoctorDashboard;