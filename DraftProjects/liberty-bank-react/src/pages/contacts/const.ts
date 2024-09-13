import type { TSvgIconNames } from '@/shared';

export const BACK = 'Назад';
export const HEADER = 'Контакты';

export const MOCK_DATA = [
  {
    title: 'Горячая линия для частных лиц',
    value: [
      {
        value: 'x-xxx-xxx-xx-xx',
        description: 'Бесплатный звонок по России',
      },
      {
        value: 'x-xxx-xxx-xx-xx',
        description: 'Для жителей Москвы и Московской области',
      },
      {
        value: 'xxxxxxx@xxxxxxx',
        description: 'Email',
      },
      {
        value: 'x-xxx-xxx-xx-xx',
        description: 'Для звонков за пределами России',
      },
    ],
  },
  {
    title: 'Горячая линия корпоративным клиентам',
    value: [
      {
        value: 'x-xxx-xxx-xx-xx',
        description: 'Бесплатный звонок по России',
      },
      {
        value: 'x-xxx-xxx-xx-xx',
        description: 'Для жителей Москвы и Московской области',
      },
      {
        value: 'xxxxxxx@xxxxxxx',
        description: 'Email',
      },
    ],
  },
  {
    title: 'Техническая поддержка',
    value: [
      {
        value: 'x-xxx-xxx-xx-xx',
        description: 'Бесплатный звонок по России',
      },
      {
        value: 'x-xxx-xxx-xx-xx',
        description: 'Для жителей Москвы и Московской области',
      },
      {
        value: 'xxxxxxx@xxxxxxx',
        description: 'Email',
      },
    ],
  },
];

interface IChatBot {
  name: string;
  link: string;
  icon: TSvgIconNames;
}

export const CHAT_BOTS: IChatBot[] = [
  { name: 'Вконтакте', link: '', icon: 'vk-blue-circle' },
  { name: 'Telegram', link: '', icon: 'tg' },
  { name: 'WhatsApp', link: '', icon: 'whatsapp' },
  { name: 'Viber', link: '', icon: 'viber' },
  { name: 'Чат с банком', link: '', icon: 'mail-circle' },
];

export const CHAT_BOTS_TITLE = 'Чат-боты в социальных сетях';
