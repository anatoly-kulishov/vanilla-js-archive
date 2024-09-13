import { PATH_PAGE } from '@/shared';

export const BACK = 'Назад';
export const TITLE = 'Часто задаваемые вопросы';

export const MOCK_DATA: {
  label: string;
  value: { question: string; answer: string }[];
}[] = [
  {
    label: 'Дебетовая карта',
    value: [
      { question: 'Вопрос ', answer: 'Подробный ответ на вопрос ' },
      { question: 'Вопрос ', answer: 'Подробный ответ на вопрос ' },
      { question: 'Вопрос ', answer: 'Подробный ответ на вопрос ' },
      { question: 'Вопрос ', answer: 'Подробный ответ на вопрос ' },
    ],
  },
  {
    label: 'Реферальная программа',
    value: [
      { question: 'Вопрос ', answer: 'Подробный ответ на вопрос ' },
      { question: 'Вопрос ', answer: 'Подробный ответ на вопрос ' },
      { question: 'Вопрос ', answer: 'Подробный ответ на вопрос ' },
      { question: 'Вопрос ', answer: 'Подробный ответ на вопрос ' },
    ],
  },
];

export const FOOTER_STR = [
  'Для связи со специалистом воспользуйтесь ',
  ', либо позвоните/напишите ',
  '.',
];

export const FOOTER_LINK = [
  {
    value: 'чатом',
    link: PATH_PAGE.customer.contactWithTheBank,
  },
  {
    value: 'нам',
    link: PATH_PAGE.contacts,
  },
];
