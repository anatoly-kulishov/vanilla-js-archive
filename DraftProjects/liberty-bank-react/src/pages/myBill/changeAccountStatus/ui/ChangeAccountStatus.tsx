import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BackButton, InfoFrame, CardType, useChangeAccountStatusMutation } from '@/shared';
import { TEXT } from '../constants';
import styles from './ChangeAccountStatus.module.scss';

const ChangeAccountStatus = () => {
  const { id } = useParams();
  if (!id) return null;
  const navigate = useNavigate();
  const [updateStatus] = useChangeAccountStatusMutation();

  const cancelHandle = () => {
    navigate(`/my-bills/${id}`);
  };
  const { state: bill } = useLocation();
  const accountStatus = bill.key.bill.status;

  const confirmHandle = () => {
    updateStatus({ id: id, status: accountStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE' }).then(() =>
      navigate(`/my-bills/${id}`, { replace: true }),
    );
  };

  return (
    <div className={styles['my-bill-page']}>
      <div className={styles['my-bill-page__back-btn']}>
        <BackButton
          text={TEXT.back}
          click={cancelHandle}
          theme='blue'
          height='24'
          width='24'
          name='arrow-left-blue'
        />
        <div className={styles['cards-container']}>
          <InfoFrame
            icon={{ width: '244', height: '200', image: 'choiceIsYesNo' }}
            primaryBtnText={TEXT.yes}
            secondaryBtnText={TEXT.no}
            title={accountStatus === 'ACTIVE' ? TEXT.confirmBlockTitle : TEXT.confirmUnblockTitle}
            subTitle={accountStatus === 'ACTIVE' ? TEXT.confirmBlockSubTitle : ''}
            cardType={CardType.closeBill}
            onPrimaryButtonClick={confirmHandle}
            onSecondaryButtonClick={cancelHandle}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeAccountStatus;
