import {
  UserButton,
  getAccessToken,
  getCustomerId,
  trimQuotesReg,
  useLazyGetCustomerInfoQuery,
  useNotify,
} from '@/shared';
import { Footer, Header } from '@/widgets';
import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { arrayUserButtonData } from './consts';

const PATH = ['/reset', '/registration', '/login'];

const MainLayout: FC = () => {
  const { Provider } = useNotify();
  const location = useLocation();
  const currentPage = PATH.find((path) => path === location.pathname);
  const [accessToken, setAccessToken] = useState(getAccessToken());
  const [getCustomerInfo, { data: customerInfo }] = useLazyGetCustomerInfoQuery();

  useEffect(() => {
    const updateToken = () => setAccessToken(getAccessToken());
    window.addEventListener('storage', updateToken);
    return () => window.removeEventListener('storage', updateToken);
  }, []);

  useEffect(() => {
    if (accessToken) {
      getCustomerInfo({
        customerId: getCustomerId(accessToken),
        accessToken: accessToken.replace(trimQuotesReg, ''),
      });
    }
  }, [accessToken]);

  return (
    <div className={styles.bodyContainer}>
      <Provider>
        <Header>
          <div className={styles.rightMenu}>
            {!currentPage && customerInfo && accessToken && (
              <UserButton
                valueFullName={`${customerInfo?.lastName} ${customerInfo?.firstName} ${customerInfo?.patronymic}`}
                menuItems={arrayUserButtonData}
              />
            )}
          </div>
        </Header>
        <div className={styles.mainContainer}>
          <Outlet />
        </div>
        <Footer />
      </Provider>
    </div>
  );
};

export default MainLayout;
