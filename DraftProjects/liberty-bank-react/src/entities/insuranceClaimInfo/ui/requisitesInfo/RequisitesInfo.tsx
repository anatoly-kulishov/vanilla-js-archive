import styles from '../../../../pages/insuranceClaim/InsuranceClaim.module.scss';
import { Input } from '@/shared';
import { ErrorMessage } from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/errorMessage';
import { Controller, useFormContext } from 'react-hook-form';
import { FIELDS } from '@/entities/insuranceClaimInfo/constants';
import { VALIDATION_RULES } from '@/features/createInsuranceApplicationRequest/constants';

export const RequisitesInfo = () => {
  const { control } = useFormContext();

  return (
    <div className={styles['form__column']}>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.bankName}
          rules={VALIDATION_RULES.bankName}
          render={({ fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text white label='Наименование банка' isError={!!error} required disabled />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.checkingAccount}
          rules={{
            required: 'Укажите расчетный счет',
            maxLength: { value: 20, message: 'Не может быть больше 20 символов' },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text
                type='number'
                white
                label='Расчетный счет'
                isError={!!error}
                required
                {...field}
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.correspondentAccount}
          rules={{
            required: 'Укажите корреспондентский счет',
            maxLength: { value: 20, message: 'Не может быть больше 20 символов' },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text
                white
                label='Корреспондентский счет'
                isError={!!error}
                required
                {...field}
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.bankBIC}
          rules={VALIDATION_RULES.bankBIC}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text
                type='number'
                white
                label='БИК'
                isError={!!error}
                required
                {...field}
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.bankTIN}
          rules={{
            required: 'Укажите ИНН банка',
            maxLength: { value: 12, message: 'Не может быть больше 12 символов' },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text white label='ИНН банка' isError={!!error} required {...field} disabled />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
    </div>
  );
};
