import type { Meta } from '@storybook/react';
import { Input } from '@/shared';
import { argTypesText } from '../const';

const meta: Meta<typeof Input.Select> = {
  title: 'Components/Input/Select',
  component: Input.Select,
  argTypes: {
    ...argTypesText,
    options: {
      description: 'Массив элементов, которые содержатся в списке',
    },
    value: {
      description: 'Для контроля инпута вне компонента',
      control: 'text',
      table: { type: { summary: null } },
    },
    onMySelect: {
      description:
        'Функция, которая принимает в себя строку или объект типа `TOption" `onMySelect: (selectedOption: TOption) => void`',
      control: 'text',
      table: { type: { summary: null } },
    },
    defaultOptionSelected: {
      description: 'Параметр для определения элемента списка по дефолту',
      control: 'text',
      defaultValue: { summary: '' },
      table: { type: { summary: null } },
    },
    label: {
      description: 'Параметр для определения лейбла',
      control: 'text',
      table: { type: { summary: null } },
    },
    enableSearch: {
      description: 'Параметр для определения можно ли писать в инпуте и искать в списке',
      control: 'boolean',
      defaultValue: { summary: false },
      table: { type: { summary: null } },
    },
  },
  args: { options: ['a1', 'a2', 'b1', 'b2'] },
};

export default meta;
export const Docs = {};
