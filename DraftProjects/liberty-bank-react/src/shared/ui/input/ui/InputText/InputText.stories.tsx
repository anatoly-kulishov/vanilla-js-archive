import type { Meta } from '@storybook/react';
import { Input } from '@/shared';
import { argTypesText } from '../const';

const meta: Meta<typeof Input.Text> = {
  title: 'Components/Input/Text',
  component: Input.Text,
  argTypes: argTypesText,
};

export default meta;
export const Docs = {};
