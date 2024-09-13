import { useAuth } from 'oidc-react';
import { Button, Dropdown } from 'antd';
import { MoreOutlined, LogoutOutlined } from '@ant-design/icons';

function HeaderMenu() {
  const auth = useAuth();

  const items = [{
    key: 1,
    icon: <LogoutOutlined />,
    label: (
      <div
        onClick={auth.signOutRedirect}
        role="none"
      >
        Выйти
      </div>
    ),
  }];

  return (
    <Dropdown trigger={['click']} menu={{ items }}>
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
}

export default HeaderMenu;
