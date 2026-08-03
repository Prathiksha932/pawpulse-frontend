import { useState } from 'react';
import { useAnimals, useCreateAnimal, useDeleteAnimal } from '../../hooks/useAnimals';
import { useForm } from 'react-hook-form';

const MyAnimals = () => {
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading, isError, error } = useAnimals();
  const createAnimalMutation = useCreateAnimal();
  const deleteAnimalMutation = useDeleteAnimal();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (formData) => {
    createAnimalMutation.mutate(formData, {
      onSuccess: () => {
        reset();
        setShowForm(false);
      },
    });
  };

  if (isLoading) return <p>Loading your animals...</p>;
  if (isError) return <p className="text-red-600">Error: {error.response?.data?.message}</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Animals</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : '+ Add Animal'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-3 rounded-xl bg-white p-4 shadow">
          <input {...register('name', { required: true })} placeholder="Name" className="w-full rounded-lg border px-3 py-2" />
          <select {...register('species', { required: true })} className="w-full rounded-lg border px-3 py-2">
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
            <option value="other">Other</option>
          </select>
          <input {...register('breed')} placeholder="Breed (optional)" className="w-full rounded-lg border px-3 py-2" />
          <button
            type="submit"
            disabled={createAnimalMutation.isPending}
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {createAnimalMutation.isPending ? 'Saving...' : 'Save'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.animals?.map((animal) => (
          <div key={animal._id} className="rounded-xl bg-white p-4 shadow">
            <h3 className="font-semibold text-gray-900">{animal.name}</h3>
            <p className="text-sm text-gray-600">{animal.species} • {animal.breed}</p>
            <button
              onClick={() => deleteAnimalMutation.mutate(animal._id)}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {data?.animals?.length === 0 && (
        <p className="text-gray-500">No animals yet — add your first one above.</p>
      )}
    </div>
  );
};

export default MyAnimals;