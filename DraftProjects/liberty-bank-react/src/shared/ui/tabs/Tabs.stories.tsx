import type { StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { Provider } from 'react-redux';
import { setupStore } from '../../../app/appStore.ts';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    tabs: {
      description: 'Конфигурация содержимого Tab ',
    },
    theme: {
      description: 'Тема Tab компонента',
      table: {
        defaultValue: { summary: 'primary' },
      },
      control: 'inline-radio',
    },
    marginBottom: {
      description: 'Дополнительная настрока отступа между Заголовками и контентом Tab ',
      control: 'check',
    },
  },
  args: {
    tabs: [
      {
        label: 'Телефон',
        content: <div>Номер телефона</div>,
      },
      {
        label: 'Документ',
        content: <div>Номер документа</div>,
      },
    ],
    theme: 'primary',
  },
};

type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  args: {
    theme: 'primary',
  },
  decorators: [
    (Story) => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    ),
  ],
};

export const Secondary: Story = {
  args: {
    theme: 'secondary',
  },
  decorators: [
    (Story) => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    ),
  ],
};
