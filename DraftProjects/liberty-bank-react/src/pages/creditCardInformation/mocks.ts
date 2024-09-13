import { IDetails } from '@/shared';

export const MOCK_DETAILS: IDetails[] = [
  {
    icon: 'cash',
    header: 'Обслуживание карты – 0 ₽',
    details: [
      'Бесплатное обслуживание в месяц, если сумма зачисления на карту, выше установленного лимита в валюте карты',
    ],
  },
  {
    icon: 'calendar-blue',
    header: 'Срок действия карты – 36 месяцев',
    details: ['Уверенность и удобство на долгий период'],
  },
  {
    icon: 'age',
    header: 'Уровень карты',
    details: ['Classic'],
  },
  {
    icon: 'flower',
    header: 'Кешбэк– 2 %',
    details: ['За любые покупки '],
  },
];
