import { StoryObj } from '@storybook/react';
import { ServiceCard } from '.';

export default {
  title: 'Components/ServiceCard',
  component: ServiceCard,
  argTypes: {
    title: {
      description: 'Заголовок',
    },
    description: {
      description: 'Описание',
    },
    iconName: {
      description: 'Название иконки',
    },
  },
};

type Story = StoryObj<typeof ServiceCard>;

export const Primary: Story = {
  args: {
    title: 'Заголовок',
    iconName: 'security',
    description: 'Содержание карточки',
  },
};
