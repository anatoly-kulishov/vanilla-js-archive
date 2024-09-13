import { PATH_PAGE, TSvgIconNames } from '@/shared';

export const TEXT = {
  betweenYourOwn: 'Между своими',
  toAnotherPerson: 'Другому человеку',
} as const;

export const BETWEEN_YOUR_OWN_ACTIONS = [
  {
    href: `${PATH_PAGE.transfers.transfer}?transferType=owns`,
    icon: 'arrows-reversed' as TSvgIconNames,
    title: 'Картами/Счетами',
  },
  {
    href: `${PATH_PAGE.transfers.transfer}?transferType=currencyExchange`,
    icon: 'two-coins' as TSvgIconNames,
    title: 'Обменять валюту',
  },
];

export const TO_ANOTHER_PERSON_ACTIONS = [
  {
    href: `${PATH_PAGE.transfers.transfer}?transferType=byCardNumber`,
    icon: 'card-transparent' as TSvgIconNames,
    title: 'По номеру карты',
  },
  {
    href: `${PATH_PAGE.transfers.transfer}?transferType=byAccountNumber`,
    icon: 'doc' as TSvgIconNames,
    title: 'По номеру счёта',
  },
  {
    href: `${PATH_PAGE.transfers.transfer}?transferType=byPhoneNumber`,
    icon: 'cellphone' as TSvgIconNames,
    title: 'По номеру телефона',
  },
  {
    href: `${PATH_PAGE.transfers.transfer}?transferType=toAnotherCountry`,
    icon: 'globe-draft' as TSvgIconNames,
    title: 'В другую страну',
  },
];
