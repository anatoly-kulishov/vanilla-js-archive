import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      description: 'The content of the tooltip.',
      table: {
        type: { summary: 'ReactNode' },
      },
      control: 'text',
    },
    positionX: {
      description: 'Horizontal position of the tooltip.',
      options: ['left', 'right'],
      control: { type: 'radio' },
      table: {
        type: { summary: 'left | right' },
        defaultValue: { summary: 'right' },
      },
    },
    positionY: {
      description: 'Vertical position of the tooltip.',
      options: ['top', 'bottom'],
      control: { type: 'radio' },
      table: {
        type: { summary: 'top | bottom' },
        defaultValue: { summary: 'bottom' },
      },
    },
    width: {
      description: 'Width of the tooltip.',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
    className: {
      description: 'Additional CSS classes.',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    normalTextWrapping: {
      description: 'Enable normal text wrapping.',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    elementTooltip: {
      description: 'The element that triggers the tooltip.',
      table: {
        type: { summary: 'ReactNode | string' },
      },
      control: 'text',
    },
    showDelay: {
      description: 'Delay in milliseconds before the tooltip appears.',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    hideDelay: {
      description: 'Delay in milliseconds before the tooltip appears.',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
  },
  args: {
    children: 'This is the tooltip content.',
    elementTooltip: <span style={{ width: '200px' }}>Hover over me</span>,
    showDelay: 0,
    hideDelay: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {},
};

export const CustomWidth: Story = {
  args: {
    width: 200,
  },
};

export const TopLeft: Story = {
  args: {
    positionX: 'left',
    positionY: 'top',
  },
};

export const BottomRight: Story = {
  args: {
    positionX: 'right',
    positionY: 'bottom',
  },
};

export const WithNormalTextWrapping: Story = {
  args: {
    normalTextWrapping: true,
  },
};

export const WithDelay: Story = {
  args: {
    showDelay: 200,
    hideDelay: 200,
  },
};
