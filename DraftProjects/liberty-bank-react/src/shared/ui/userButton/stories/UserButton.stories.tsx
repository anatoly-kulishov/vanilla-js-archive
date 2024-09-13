import { Meta, StoryObj } from '@storybook/react';
import { UserButton } from '../UserButton';
import { BrowserRouter } from 'react-router-dom';
import styles from './styles.module.scss';

const meta: Meta<typeof UserButton> = {
  title: 'Components/UserButton',
  component: UserButton,
  tags: ['autodocs'],
  argTypes: {
    valueFullName: {
      description: 'ФИО пользователя',
      control: 'text',
    },
    message: {
      description: 'Отображение кнопок, показывающих наличие сообщений и/или уведомлений',
      options: ['message', 'mail', 'all'],
      control: 'inline-radio',
    },
    menuItems: {
      description: 'Конфигурация перенаправляющих кнопок',
    },
  },
  args: {
    valueFullName: 'Иванов Иван Иванович',
    menuItems: [
      {
        to: '/',
        label: 'Личные данные',
        icon: 'personalData',
      },
      { to: '/', label: 'Безопасность', icon: 'security' },
      {
        to: '/',
        label: 'Уведомления',
        icon: 'notification',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof UserButton>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};
export const Anonymous: Story = {
  args: {
    valueFullName: '',
    menuItems: [
      {
        to: '/',
        label: 'Связь с банком',
        icon: 'connection-with-bank',
      },
      {
        to: '/',
        label: 'Войти',
        icon: 'exit',
      },
    ],
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className={styles.wrapper}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};
