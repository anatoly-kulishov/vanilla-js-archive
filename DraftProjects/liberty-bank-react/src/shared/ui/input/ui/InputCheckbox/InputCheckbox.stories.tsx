import type { Meta } from '@storybook/react';
import { Input } from '@/shared';

const meta: Meta<typeof Input.Checkbox> = {
  title: 'Components/Input/Checkbox',
  component: Input.Checkbox,
  argTypes: {
    type: {
      description: 'Определяет тип ввода для инпута. Допустимые значения: `"checkbox"`, `"radio"`.',
      control: 'radio',
      options: ['checkbox', 'radio'],
    },
    checked: {
      description:
        'Этот атрибут определяет, помечен ли заранее такой элемент формы, как флажок или переключатель',
      type: 'boolean',
    },
  },
  args: { type: 'checkbox' },
};

export default meta;
export const Docs = {};
