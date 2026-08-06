import axiosClient from './axiosClient';

export const getDashboardStats = () => axiosClient.get('/admin/dashboard/stats').then((res) => res.data.data);
export const getUsers = (params) => axiosClient.get('/admin/users', { params }).then((res) => res.data.data);
export const updateUserStatus = (id, isActive) =>
  axiosClient.patch(`/admin/users/${id}/status`, { isActive }).then((res) => res.data.data);
export const approveDoctor = (userId) =>
  axiosClient.patch(`/doctors/${userId}/approve`).then((res) => res.data.data);
export const getAppointmentTrends = (days = 30) =>
  axiosClient.get('/admin/analytics/appointments', { params: { days } }).then((res) => res.data.data);