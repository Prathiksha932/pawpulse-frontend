import { useState } from 'react';
import { useAppointments, useUpdateAppointmentStatus } from '../../hooks/useAppointments';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-gray-100 text-gray-500',
};

const MyAppointments = () => {
  const { data, isLoading, isError, error } = useAppointments();
  const updateStatusMutation = useUpdateAppointmentStatus();
  const [cancellingId, setCancellingId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  const handleCancelSubmit = (id) => {
    updateStatusMutation.mutate(
      { id, data: { status: 'cancelled', cancellationReason: cancelReason } },
      {
        onSuccess: () => {
          setCancellingId(null);
          setCancelReason('');
        },
      }
    );
  };

  if (isLoading) return <p>Loading appointments...</p>;
  if (isError) return <p className="text-red-600">{error.response?.data?.message}</p>;

  const appointments = data?.appointments || [];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Appointments</h1>

      {appointments.length === 0 && (
        <p className="text-gray-500">No appointments yet.</p>
      )}

      <div className="space-y-3">
        {appointments.map((appt) => (
          <div key={appt._id} className="rounded-xl bg-white p-4 shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900">
                  Dr. {appt.doctorId?.fullName} — {appt.animalId?.name}
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

            {(appt.status === 'pending' || appt.status === 'confirmed') && (
              <div className="mt-3 border-t pt-3">
                {cancellingId === appt._id ? (
                  <div className="space-y-2">
                    <input
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="Reason for cancellation"
                      className="w-full rounded-lg border px-3 py-1.5 text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCancelSubmit(appt._id)}
                        disabled={!cancelReason.trim() || updateStatusMutation.isPending}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
                      >
                        Confirm Cancel
                      </button>
                      <button
                        onClick={() => setCancellingId(null)}
                        className="rounded-lg border px-3 py-1.5 text-sm"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setCancellingId(appt._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Cancel appointment
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;