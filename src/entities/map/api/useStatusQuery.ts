import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { supabase } from '../../../shared/api/supabase';

import * as constants from './constants';

const getStatus = async (param: any): Promise<any> => {
  if (!param) {
    return false;
  }

  const { data } = await supabase.from('status').select('*').eq('id', param);

  return Boolean(data?.[0]?.status);
};

export const useStatusQuery = (param: any) => {
  const queryFn = useCallback(() => getStatus(param), [param]);

  let key = 'empty';

  if (param) {
    key = constants.queryKeys.getStatus;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: [key],
    queryFn,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
