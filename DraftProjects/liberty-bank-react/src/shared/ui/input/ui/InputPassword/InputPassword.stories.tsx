import type { Meta } from '@storybook/react';
import { Input } from '@/shared';
import { argTypesText } from '../const';

const meta: Meta<typeof Input.Password> = {
  title: 'Components/Input/Password',
  component: Input.Password,
  argTypes: {
    ...argTypesText,
    isHidden: {
      description: 'Определяет, является ли инпут скрытым. Тип данных: `"boolean"`',
      defaultValue: { summary: true },
      type: 'boolean',
    },
  },
};

export default meta;
export const Docs = {};
