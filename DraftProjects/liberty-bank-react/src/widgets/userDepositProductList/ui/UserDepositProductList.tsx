import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProduct } from '@/entities';
import { CardType, IUserProduct, InfoFrame, PATH_PAGE } from '@/shared';
import { BTN_TEXT, MESSAGE_ICON, TITLE } from '../constants';
import styles from './UserDepositProductList.module.scss';

interface IUserDepositProductList {
  userDepositList: IUserProduct[];
}

export const UserDepositProductList: FC<IUserDepositProductList> = ({ userDepositList }) => {
  const navigate = useNavigate();

  return userDepositList.length ? (
    <ul className={styles.container}>
      {userDepositList.map(
        ({ id, name, currencyCode, closeDate, interestRate, currentBalance }) => {
          return (
            <UserProduct
              key={id}
              id={id}
              currentBalance={currentBalance}
              closeDate={closeDate}
              currencyCode={currencyCode}
              interestRate={interestRate}
              name={name}
              type='deposit'
            />
          );
        },
      )}
    </ul>
  ) : (
    <div className={styles.wrapper}>
      <InfoFrame
        title={TITLE}
        primaryBtnText={BTN_TEXT}
        icon={MESSAGE_ICON}
        cardType={CardType.dontOpen}
        onPrimaryButtonClick={() => {
          navigate(PATH_PAGE.depositProducts);
        }}
      />
    </div>
  );
};
