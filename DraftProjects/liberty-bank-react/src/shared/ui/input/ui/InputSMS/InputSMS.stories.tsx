import type { Meta } from '@storybook/react';
import { Input } from '@/shared';
import { argTypesText } from '../const';

const meta: Meta<typeof Input.SMS> = {
  title: 'Components/Input/SMS',
  component: Input.SMS,
  argTypes: {
    ...argTypesText,
    length: {
      description: 'Определяет количество ячеек',
      control: { type: 'range', min: 1, max: 10 },
      defaultValue: { summary: 6 },
      type: 'number',
    },
  },
};

export default meta;
export const Docs = {};
