import { Input, RadioButton, Text } from '@/shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { TextTitles, brokerBillFormDefaultValues, currencyTypes } from '../constants';
import {
  BrokerBillForm,
  InvestmentBrokerBillDataFormProps,
  brokerBillFormScheme,
} from '../model/types';
import styles from './investmentBrokerBillDataForm.module.scss';

export const InvestmentBrokerBillDataForm: React.FC<InvestmentBrokerBillDataFormProps> = ({
  onSubmit,
}) => {
  const { control, resetField, handleSubmit, watch } = useForm<BrokerBillForm>({
    defaultValues: brokerBillFormDefaultValues,
    resolver: yupResolver(brokerBillFormScheme),
  });

  const selectedCurrency = watch('currencyType');

  const onSubmitForm = (data: BrokerBillForm) => {
    onSubmit(data);
  };

  return (
    <form id='investment-documents-form' onSubmit={handleSubmit(onSubmitForm)}>
      <div className={styles['account-selection-step-page']}>
        <div className={styles['account-selection-step-page__box-wrapper']}>
          <Text tag={'p'} size='m'>
            {TextTitles.brokerAccountNameTitle}
          </Text>
          <div className={styles['account-selection-step-page__account-radio-box']}>
            <Controller
              control={control}
              name='accountName'
              render={({ field: { onChange, value } }) => (
                <Input.Text
                  value={value}
                  onChange={onChange}
                  required={true}
                  white
                  size='m'
                  placeholder='Брокерский счет'
                  maxLength={30}
                  clearable={{ onClear: () => resetField('accountName'), hide: false }}
                />
              )}
            />
          </div>
        </div>
        <Text tag={'p'} size='m'>
          {TextTitles.currencyTypeFieldTitle}
        </Text>
        <div className={styles['account-selection-step-page__paymentSystem-radio-box']}>
          {Object.values(currencyTypes).map((currency) => (
            <Controller
              key={currency}
              control={control}
              name='currencyType'
              render={({ field: { name, onChange } }) => (
                <RadioButton
                  name={name}
                  value={currency}
                  label={currency}
                  size='s'
                  checked={selectedCurrency === currency}
                  onChange={onChange}
                />
              )}
            />
          ))}
        </div>
      </div>
    </form>
  );
};
