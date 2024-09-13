import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BackButton,
  InfoFrame,
  CardType,
  useChangeAccountStatusMutation,
  PATH_PAGE,
} from '@/shared';
import { CloseBillAdditionalActions } from '@/widgets/closeBillAdditionalActions';
import { TEXT } from '../model/constants';
import s from './CloseBill.module.scss';

const CloseBill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isConfirm, setIsConfirm] = useState(false);
  const [updateStatus, { error }] = useChangeAccountStatusMutation();

  const handleBackToAccount = () => {
    navigate(`${PATH_PAGE.myBills}/${id}`);
  };

  const confirmHandle = () => {
    setIsConfirm((p) => !p);
    updateStatus({ id: id ?? '', status: 'CLOSED' })
      .unwrap()
      .then(() => {
        handleBackToAccount();
      })
      .catch((error) => {
        if (error.status !== 400) {
          navigate(PATH_PAGE.error, {
            state: { error: error, path: `${PATH_PAGE.myBills}/${id}` },
          });
        }
      });
  };

  return (
    <div className={s.billPage}>
      <div className={s.backBtnWrapper}>
        <BackButton
          click={handleBackToAccount}
          text={TEXT.back}
          theme='blue'
          height='24'
          width='24'
          name='arrow-left-blue'
        />
      </div>
      <div className={s.infoFrameWrapper}>
        {!isConfirm && (
          <InfoFrame
            icon={{ width: '244', height: '200', image: 'choiceIsYesNo' }}
            primaryBtnText={TEXT.yes}
            secondaryBtnText={TEXT.no}
            title={TEXT.confirmTitle}
            cardType={CardType.closeBill}
            onPrimaryButtonClick={confirmHandle}
            onSecondaryButtonClick={handleBackToAccount}
          />
        )}
        <CloseBillAdditionalActions cancelHandle={handleBackToAccount} error={error} />
      </div>
    </div>
  );
};

export default CloseBill;
