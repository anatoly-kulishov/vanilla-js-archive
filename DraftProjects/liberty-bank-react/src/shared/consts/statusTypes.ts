export const REQUEST_STATUSES = {
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
  REJECT: 'REJECT',
  WITHDRAWN: 'WITHDRAWN',
  ACCEPTED: 'ACCEPTED',
} as const;

export const REQUEST_STATUS_TYPE = {
  APPROVED: 'success',
  PENDING: 'warning',
  REJECT: 'error',
  WITHDRAWN: 'error',
  ACCEPTED: 'info',
} as const;

export const ACCOUNT_STATUS_TYPE = {
  active: 'success',
  blocked: 'warning',
  closed: 'error',
  actual: 'info',
} as const;

export const REQUEST_STATUS_TEXT = {
  APPROVED: 'Одобрено',
  PENDING: 'В обработке',
  REJECT: 'Отказано',
  WITHDRAWN: 'Отозвана',
  ACCEPTED: 'Подтверждена',
} as const;

export const CHANGE_STATUS_CARD = {
  BLOCK: 'block',
  UNBLOCK: 'unblock',
} as const;
