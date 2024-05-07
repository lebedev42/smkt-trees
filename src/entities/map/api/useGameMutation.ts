import { useMutation } from '@tanstack/react-query';
import { restApiMethods } from '../../../shared/api';

import * as constants from './constants';
import { GameResultData } from './types';

const sendGameResult = (data: GameResultData): Promise<any> =>
  restApiMethods.post(constants.urls.sendGameResult, { ...data });

export const useGameMutation = () => {
  const { mutate } = useMutation(sendGameResult, {
    onSuccess: (response: any) => {
      return response;
    },
  });

  return {
    useSendGameResult: mutate,
  };
};
