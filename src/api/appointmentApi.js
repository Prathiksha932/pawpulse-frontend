import axiosClient from './axiosClient';

export const getAppointments = () => axiosClient.get('/appointments').then((res) => res.data.data);
export const createAppointment = (data) => axiosClient.post('/appointments', data).then((res) => res.data.data);
export const updateAppointmentStatus = (id, data) =>
  axiosClient.patch(`/appointments/${id}/status`, data).then((res) => res.data.data);