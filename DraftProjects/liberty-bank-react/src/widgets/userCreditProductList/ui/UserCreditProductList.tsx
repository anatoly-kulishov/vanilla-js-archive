import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProduct } from '@/entities';
import { CardType, ICreditInfo, InfoFrame, PATH_PAGE } from '@/shared';
import { BUTTON_TEXT, MESSAGE_ICON, TITLE_TEXT } from '../constants';
import styles from './UserCreditProductList.module.scss';

interface IUserCreditProductList {
  creditInfoList: ICreditInfo[];
}

export const UserCreditProductList: FC<IUserCreditProductList> = ({ creditInfoList }) => {
  const navigate = useNavigate();

  return creditInfoList.length ? (
    <ul className={styles['container']}>
      {creditInfoList.map(
        ({ id, currencyCode, creditAmount, name, terminationDate, interestRate }) => (
          <UserProduct
            interestRate={interestRate}
            currencyCode={currencyCode}
            currentBalance={creditAmount}
            name={name}
            closeDate={terminationDate}
            id={id}
            key={id}
            type='credit'
          />
        ),
      )}
    </ul>
  ) : (
    <div className={styles.wrapper}>
      <InfoFrame
        title={TITLE_TEXT}
        primaryBtnText={BUTTON_TEXT}
        icon={MESSAGE_ICON}
        cardType={CardType.dontOpen}
        onPrimaryButtonClick={() => {
          navigate(PATH_PAGE.creditProducts);
        }}
      />
    </div>
  );
};
