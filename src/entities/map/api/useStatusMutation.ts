import { useMutation } from '@tanstack/react-query';

import { supabase } from '../../../shared/api/supabase';

const saveStatus = async (prop: any): Promise<any> => {
  const { data, error } = await supabase
    .from('status')
    .insert([{ id: prop.id, status: prop.status }])
    .select();

  return data;
};

export const useStatusMutation = () => {
  const { mutate } = useMutation(saveStatus, {
    onSuccess: (response: any) => {
      return response;
    },
  });

  return {
    useUpdateStatus: mutate,
  };
};
