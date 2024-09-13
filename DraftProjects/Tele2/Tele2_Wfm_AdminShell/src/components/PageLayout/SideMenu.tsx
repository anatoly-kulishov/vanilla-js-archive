import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Layout, MenuProps } from 'antd';
import Icon from '@ant-design/icons';

import routes from 'constants/routes';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import useWindowSize from 'hooks/useWindowResize';

type Props = {
};

const siderClassName = cn('sider');

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const SideMenu: FC<Props> = () => {
  const location = useLocation();
  const { width } = useWindowSize();

  const [isCollapseSider, setIsCollapseSider] = useState<boolean>(false);

  useEffect(() => {
    if (!width) {
      return;
    }

    if (width <= 1440) {
      setIsCollapseSider(true);
    }
  }, [width]);

  const activeItem = useMemo(() => {
    if (location.pathname === '/') {
      return undefined;
    }

    const item = Object.entries(routes).find(([key, route]) => (
      key !== 'main' && location.pathname.includes(route.path)
    ));

    return item && [item[0]];
  }, [location]);

  const menuItems: MenuItem[] = useMemo(() => (
    Object.entries(routes)
      .map(([key, item]) => ({
        key,
        icon: <Icon component={item.icon as React.ForwardRefExoticComponent<any>} />,
        label: ((activeItem && activeItem[0] === key) || item.children?.length)
          ? item.title
          : <Link to={item.path}>{item.title}</Link>,
        children: item?.children ? item.children.map((child) => ({
          ...child,
          label: <Link to={child.path}>{child.title}</Link>,
        })) : null,
      }))
  ), [activeItem]);

  return (
    <Sider
      collapsible
      className={siderClassName()}
      collapsed={isCollapseSider}
      onCollapse={setIsCollapseSider}
    >
      <Menu
        items={menuItems}
        className={siderClassName('menu')}
        defaultSelectedKeys={activeItem}
        mode="inline"
      />
    </Sider>
  );
};

export default SideMenu;
