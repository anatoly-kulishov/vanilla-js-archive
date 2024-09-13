import type { Meta } from '@storybook/react';
import { Input } from '@/shared';
import { argTypesText } from '../const';

const meta: Meta<typeof Input.Search> = {
  title: 'Components/Input/Search',
  component: Input.Search,
  argTypes: {
    ...argTypesText,
    onSearch: {
      description: 'Функция обратного вызова, вызываемая при выполнении поиска',
      type: 'function',
    },
  },
};

export default meta;
export const Docs = {};
