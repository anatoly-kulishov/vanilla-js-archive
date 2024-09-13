export const TEXT = {
  cardInfo: 'Информация по карте',
  details: 'Детали счета',
  rates: 'Тарифы',
  requisites: 'Реквизиты счета',
  interestFreeEndDate: 'Дата окончания беспроцентного периода',
  getExtract: 'Получить выписку',
  cardManage: 'Управление кредитной картой',
  changePin: 'Изменить PIN-код',
  blockUnblock: 'Блокировать/разблокировать карту',
  closeCard: 'Закрыть карту',
  changeLimits: 'Установить/изменить лимиты',
} as const;

export const MODAL_BLOCK_CARD = {
  question: 'Вы подтверждаете данное действие?',
  block: 'Заблокировать',
  unblock: 'Разблокировать',
  cancel: 'Вернуться назад',
} as const;

export const MODAL_CLOSE_CARD = {
  question: 'Вы подтверждаете данное действие?',
  close: 'Подтверждаю',
  cancel: 'Отказываюсь',
} as const;

export const ICON_MODAL_PARAMS = {
  width: '244',
  height: '200',
  image: 'close-bill',
} as const;

export const INFO_MESSAGES = {
  header: 'Закрытие кредитной карты',
  info: [
    'Карта будет заблокирована сразу после оформления заявки, счет карты закроется в течении 45 дней.',
    'Вы больше не сможете пользоваться данной кредитной картой: операции и другие действия будут недоступны.',
  ],
} as const;
