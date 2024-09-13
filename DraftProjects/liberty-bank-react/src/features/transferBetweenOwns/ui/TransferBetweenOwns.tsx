import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import classNames from 'classnames';
import {
  Text,
  Input,
  Button,
  CURRENCY,
  getCustomerId,
  getAccessToken,
  TextPlaceholder,
  InputSelectTemplate,
  useGetUserCardsQuery,
  useGetAllAccountsQuery,
} from '@/shared';
import { useTransferBetweenOwnsForm } from '../hooks/useTransferBetweenOwnsForm/useTransferBetweenOwnsForm';
import { getAllOptions } from '../lib/getAllOptions/getAllOptions';
import { TransferOption } from '../model/types';
import { TEXT } from '../model/constants';
import { ErrorMessage } from './errorMessage/ErrorMessage';
import { Label } from './label/Label';
import s from './TransferBetweenOwns.module.scss';

export const TransferBetweenOwns = () => {
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
  const { control, handleSubmit, currentEssenceCurrency, formState } =
    useTransferBetweenOwnsForm(allOptions);

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

  if (allOptions.length) {
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
            <Label text={TEXT.selectLabelTo} />
            <Controller
              control={control}
              name='essenceTo'
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <InputSelectTemplate
                    defaultContainer={<TextPlaceholder text={TEXT.selectPlaceholder} />}
                    options={allOptions}
                    className={classNames({ [s.input]: error })}
                    value={{
                      value: value,
                      content: allOptions.find((o) => o.value === value)?.content,
                    }}
                    onChange={(option) => {
                      onChange(option.value);
                    }}
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
        </div>
        <Text tag='p' size='xs' weight='regular' className={s.caption}>
          {TEXT.amountCaption}
        </Text>
        <div className={s.btnContainer}>
          <Button theme='secondary' className={s.btn} onClick={handleBackClick}>
            {TEXT.backBtn}
          </Button>
          <Button type='submit' theme='primary' className={s.btn} disabled={!formState.isValid}>
            {TEXT.submitBtn}
          </Button>
        </div>
      </form>
    );
  }
};
