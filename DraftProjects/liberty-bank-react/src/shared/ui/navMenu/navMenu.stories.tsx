import type { StoryObj } from '@storybook/react';
import { NavMenu } from '.';
import { NAV_BODY_ITEM } from '../../../app/layouts/mainBodyLayout/constants';
import { BrowserRouter } from 'react-router-dom';
import { PAGES } from './constants';

export default {
  title: 'Components/navMenu',
  component: NavMenu,
  argTypes: {
    items: {
      description: 'Элементы списка',
    },
    colorText: {
      description: 'Цвет текста',
    },
    activeColorText: {
      description: 'Подсветка активной ссылки',
      control: 'inline-radio',
      options: ['action', '-'],
    },
    activePadding: {
      description: 'Величина отступа активной сслыки',
    },
    weight: {
      description: 'font-weight',
    },
    disableActive: {
      description: 'блокировка конопок',
    },
  },
  args: {
    activeColorText: 'action',
  },
};

type Story = StoryObj<typeof NavMenu>;

export const MainBodyNavMenu: Story = {
  args: { items: NAV_BODY_ITEM, colorText: 'secondary', activePadding: 'S', weight: 'medium' },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ margin: '20px' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export const HeaderNavMenu: Story = {
  args: { items: PAGES, colorText: 'primary', activePadding: 'M' },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ margin: '20px' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};
