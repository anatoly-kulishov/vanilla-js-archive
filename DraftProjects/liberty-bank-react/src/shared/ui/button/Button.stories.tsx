import type { StoryObj } from '@storybook/react';
import { Button } from './Button';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: {
      description: 'Содержимое кнопки',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    type: {
      description: 'Тип кнопки',
      table: {
        defaultValue: { summary: 'button' },
      },
      control: 'inline-radio',
    },
    size: {
      description: 'Размер шрифта и внутренних отступов кнопки',
      table: {
        defaultValue: { summary: 'm' },
      },
      control: 'inline-radio',
    },
    href: {
      description: 'URL адрес для кнопки ссылки',
    },
    theme: {
      description: 'Тема кнопки',
      table: {
        defaultValue: { summary: 'primary' },
      },
      control: 'inline-radio',
    },
    disabled: {
      description: 'Неактивное состояние кнопки',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      description: 'Добавление собственного класса для дополнительной стилизации',
    },
    width: {
      description: 'Ширина кнопки',
      table: {
        defaultValue: { summary: 'auto' },
      },
      control: 'inline-radio',
    },
    onClick: {
      description: 'Обработчик события click',
    },
  },
  args: {
    children: 'Button',
    type: 'button',
    size: 'm',
    theme: 'primary',
    disabled: false,
    className: '',
    width: 'auto',
  },
};

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const ButtonLink: Story = {
  args: {
    href: 'https://wiki.astondevs.ru/pages/viewpage.action?pageId=51285962',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const ButtonSecondary: Story = {
  args: {
    type: 'button',
    size: 'm',
    width: 'auto',
    theme: 'secondary',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const ButtonTertiary: Story = {
  args: {
    theme: 'tertiary',
    size: 'm',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
