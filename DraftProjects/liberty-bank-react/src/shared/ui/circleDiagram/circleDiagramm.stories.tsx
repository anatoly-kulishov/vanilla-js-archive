import type { Meta, StoryObj } from '@storybook/react';
import { CircleDiagram } from './CircleDiagram';

const meta: Meta<typeof CircleDiagram> = {
  title: 'Components/CircleDiagram',
  component: CircleDiagram,
  argTypes: {
    sectors: {
      description: 'Секторы диаграммы',
      control: 'object',
    },
    borderWidth: {
      description: 'Ширина рамки диаграммы',
      control: { type: 'range', min: 0, max: 100, step: 5 },
    },
    diameter: {
      description: 'Диаметр диаграммы',
      control: { type: 'number', min: 50, max: 1000, step: 20 },
    },
    fontSize: {
      description: 'Размер шрифта',
      control: { type: 'range', min: 12, max: 50, step: 2 },
    },
  },
  args: {
    sectors: [5, 5, 4, 10, 15],
    borderWidth: 6,
    diameter: 144,
    fontSize: 20,
  },
};

export default meta;
type Story = StoryObj<typeof CircleDiagram>;

export const Primary: Story = {
  args: {
    sectors: [1, 1, 0, 10, 10, 20],
    borderWidth: 60,
    diameter: 300,
    fontSize: 40,
  },
  decorators: [(Story) => <Story />],
};
