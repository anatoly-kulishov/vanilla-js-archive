import { Meta, StoryObj } from '@storybook/react';
import { StatusLabel } from './StatusLabel';

const meta: Meta<typeof StatusLabel> = {
  title: 'Components/StatusLabel',
  component: StatusLabel,
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Тип статуса',
      control: 'inline-radio',
    },
    text: {
      description: 'Текст метки',
      control: 'text',
    },
    size: {
      description: 'Размер',
      control: 'inline-radio',
    },
    width: {
      description: 'Ширина кнопки<br />(по размеру текста/на всю ширину контейнера)',
      table: {
        defaultValue: { summary: 'adjustable' },
      },
    },
    'data-testid': {
      description: 'Идентификатор для тестов',
    },
  },
  args: {
    type: 'success',
    size: 'xs',
    text: 'Метка',
    width: 'adjustable',
  },
};

export default meta;
type Story = StoryObj<typeof StatusLabel>;

export const Primary: Story = {};
