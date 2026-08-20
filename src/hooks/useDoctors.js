import { useQuery, useMutation } from '@tanstack/react-query';
import { getDoctors, getAvailability, createDoctorProfile, getMyDoctorProfile, updateDoctorProfile } from '../api/doctorApi';

export const useDoctors = () => useQuery({ queryKey: ['doctors'], queryFn: getDoctors });

export const useAvailability = (doctorId, date) =>
  useQuery({
    queryKey: ['availability', doctorId, date],
    queryFn: () => getAvailability(doctorId, date),
    enabled: !!doctorId && !!date, // don't fire until both are actually selected
  });
import { useMutation } from '@tanstack/react-query';
import { createDoctorProfile } from '../api/doctorApi';

export const useCreateDoctorProfile = () =>
  useMutation({ mutationFn: createDoctorProfile });
export const useMyDoctorProfile = () =>
  useQuery({ queryKey: ['myDoctorProfile'], queryFn: getMyDoctorProfile, retry: false });

export const useUpdateDoctorProfile = () =>
  useMutation({ mutationFn: updateDoctorProfile });