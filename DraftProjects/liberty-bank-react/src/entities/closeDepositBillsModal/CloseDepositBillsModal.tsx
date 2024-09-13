import { FC, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Button,
  CURRENCY,
  CardType,
  InfoFrame,
  Link,
  PATH_PAGE,
  RadioButton,
  Spinner,
  Text,
  getAccessToken,
  getCustomerId,
  useGetAllAccountsQuery,
} from '@/shared';
import { TEXT } from './constants';
import style from './CloseDepositBillsModal.module.scss';

interface IProps {
  hideBillsModal: () => void;
}

export const CloseDepositBillsModal: FC<IProps> = ({ hideBillsModal }) => {
  const [selectedBillAccountNumber, setSelectedBillAccountNumber] = useState<string | null>(null);
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const {
    data: myAccounts,
    error,
    isLoading,
  } = useGetAllAccountsQuery({
    customerId: customerId,
    statuses: 'ACTIVE',
    sort: ['PAYMENT'],
  });

  if (error) {
    if ('status' in error && error.status === 404) {
      return (
        <InfoFrame
          title={TEXT.titleError}
          cardType={CardType.closeBill}
          icon={{ width: '227', height: '200', image: 'question-lady' }}
          secondaryBtnText={TEXT.btnCancel}
          onSecondaryButtonClick={hideBillsModal}
          primaryBtnText={TEXT.openNewBill}
          onPrimaryButtonClick={() => navigate(PATH_PAGE.createCurrentAccount)}
        />
      );
    }
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <div className={style.container}>
      <Text tag='h2' weight='medium' className={style.title}>
        {TEXT.title}
      </Text>
      <Text tag='span' size='xss' weight='regular' className={style.description}>
        {TEXT.description}
      </Text>

      <div className={style.billsContainer}>
        {isLoading && <Spinner />}
        {myAccounts?.accounts.map((bill) => (
          <div
            key={bill.id}
            className={
              selectedBillAccountNumber === bill.accountNumber
                ? style.activeBill
                : style.billWrapper
            }
          >
            <div className={style.billNumber}>
              <RadioButton
                value={bill.accountNumber}
                name='bills'
                hideCircle
                icon={CURRENCY[bill.currency]}
                label={bill.accountNumber}
                width='max'
                transparent
                onChange={() => setSelectedBillAccountNumber(bill.accountNumber)}
              />
            </div>
            {bill.isMain && (
              <div className={style.isMain}>
                <Text tag='span' size='xss' weight='medium'>
                  {TEXT.mainBill}
                </Text>
              </div>
            )}
          </div>
        ))}
      </div>

      <Link to={PATH_PAGE.createCurrentAccount}>{TEXT.openNewBill}</Link>
      <div className={style.doubleBtn}>
        <Button
          onClick={hideBillsModal}
          type='button'
          theme='secondary'
          size='m'
          width='max'
          className={style.btn}
        >
          {TEXT.btnCancel}
        </Button>
        <Button
          onClick={() => {}}
          type='button'
          theme='primary'
          size='m'
          width='max'
          className={style.btn}
          disabled={!selectedBillAccountNumber}
        >
          {TEXT.confirm}
        </Button>
      </div>
    </div>
  );
};
