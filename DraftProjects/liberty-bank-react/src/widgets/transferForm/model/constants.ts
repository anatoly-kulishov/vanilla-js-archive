import { FC } from 'react';
import { TransferByAccountNumber } from '@/features/transferByAccountNumber';
import { TransferByCardNumber } from '@/features/transferByCardNumber';
import { TransferBetweenOwns } from '@/features/transferBetweenOwns';

export const TRANSFER_FORM_COMPONENTS: Record<string, FC> = {
  byAccountNumber: TransferByAccountNumber,
  byCardNumber: TransferByCardNumber,
  owns: TransferBetweenOwns,
};

export const TITLE: Record<string, string> = {
  owns: 'Перевести между своими картами/счетами',
  currencyExchange: 'Обменять валюту',
  byCardNumber: 'Перевести по номеру карты',
  byAccountNumber: 'Перевести по номеру счета',
  byPhoneNumber: 'Перевести по номеру телефона',
  toAnotherCountry: 'Перевести в другую страну',
  noData: 'Некорректный тип перевода',
};

export const TEXT = {
  noDataDescription:
    'Выбран несуществующий тип перевода. Пожалуйста вернитесь на страницу переводов, и выберете интересующий вас тип перевода.',
};
