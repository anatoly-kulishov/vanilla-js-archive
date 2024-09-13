import { TSvgIconNames } from '@/shared';

export const COLOR = {
  white: 'white',
};
interface IAction {
  id: number;
  name: TSvgIconNames;
  title: string;
  link: string;
}
export const ACTIONS: IAction[] = [
  {
    id: 1,
    name: 'coins',
    title: 'Пополнить счет',
    link: '/investment/lk/briefcase/topup',
  },
  {
    id: 2,
    name: 'facilities',
    title: 'Вывести средства',
    link: '/investment/lk/briefcase/withdraw',
  },
  {
    id: 3,
    name: 'operations',
    title: 'История операций',
    link: '/investment/lk/briefcase/history',
  },
];

export const GO_START_INVEST = {
  title: 'Начни инвестировать прямо сейчас',
  text: [
    'Прежде чем начать, пройдите наш тест, чтобы лучше',
    'понять свои финансовые цели и риск-аппетит. Это',
    'поможет вам сделать обоснованные инвестиционные',
    'решения. ',
  ],
  btn: 'Пройти тестирование',
  icon: {
    name: 'start-invest' as Extract<TSvgIconNames, 'start-invest'>,
    width: '284',
    height: '279',
  },
};

export const INPUT_PLACEHOLDER = 'Поиск по названию или тикеру';
