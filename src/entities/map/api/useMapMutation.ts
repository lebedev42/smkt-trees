import { useMutation } from '@tanstack/react-query';

import { supabase } from '../../../shared/api/supabase';

const updateMap = async (prop: any): Promise<any> => {
  const newAvailable = prop.map.available > 1 ? prop.map.available - 1 : 0;

  const { data, error } = await supabase
    .from(prop.name)
    .update({ available: newAvailable })
    .eq('id', prop.map.id)
    .select('*');

  return data;
};

export const useMapMutation = () => {
  const { mutate } = useMutation(updateMap, {
    onSuccess: (response: any) => {
      return response;
    },
  });

  return {
    useUpdateMap: mutate,
  };
};
