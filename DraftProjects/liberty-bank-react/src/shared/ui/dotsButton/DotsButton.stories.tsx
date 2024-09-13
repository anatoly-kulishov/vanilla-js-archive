import { Meta, StoryObj } from '@storybook/react';
import { DotsButton } from './DotsButton';

const meta: Meta<typeof DotsButton> = {
  title: 'Components/DotsButton',
  component: DotsButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    elements: {
      description: 'Массив ссылок',
    },
    horizontalOrientation: {
      description: 'Позиция отображаемого блока относительно кнопки',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    width: {
      description: 'Размер',
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
  },
  args: {
    horizontalOrientation: 'right',
    width: 's',
    elements: [
      {
        text: 'Реквизиты',
        onClick: () => {},
      },
      {
        text: 'График платежей',
        onClick: () => {},
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof DotsButton>;

export const Primary: Story = {};
