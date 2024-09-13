export const COMMENT_REG_EXP = /^[0-9A-Za-zА-Яа-яЁё\s.,]+$/;

export const TEXT = {
  accountMask: '***** *** * **** *******',
  bicMask: '*********',
  selectPlaceholder: 'Выберете карту или счёт',
  selectLabelFrom: 'Выберите счет/карту списания',
  recipientAccountLabel: 'Введите счет получателя',
  amountLabel: 'Сумма перевода',
  amountPlaceholder: 'Введите сумму перевода',
  bicLabel: 'БИК получателя',
  commentLabel: 'Комментарий',
  commentPlaceholder: 'Введите сообщение',
  backBtn: 'Назад',
  submitBtn: 'Перевести',
  error: {
    insufficientFunds: 'Недостаточно средств для осуществления перевода',
    required: 'Данное поле обязательно для заполнения',
    notZero: 'Минимальная сумма для перевода: 1 рубль',
    accountNumberLength: 'Номер счета должен состоять из 20 цифр',
    bicNumberLength: 'Уникальный код банка должен состоять из 9 цифр',
    maxCommentLength:
      'Превышено количество вводимых символов. Максимально допустимое количество вводимых символов - 70',
    invalidCommentSymbol: 'Допустимыми являются знаки "." и ","',
  },
};
