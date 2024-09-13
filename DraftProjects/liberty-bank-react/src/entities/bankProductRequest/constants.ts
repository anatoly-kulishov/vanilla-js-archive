import { StatusType } from '@/shared';

export const REQUEST_TEXT = {
  dateTitle: 'Дата создания заявки',
  statusTitle: 'Статус',
  periodTitle: 'Срок действия',
  beforeAmount: 'до',
} as const;

export const WITHDRAW_TEXT = 'Отозвать';

export const STATUSES_TO_CHECK: StatusType[] = ['APPROVED', 'REJECT'];

export const TOOLTIP_TEXT: Record<
  'credits' | 'creditCards',
  Partial<Record<StatusType, string[]>>
> = {
  credits: {
    APPROVED: [
      'Одобренная заявка не является кредитом, для продолжения перейдите во вкладку подписания документов.',
      'Для отмены заявки свяжитесь с сотрудником банка по номеру 8 800 000 000 либо в отделении банка.',
    ],
    REJECT: [
      'Для уточнения причины отказа свяжитесь с сотрудником банка по номеру 8 800 000 000 либо в отделении банка.',
    ],
  },
  creditCards: {
    APPROVED: [
      'Ваша заявка на оформление кредитной карты одобрена. Для завершения процесса перейдите во вкладку подписания документов.',
      'Для отмены заявки свяжитесь с сотрудником банка по номеру 8 800 000 000 либо в отделении банка.',
    ],
    REJECT: [
      'Для уточнения причины отказа свяжитесь с сотрудником банка по номеру 8 800 000 000 либо в отделении банка.',
    ],
  },
};

export const MODAL_TEXT = {
  question: 'Вы действительно хотите отозвать данную заявку?',
  yes: 'Да',
  cancel: 'Отмена',
} as const;
