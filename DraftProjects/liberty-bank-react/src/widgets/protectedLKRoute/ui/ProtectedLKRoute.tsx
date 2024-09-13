import { CardType, InfoFrame, PATH_PAGE, getBrokerAccStatus } from '@/shared';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextTitles } from '../consts';
import styles from './ProtectedLKRoute.module.scss';

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedLKRoute = ({ children }: ProtectedRouteProps) => {
  const status = useSelector(getBrokerAccStatus);
  const navigate = useNavigate();

  const handleButtonClick = (destination: string) => {
    navigate(destination);
  };

  return status ? (
    children
  ) : (
    <div className={styles.frame_body}>
      <InfoFrame
        title={TextTitles.title}
        icon={{ width: '244', height: '200', image: 'failed-open-bill' }}
        primaryBtnText='Открыть брокерский счет'
        onPrimaryButtonClick={() => handleButtonClick(PATH_PAGE.investmentDocuments)}
        cardType={CardType.applicationDeclined}
      />
    </div>
  );
};

export default ProtectedLKRoute;
