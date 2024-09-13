import { AnswerTypes } from '@/pages/orderCardResult/types';

export const newCardResponseTypeStatuses: Record<number, AnswerTypes> = {
  201: AnswerTypes.SUCCESS,
  409: AnswerTypes.MANY_REQUEST,
  500: AnswerTypes.SERVER_ERROR,
  404: AnswerTypes.CLIENT_ERROR,
};
