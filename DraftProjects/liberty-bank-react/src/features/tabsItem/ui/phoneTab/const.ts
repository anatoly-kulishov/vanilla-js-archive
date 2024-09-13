export const ERRORS = {
  INVALID: 'Неверный пароль или номер телефона',
  OVER_INVALID: '. Пожалуйста,',
  RESET_PASSWORD: 'восстановите учетную запись',
  LENGTH_NUMBER: 'Номер телефона должен содержать 11 цифр',
  LENGTH_PASSWORD: 'Пароль должен содержать от 6 до 20 символов',
};

export const passwordRequirement = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!-/:-@[-`{-~])/;
export const withoutASCII = /[^!-~]/;
