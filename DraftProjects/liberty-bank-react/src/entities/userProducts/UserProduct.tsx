import { FC } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import {
  PATH_PAGE,
  Text,
  formatNumberWithSpaces,
  IUserProduct,
  formatDate,
  Button,
  Icon,
  TSvgIconNames,
  formatInterestRate,
} from '@/shared';
import { THRESHOLD_DAYS, USER_PRODUCT_TEXT } from './constants';
import { isWarningDate } from './utils';
import { CURRENCIES } from '..';
import styles from './UserProduct.module.scss';

export const UserProduct: FC<Omit<IUserProduct, 'depAccountNumber'>> = ({
  name,
  currencyCode,
  closeDate,
  interestRate,
  currentBalance,
  id,
  type,
}) => {
  const navigate = useNavigate();

  const handleButtonNavigate = () => {
    if (type === 'deposit') navigate(generatePath(PATH_PAGE.depositUserInformation, { id }));
    if (type === 'credit') navigate(generatePath(PATH_PAGE.myCreditInfo, { id }));
  };

  return (
    <li className={styles.container}>
      <div className={styles.titleBlock}>
        <Icon icon={CURRENCIES[currencyCode] as TSvgIconNames} widthAndHeight='64px' />
        <Text tag='h2' size='m' weight='medium' className={styles.depositTitle}>
          {name}
        </Text>
      </div>
      <div className={styles.blockWrapper}>
        <Text tag='p' size='xs'>
          {USER_PRODUCT_TEXT.interestRate}
        </Text>
        <Text tag='h2' size='l' weight='medium' data-testid='interestRate'>
          {formatInterestRate(interestRate)} %
        </Text>
      </div>
      <div className={styles.blockWrapper}>
        <Text tag='p' size='xs'>
          {type === 'credit' ? USER_PRODUCT_TEXT.amountCredit : USER_PRODUCT_TEXT.amountOnDeposit}
        </Text>
        <Text tag='h2' size='m' weight='medium' data-testid='currentBalance'>
          {formatNumberWithSpaces(currentBalance, 2) + ' ' + currencyCode}
        </Text>
      </div>
      <div className={styles.blockWrapper}>
        <Text tag='p' size='xs'>
          {type === 'credit'
            ? USER_PRODUCT_TEXT.closeDateCredit
            : USER_PRODUCT_TEXT.closeDateDeposit}
        </Text>
        <Text
          tag='h2'
          size='m'
          weight='medium'
          data-testid='closeData'
          className={classNames({ [styles.warning]: isWarningDate(closeDate, THRESHOLD_DAYS) })}
        >
          {formatDate(closeDate)}
        </Text>
      </div>
      <Button type='button' theme='secondary' width='auto' size='m' onClick={handleButtonNavigate}>
        {USER_PRODUCT_TEXT.buttonShowMore}
      </Button>
    </li>
  );
};
