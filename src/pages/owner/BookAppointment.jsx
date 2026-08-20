import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDoctors, useAvailability } from '../../hooks/useDoctors';
import { useAnimals } from '../../hooks/useAnimals';
import { useCreateAppointment } from '../../hooks/useAppointments';

const BookAppointment = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const { data: doctorsData, isLoading: loadingDoctors } = useDoctors();
  const { data: animalsData } = useAnimals();
  const createAppointmentMutation = useCreateAppointment();
  const [message, setMessage] = useState('');

  const selectedDoctorId = watch('doctorId');
  const selectedDate = watch('appointmentDate');

  const { data: slots, isLoading: loadingSlots } = useAvailability(selectedDoctorId, selectedDate);

  const onSubmit = (formData) => {
    setMessage('');
    createAppointmentMutation.mutate(formData, {
      onSuccess: () => {
        setMessage('Appointment booked successfully!');
        reset();
      },
      onError: (err) => {
        setMessage(err.response?.data?.message || 'Booking failed.');
      },
    });
  };

  if (loadingDoctors) return <p>Loading doctors...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Book an Appointment</h1>

      {message && (
        <div className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{message}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl bg-white p-6 shadow">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Animal</label>
          <select {...register('animalId', { required: true })} className="w-full rounded-lg border px-3 py-2">
            <option value="">Select an animal</option>
            {animalsData?.animals?.map((a) => (
              <option key={a._id} value={a._id}>{a.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Doctor</label>
          <select {...register('doctorId', { required: true })} className="w-full rounded-lg border px-3 py-2">
            <option value="">Select a doctor</option>
            {doctorsData?.doctors?.map((d) => (
              <option key={d.userId._id} value={d.userId._id}>
                Dr. {d.userId.fullName} — {d.specialization}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
         <input
  type="date"
  min={new Date().toISOString().split('T')[0]}
  {...register('appointmentDate', { required: true })}
  className="w-full rounded-lg border px-3 py-2"
/>
        </div>

        {selectedDoctorId && selectedDate && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Available Time Slots</label>
            {loadingSlots ? (
              <p className="text-sm text-gray-500">Checking availability...</p>
            ) : slots?.slots?.length ? (
              <div className="flex flex-wrap gap-2">
                {slots.slots.map((slot) => (
                  <label key={slot} className="cursor-pointer">
                    <input
                      type="radio"
                      value={slot}
                      {...register('startTime', { required: true })}
                      className="peer sr-only"
                    />
                    <span className="rounded-lg border px-3 py-1.5 text-sm peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600">
                      {slot}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-red-600">No slots available on this date.</p>
            )}
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Reason for Visit</label>
          <textarea {...register('reasonForVisit', { required: true, minLength: 3 })} className="w-full rounded-lg border px-3 py-2" rows={3} />
        </div>

        <button
          type="submit"
          disabled={createAppointmentMutation.isPending}
          className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {createAppointmentMutation.isPending ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;