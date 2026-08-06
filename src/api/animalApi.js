import axiosClient from './axiosClient';

export const getAnimals = (params) => axiosClient.get('/animals', { params }).then((res) => res.data.data);
export const createAnimal = (data) => axiosClient.post('/animals', data).then((res) => res.data.data);
export const deleteAnimal = (id) => axiosClient.delete(`/animals/${id}`);
export const getMedicalHistory = (animalId) =>
  axiosClient.get(`/animals/${animalId}/medical-history`).then((res) => res.data.data);