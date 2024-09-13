import { TSvgImageNames, PATH_PAGE } from '@/shared';

export const TEXT = {
  openAccount: 'Открыть счет',
  myAccounts: 'Мои счета',
};

export const OFFERS = [
  {
    id: 1,
    imageName: 'current-bill-mirrored' as TSvgImageNames,
    title: 'Текущий счет',
    text: 'Откройте счет не выходя из дома',
    link: PATH_PAGE.createCurrentAccount,
  },
  {
    id: 2,
    imageName: 'deposit-bill' as TSvgImageNames,
    title: 'Депозитный счет',
    text: 'Больше денег без лишних вложений',
    link: PATH_PAGE.depositProducts,
  },
  {
    id: 3,
    imageName: 'credit-bill' as TSvgImageNames,
    title: 'Кредитный счет',
    text: 'Сделайте шаг навстречу мечте',
    link: PATH_PAGE.creditProducts,
  },
];

export const RESPONSE_SIZE = 500;
