import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { BankProductRequest } from '@/entities';
import { CardType, ICreditRequest, InfoFrame, PATH_PAGE } from '@/shared';
import { MESSAGE_ICON, TEXT } from '../constants';
import styles from './MyCreditRequests.module.scss';

export interface IMyCreditRequests {
  creditRequests: ICreditRequest[];
}

export const MyCreditRequests: FC<IMyCreditRequests> = ({ creditRequests }) => {
  const navigate = useNavigate();

  const backToCreditsHandler = () => {
    navigate(PATH_PAGE.creditProducts);
  };

  return (
    <div className={styles.container}>
      {creditRequests.length ? (
        creditRequests.map((request) => <BankProductRequest key={request.id} request={request} />)
      ) : (
        <div className={styles.infoFrame__wrapper}>
          <InfoFrame
            title={TEXT.title}
            primaryBtnText={TEXT.btnText}
            icon={MESSAGE_ICON}
            cardType={CardType.dontOpen}
            onPrimaryButtonClick={backToCreditsHandler}
          />
        </div>
      )}
    </div>
  );
};
