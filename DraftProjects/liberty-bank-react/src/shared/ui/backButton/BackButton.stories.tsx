import type { StoryObj } from '@storybook/react';
import { BackButton } from './BackButton';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/BackButton',
  component: BackButton,
  argTypes: {
    text: {
      description: 'Текст кнопки',
    },
    theme: {
      description: 'Тема кнопки',
      table: {
        defaultValue: { summary: 'primary' },
      },
      control: 'inline-radio',
    },
    name: {
      description: 'Имя SVG иконки',
      control: 'inline-radio',
    },
    width: {
      description: 'Ширина SVG иконки в px',
    },
    height: {
      description: 'Высота SVG иконки в px',
    },
    iconColor: {
      description: 'Цвет SVG иконки',
      control: 'color',
    },
  },
  args: {
    text: 'Назад',
  },
};

type Story = StoryObj<typeof BackButton>;

export const BackButtonPrimary: Story = {
  args: { width: '24', height: '24', theme: 'blue', name: 'arrow-left-blue' },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const BackButtonSecondary: Story = {
  args: { width: '16', theme: 'secondary', name: 'arrow-left-blue' },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
