import { Wrapper, Text } from '@/shared';
import { Outlet } from 'react-router-dom';
import { NavMenu } from '@/shared/ui/navMenu';
import { NAV_BODY_ITEM, Title } from '../constants';
import styles from './InvestmentLK.module.scss';

const InvestmentLK = () => {
  return (
    <Wrapper size='l'>
      <Text tag={'h1'} weight={'bold'} className={styles['title']}>
        {Title}
      </Text>
      <NavMenu
        items={NAV_BODY_ITEM}
        colorText='secondary'
        activeColorText='action'
        weight='medium'
        activePadding='M'
      />

      <Outlet />
    </Wrapper>
  );
};

export default InvestmentLK;
