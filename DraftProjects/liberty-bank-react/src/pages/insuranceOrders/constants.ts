interface IProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  insuranceItem: string;
  duration: string;
  amount: number;
  status: string;
}

export const mockInsuranceData: IProps[] = [
  {
    id: 2,
    name: 'Автострахование КАСКО',
    startDate: '2024-03-08',
    endDate: '2024-04-07',
    insuranceItem: 'Дом',
    duration: '30 дней',
    amount: 1000,
    status: 'WAIT',
  },
  {
    id: 1,
    name: 'Автострахование ОСАГО',
    startDate: '2024-04-15',
    endDate: '2024-05-14',
    insuranceItem: 'Здоровье',
    duration: '30 дней',
    amount: 1200,
    status: 'WAIT',
  },
  {
    id: 3,
    name: 'Добровольное медицинское страхование',
    startDate: '2024-05-22',
    endDate: '2024-06-21',
    insuranceItem: 'Автомобиль',
    duration: '30 дней',
    amount: 1400,
    status: 'WAIT',
  },
  {
    id: 7,
    name: 'Страхование дома',
    startDate: '2024-07-06',
    endDate: '2024-08-05',
    insuranceItem: 'Путешествие',
    duration: '30 дней',
    amount: 1600,
    status: 'WAIT',
  },
  {
    id: 8,
    name: 'Страхование квартиры',
    startDate: '2024-08-13',
    endDate: '2024-09-12',
    insuranceItem: 'Несчастные случаи',
    duration: '30 дней',
    amount: 1800,
    status: 'WAIT',
  },
];
