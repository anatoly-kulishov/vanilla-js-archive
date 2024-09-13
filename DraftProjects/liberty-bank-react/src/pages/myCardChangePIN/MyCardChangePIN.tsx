import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangePINForm, PINs } from '@/widgets';
// TODO: Тут этап с СМС аутентификацией отключён до создания SMS Service
/* import SmsValidation from '@/widgets/smsValidation/SmsValidation'; */
import {
  BackButton,
  PATH_PAGE,
  Text,
  getAccessToken,
  getCustomerId,
  useChangePINMutation,
  useNotify,
} from '@/shared';
import { TEXT } from './constants';
import styles from './MyCardChangePIN.module.scss';

const MyCardChangePIN = () => {
  const notify = useNotify();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isPinValid, setIsPinValid] = useState(false);
  // TODO: Тут этап с СМС аутентификацией отключён до создания SMS Service
  /* const [isSmsValid, setIsSmsValid] = useState(false); */
  const [PINs, setPINs] = useState<PINs>({ oldPin: '', newPin: '' });
  const [changePIN] = useChangePINMutation();

  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);

  const handleBackButtonClick = () => navigate(`/cards/my-cards/${id}`);

  useEffect(() => {
    if (isPinValid /* && isSmsValid */) {
      changePIN({ id: id || '', oldPincode: PINs.oldPin, newPincode: PINs.newPin, customerId })
        .unwrap()
        .then(
          () => notify.success(),
          () => notify.error(),
        )
        .then(() => navigate(`${PATH_PAGE.myCards}/${id}`));
    }
  }, [isPinValid /* , isSmsValid */]);

  return (
    <div className={styles['my-card-page']}>
      <div className={styles['my-card-page__back-btn']}>
        <BackButton
          click={handleBackButtonClick}
          text={TEXT.back}
          theme='blue'
          height='24'
          width='24'
          name='arrow-left-blue'
        />
      </div>
      <Text tag='h2' size='m' weight='medium' className={styles['my-card-page__header']}>
        Изменить PIN-код
      </Text>
      <div className={styles['cards-container']}>
        <ChangePINForm pinValidation={setIsPinValid} setPINs={setPINs} />
        {/* TODO: Тут этап с СМС аутентификацией отключён до создания SMS Service
        {!isPinValid ? (
          <ChangePINForm pinValidation={setIsPinValid} setPINs={setPINs} />
        ) : (
          <SmsValidation setIsValidSms={setIsSmsValid} />
        )} */}
      </div>
    </div>
  );
};

export default MyCardChangePIN;
