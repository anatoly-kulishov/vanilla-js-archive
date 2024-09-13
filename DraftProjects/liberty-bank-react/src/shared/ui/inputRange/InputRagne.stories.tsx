import { InputRange } from './InputRange.tsx';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InputRange> = {
  title: 'Components/InputRange',
  component: InputRange,
  argTypes: {
    id: {
      description: 'Уникальный идентификатор',
    },
    label: {
      description: 'Заголовок для input',
    },
    minValue: {
      description: 'Минимальное значение',
    },
    maxValue: {
      description: 'Максимальное значение',
    },
    step: {
      description: 'Шаг изменения значения',
    },
    size: {
      description: 'Размер',
      control: 'inline-radio',
    },
    isError: {
      description: 'Статус ошибки',
    },
    fieldValue: {
      description: 'Значение поля',
    },
    errorMessage: {
      description: 'Сообщение об ошибке',
    },
    required: {
      description: 'Флаг обязательное ли поле',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputRange>;

export const Short: Story = {
  args: {
    id: 'input-range',
    label: 'Введите ваш возраст',
    minValue: 0,
    maxValue: 100,
    step: 1,
  },
};

export const Long: Story = {
  args: {
    id: 'input-range',
    label: 'Введите ваш возраст',
    minValue: 0,
    maxValue: 100,
    step: 1,
    size: 'long',
  },
};

export const Medium: Story = {
  args: {
    id: 'input-range',
    label: 'Введите ваш возраст',
    minValue: 0,
    maxValue: 100,
    step: 1,
    size: 'medium',
  },
};

export const Lengthy: Story = {
  args: {
    id: 'input-range',
    label: 'Введите ваш возраст',
    minValue: 0,
    maxValue: 100,
    step: 1,
    size: 'lengthy',
  },
};

export const Longest: Story = {
  args: {
    id: 'input-range',
    label: 'Введите ваш возраст',
    minValue: 0,
    maxValue: 100,
    step: 1,
    size: 'longest',
  },
};

export const Error: Story = {
  args: {
    id: 'input-range',
    label: 'Введите ваш возраст',
    minValue: 0,
    maxValue: 100,
    step: 1,
    isError: true,
    errorMessage: 'Это поле обязательно для заполнения',
  },
};
