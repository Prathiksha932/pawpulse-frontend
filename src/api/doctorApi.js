import axiosClient from './axiosClient';

export const getDoctors = () => axiosClient.get('/doctors').then((res) => res.data.data);
export const getAvailability = (doctorId, date) =>
  axiosClient.get(`/doctors/${doctorId}/availability`, { params: { date } }).then((res) => res.data.data);
export const createDoctorProfile = (data) => axiosClient.post('/doctors/profile', data).then((res) => res.data.data);
export const getMyDoctorProfile = () => axiosClient.get('/doctors/profile').then((res) => res.data.data);
export const updateDoctorProfile = (data) => axiosClient.patch('/doctors/profile', data).then((res) => res.data.data);