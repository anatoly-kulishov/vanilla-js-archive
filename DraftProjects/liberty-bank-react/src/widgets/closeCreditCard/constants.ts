export const PICK_REASON = 'ПРИЧИЧНА ПО КОТОРОЙ ВЫ РЕШИЛИ ЗАКРЫТЬ КАРТУ';
export const TEXT = 'Закрыть карту';

export const REASONS_TO_CLOSE = [
  'ОТСУТСТВИЕ ПОТРЕБНОСТИ В КРЕДИТНЫХ ПРОДУКТАХ',
  'ПОЯВЛЕНИЕ НОВОЙ КАРТЫ',
  'НЕ УСТРАИВАЮТ УСЛОВИЯ',
  'ДРУГОЕ',
];

export const CLOSE_CARD = {
  back: 'Вернуться в мои карты',
  closeObligation: 'Погасить задолженность',
  info: 'Имеется непогашенная задолженность по карте',
} as const;

export const ICON_MODAL_PARAMS = {
  width: '244',
  height: '200',
  image: 'close-bill',
} as const;
