import { StoryObj } from '@storybook/react';
import { Switch } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    name: {
      description: 'имя инпута',
    },
    checked: {
      description: 'управление переключателем',
      control: 'boolean',
    },
  },
  args: {
    name: 'currency',
  },
};
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {};
