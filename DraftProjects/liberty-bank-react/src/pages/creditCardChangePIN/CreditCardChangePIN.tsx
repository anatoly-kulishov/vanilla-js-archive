import { FC, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ChangePINForm, PINs } from '@/widgets';
import { BackButton, PATH_PAGE, Text, useChangeCreditCardPINMutation, useNotify } from '@/shared';
import { BACK_BUTTON, TITLE } from './constants';
import styles from './CreditCardChangePIN.module.scss';

const CreditCardChangeLimits: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const notify = useNotify();

  const [isPinValid, setIsPinValid] = useState(false);
  // TODO: Тут этап с СМС аутентификацией отключён до создания SMS Service
  /* const [isSmsValid, setIsSmsValid] = useState(false); */
  const [PINs, setPINs] = useState<PINs>({ oldPin: '', newPin: '' });
  const [changePIN] = useChangeCreditCardPINMutation();

  useEffect(() => {
    if (isPinValid /* && isSmsValid */) {
      changePIN({ id: id || '', pin: PINs.newPin })
        .unwrap()
        .then(
          () => notify.success(),
          () => notify.error(),
        )
        .then(() => navigate(`${PATH_PAGE.myCards}/${id}`));
    }
  }, [isPinValid /* , isSmsValid */]);

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

      <ChangePINForm pinValidation={setIsPinValid} setPINs={setPINs} />
      {/* TODO: Тут этап с СМС аутентификацией отключён до создания SMS Service
        {!isPinValid ? (
          <ChangePINForm pinValidation={setIsPinValid} setPINs={setPINs} />
        ) : (
          <SmsValidation setIsValidSms={setIsSmsValid} />
        )} */}
    </>
  );
};
export default CreditCardChangeLimits;
