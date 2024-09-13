import { Wrapper } from '@/shared';
import { InsuranceRecomendation, NavBar } from '@/widgets';
import { Outlet } from 'react-router-dom';
import { NAV_LINKS } from './constants';

const InsurancePage = () => {
  return (
    <Wrapper size='l'>
      <NavBar links={NAV_LINKS} type='content' />
      <Outlet />
      <InsuranceRecomendation />
    </Wrapper>
  );
};

export default InsurancePage;
