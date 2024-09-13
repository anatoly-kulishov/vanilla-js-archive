import { formatDate, pluralize } from '@/shared';

export const createNotificationBody = (
  depositName: string,
  accountNumber: string,
  days?: number,
  closeDate?: string,
) => {
  if (days && closeDate) {
    return `Ваш депозит ${depositName} **${accountNumber.slice(-4)} будет закрыт через ${pluralize(
      days,
      ['день', 'дня', 'дней'],
    )}. Успейте продлить его до ${formatDate(closeDate)}`;
  }

  return `Ваш депозит ${depositName} **${accountNumber.slice(
    -4,
  )} закрыт. Выберите счёт для вывода средств`;
};
