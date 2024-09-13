import { DocumentTab, PhoneTab } from '@/features';
import { Link, PATH_PAGE, Tabs, Text, Wrapper } from '@/shared';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './LoginPage.module.scss';

const LoginPage: FC = () => {
  const tabs = [
    {
      label: 'Телефон',
      content: <PhoneTab />,
    },
    {
      label: 'Документ',
      content: <DocumentTab />,
    },
  ];

  return (
    <main>
      <Wrapper>
        <div className={styles.widget}>
          <Text tag='h1' weight='bold' className={styles.title}>
            Привет!
          </Text>
          <Text tag='h1' weight='bold' className={classNames(styles.title, styles.title_bottom)}>
            Войдите в Liberty Bank
          </Text>
          <Tabs theme='secondary' tabs={tabs} isGrayInactiveBorder />
          <Text tag='p' className={styles.registration}>
            <span className={styles.title}>У вас нет аккаунта?&nbsp;</span>
            <Link to={PATH_PAGE.registration}>Зарегистрируйтесь</Link>
          </Text>
        </div>
      </Wrapper>
    </main>
  );
};

export default LoginPage;
