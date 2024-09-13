import { IImageProps } from '@/shared';

export const TITLE_TEXT = 'Заявка на кредит ';

export const CREDIT_OBLIGATION_TEXT = 'Нет кредитных обязательств';

export const BUTTON_TEXT = {
  send: 'Отправить заявку',
  cancel: 'Отмена',
};

export const infoFrameText = {
  titleSuccess: 'Заявка успешно отправлена',
  titleFailed: 'Неуспешная отправка заявки',
  creditList: 'Вернуться к списку кредитов',
  reapply: 'Повторно подать заявку',
};

export const successOpenedCredit: IImageProps = {
  image: 'all-product-current-bill',
  dir: 'bills',
  width: '278',
  height: '200',
  style: {
    transform: 'scale(-1, 1)',
  },
};

export const failedOpenedCredit: IImageProps = {
  image: 'failed-open-bill',
  dir: 'bills',
  width: '269',
  height: '200',
};
