import { StoryObj } from '@storybook/react';
import { FilterButtons } from '.';

export default {
  title: 'Components/FilterButtons',
  component: FilterButtons,
  argTypes: {
    filter: {
      description: 'Конфигурация содержимого filter',
    },
  },
  args: {
    filter: ['Все', 'RUB', 'USD', 'EUR'],
  },
};

type Story = StoryObj<typeof FilterButtons>;

export const Primary: Story = {};
