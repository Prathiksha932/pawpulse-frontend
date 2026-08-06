import { useParams } from 'react-router-dom';
import { useMedicalHistory } from '../../hooks/useAnimals';

const MedicalHistory = () => {
  const { animalId } = useParams();
  const { data, isLoading, isError, error } = useMedicalHistory(animalId);

  if (isLoading) return <p>Loading history...</p>;
  if (isError) return <p className="text-red-600">{error.response?.data?.message}</p>;

  const { animal, consultations = [], prescriptions = [] } = data || {};

  // Merge both into one chronological timeline, tagged by type
  const timeline = [
    ...consultations.map((c) => ({ type: 'consultation', date: c.createdAt, data: c })),
    ...prescriptions.map((p) => ({ type: 'prescription', date: p.issuedAt, data: p })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-gray-900">Medical History</h1>
      <p className="mb-6 text-sm text-gray-500">{animal?.name}</p>

      {timeline.length === 0 && <p className="text-gray-500">No medical records yet.</p>}

      <div className="space-y-4">
        {timeline.map((entry, i) => (
          <div key={i} className="rounded-xl bg-white p-4 shadow">
            <div className="mb-2 flex items-center justify-between">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  entry.type === 'consultation' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                }`}
              >
                {entry.type === 'consultation' ? 'Consultation' : 'Prescription'}
              </span>
              <span className="text-xs text-gray-500">{new Date(entry.date).toLocaleDateString()}</span>
            </div>

            {entry.type === 'consultation' ? (
              <div className="text-sm text-gray-700">
                <p><span className="font-medium">Doctor:</span> Dr. {entry.data.doctorId?.fullName}</p>
                {entry.data.symptoms && <p><span className="font-medium">Symptoms:</span> {entry.data.symptoms}</p>}
                {entry.data.diagnosis && <p><span className="font-medium">Diagnosis:</span> {entry.data.diagnosis}</p>}
              </div>
            ) : (
              <div className="text-sm text-gray-700">
                <p><span className="font-medium">Prescribed by:</span> Dr. {entry.data.doctorId?.fullName}</p>
                <p className="mt-1">{entry.data.medicines?.map((m) => m.name).join(', ')}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistory;