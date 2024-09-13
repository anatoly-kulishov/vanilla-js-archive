import { useFormContext, Controller } from 'react-hook-form';
import { Text, Button, Input, RadioButton } from '@/shared';
import {
  HC_CONTRACT,
  HC_CURRENCIES,
  HC_FORM_BACK,
  TERM_MONTHS,
  REQUIRED_FIELD_ERROR,
  VALIDATION_RULES,
} from '../../constants';
import classNames from 'classnames';
import styles from '../../shared/styles/styles.module.scss';
import { FC } from 'react';
import { FormFrameProps } from '../../model/types';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from './errorMessage';

const ContractFrame: FC<FormFrameProps> = ({ stepper, nextButton }) => {
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>
        <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
          {HC_CONTRACT.title}
        </Text>
        {stepper}
      </div>
      <div className={styles['form__body']}>
        <div className={classNames(styles['form__field'], styles['currency'])} id='currencyField'>
          <label htmlFor='currencyField' className={styles['form__field-label']}>
            <Text tag='p' size='s' weight='medium'>
              {HC_CONTRACT.chooseCurrency}
            </Text>
          </label>
          <div className={classNames(styles['form__row'])}>
            <Controller
              control={control}
              name='contractCurrency'
              render={({ field: { name, onChange, value } }) => (
                <RadioButton
                  name={name}
                  value={HC_CURRENCIES.rub}
                  label={HC_CURRENCIES.rub}
                  onChange={onChange}
                  checked={value === HC_CURRENCIES.rub}
                  className={styles['radio-group']}
                  size='s'
                />
              )}
            />
            <Controller
              control={control}
              name='contractCurrency'
              render={({ field: { name, onChange, value } }) => (
                <RadioButton
                  name={name}
                  value={HC_CURRENCIES.usd}
                  label={HC_CURRENCIES.usd}
                  checked={value === HC_CURRENCIES.usd}
                  onChange={onChange}
                  size='s'
                />
              )}
            />
            <Controller
              control={control}
              name='contractCurrency'
              render={({ field: { name, onChange, value } }) => (
                <RadioButton
                  name={name}
                  value={HC_CURRENCIES.eur}
                  label={HC_CURRENCIES.eur}
                  checked={value === HC_CURRENCIES.eur}
                  onChange={onChange}
                  size='s'
                />
              )}
            />
          </div>
        </div>
        <div className={styles['form__row']}>
          <div className={styles['form__field']}>
            <Controller
              control={control}
              name='duration'
              rules={{
                required: REQUIRED_FIELD_ERROR,
              }}
              render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
                <>
                  <Input.Select
                    name={name}
                    enableSearch
                    options={TERM_MONTHS}
                    id='duration'
                    required
                    isError={!!errors.duration}
                    onMySelect={onChange}
                    onBlur={onBlur}
                    value={value}
                    size='m'
                    label={HC_CONTRACT.insuranceTerm}
                    white
                  />
                  <ErrorMessage error={error} />
                </>
              )}
            />
          </div>
          <div className={styles['form__field']}>
            <Controller
              control={control}
              name='contractDate'
              rules={VALIDATION_RULES.contractDate}
              render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
                <>
                  <Input.Date
                    label={HC_CONTRACT.startDate}
                    required
                    isError={!!errors.contractDate}
                    size='m'
                    white
                    onChange={(value) => {
                      onChange(value);
                      trigger(name);
                    }}
                    {...{ name, value, onBlur }}
                  />
                  <ErrorMessage error={error} />
                </>
              )}
            />
          </div>
        </div>
      </div>
      <div className={styles['form__footer']}>
        <div>
          <Button onClick={handleBack} theme='third' className={styles['back-btn']}>
            {HC_FORM_BACK}
          </Button>
        </div>
        <div>{nextButton}</div>
      </div>
    </div>
  );
};

export default ContractFrame;
