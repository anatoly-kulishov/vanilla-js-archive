import type { StoryObj } from '@storybook/react';
import { Checkbox } from '.';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    name: {
      description: 'Имя чекбокса',
      table: {
        defaultValue: { summary: 'name' },
      },
      control: 'auto',
    },
    value: {
      description: 'Значение чекбокса',
      table: {
        defaultValue: { summary: 'value' },
      },
      control: 'auto',
    },
    checked: {
      description: 'Состояние чекбокса',
    },
  },
  args: {
    name: 'name',
    value: 'value',
  },
};

type Story = StoryObj<typeof Checkbox>;

export const CheckboxDefault: Story = { args: {} };
export const CheckboxChecked: Story = { args: { checked: true } };
