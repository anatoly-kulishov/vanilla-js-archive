import {
  BackButton,
  PATH_PAGE,
  getAccessToken,
  getCustomerId,
  useChangeCardStatusMutation,
} from '@/shared';
import SmsValidation from '@/widgets/smsValidation/SmsValidation';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CardClosePage.module.scss';
import { TEXT } from './constants';

const CardClosePage = () => {
  const [isValidSms, setIsValidSms] = useState(false);
  const { id } = useParams();
  const [changeStatus, { isSuccess }] = useChangeCardStatusMutation();
  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && isValidSms) {
      changeStatus({ cardId: id, cardStatus: 'CLOSED', customerId });
    }
  }, [isValidSms]);

  useEffect(() => {
    if (isSuccess && isValidSms) {
      navigate(`${PATH_PAGE.myCards}/${id}`);
    }
  }, [isSuccess]);

  return (
    <div className={styles['my-card-page']}>
      <div className={styles['my-card-page__back-btn']}>
        <BackButton text={TEXT.back} theme='blue' height='24' width='24' name='arrow-left-blue' />
      </div>
      <div className={styles['cards-container']}>
        <SmsValidation setIsValidSms={setIsValidSms} />
      </div>
    </div>
  );
};

export default CardClosePage;
