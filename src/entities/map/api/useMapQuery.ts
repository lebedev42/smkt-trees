import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { supabase } from '../../../shared/api/supabase';

import * as constants from './constants';

const getMap = async (param: any): Promise<any> => {
  if (!param) {
    return [];
  }

  const { data: map } = await supabase.from(param).select('*');

  return map;
};

export const useMapQuery = (param: 'firstMap' | 'secondMap' | null) => {
  const queryFn = useCallback(() => getMap(param), [param]);

  let key = 'empty';

  switch (param) {
    case 'firstMap':
      key = constants.queryKeys.getFirstMap;
      break;
    case 'secondMap':
      key = constants.queryKeys.getSecondMap;
      break;
    default:
      key = 'empty';
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
