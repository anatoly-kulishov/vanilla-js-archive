import { Meta, StoryObj } from '@storybook/react';
import { SkeletonContainer } from '../SkeletonContainer/SkeletonContainer';
import { Skeleton } from './Skeleton';
import s from './Skeleton.stories.module.scss';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    theme: {
      description: 'Цветовая тема',
      control: 'inline-radio',
      options: ['light', 'regular', 'dark'],
    },
    type: {
      description: 'Стилевая тема',
      control: 'inline-radio',
      options: ['title', 'text', 'caption', 'wrapper', 'round'],
    },
    children: {
      description:
        'Дополнительный контент, если компонент используется как обёртка для других компонентов Skeleton (type: wrapper)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    testId: {
      description: 'ID для тестирования',
    },
    className: {
      description: 'Добавление собственного класса для дополнительной стилизации',
    },
  },
  args: {
    theme: 'regular',
    type: 'title',
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Sandbox: Story = {};

export const Composition = () => (
  <SkeletonContainer width='800px' height='150px' className={s.container}>
    <Skeleton theme='light' type='wrapper' className={s.wrapper}>
      <Skeleton theme='dark' type='round' className={s.round} />
      <div className={s.column}>
        <Skeleton theme='dark' type='title' />
        <Skeleton theme='regular' type='text' />
        <Skeleton theme='regular' type='text' />
        <Skeleton theme='regular' type='caption' />
      </div>
    </Skeleton>
    <Skeleton theme='light' type='wrapper' className={s.wrapper}>
      <Skeleton theme='dark' type='round' className={s.round} />
      <div className={s.column}>
        <Skeleton theme='dark' type='title' />
        <Skeleton theme='regular' type='text' />
        <Skeleton theme='regular' type='text' />
        <Skeleton theme='regular' type='caption' />
      </div>
    </Skeleton>
  </SkeletonContainer>
);
