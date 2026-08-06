import { useQuery } from '@tanstack/react-query';
import { getDoctors, getAvailability } from '../api/doctorApi';

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