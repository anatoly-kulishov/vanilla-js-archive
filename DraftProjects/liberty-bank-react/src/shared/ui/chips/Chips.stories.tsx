import type { Meta, StoryObj } from '@storybook/react';
import { Chips } from './Chips';
import { componentArgTypes, componentDescription } from './storiesConstants';

const meta = {
  title: 'Components/Chips',
  component: Chips,
  parameters: {
    layout: 'centered',
    docs: {
      description: componentDescription,
    },
    controls: {
      exclude: /^name/,
    },
  },
  argTypes: componentArgTypes,
  args: {
    values: ['RUB', 'USD', 'EUR'],
    type: 'radio',
  },
} satisfies Meta<typeof Chips>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
  args: {
    name: 'buttons-name',
    viewType: 'buttons',
    defaultCheck: 'RUB',
  },
};

export const Dots: Story = {
  args: {
    values: ['Dot 1', 'Dot 2', 'Dot 3'],
    name: 'dots-name',
    viewType: 'dots',
    defaultCheck: 'Dot 2',
  },
};
