import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

// import { restApiMethods } from '../../../shared/api';

import * as constants from './constants';

import { MapItem } from './types';

const getMap = (param: string): Promise<MapItem[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(constants.firstMap);
    }, 1000);
  });

// const getMap = (param: string): Promise<HistoryItem[]> => {
//   if (param === 'firstMap') {
//     return restApiMethods.get(constants.urls.firstMap);
//   }

//   return restApiMethods.get(constants.urls.secondMap);
// };

export const useMapQuery = (param: string) => {
  const queryFn = useCallback(() => getMap(param), [param]);

  const key =
    param === 'firstMap'
      ? constants.queryKeys.getFirstMap
      : constants.queryKeys.getSecondMap;

  const { data, isLoading, isError } = useQuery({
    queryKey: [key],
    queryFn,
  });

  console.error('data', data);

  return {
    data,
    isLoading,
    isError,
  };
};
