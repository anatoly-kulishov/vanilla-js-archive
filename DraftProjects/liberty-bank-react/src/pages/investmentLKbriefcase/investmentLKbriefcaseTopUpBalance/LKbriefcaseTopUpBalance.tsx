import {
  BackButton,
  Button,
  Collapse,
  Icon,
  Input,
  PATH_PAGE,
  Text,
  formatNumberWithSpaces,
} from '@/shared';
import { MyRange } from '@/widgets/myRange/MyRange';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './LKbriefcaseTopUpBalance.module.scss';
import { ACCOUNT_OPTIONS, TRANSFER_FEE_INFO } from './consts';

export default function LKbriefcaseTopUpBalance() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { funds, setFunds } = useOutletContext<{
    funds: string;
    setFunds: React.Dispatch<React.SetStateAction<string>>;
  }>();
  const [isError, setIsError] = useState<boolean>(false);

  const [isFieldsError, setIsFieldsError] = useState<boolean>(true);
  const [isWithdrawalAccountFieldError, setIsWithdrawalAccountFieldError] =
    useState<boolean>(false);
  const [isDepositAccountFieldError, setIsDepositAccountFieldError] = useState<boolean>(false);

  const navigate = useNavigate();

  const [selectedWithdrawalAccount, setSelectedWithdrawalAccount] = useState<string>('');
  const [selectedDepositAccount, setSelectedDepositAccount] = useState<string>('');

  useEffect(() => {
    !selectedWithdrawalAccount
      ? setIsWithdrawalAccountFieldError(true)
      : setIsWithdrawalAccountFieldError(false);
    !selectedDepositAccount
      ? setIsDepositAccountFieldError(true)
      : setIsDepositAccountFieldError(false);
  }, [selectedWithdrawalAccount, selectedDepositAccount]);
  useEffect(() => {
    setIsFieldsError(isWithdrawalAccountFieldError || isDepositAccountFieldError);
  }, [isWithdrawalAccountFieldError, isDepositAccountFieldError]);

  const handleClick = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      const fundsValue = funds ? parseInt(funds.replace(/\s/g, '')) : 0;
      const inputValueWithoutSpaces = parseInt(inputValue.replace(/\s/g, ''));
      const sum = inputValueWithoutSpaces + fundsValue;
      setFunds(formatNumberWithSpaces(sum));
      navigate(PATH_PAGE.investmentLK.success);
    }
  };

  return (
    <div className={styles.container}>
      <BackButton
        text='Назад'
        theme='blue'
        name='arrow-left-blue'
        height='24'
        width='24'
        className={styles['back-button']}
      />

      <Text tag='p' size='l' weight='bold'>
        Пополнить брокерский счет
      </Text>

      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px' }}
      >
        <Input.Select
          required={true}
          size='m'
          label='Счет снятия'
          options={ACCOUNT_OPTIONS}
          enableSearch
          isError={isWithdrawalAccountFieldError}
          onMySelect={(value) => setSelectedWithdrawalAccount(value as string)}
        />
        <div className={styles.arrows_container}>
          <Icon className={styles.arrows} icon='arrows-reversed' />
        </div>

        <Input.Select
          required={true}
          size='m'
          enableSearch
          label='Счет зачисления'
          options={ACCOUNT_OPTIONS}
          isError={isDepositAccountFieldError}
          onMySelect={(value) => setSelectedDepositAccount(value as string)}
        />
      </div>

      <div>
        <MyRange
          id='amount'
          ref={inputRef}
          fieldValue='RUB'
          step={1000}
          minValue={10}
          maxValue={100000000}
          isError={isError}
          label='Сумма пополнения'
          setIsError={setIsError}
          size='longest'
        />
        <Button disabled={isFieldsError || isError} onClick={handleClick}>
          Пополнить счет
        </Button>
      </div>
      <Collapse title='Информация о комиссиях и сумме пополнения'>
        <Text tag='p' size='s' weight='regular'>
          {TRANSFER_FEE_INFO}
        </Text>
      </Collapse>
    </div>
  );
}
