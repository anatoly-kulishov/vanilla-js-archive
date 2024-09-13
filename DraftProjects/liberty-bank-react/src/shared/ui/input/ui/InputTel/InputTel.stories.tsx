import type { Meta } from '@storybook/react';
import { Input } from '@/shared';
import { argTypesText } from '../const';

const meta: Meta<typeof Input.Tel> = {
  title: 'Components/Input/Tel',
  component: Input.Tel,
  argTypes: argTypesText,
};

export default meta;
export const Docs = {};
