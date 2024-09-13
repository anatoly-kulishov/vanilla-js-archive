export const POLICY: Record<string, string> = {
  duration: 'Срок страхования',
  amount: 'Сумма страхования',
  completion: 'Дата завершения страховки',
  showPolicy: 'Показать полис',
  reportEvent: 'Заявить о страховом случае',
};

export const POLICY_TYPE: Record<string, string> = {
  'Автострахование КАСКО': 'КАСКО',
  'Автострахование ОСАГО': 'ОСАГО',
  'Добровольное медицинское страхование': 'ДМС',
  'Добровольное медицинское страхование Standart': 'ДМС',
  'Страхование дома': 'Страхование дома',
  'Страхование квартиры': 'Страхование квартиры',
  'Страхование домашнего имущества': 'Страхование домашнего имущества',
  'Страхование выезжающих за границу': 'Страхование выезжающих за границу',
  'Страхование от несчастных случаев': 'Страхование от несчастных случаев',
};

export const STATUS: Record<string, 'success' | 'warning' | 'error' | 'info' | 'wait'> = {
  ACTIVE: 'success',
  WAIT: 'wait',
  ENDED: 'error',
};

export const STATUS_TEXT: Record<string, string> = {
  ACTIVE: 'Активный',
  WAIT: 'В процессе',
  ENDED: 'Неактивный',
};

export const calculateDuration = (beginning: string, expiration: string): string => {
  const start = new Date(beginning).getTime();
  const end = new Date(expiration).getTime();
  const duration = (end - start) / (1000 * 60 * 60 * 24);
  if (duration % 10 === 1 && duration !== 11) return `${duration} день`;
  else if ([2, 3, 4].includes(duration % 10) && ![12, 13, 14].includes(duration % 100))
    return `${duration} дня`;
  else return `${duration} дней`;
};
