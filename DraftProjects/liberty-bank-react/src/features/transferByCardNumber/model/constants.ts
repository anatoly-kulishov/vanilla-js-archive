export const COMMENT_REG_EXP = /^[0-9A-Za-zА-Яа-яЁё\s.,]+$/;

export const TEXT = {
  cardMask: '**** **** ****',
  cardFullMask: '**** **** **** ****',
  selectPlaceholder: 'Выберете карту или счёт',
  selectLabelFrom: 'Выберите счет/карту списания',
  recipientCardNumberLabel: 'Введите номер карты получателя',
  amountLabel: 'Сумма перевода',
  amountPlaceholder: 'Введите сумму перевода',
  amountCaption: 'При осуществлении перевода в другой банк будет начислена комиссия',
  commentLabel: 'Комментарий',
  commentPlaceholder: 'Введите сообщение',
  backBtn: 'Назад',
  submitBtn: 'Перевести',
  error: {
    insufficientFunds: 'Недостаточно средств для осуществления перевода',
    required: 'Данное поле обязательно для заполнения',
    notZero: 'Минимальная сумма для перевода: 1 рубль',
    cardNumberLength: 'Номер карты должен состоять из 16 цифр',
    maxCommentLength:
      'Превышено количество вводимых символов. Максимально допустимое количество вводимых символов - 70',
    invalidCommentSymbol: 'Допустимыми являются знаки "." и ","',
  },
};
