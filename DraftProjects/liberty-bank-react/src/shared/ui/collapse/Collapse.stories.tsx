import type { Meta, StoryObj } from '@storybook/react';
import { Collapse } from './Collapse';
import { TSvgIconNames } from '../icon/model/types';

const meta: Meta<typeof Collapse> = {
  title: 'Components/Collapse',
  component: Collapse,
  argTypes: {
    title: {
      description: 'Название выпадающего списка',
      control: 'text',
    },
    children: {
      description: 'Содержимое выпадающего списка',
      control: 'text',
      table: { type: { summary: 'ReactNode' } },
    },
    iconAttributes: {
      description: 'Атрибуты иконки развернуть/свернуть',
      defaultValue: { icon: 'iconName' as TSvgIconNames },
    },
    disabled: {
      description: 'Неактивное состояние выпадающего списка',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    button: {
      description: 'Кнопка, чтобы развернуть выпадающего список',
      control: 'text',
    },
  },
  args: {
    title: 'Выпадающий список',
    children: <div>Контент</div>,
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

export const Primary: Story = {
  args: {
    title: 'Выпадающий список',
    children: Array(10)
      .fill(null)
      .map((_, index) => <div key={index}>item</div>),
  },
  decorators: [(Story) => <Story />],
};
