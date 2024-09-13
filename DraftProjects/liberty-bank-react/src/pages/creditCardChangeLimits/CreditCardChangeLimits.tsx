import { FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ChangeLimitsForm } from '@/widgets';
import { BackButton, PATH_PAGE, Text } from '@/shared';
import { BACK_BUTTON, TITLE } from './constants';
import styles from './CreditCardChangeLimits.module.scss';

const CreditCardChangeLimits: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <Navigate to={PATH_PAGE.cardProducts} replace />;
  }

  const handleBackButtonClick = () => navigate(-1);

  return (
    <>
      <div>
        <BackButton
          click={handleBackButtonClick}
          text={BACK_BUTTON}
          theme='blue'
          height='24'
          width='24'
          name='arrow-left-blue'
        />
      </div>
      <Text tag='h2' size='m' weight='medium' className={styles.title}>
        {TITLE}
      </Text>

      <ChangeLimitsForm />
    </>
  );
};
export default CreditCardChangeLimits;
