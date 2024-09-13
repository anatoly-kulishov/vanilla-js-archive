import { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavBar } from '@/widgets';
import {
  BackButton,
  Icon,
  Text,
  Wrapper,
  getAccessToken,
  getCustomerId,
  getRefreshToken,
  trimQuotesReg,
  useLazyGetCustomerInfoQuery,
} from '@/shared';
import { PERSONAL_DATE_NAVIGATION } from './constans';
import styles from './PersonalAccount.module.scss';

const PATH = [{ path: '/customer/personal-date' }, { path: '/customer/security' }];

const PersonalAccount: FC = () => {
  const location = useLocation();
  const currentPage = PATH.find((path) => path.path === location.pathname);
  const [getCustomerInfo, { data: customerInfo, isSuccess }] = useLazyGetCustomerInfoQuery();
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  useEffect(() => {
    if (accessToken && refreshToken) {
      getCustomerInfo({
        customerId: getCustomerId(accessToken),
        accessToken: accessToken.replace(trimQuotesReg, ''),
      });
    }
  }, [accessToken, refreshToken]);

  return (
    <main className={styles.userData__container}>
      <div className={styles.bgContainer}>
        <Wrapper size='l'>
          <NavBar type='content' links={PERSONAL_DATE_NAVIGATION} />
        </Wrapper>
      </div>
      <Wrapper size='l' className={styles.wrapper}>
        <div className={styles.userData__block}>
          <BackButton
            className={styles.backButton}
            width='24'
            height='24'
            name='arrow-left-blue'
            theme='blue'
            text='Назад'
          />
          {currentPage && (
            <div>
              <div className={styles.userLabel}>
                <Icon icon={'user-add-photo'} widthAndHeight={'80px'} />
                {isSuccess && customerInfo && (
                  <div>
                    <Text tag='h1' weight='bold'>
                      {`${customerInfo.lastName} ${customerInfo.firstName}`}
                    </Text>
                    <Text tag='h1' weight='bold'>
                      {customerInfo.patronymic}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <Outlet />
      </Wrapper>
    </main>
  );
};

export default PersonalAccount;
