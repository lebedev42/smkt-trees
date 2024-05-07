import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { MapItem } from './types';

// import { restApiMethods } from '../../../shared/api';
import { supabase } from '../../../shared/api/supabase';

import * as constants from './constants';

const getMap = async (
  param: 'firstMap' | 'secondMap' | null,
): Promise<MapItem[]> => {
  const { data: map } = await supabase.from('maps').select('*');

  console.error('map', map);

  return new Promise((resolve) => {
    setTimeout(() => {
      if (param === 'firstMap') {
        resolve(constants.firstMap);
      } else {
        resolve(constants.secondMap);
      }
    }, 1000);
  });
};

// const getMap = (param: string): Promise<HistoryItem[]> => {
//   if (param === 'firstMap') {
//     return restApiMethods.get(constants.urls.firstMap);
//   }

//   return restApiMethods.get(constants.urls.secondMap);
// };

export const useMapQuery = (param: 'firstMap' | 'secondMap' | null) => {
  const queryFn = useCallback(() => getMap(param), [param]);

  const key =
    param === 'firstMap'
      ? constants.queryKeys.getFirstMap
      : constants.queryKeys.getSecondMap;

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
