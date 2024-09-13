import { TSvgIconNames } from '@/shared';

export const BTN = 'Открыть брокерский счет';
export const BTN_LINK = 'Узнать больше';
export const CONDITIONS_TITLE = 'Начните инвестировать сегодня';

interface IC {
  id: number;
  subtitle: string;
  description: string;
  name: TSvgIconNames;
}

export const CONDITIONS: IC[] = [
  {
    id: 1,
    subtitle: 'Прямой доступ',
    description: 'к международному финансовому рынку',
    name: 'monitor',
  },
  {
    id: 2,
    subtitle: 'Готовые решения',
    description: 'Для всех типов инвесторов',
    name: 'appeals',
  },
  {
    id: 3,
    subtitle: 'Эффективное управление',
    description: 'Профессиональными управляющими',
    name: 'calculation',
  },
  {
    id: 4,
    subtitle: 'Минимальные затраты',
    description: 'В деньгах и по времени',
    name: 'cash',
  },
];
