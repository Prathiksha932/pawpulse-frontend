import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useCreateDoctorProfile, useUpdateDoctorProfile, useMyDoctorProfile } from '../../hooks/useDoctors';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DoctorProfileSetup = () => {
  const { data: existingProfile, isLoading: loadingProfile } = useMyDoctorProfile();
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      specialization: '',
      licenseNumber: '',
      consultationFee: '',
      slotDurationMinutes: 30,
      weeklySchedule: [{ dayOfWeek: 1, startTime: '09:00', endTime: '17:00' }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'weeklySchedule' });
  const createProfileMutation = useCreateDoctorProfile();
  const updateProfileMutation = useUpdateDoctorProfile();
  const [message, setMessage] = useState('');

  const isEditMode = !!existingProfile;

  // Once the existing profile loads, pre-fill the form with real data
  useEffect(() => {
    if (existingProfile) {
      reset({
        specialization: existingProfile.specialization,
        licenseNumber: existingProfile.licenseNumber,
        consultationFee: existingProfile.consultationFee,
        slotDurationMinutes: existingProfile.slotDurationMinutes,
        weeklySchedule: existingProfile.weeklySchedule,
      });
    }
  }, [existingProfile, reset]);

  const onSubmit = (formData) => {
    setMessage('');
    const mutation = isEditMode ? updateProfileMutation : createProfileMutation;

    mutation.mutate(formData, {
      onSuccess: () =>
        setMessage(
          isEditMode ? 'Profile updated successfully!' : 'Profile created! Waiting for admin approval.'
        ),
      onError: (err) => setMessage(err.response?.data?.message || 'Failed to save profile.'),
    });
  };

  if (loadingProfile) return <p>Loading...</p>;

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {isEditMode ? 'Edit Your Doctor Profile' : 'Set Up Your Doctor Profile'}
      </h1>

      {message && <div className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{message}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl bg-white p-6 shadow">
        {/* ...all existing fields stay exactly the same... */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Specialization</label>
          <input {...register('specialization', { required: true })} className="w-full rounded-lg border px-3 py-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">License Number</label>
          <input {...register('licenseNumber', { required: true })} className="w-full rounded-lg border px-3 py-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Consultation Fee (₹)</label>
          <input type="number" {...register('consultationFee', { required: true, valueAsNumber: true })} className="w-full rounded-lg border px-3 py-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Slot Duration (minutes)</label>
          <input type="number" {...register('slotDurationMinutes', { valueAsNumber: true })} className="w-full rounded-lg border px-3 py-2" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Weekly Schedule</label>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <select {...register(`weeklySchedule.${index}.dayOfWeek`, { valueAsNumber: true })} className="rounded-lg border px-2 py-1.5 text-sm">
                  {DAYS.map((day, i) => <option key={i} value={i}>{day}</option>)}
                </select>
                <input type="time" {...register(`weeklySchedule.${index}.startTime`)} className="rounded-lg border px-2 py-1.5 text-sm" />
                <span className="text-sm text-gray-500">to</span>
                <input type="time" {...register(`weeklySchedule.${index}.endTime`)} className="rounded-lg border px-2 py-1.5 text-sm" />
                <button type="button" onClick={() => remove(index)} className="text-sm text-red-600">Remove</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => append({ dayOfWeek: 1, startTime: '09:00', endTime: '17:00' })} className="mt-2 text-sm text-blue-600 hover:underline">
            + Add another day
          </button>
        </div>

        <button
          type="submit"
          disabled={createProfileMutation.isPending || updateProfileMutation.isPending}
          className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isEditMode ? 'Update Profile' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default DoctorProfileSetup;