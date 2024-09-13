import { StoryFn } from '@storybook/react';
import { Notifications } from './Notifications';
import { useNotify } from '.';
import { Provider } from './Provider';
import styles from './Notifications.module.scss';

type StoryType = StoryFn<typeof Notifications>;

export default {
  title: 'Components/Notification',
  component: Notifications,
  argTypes: {
    className: { description: 'Добавление собственного класса для дополнительной стилизации' },
  },
  decorators: [
    (Story: StoryType) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
};

export const Default = () => {
  const notify = useNotify();
  const notifyList = ['success', 'warning', 'error'] as const;

  return (
    <div className={styles.stories}>
      {notifyList.map((item) => (
        <button key={item} onClick={() => notify[item]()}>
          {item}
        </button>
      ))}
    </div>
  );
};
