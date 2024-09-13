import { AnswerTypes } from './types';

export const TEXT = {
  back: 'Назад',
  goBack: 'Попробовать еще раз',
  goSend: 'Перейти в «Мои карты»',
  successSubtitle: ['Срок рассмотрения заявки 3-5 рабочих дней'],
};

export const statusText: Record<AnswerTypes, string> = {
  [AnswerTypes.SUCCESS]: 'Ваша заявка успешно отправлена',
  [AnswerTypes.MANY_REQUEST]: 'Заявка не отправлена. Повторите попытку позже',
  [AnswerTypes.SERVER_ERROR]: 'Заявка не отправлена. Повторите попытку позже',
  [AnswerTypes.CLIENT_ERROR]: 'Неверные данные',
};
