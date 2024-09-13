export const ONLY_DIGITS_REX_EXP = /^\d+$/;

export const TEXT = {
  asterisk: '*',
  cardMask: '**** **** ****',
  selectPlaceholder: 'Выберете карту или счёт',
  selectLabelFrom: 'Выберите счет/карту списания',
  selectLabelTo: 'Выберите счет/карту пополнения',
  amountLabel: 'Сумма перевода',
  amountPlaceholder: 'Введите сумму перевода',
  amountCaption: 'Комиссия не взимается банком',
  backBtn: 'Назад',
  submitBtn: 'Перевести',
  error: {
    insufficientFunds: 'Недостаточно средств для осуществления перевода',
    required: 'Данное поле обязательно для заполнения',
    notZero: 'Минимальная сумма для перевода: 1 рубль',
    sameCurrency:
      'Валюта счёта/карты пополнения должна соответствовать валюте счёта/карты списания',
  },
};
