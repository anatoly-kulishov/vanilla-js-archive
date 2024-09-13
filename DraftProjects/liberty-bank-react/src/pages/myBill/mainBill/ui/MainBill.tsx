import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton, InfoFrame, CardType, Wrapper, useChangeIsMainMutation } from '@/shared';
import { TEXT } from '../constants';
import styles from './MainBill.module.scss';

const MainBill = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(true);
  const [updateIsMain, { error, status }] = useChangeIsMainMutation();

  let errorMessage: string = '';

  if (error) {
    if ('data' in error) {
      const data = error.data;
      if (data && typeof data === 'object' && 'message' in data) {
        errorMessage = data.message as string;
      }
    }
  }

  const cancelHandle = () => {
    navigate(`/my-bills/${id}`);
  };

  const confirmHandle = () => {
    setIsConfirm((confirm) => !confirm);
    updateIsMain({ id: id ?? '', isMain: true });
  };

  const successHandle = () => {
    navigate(`/my-bills/${id}`, { replace: true });
  };

  const successResult = !isConfirm && !errorMessage && status !== 'pending';

  // TODO Добавить обработчик ошибок - error boundary или компонент

  return (
    <Wrapper size={'l'}>
      <div className={styles['my-bill-page__back-btn']}>
        <BackButton text={TEXT.back} theme='blue' height='24' width='24' name='arrow-left-blue' />
      </div>
      <div className={styles['cards-container']}>
        {isConfirm && (
          <InfoFrame
            icon={{ width: '244', height: '200', image: 'choiceIsYesNo' }}
            primaryBtnText={TEXT.yes}
            secondaryBtnText={TEXT.no}
            title={TEXT.confirmTitle}
            cardType={CardType.closeBill}
            onPrimaryButtonClick={confirmHandle}
            onSecondaryButtonClick={cancelHandle}
          />
        )}
        {successResult && (
          <InfoFrame
            icon={{ width: '244', height: '200', image: 'successfully-closed-bill' }}
            primaryBtnText={TEXT.backToBill}
            title={TEXT.success}
            cardType={CardType.closeBill}
            onPrimaryButtonClick={successHandle}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default MainBill;
