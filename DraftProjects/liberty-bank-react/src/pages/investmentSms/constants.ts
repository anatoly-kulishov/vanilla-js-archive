export const TextError = 'Пожалуйста введите цифры';

export const BTN_TEXT: IData = {
  back: 'Назад',
  cancellation: 'Отмена',
  next: 'Далее',
};

export enum BROKER_ID {
  'a4b1d386-64b3-423a-bfc8-03867300ba6a',
}

export const Data: IData = {
  title: ' Введите код из смс',
  text: ' На Ваш номер телефона отправлен 6-значный код подтверждения',
  sms: ' Отправить смс еще раз',
  time: 'Повторная отправка через',
};
interface IData {
  [key: string]: string;
}
