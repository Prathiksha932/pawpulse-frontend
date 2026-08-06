import axiosClient from './axiosClient';

export const createPrescription = (data) =>
  axiosClient.post('/prescriptions', data).then((res) => res.data.data);
export const getPrescriptionsForAnimal = (animalId) =>
  axiosClient.get(`/prescriptions/animal/${animalId}`).then((res) => res.data.data);