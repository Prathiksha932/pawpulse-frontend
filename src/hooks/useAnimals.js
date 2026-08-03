import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnimals, createAnimal, deleteAnimal } from '../api/animalApi';

export const useAnimals = (params = {}) => {
  return useQuery({
    queryKey: ['animals', params],
    queryFn: () => getAnimals(params),
  });
};

export const useCreateAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
};

export const useDeleteAnimal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
};