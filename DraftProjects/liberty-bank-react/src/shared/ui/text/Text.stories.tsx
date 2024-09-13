import { Text } from './Text';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Содержимое',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    size: {
      description: 'Размер шрифта',
      control: 'inline-radio',
    },
    weight: {
      description: 'Насыщенность текста',
      control: 'inline-radio',
    },
    className: {
      description: 'Добавление собственного класса для дополнительной стилизации',
    },
  },
  args: {
    tag: 'h1',
    children: 'Введите номер телефона',
    size: 'm',
    className: '',
    weight: 'bold',
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {};
