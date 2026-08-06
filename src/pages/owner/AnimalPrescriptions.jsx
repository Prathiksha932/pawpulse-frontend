import { useParams } from 'react-router-dom';
import { useAnimalPrescriptions } from '../../hooks/usePrescriptions';

const AnimalPrescriptions = () => {
  const { animalId } = useParams();
  const { data: prescriptions, isLoading } = useAnimalPrescriptions(animalId);

  if (isLoading) return <p>Loading prescriptions...</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Prescriptions</h1>

      {prescriptions?.length === 0 && <p className="text-gray-500">No prescriptions yet.</p>}

      <div className="space-y-4">
        {prescriptions?.map((rx) => (
          <div key={rx._id} className="rounded-xl bg-white p-4 shadow">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-gray-900">Dr. {rx.doctorId?.fullName}</p>
              <p className="text-xs text-gray-500">{new Date(rx.issuedAt).toLocaleDateString()}</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-1">Medicine</th>
                  <th className="pb-1">Dosage</th>
                  <th className="pb-1">Frequency</th>
                  <th className="pb-1">Duration</th>
                </tr>
              </thead>
              <tbody>
                {rx.medicines.map((med, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-1">{med.name}</td>
                    <td className="py-1">{med.dosage}</td>
                    <td className="py-1">{med.frequency}</td>
                    <td className="py-1">{med.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rx.additionalNotes && <p className="mt-2 text-sm text-gray-600">{rx.additionalNotes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalPrescriptions;