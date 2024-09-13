import { FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { BackButton, PATH_PAGE, Tabs } from '@/shared';
import { MyCreditCardInformation } from './components';
import { BACK_BUTTON, CARDS_NAV_LINKS } from './constants';

const MyCreditCardPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <Navigate to={PATH_PAGE.cardProducts} replace />;
  }

  const tabs = [
    {
      label: CARDS_NAV_LINKS.creditCardInfo,
      content: <MyCreditCardInformation />,
    },
    {
      label: CARDS_NAV_LINKS.creditCardHistory,
      content: <p />,
    },
  ];

  const handleBackButtonClick = () => navigate(-1);

  return (
    <>
      <BackButton
        click={handleBackButtonClick}
        text={BACK_BUTTON}
        theme='blue'
        height='24'
        width='24'
        name='arrow-left-blue'
      />
      <Tabs tabs={tabs} />
    </>
  );
};

export default MyCreditCardPage;
