import {
  FC,
  lazy,
  Suspense,
  useMemo,
} from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useAuth } from 'oidc-react';

import {
  Skeleton,
  Switch,
  Typography,
  Layout,
} from 'antd';

import cn from '@t2crm/wfm-utils/lib/utils/cn';

import HeaderMenu from './HeaderMenu';
import SideMenu from './SideMenu';

import './styles.less';
import SelectPartner from './SelectPartner';

// @ts-ignore
const Person = lazy(() => import('tele2_wfm_uilibraryapp/components/Person'));

const { Text } = Typography;
const { Content } = Layout;

const layoutClassname = cn('layout');
const headerClassname = cn('header');

type PagesProps = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
};

const PageLayout: FC<PagesProps> = ({ children, isDarkMode, setIsDarkMode }) => {
  const auth = useAuth();

  const [userName, positionName] = useMemo<string[]>(
    () => {
      const { userData } = auth;
      const displayName = userData?.profile?.display_name;
      return [displayName, 'Должность'];
    },
    [auth],
  );

  return (
    <div className={layoutClassname()}>
      <header className={layoutClassname('header')}>
        <div className={headerClassname('information')}>
          <div className={headerClassname('switches')}>
            <div className={headerClassname('theme-switch')}>
              <Text className={headerClassname('theme')}>
                <Text strong>{isDarkMode ? 'Темная' : 'Светлая'}</Text>
                <Text>тема</Text>
              </Text>
              <Switch
                onChange={setIsDarkMode}
                defaultChecked={isDarkMode}
              />
            </div>
            <SelectPartner />
          </div>

          <Suspense fallback={<Skeleton.Input active style={{ width: 200, height: 70 }} />}>
            <Person
              name={userName}
              post={positionName}
              className={headerClassname('person')}
              size="big"
            />
          </Suspense>
          <HeaderMenu />
        </div>
      </header>
      <Layout className={layoutClassname('layout-content')}>
        <SideMenu />
        <Content className={layoutClassname('content')}>
          {children}
        </Content>
      </Layout>
    </div>
  );
};

export default PageLayout;
