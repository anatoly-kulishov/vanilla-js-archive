import type { Meta } from '@storybook/react';
import { Input } from '@/shared';
import { argTypesText } from '../const';

delete argTypesText.mask;

const meta: Meta<typeof Input.Number> = {
  title: 'Components/Input/Number',
  component: Input.Number,
  argTypes: {
    ...argTypesText,
    value: {
      description:
        'Определяет числовое значение инпута (на стрелочки на клаве можно менять значение)',
      control: 'text',
    },
  },
};

export default meta;
export const Docs = {};
