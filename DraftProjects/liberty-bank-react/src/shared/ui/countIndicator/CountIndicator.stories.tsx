import { Meta, StoryObj } from '@storybook/react';
import { CountIndicator } from './CountIndicator.tsx';

const meta: Meta<typeof CountIndicator> = {
  title: 'Components/CountIndicator',
  component: CountIndicator,
  argTypes: {
    count: {
      description: 'Количество',
      table: {
        type: { summary: 'number' },
      },
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CountIndicator>;

export const Primary: Story = {
  args: {
    count: 0,
  },
};
