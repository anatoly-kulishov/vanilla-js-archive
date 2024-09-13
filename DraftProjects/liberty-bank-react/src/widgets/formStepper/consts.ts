import { endingBasedQuantity } from '@/shared';

export const ERROR_MESSAGES = {
  invalidCode: (attemptNumber: number) =>
    `Неверный код. Осталось ${attemptNumber} ${endingBasedQuantity(attemptNumber, [
      'попытка',
      'попытки',
      'попыток',
    ])}.`,
  accountBlocked:
    'Ваша учетная запись заблокирована. Для изменения статуса обратитесь в отделение банка.',
  userExists: 'Пользователь с таким номером телефона уже зарегистрирован.',
  applyForAccount: 'Для регистрации обратитесь в ближайшее отделение банка.',
};
