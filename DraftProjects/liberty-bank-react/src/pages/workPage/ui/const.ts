export const BACK = 'Назад';
export const HEADER = 'Вакансии';

export const filters = [
  {
    id: 1,
    type: 'checkbox',
    value: 'Подработка',
    options: [
      {
        id: 1,
        value: 'Неполный день',
        checked: false,
      },
      {
        id: 2,
        value: 'По вечерам',
        checked: false,
      },
      {
        id: 3,
        value: 'По выходным',
        checked: false,
      },
    ],
  },
  {
    id: 2,
    type: 'checkbox',
    value: 'Уровень дохода',
    options: [
      {
        id: 1,
        value: 'Не имеет значения',
        checked: false,
      },
      {
        id: 2,
        value: 'от 10000 RUB',
        checked: false,
      },
      {
        id: 3,
        value: 'от 40000 RUB',
        checked: false,
      },
      {
        id: 4,
        value: 'от 80000 RUB',
        checked: false,
      },
      {
        id: 5,
        value: 'от 100000 RUB',
        checked: false,
      },
      {
        id: 6,
        value: 'Указан доход',
        checked: false,
      },
    ],
  },
  {
    id: 3,
    type: 'checkbox',
    value: 'Город',
    options: [
      {
        id: 1,
        value: 'Москва',
        checked: false,
      },
      {
        id: 2,
        value: 'Санкт-Петербург',
        checked: false,
      },
      {
        id: 3,
        value: 'Казань',
        checked: false,
      },
      {
        id: 4,
        value: 'Новосибирск',
        checked: false,
      },
    ],
  },
  {
    id: 4,
    type: 'checkbox',
    value: 'Специализации',
    options: [
      {
        id: 1,
        value: 'Аналитик данных',
        checked: false,
      },
      {
        id: 2,
        value: 'DevOps engineer',
        checked: false,
      },
      {
        id: 3,
        value: 'Программист, разработчик',
        checked: false,
      },
      {
        id: 4,
        value: 'Тестировщик',
        checked: false,
      },
    ],
  },
  {
    id: 5,
    type: 'checkbox',
    value: 'Образование',
    options: [
      {
        id: 1,
        value: 'Не требуется или не указано',
        checked: false,
      },
      {
        id: 2,
        value: 'Высшее',
        checked: false,
      },
      {
        id: 3,
        value: 'Среднее профессиональное',
        checked: false,
      },
    ],
  },
  {
    id: 6,
    type: 'checkbox',
    value: 'Опыт работы',
    options: [
      {
        id: 1,
        value: 'Не имеет значения',
        checked: false,
      },
      {
        id: 2,
        value: 'Нет опыта',
        checked: false,
      },
      {
        id: 3,
        value: 'От 1 до 3 лет',
        checked: false,
      },
      {
        id: 4,
        value: 'От 3 до 6 лет',
        checked: false,
      },
      {
        id: 5,
        value: 'Более 6 лет',
        checked: false,
      },
    ],
  },
  {
    id: 1,
    type: 'checkbox',
    value: 'Тип занятости',
    options: [
      {
        id: 1,
        value: 'Полная занятость',
        checked: false,
      },
      {
        id: 2,
        value: 'Частичная занятость',
        checked: false,
      },
      {
        id: 3,
        value: 'Стажировка',
        checked: false,
      },
    ],
  },
  {
    id: 1,
    type: 'checkbox',
    value: 'График работы',
    options: [
      {
        id: 1,
        value: 'Полный день',
        checked: false,
      },
      {
        id: 2,
        value: 'Сменный график',
        checked: false,
      },
      {
        id: 3,
        value: 'Гибкий график',
        checked: false,
      },
      {
        id: 4,
        value: 'Удаленная работа',
        checked: false,
      },
    ],
  },
];

export const specializations = [
  {
    id: 1,
    value: 'BI-аналитик, аналитик данных',
    checked: false,
  },
  {
    id: 2,
    value: 'DevOps-инженер',
    checked: false,
  },
  {
    id: 3,
    value: 'Бизнес-аналитик',
    checked: false,
  },
  {
    id: 4,
    value: 'Дата-сайентист',
    checked: false,
  },
  {
    id: 5,
    value: 'Директор по информационным технологиям (CIO)',
    checked: false,
  },
  {
    id: 6,
    value: 'Программист, разработчик',
    checked: false,
  },
  {
    id: 7,
    value: 'Системный администратор',
    checked: false,
  },
  {
    id: 8,
    value: 'Системный аналитик',
    checked: false,
  },
  {
    id: 9,
    value: 'Системный инженер',
    checked: false,
  },
  {
    id: 10,
    value: 'Специалист по информационной безопасности',
    checked: false,
  },
  {
    id: 11,
    value: 'Специалист технической поддержки',
    checked: false,
  },
  {
    id: 12,
    value: 'Тестировщик',
    checked: false,
  },
  {
    id: 13,
    value: 'Технический писатель',
    checked: false,
  },
];
