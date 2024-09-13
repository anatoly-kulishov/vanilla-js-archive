import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Icon, Input, LabelBox, RadioButton } from '@/shared';
import { BUTTON_TEXT, ERROR_MESSAGES, LABELS, PLACEHOLDERS } from './constants';
import styles from './ChangeLimitsForm.module.scss';

interface IChangeLimitForm {
  limitType: 'transactions' | 'withdrawal';
  duration: 'day' | 'month';
  operationsQuantity: string;
  maxOperationAmount: string;
  maxSumAmount: string;
  maxCashDay: string;
}

export const ChangeLimitsForm: FC = () => {
  const methods = useForm<IChangeLimitForm>({
    mode: 'all',
    shouldUnregister: true,
    defaultValues: {
      limitType: 'transactions',
      duration: 'day',
      maxCashDay: '',
      maxOperationAmount: '',
      maxSumAmount: '',
      operationsQuantity: '',
    },
  });

  const {
    register,
    formState: { errors, isValid },
    watch,
    control,
  } = methods;

  const { limitType, duration } = watch();

  return (
    <form className={styles.formFrame}>
      <LabelBox id='limitType' label={LABELS.choseLimitType} className={styles.segment}>
        <>
          <RadioButton
            {...register('limitType')}
            value='transactions'
            subLabel={LABELS.transactions}
            checked={limitType === 'transactions'}
            icon={{
              width: '24px',
              height: '24px',
              icon: 'actions-no-cash',
            }}
          />
          <RadioButton
            {...register('limitType')}
            value='withdrawal'
            subLabel={LABELS.withdrawal}
            checked={limitType === 'withdrawal'}
            icon={{
              width: '24px',
              height: '24px',
              icon: 'actions-cash',
            }}
          />
        </>
      </LabelBox>

      {limitType === 'transactions' && (
        <LabelBox id='duration' label={LABELS.choseDuration} className={styles.segment}>
          <>
            <RadioButton
              {...register('duration')}
              value='day'
              subLabel={LABELS.day}
              checked={duration === 'day'}
            />
            <RadioButton
              {...register('duration')}
              value='month'
              subLabel={LABELS.month}
              checked={duration === 'month'}
            />
          </>
        </LabelBox>
      )}

      <LabelBox
        id='limits'
        label={LABELS.inputLimits}
        className={styles.segment}
        error={
          errors.operationsQuantity?.message ??
          errors.maxOperationAmount?.message ??
          errors.maxSumAmount?.message
        }
      >
        <div className={styles.inputsWrapper}>
          {limitType === 'transactions' && (
            <>
              <Controller
                name='operationsQuantity'
                control={control}
                rules={{
                  required: ERROR_MESSAGES.allRequired,
                  pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                }}
                render={({ field }) => (
                  <Input.Text
                    id='operationsQuantity'
                    white
                    size='m'
                    placeholder={
                      duration === 'day'
                        ? PLACEHOLDERS.dailyOperationsQuantity
                        : PLACEHOLDERS.monthlyOperationsQuantity
                    }
                    className={styles.input}
                    contentRight={<Icon icon='ruble-small' />}
                    isError={!!errors.operationsQuantity}
                    dataTestId='operationsQuantity'
                    mask='*** *** ***'
                    isReverseMask
                    chars={/[0-9]/}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))}
                  />
                )}
              />

              <Controller
                name='maxOperationAmount'
                control={control}
                rules={{
                  required: ERROR_MESSAGES.allRequired,
                  pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                }}
                render={({ field }) => (
                  <Input.Text
                    id='maxOperationAmount'
                    white
                    size='m'
                    placeholder={PLACEHOLDERS.maxOperationAmount}
                    className={styles.input}
                    contentRight={<Icon icon='ruble-small' />}
                    isError={!!errors.maxOperationAmount}
                    dataTestId='maxOperationAmount'
                    mask='*** *** ***'
                    isReverseMask
                    chars={/[0-9]/}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))}
                  />
                )}
              />

              <Controller
                name='maxSumAmount'
                control={control}
                rules={{
                  required: ERROR_MESSAGES.allRequired,
                  pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                }}
                render={({ field }) => (
                  <Input.Text
                    id='maxSumAmount'
                    white
                    size='m'
                    placeholder={
                      duration === 'day' ? PLACEHOLDERS.maxSumDay : PLACEHOLDERS.maxSumMonth
                    }
                    className={styles.input}
                    contentRight={<Icon icon='ruble-small' />}
                    isError={!!errors.maxSumAmount}
                    dataTestId='maxSumAmount'
                    mask='*** *** ***'
                    isReverseMask
                    chars={/[0-9]/}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))}
                  />
                )}
              />
            </>
          )}

          {limitType === 'withdrawal' && (
            <Controller
              name='maxCashDay'
              control={control}
              rules={{
                required: ERROR_MESSAGES.required,
                pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
              }}
              render={({ field }) => (
                <Input.Text
                  id='maxCashDay'
                  white
                  size='m'
                  placeholder={PLACEHOLDERS.maxCashDay}
                  className={styles.maxCashInput}
                  contentRight={<Icon icon='ruble-small' />}
                  isError={!!errors.maxCashDay}
                  dataTestId='maxCashDay'
                  mask='*** *** ***'
                  isReverseMask
                  chars={/[0-9]/}
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))}
                />
              )}
            />
          )}
        </div>
      </LabelBox>

      <div className={styles.buttonWrapper}>
        <Button disabled={!isValid}>{BUTTON_TEXT}</Button>
      </div>
    </form>
  );
};
