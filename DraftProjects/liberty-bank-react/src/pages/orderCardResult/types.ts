import type { TAllImages } from '@/shared';

export enum AnswerTypes {
  SUCCESS = 'SUCCESS',
  MANY_REQUEST = 'MANY_REQUEST',
  SERVER_ERROR = 'SERVER_ERROR',
  CLIENT_ERROR = 'CLIENT_ERROR',
}

export const newCardResponseImages: Record<AnswerTypes, TAllImages> = {
  [AnswerTypes.SUCCESS]: 'current-bill',
  [AnswerTypes.MANY_REQUEST]: 'failed-open-bill-red',
  [AnswerTypes.SERVER_ERROR]: 'failed-open-bill-red',
  [AnswerTypes.CLIENT_ERROR]: 'failed-open-bill-red',
};
