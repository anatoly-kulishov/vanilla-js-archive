import {
  CardType,
  InfoFrame,
  PATH_PAGE,
  setBrokerAccStatus,
  setBrokerAccountStatusToLS,
} from '@/shared';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MESSAGE_ICON, TEXT } from '../constants';
import styles from './InvestmentCheck.module.scss';

const InvestmentCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={styles['body']}>
      <InfoFrame
        title={TEXT.title}
        primaryBtnText={TEXT.btnText}
        icon={MESSAGE_ICON}
        cardType={CardType.moveOn}
        onPrimaryButtonClick={() => {
          dispatch(setBrokerAccStatus(true));
          setBrokerAccountStatusToLS(true);
          navigate(PATH_PAGE.investmentLK.briefcase.start);
        }}
      />
    </div>
  );
};

export default InvestmentCheck;
