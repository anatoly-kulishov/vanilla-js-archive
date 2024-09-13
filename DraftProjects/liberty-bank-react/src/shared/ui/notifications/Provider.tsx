import { ReactNode, createContext, useMemo, useState } from 'react';
import { TSvgIconNames } from '../icon';
import { Notifications } from './Notifications';

interface Notification {
  type: Extract<'success' | 'warning' | 'error', TSvgIconNames>;
  id: number;
  title?: string;
  label?: string;
  delay?: number;
}

interface INotifyAction {
  push: (item: Notification) => void;
  remove: (id: number) => void;
}

export const NotifyContext = createContext<Notification[]>([]);

export const NotifyActionContext = createContext<INotifyAction>({
  push: () => {},
  remove: () => {},
});

interface Props {
  children: ReactNode;
}

export const Provider = ({ children }: Props) => {
  const [value, setValue] = useState<Notification[]>([]);

  const push = (item: Notification) => {
    setValue((prev) => [...prev, item]);
  };

  const remove = (id: number) => {
    setValue((prev) => prev.filter((e) => e.id !== id));
  };

  const methods = useMemo(() => ({ push, remove }), []);

  return (
    <NotifyContext.Provider value={value}>
      <NotifyActionContext.Provider value={methods}>
        <div>{children}</div>
        <Notifications />
      </NotifyActionContext.Provider>
    </NotifyContext.Provider>
  );
};
