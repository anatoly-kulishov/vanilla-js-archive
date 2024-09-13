import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import {
  Text,
  CURRENCY,
  getAccessToken,
  getCustomerId,
  Input,
  InputSelectTemplate,
  TextPlaceholder,
  useGetAllAccountsQuery,
  Button,
  useGetUserCardsQuery,
} from '@/shared';
import { getAllOptions } from '@/features/transferBetweenOwns/lib/getAllOptions/getAllOptions';
import { ErrorMessage } from '@/features/transferBetweenOwns/ui/errorMessage/ErrorMessage';
import { Label } from '@/features/transferBetweenOwns/ui/label/Label';
import { useTransferByAccountNumberForm } from '../hooks/useTransferByAccountNumberForm';
import { TransferOption } from '../model/types';
import { TEXT } from '../model/constants';
import s from './TransferByAccountNumber.module.scss';

export const TransferByAccountNumber = () => {
  const [allOptions, setAllOptions] = useState<TransferOption[]>([]);
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const { data: userCards, isError: isUserCardsError } = useGetUserCardsQuery(customerId);
  const { data: userAccounts, isError: isUserAccountsError } = useGetAllAccountsQuery({
    customerId: customerId,
    size: 50,
    statuses: 'ACTIVE',
  });

  const { control, handleSubmit, isValid, currentEssenceCurrency } =
    useTransferByAccountNumberForm(allOptions);

  // TODO: Временная реализация пока не готов EP
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (userCards && !isUserCardsError && userAccounts && !isUserAccountsError) {
      const allOptions = getAllOptions(userCards, userAccounts.accounts);

      setAllOptions(allOptions);
    }
  }, [userCards, isUserCardsError, userAccounts, isUserAccountsError]);

  if (isUserCardsError || isUserAccountsError) {
    return null;
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputsContainer}>
        <div className={s.inputWrapper}>
          <Label text={TEXT.selectLabelFrom} />
          <Controller
            control={control}
            name='essenceFrom'
            render={({ field: { onChange, value } }) => (
              <InputSelectTemplate
                defaultContainer={<TextPlaceholder text={TEXT.selectPlaceholder} />}
                options={allOptions}
                value={{
                  value: value,
                  content: allOptions.find((o) => o.value === value)?.content,
                }}
                onChange={(option) => {
                  onChange(option.value);
                }}
              />
            )}
          />
        </div>
        <div className={s.inputWrapper}>
          <Label text={TEXT.recipientAccountLabel} />
          <Controller
            control={control}
            name='recipientAccount'
            render={({ field: { name, onChange }, fieldState: { invalid, error } }) => (
              <>
                <Input.Number
                  white
                  name={name}
                  onChange={onChange}
                  placeholder={TEXT.accountMask}
                  isError={invalid}
                  className={classNames({ [s.input]: error })}
                  mask={TEXT.accountMask}
                  maxLength={TEXT.accountMask.length}
                />
                <ErrorMessage error={error} />
              </>
            )}
          />
        </div>
        <div className={s.inputWrapper}>
          <Label text={TEXT.bicLabel} />
          <Controller
            control={control}
            name='bic'
            render={({ field: { name, onChange }, fieldState: { invalid, error } }) => (
              <>
                <Input.Number
                  white
                  name={name}
                  onChange={onChange}
                  placeholder={TEXT.bicMask}
                  isError={invalid}
                  className={classNames({ [s.input]: error })}
                  mask={TEXT.bicMask}
                  maxLength={TEXT.bicMask.length}
                />
                <ErrorMessage error={error} />
              </>
            )}
          />
        </div>
        <div className={s.inputWrapper}>
          <Label text={TEXT.amountLabel} />
          <Controller
            control={control}
            name='amount'
            render={({ field: { name, onChange }, fieldState: { invalid, error } }) => (
              <>
                <Input.Number
                  white
                  name={name}
                  onChange={onChange}
                  placeholder={TEXT.amountPlaceholder}
                  isError={invalid}
                  className={classNames({ [s.input]: error })}
                  thousandsSeparator
                  min={1}
                  scale={2}
                  contentRight={
                    currentEssenceCurrency && (
                      <Text tag='span' size='s' weight='medium' className={s.currencySymbol}>
                        {CURRENCY[currentEssenceCurrency].text}
                      </Text>
                    )
                  }
                />
                <ErrorMessage error={error} />
              </>
            )}
          />
        </div>
        <div className={s.inputWrapper}>
          <Label text={TEXT.commentLabel} required={false} />
          <Controller
            control={control}
            name='comment'
            render={({ field: { name, onChange }, fieldState: { invalid, error } }) => (
              <>
                <Input.Text
                  white
                  name={name}
                  onChange={onChange}
                  isError={invalid}
                  className={classNames({ [s.input]: error })}
                  placeholder={TEXT.commentPlaceholder}
                />
                <ErrorMessage error={error} />
              </>
            )}
          />
        </div>
      </div>
      <div className={s.btnContainer}>
        <Button theme='secondary' className={s.btn} onClick={handleBackClick}>
          {TEXT.backBtn}
        </Button>
        <Button type='submit' theme='primary' className={s.btn} disabled={!isValid}>
          {TEXT.submitBtn}
        </Button>
      </div>
    </form>
  );
};
