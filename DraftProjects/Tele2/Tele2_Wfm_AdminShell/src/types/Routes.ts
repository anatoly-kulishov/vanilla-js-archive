import { ReactNode } from 'react';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

type ChildMenuItem = MenuItem & {
  path: string,
  title: string,
  component: JSX.Element,
};

export type Route = {
  title: string;
  path: string;
  // роли, необхолимые для входа на страницу
  roles?: string[];
  // автоматически при входе перейти на другую страницу
  autoRedirect?: boolean;
  // куда перейти, если нет соответсвующих ролей.
  // Если подходящих страниц по ролям нe находится - рисуется 403 страница
  redirect?: string | string[];
  // переход на другую страницу, если это возможно. Если нет - рисуем текущую
  checkRedirect?: string;
  icon: ReactNode;
  component?: JSX.Element;
  // вложенные страницы
  children?: ChildMenuItem[];
};

export type Routes = Record<string, Route>;
