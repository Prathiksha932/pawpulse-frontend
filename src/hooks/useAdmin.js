import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardStats, getUsers, updateUserStatus, approveDoctor } from '../api/adminApi';

export const useDashboardStats = () =>
  useQuery({ queryKey: ['admin', 'stats'], queryFn: getDashboardStats });

export const usePendingDoctors = () =>
  useQuery({
    queryKey: ['admin', 'users', { role: 'doctor', accountStatus: 'pending_approval' }],
    queryFn: () => getUsers({ role: 'doctor', accountStatus: 'pending_approval' }),
  });

export const useApproveDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }) => updateUserStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};
export const useAppointmentTrends = (days = 30) =>
  useQuery({
    queryKey: ['admin', 'trends', days],
    queryFn: () => getAppointmentTrends(days),
  });