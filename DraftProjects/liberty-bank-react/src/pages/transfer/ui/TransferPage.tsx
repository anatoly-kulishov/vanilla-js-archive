import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Wrapper, BackButton, PATH_PAGE } from '@/shared';
import { TransferForm } from '@/widgets/transferForm';
import { TEXT } from '../model/constants';
import s from './TransferPage.module.scss';

export const TransferPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const transferType = query.get('transferType');
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(PATH_PAGE.transfers.home);
  };

  if (!transferType) {
    return <Navigate to={PATH_PAGE.error} />;
  }

  return (
    <Wrapper size='l'>
      <BackButton
        text={TEXT.backBtn}
        theme='blue'
        height='24'
        width='24'
        name='arrow-left-blue'
        className={s.backBtn}
        click={handleBackClick}
      />
      <TransferForm transferType={transferType} />
    </Wrapper>
  );
};
