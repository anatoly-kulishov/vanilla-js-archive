import type { Meta } from '@storybook/react';
import { Input } from '@/shared';
import { argTypesText } from '../const';

const meta: Meta<typeof Input.Date> = {
  title: 'Components/Input/Date',
  component: Input.Date,
  argTypes: {
    ...argTypesText,
    value: {
      description: 'Устанавливает значение инпута. Тип данных: `Date`',
      table: { type: { summary: null } },
    },
  },
};

export default meta;
export const Docs = {};
