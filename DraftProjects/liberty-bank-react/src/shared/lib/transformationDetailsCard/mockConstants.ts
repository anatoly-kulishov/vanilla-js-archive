import { IDetails } from '../..';
import { TSvgIconNames } from '../../ui';

export const depositDetail: IDetails[] = [
  { icon: 'atm', header: 'Вклад в национальной валюте', details: ['Без потерь при конвертации'] },
  { icon: 'calendar-blue', header: 'Гибкие условия', details: ['Вклад от 1 до 36 месяцев'] },
  { icon: 'percent', header: 'Фиксированная ставка', details: ['до 6% годовых'] },
  { icon: 'selector', header: 'Возможность пополнения', details: ['Предусмотрена'] },
  {
    icon: 'contribution',
    header: 'Капитализация процентов',
    details: ['Для увеличения доходности'],
  },
  {
    icon: 'certificate',
    header: 'Возврат депозита',
    details: ['В любой момент времени, без потери накопленных процентов'],
  },
];

type TTransformedDepositCard = {
  id: TSvgIconNames;
  title: string;
  description: string;
  icon: TSvgIconNames;
};

export const transformedDepositCard: TTransformedDepositCard[] = [
  {
    id: 'atm',
    title: 'Вклад в национальной валюте',
    description: 'Без потерь при конвертации',
    icon: 'atm',
  },
  {
    id: 'calendar-blue',
    title: 'Гибкие условия',
    description: 'Вклад от 1 до 36 месяцев',
    icon: 'calendar-blue',
  },
  { id: 'percent', title: 'Фиксированная ставка', description: 'до 6% годовых', icon: 'percent' },
  {
    id: 'selector',
    title: 'Возможность пополнения',
    description: 'Предусмотрена',
    icon: 'selector',
  },
  {
    id: 'contribution',
    title: 'Капитализация процентов',
    description: 'Для увеличения доходности',
    icon: 'contribution',
  },
  {
    id: 'certificate',
    title: 'Возврат депозита',
    description: 'В любой момент времени, без потери накопленных процентов',
    icon: 'certificate',
  },
];
