import { FC, useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { calculateInputMaxLength, createInputPlaceholder } from '@/entities';
import {
  Input,
  LabelBox,
  Button,
  Text,
  IInfoCreditForm,
  ICreditFormData,
  usePostCreditOrderMutation,
  Switch,
  prepareAndSubstituteValue,
  Chips,
} from '@/shared';
import { ResultFrame } from './';
import { TITLE_TEXT, BUTTON_TEXT, formatPostData, CREDIT_OBLIGATION_TEXT } from '../';
import { ConfirmationBySms } from '../..';
import styles from './CreditForm.module.scss';

interface ICreditForm {
  infoCreditForm: IInfoCreditForm;
}

export const CreditForm: FC<ICreditForm> = ({ infoCreditForm }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSmsConfirmationOpen, setIsSmsConfirmationOpen] = useState(false);
  const [postCreditOrder, { data, isError }] = usePostCreditOrderMutation();
  const navigate = useNavigate();
  const { id, name, minSum, maxSum, currencyCodeList, minPeriodMonths, maxPeriodMonths } =
    infoCreditForm;

  const methods = useForm<ICreditFormData>({
    mode: 'all',
    defaultValues: {
      currencyCode: currencyCodeList[0],
    },
  });

  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    getValues,
    watch,
    setValue,
    control,
    clearErrors,
  } = methods;

  const { noCreditObligations, currencyCode } = watch();

  const onSubmitForm = () => {
    setIsSmsConfirmationOpen(true);
  };

  const onSubmitConfirmationSms = async () => {
    await postCreditOrder(formatPostData(getValues(), id));
    setSubmitted(true);
  };

  const updateSubmitState = (bool: boolean) => {
    setSubmitted(bool);
  };

  const cancelButtonClick = () => {
    navigate(-1);
  };

  const handleOnBlur = (minValue: number, maxValue: number, value: 'amount' | 'periodMonths') => {
    setValue(
      value,
      String(prepareAndSubstituteValue(Number(getValues(value)), minValue, maxValue, 'string')),
      { shouldValidate: true },
    );
  };

  if (submitted && data) {
    return (
      <ResultFrame submitStatus={!isError} updateSubmitState={updateSubmitState} id={data.id} />
    );
  }

  if (isSmsConfirmationOpen) {
    return <ConfirmationBySms clickHandle={onSubmitConfirmationSms} />;
  }

  return (
    <>
      <Text tag='h2' size='m' weight='bold' className={styles.title}>
        {TITLE_TEXT} {name}
      </Text>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
          <div className={styles.formFrame}>
            <div className={styles.segmentOne}>
              <LabelBox
                id='amount'
                label='Сумма кредита'
                className={styles.employerId}
                error={errors.amount?.message}
                fieldValue={currencyCode}
                required
              >
                <Controller
                  name='amount'
                  control={control}
                  rules={{
                    onBlur: () => handleOnBlur(minSum, maxSum, 'amount'),
                    required: 'Поле обязательно для заполнения',
                    min: {
                      value: minSum,
                      message: 'Введённая сумма меньше допустимой',
                    },
                    max: {
                      value: maxSum,
                      message: 'Введённая сумма больше допустимой',
                    },
                    pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                  }}
                  render={({ field }) => (
                    <Input.Text
                      white
                      size='l'
                      id='amount'
                      placeholder={createInputPlaceholder(minSum, maxSum)}
                      className={styles.employerIdInput}
                      isError={!!errors.amount}
                      maxLength={calculateInputMaxLength(maxSum)}
                      dataTestId='input-text-amount'
                      mask='*** *** ***'
                      isReverseMask
                      chars={/[0-9]/}
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))}
                    />
                  )}
                />
              </LabelBox>

              <LabelBox
                id='periodMonths'
                label='Срок кредита'
                className={styles.employerId}
                error={errors.periodMonths?.message}
                fieldValue='мес.'
                required
              >
                <Controller
                  name='periodMonths'
                  control={control}
                  rules={{
                    onBlur: () => handleOnBlur(minPeriodMonths, maxPeriodMonths, 'periodMonths'),
                    required: 'Поле обязательно для заполнения',
                    min: {
                      value: minPeriodMonths,
                      message: 'Введённый срок меньше допустимого',
                    },
                    max: {
                      value: maxPeriodMonths,
                      message: 'Введённый срок больше допустимого',
                    },
                    pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                  }}
                  render={({ field }) => (
                    <Input.Text
                      white
                      size='l'
                      id='periodMonths'
                      placeholder={createInputPlaceholder(minPeriodMonths, maxPeriodMonths)}
                      className={styles.employerIdInput}
                      isError={!!errors.periodMonths}
                      maxLength={calculateInputMaxLength(maxPeriodMonths)}
                      dataTestId='input-text-periodMonths'
                      mask='*** ***'
                      isReverseMask
                      chars={/[0-9]/}
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))}
                    />
                  )}
                />
              </LabelBox>

              <LabelBox
                id='identificationNumber'
                label='Идентификационный номер работодателя'
                className={styles.employerId}
                error={errors.identificationNumber?.message}
                required
              >
                <Controller
                  name='identificationNumber'
                  control={control}
                  rules={{
                    required: 'Поле обязательно для заполнения',
                    minLength: {
                      value: 10,
                      message: 'Недостаточно символов',
                    },
                    validate: {
                      only10or12: (value) =>
                        /^(\d{10}|\d{12})$/.test(value) ||
                        'Значение длины может быть либо 10, либо 12 цифр',
                      noLeadingZero: (value) =>
                        !value.startsWith('00') || 'Не может начинаться с двух нулей',
                    },
                    pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                  }}
                  render={({ field }) => (
                    <Input.Text
                      id='identificationNumber'
                      placeholder='**************'
                      size='l'
                      white
                      className={styles.employerIdInput}
                      isError={!!errors.identificationNumber}
                      maxLength={12}
                      chars={/[0-9]/}
                      dataTestId='input-text-identificationNumber'
                      {...field}
                    />
                  )}
                />
              </LabelBox>
            </div>

            <div className={styles.segmentTwo}>
              <div className={styles.segmentInput}>
                <div className={styles.monthlyExpenditure}>
                  <LabelBox
                    id='monthlyExpenditure'
                    label='Общая долговая нагрузка'
                    fieldValue={currencyCode}
                    required={!noCreditObligations}
                    className={styles.smallWrapper}
                    error={noCreditObligations ? undefined : errors.monthlyExpenditure?.message}
                  >
                    {!noCreditObligations ? (
                      <Controller
                        name='monthlyExpenditure'
                        control={control}
                        rules={{
                          required: 'Поле обязательно для заполнения',
                          minLength: {
                            value: 4,
                            message: 'Недостаточно символов',
                          },
                          validate: {
                            noLeadingZero: (value) =>
                              !value.startsWith('0') || 'Сумма не может начинаться с 0',
                          },
                          pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                        }}
                        render={({ field }) => (
                          <Input.Text
                            id='monthlyExpenditure'
                            placeholder='0'
                            size='l'
                            white
                            className={styles.smallWrapper__input}
                            isError={!!errors.monthlyExpenditure}
                            maxLength={13}
                            chars={/[0-9]/}
                            dataTestId='input-text-monthlyExpenditure'
                            {...field}
                            disabled={false}
                          />
                        )}
                      />
                    ) : (
                      <Controller
                        name='monthlyExpenditureDisabled'
                        control={control}
                        render={({ field }) => (
                          <Input.Text
                            id='monthlyExpenditureDisabled'
                            placeholder='0'
                            size='l'
                            white
                            className={styles.smallWrapper__input}
                            dataTestId='input-text-monthlyExpenditureDisabled'
                            {...field}
                            disabled={true}
                            value={''}
                          />
                        )}
                      />
                    )}
                  </LabelBox>

                  <div className={styles.noCreditObligations}>
                    {CREDIT_OBLIGATION_TEXT}
                    <Switch
                      {...register('noCreditObligations')}
                      checked={noCreditObligations || false}
                      onClick={() => clearErrors('monthlyExpenditure')}
                    />
                  </div>
                </div>
                <LabelBox
                  id='monthlyIncome'
                  label='Среднемесячный доход'
                  fieldValue={currencyCode}
                  className={styles.smallWrapper}
                  error={errors.monthlyIncome?.message}
                  required
                >
                  <Controller
                    name='monthlyIncome'
                    control={control}
                    rules={{
                      required: 'Поле обязательно для заполнения',
                      minLength: {
                        value: 4,
                        message: 'Недостаточно символов',
                      },
                      validate: {
                        noLeadingZero: (value) =>
                          !value.startsWith('0') || 'Сумма не может начинаться с  0',
                      },
                      pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                    }}
                    render={({ field }) => (
                      <Input.Text
                        id='monthlyIncome'
                        placeholder='0'
                        size='l'
                        white
                        className={styles.smallWrapper__input}
                        isError={!!errors.monthlyIncome}
                        maxLength={13}
                        chars={/[0-9]/}
                        dataTestId='input-text-monthlyIncome'
                        {...field}
                      />
                    )}
                  />
                </LabelBox>
                {currencyCodeList.length > 1 && (
                  <LabelBox id='currencies' label='Валюта'>
                    <Chips
                      className={styles.currency_chips}
                      values={currencyCodeList}
                      type='radio'
                      {...register('currencyCode')}
                      viewType='dots'
                    />
                  </LabelBox>
                )}
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                type='submit'
                size='m'
                className={styles.cancelButton}
                theme='tertiary'
                onClick={cancelButtonClick}
              >
                {BUTTON_TEXT.cancel}
              </Button>
              <Button
                type='submit'
                size='m'
                width='max'
                className={styles.submitButton}
                disabled={!isValid}
              >
                {BUTTON_TEXT.send}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
