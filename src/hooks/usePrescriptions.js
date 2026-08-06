import { useQuery, useMutation } from '@tanstack/react-query';
import { createPrescription, getPrescriptionsForAnimal } from '../api/prescriptionApi';

export const useAnimalPrescriptions = (animalId) =>
  useQuery({
    queryKey: ['prescriptions', animalId],
    queryFn: () => getPrescriptionsForAnimal(animalId),
    enabled: !!animalId,
  });

export const useCreatePrescription = () =>
  useMutation({ mutationFn: createPrescription });