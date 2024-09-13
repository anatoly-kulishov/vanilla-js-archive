import { Icon } from './Icon.tsx';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Название иконки',
      control: 'select',
    },
    className: {
      description:
        'Добавление собственного класса или массива классов для дополнительной стилизации',
      control: 'text',
    },
    fill: {
      description: 'Заливка цветом',
      control: 'color',
    },
    widthAndHeight: {
      description: 'Ширина и высота (одним параметром)',
      control: 'text',
    },
    stroke: {
      description: 'Контур иконки',
      control: 'color',
    },
    width: {
      description: 'Ширина иконки',
      table: {
        defaultValue: { summary: '24px' },
      },
      control: 'text',
    },
    height: {
      description: 'Высота',
      table: {
        defaultValue: { summary: '24px' },
      },
      control: 'text',
    },
  },
  args: {
    icon: 'calendar',
    widthAndHeight: '62px',
    fill: '#4D5F71',
  },
};

export default meta;
type TIcon = StoryObj<typeof Icon>;

export const Default: TIcon = {};
