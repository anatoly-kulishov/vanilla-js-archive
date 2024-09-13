import { useContext } from 'react';
import { generateUniqueID } from '@/shared';
import { DELAY } from './const';
import { NotifyActionContext, Provider } from './Provider';
import { Notifications } from './Notifications';

interface Options {
  type: 'success' | 'warning' | 'error';
  title?: string;
  label?: string;
  delay?: number;
}

export const useNotify = () => {
  const { push, remove } = useContext(NotifyActionContext);

  const notify = (options: Options) => {
    const id = generateUniqueID();
    push({ id, ...options });
    setTimeout(() => {
      remove(id);
    }, options.delay || DELAY);
  };

  const success = (options?: Omit<Options, 'type'>) => {
    notify({ type: 'success', ...options });
  };

  const warning = (options?: Omit<Options, 'type'>) => {
    notify({ type: 'warning', ...options });
  };

  const error = (options?: Omit<Options, 'type'>) => {
    notify({ type: 'error', ...options });
  };

  notify.success = success;
  notify.warning = warning;
  notify.error = error;
  notify.Provider = Provider;
  notify.Notifications = Notifications;

  return notify;
};
