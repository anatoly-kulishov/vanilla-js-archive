export const ORDER_STATUS = {
  PENDING: 'На рассмотрении',
  CHANGESPENDING: 'Изменения на рассмотрении',
  APPROVED: 'Одобрено',
  PAID: 'Оплачено',
  CANCELED: 'Отменено',
  REJECTED: 'Отклонено',
};

interface STATUS {
  [key: string]: 'success' | 'warning' | 'error' | 'info' | 'wait';
}

export const STATUS_TYPE: STATUS = {
  PENDING: 'warning',
  CHANGESPENDING: 'wait',
  APPROVED: 'success',
  PAID: 'success',
  CANCELED: 'error',
  REJECTED: 'error',
};
