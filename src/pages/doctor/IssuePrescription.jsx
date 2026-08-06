import { useFieldArray, useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCreatePrescription } from '../../hooks/usePrescriptions';

const IssuePrescription = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      medicines: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'medicines' });
  const createPrescriptionMutation = useCreatePrescription();
  const [error, setError] = useState('');

  const onSubmit = (formData) => {
    setError('');
    createPrescriptionMutation.mutate(
      { consultationId, ...formData },
      {
        onSuccess: () => navigate('/doctor/dashboard'),
        onError: (err) => setError(err.response?.data?.message || 'Failed to issue prescription'),
      }
    );
  };

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Issue Prescription</h1>

      {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-xl bg-white p-4 shadow">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Medicine {index + 1}</span>
              {fields.length > 1 && (
                <button type="button" onClick={() => remove(index)} className="text-sm text-red-600">
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input {...register(`medicines.${index}.name`, { required: true })} placeholder="Name" className="rounded-lg border px-3 py-2 text-sm" />
              <input {...register(`medicines.${index}.dosage`, { required: true })} placeholder="Dosage (e.g. 250mg)" className="rounded-lg border px-3 py-2 text-sm" />
              <input {...register(`medicines.${index}.frequency`, { required: true })} placeholder="Frequency (e.g. Twice daily)" className="rounded-lg border px-3 py-2 text-sm" />
              <input {...register(`medicines.${index}.duration`, { required: true })} placeholder="Duration (e.g. 7 days)" className="rounded-lg border px-3 py-2 text-sm" />
            </div>
            <input {...register(`medicines.${index}.instructions`)} placeholder="Instructions (optional)" className="mt-2 w-full rounded-lg border px-3 py-2 text-sm" />
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: '', dosage: '', frequency: '', duration: '', instructions: '' })}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add another medicine
        </button>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea {...register('additionalNotes')} rows={3} className="w-full rounded-lg border px-3 py-2 text-sm" />
        </div>

        <button
          type="submit"
          disabled={createPrescriptionMutation.isPending}
          className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {createPrescriptionMutation.isPending ? 'Issuing...' : 'Issue Prescription'}
        </button>
      </form>
    </div>
  );
};

export default IssuePrescription;