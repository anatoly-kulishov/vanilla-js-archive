import type { Meta } from '@storybook/react';
import { Input } from '@/shared';
import { argTypesText } from '../const';

const meta: Meta<typeof Input.Email> = {
  title: 'Components/Input/Email',
  component: Input.Email,
  argTypes: argTypesText,
};

export default meta;
export const Docs = {};
