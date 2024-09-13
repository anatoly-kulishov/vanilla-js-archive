import type { StoryObj } from '@storybook/react';
import { Link } from './Link';
import { BrowserRouter } from 'react-router-dom';
import logo from '../icon/assets/images/logo.svg';

export default {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    to: {
      description: 'URL адрес для перехода',
    },

    children: {
      description: 'Содержимое кнопки',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    size: {
      description: 'Размер шрифта и внутренних отступов кнопки',
      table: {
        defaultValue: { summary: 'm' },
      },
      control: 'inline-radio',
    },
    icon: {
      description: 'Иконка',
      table: {
        type: { summary: 'ReactNode' },
      },
      control: {
        type: 'inline-radio',
      },
      options: ['Normal', 'Icon'],
      mapping: {
        Normal: '',
        Icon: <img src={logo} width='24px' height='24px' />,
      },
    },
    nowrap: {
      description: 'Отмена переноса строки внутри текста',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    to: '',
    children: 'Link',
    size: 'm',
    icon: 'Normal',
    nowrap: false,
  },
};

type Story = StoryObj<typeof Link>;

export const Primary: Story = {
  args: {
    to: 'https://wiki.astondevs.ru/pages/viewpage.action?pageId=51285962',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
