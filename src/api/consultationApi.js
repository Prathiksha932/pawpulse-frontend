import axiosClient from './axiosClient';

export const getConsultation = (id) => axiosClient.get(`/consultations/${id}`).then((res) => res.data.data);
export const getMessageHistory = (id, params) =>
  axiosClient.get(`/consultations/${id}/messages`, { params }).then((res) => res.data.data);