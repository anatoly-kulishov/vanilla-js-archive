import type { StoryObj } from '@storybook/react';
import { Preloader } from '.';

export default {
  title: 'Components/Preloader',
  component: Preloader,
  argTypes: {
    minimized: {
      description: 'Определяет размер лоадера',
    },
    className: {
      description: 'Позволяет добавить дополнительные стили',
    },
  },
};

type Story = StoryObj<typeof Preloader>;

export const PreloaderDefault: Story = { args: {} };
