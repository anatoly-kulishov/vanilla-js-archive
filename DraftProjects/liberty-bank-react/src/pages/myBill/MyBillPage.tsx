import { BackButton, Icon, PATH_PAGE, Tabs, Text, useLazyGetMyBillQuery } from '@/shared';
import { MyBillCard } from '@/widgets';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useEffect } from 'react';
import styles from './MyBillPage.module.scss';
import { TEXT } from './constants';

const MyBillPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [getMyBill, { data: bill }] = useLazyGetMyBillQuery();
  useEffect(() => {
    const timer = setTimeout(() => {
      getMyBill(id ?? '');
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [bill?.accountName]);

  const tabs = [
    {
      label: TEXT.infoBillLabel,
      content: bill && <MyBillCard bill={bill} />,
    },
    {
      label: TEXT.historyTransactionsLabel,
      content: <p>История Транзакции</p>,
    },
  ];

  const handleBackButtonClick = () => navigate(PATH_PAGE.myBills);

  // TODO Добавить обработчик ошибок - error boundary или компонент

  return (
    <div className={styles['my-bill-page']}>
      <div className={styles['my-bill-page__back-btn']}>
        <BackButton
          click={handleBackButtonClick}
          text={TEXT.back}
          theme='blue'
          height='24'
          width='24'
          name='arrow-left-blue'
        />
      </div>
      <Text
        tag='h2'
        size='m'
        weight='medium'
        className={styles['my-bill-page__current']}
        data-testid={'account_name'}
      >
        {bill?.accountName}
        {bill && (
          <Link
            to={'changeAccountName'}
            className={styles.link}
            state={bill.accountName}
            data-testid={'change_account_name'}
          >
            <Icon icon={'pencil'} />
          </Link>
        )}
      </Text>
      <div className={styles['my-bills-page__tabs']}>{bill && <Tabs tabs={tabs} />}</div>
    </div>
  );
};

export default MyBillPage;
