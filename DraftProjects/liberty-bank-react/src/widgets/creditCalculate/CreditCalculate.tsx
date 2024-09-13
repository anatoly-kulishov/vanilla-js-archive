import { FC, useEffect, useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { CreditCalculateResultCard, ICreditCalculateResult } from '@/entities';
import {
  Button,
  CurrencyCode,
  Input,
  LabelBox,
  PATH_PAGE,
  RadioButton,
  Spinner,
  Text,
  formatNumberWithSpaces,
  prepareAndSubstituteValue,
  useGetCreditProductDetailsQuery,
} from '@/shared';
import { BUTTON_TEXT, CALCULATION_TITLE, LABELS, TITLE } from './constants';
import {
  calculateIncomeCreditPayment,
  calculateSumCreditPayment,
  validateValueNumber,
} from './utils';
import styles from './CreditCalculate.module.scss';

interface ICreditCalculation {
  amount: string;
  periodMonths: string;
  monthlyIncome: string;
  choiceCalculation: 'maxSumCredit' | 'requiredAmount';
  currencyCode: CurrencyCode;
}

export const CreditCalculate: FC = () => {
  const [result, setResult] = useState<ICreditCalculateResult>({
    monthlyTotalCreditPayment: 0,
    totalPercentCreditPayment: 0,
  });
  const { id = '' } = useParams<{ id: string }>();
  const { data: creditProductDetails, isLoading } = useGetCreditProductDetailsQuery(id);
  const navigate = useNavigate();
  const methods = useForm<ICreditCalculation>({
    mode: 'all',
    shouldUnregister: true,
    defaultValues: {
      amount: '',
      periodMonths: '',
      monthlyIncome: '',
      choiceCalculation: 'maxSumCredit',
      currencyCode: creditProductDetails?.currencyCodeList[0],
    },
  });
  const {
    register,
    formState: { errors, isValid },
    watch,
    resetField,
    getValues,
    setValue,
  } = methods;
  const { choiceCalculation, amount, periodMonths, monthlyIncome, currencyCode } = watch();

  useEffect(() => {
    if (choiceCalculation === 'maxSumCredit' && creditProductDetails) {
      setResult(
        calculateSumCreditPayment(
          Number(monthlyIncome),
          Number(
            prepareAndSubstituteValue(
              Number(getValues('periodMonths')),
              creditProductDetails.maxPeriodMonths,
              creditProductDetails.minPeriodMonths,
              'number',
            ),
          ),
          creditProductDetails.minSum,
          creditProductDetails.maxSum,
          creditProductDetails.interestRate,
        ),
      );
    } else if (choiceCalculation === 'requiredAmount' && creditProductDetails) {
      setResult(
        calculateIncomeCreditPayment(
          Number(
            prepareAndSubstituteValue(
              Number(getValues('amount')),
              creditProductDetails.maxSum,
              creditProductDetails.minSum,
              'number',
            ),
          ),
          Number(
            prepareAndSubstituteValue(
              Number(getValues('periodMonths')),
              creditProductDetails.maxPeriodMonths,
              creditProductDetails.minPeriodMonths,
              'number',
            ),
          ),
          creditProductDetails.interestRate,
          creditProductDetails.maxSum,
        ),
      );
    }
  }, [amount, periodMonths, monthlyIncome, choiceCalculation]);

  useEffect(() => {
    resetField('periodMonths');
    resetField('amount');
    resetField('monthlyIncome');
  }, [choiceCalculation]);

  const handleCancelButtonClick = () => {
    navigate(-1);
  };

  const handleNavigateApply = () => {
    navigate(generatePath(PATH_PAGE.creditForm, { id }));
  };

  const handleOnBlur = (minValue: number, maxValue: number, value: 'amount' | 'periodMonths') => {
    if (creditProductDetails) {
      setValue(
        value,
        String(prepareAndSubstituteValue(Number(getValues(value)), minValue, maxValue, 'string')),
        { shouldValidate: true },
      );
    }
  };

  return (
    <>
      <Text tag='h2' size='m' weight='bold' className={styles.title}>
        {TITLE}
      </Text>

      {isLoading && <Spinner />}

      {creditProductDetails && (
        <FormProvider {...methods}>
          <form className={styles.formFrame}>
            <CreditCalculateResultCard
              result={result}
              creditProductDetails={creditProductDetails}
            />

            <div className={styles.wrapperSegmentOne}>
              <Text tag='span' weight='regular' size='sxs'>
                {CALCULATION_TITLE}
              </Text>
              <div className={styles.segmentOne}>
                <RadioButton
                  {...register('choiceCalculation')}
                  value='maxSumCredit'
                  subLabel={LABELS.maxSumCredit}
                  checked={choiceCalculation === 'maxSumCredit'}
                />
                <RadioButton
                  {...register('choiceCalculation')}
                  value='requiredAmount'
                  subLabel={LABELS.requiredAmount}
                  checked={choiceCalculation === 'requiredAmount'}
                />
              </div>
            </div>

            <div className={styles.segmentTwo}>
              <LabelBox
                id='periodMonths'
                label={LABELS.periodMonths}
                fieldValue='мес.'
                required
                error={errors.periodMonths?.message}
                className={styles.boxInput}
              >
                <Input.Number
                  value={getValues('periodMonths')}
                  placeholder={`от ${creditProductDetails.minPeriodMonths} до ${creditProductDetails.maxPeriodMonths}`}
                  size='l'
                  white
                  className={styles.input}
                  isError={!!errors.periodMonths}
                  maxLength={3}
                  {...register('periodMonths', {
                    onBlur: () =>
                      handleOnBlur(
                        creditProductDetails.minPeriodMonths,
                        creditProductDetails.maxPeriodMonths,
                        'periodMonths',
                      ),
                    required: true,
                    pattern: /^[0-9]+$/i,
                    min: {
                      value: creditProductDetails.minPeriodMonths,
                      message: 'Введённый срок меньше допустимого',
                    },
                    max: {
                      value: creditProductDetails.maxPeriodMonths,
                      message: 'Введённый срок больше допустимого',
                    },
                  })}
                />
              </LabelBox>
              {choiceCalculation === 'maxSumCredit' ? (
                <LabelBox
                  id='monthlyIncome'
                  label={LABELS.monthlyIncome}
                  fieldValue={currencyCode}
                  required
                  error={errors.monthlyIncome?.message}
                  className={styles.boxInput}
                >
                  <Input.Text
                    value={getValues('monthlyIncome')}
                    placeholder='0'
                    size='l'
                    white
                    className={styles.input}
                    isError={!!errors.monthlyIncome}
                    maxLength={13}
                    {...register('monthlyIncome', {
                      onChange: () =>
                        setValue('monthlyIncome', validateValueNumber(getValues('monthlyIncome'))),
                      required: true,
                      minLength: {
                        value: 4,
                        message: 'Введённая сумма меньше допустимой',
                      },
                      maxLength: {
                        value: 13,
                        message: 'Введённая сумма больше допустимой',
                      },
                    })}
                  />
                </LabelBox>
              ) : (
                <LabelBox
                  id='amount'
                  label={LABELS.amount}
                  fieldValue={currencyCode}
                  required
                  error={errors.amount?.message}
                  className={styles.boxInput}
                >
                  <Input.Number
                    value={getValues('amount')}
                    placeholder={`от ${formatNumberWithSpaces(
                      creditProductDetails.minSum,
                    )} до ${formatNumberWithSpaces(creditProductDetails.maxSum)}`}
                    size='l'
                    white
                    maxLength={9}
                    className={styles.input}
                    isError={!!errors.amount}
                    {...register('amount', {
                      onBlur: () =>
                        handleOnBlur(
                          creditProductDetails.minSum,
                          creditProductDetails.maxSum,
                          'amount',
                        ),
                      required: true,
                      pattern: /^[0-9]+$/i,
                      min: {
                        value: creditProductDetails.minSum,
                        message: 'Введённая сумма меньше допустимой',
                      },
                      max: {
                        value: creditProductDetails.maxSum,
                        message: 'Введённая сумма больше допустимой',
                      },
                    })}
                  />
                </LabelBox>
              )}
            </div>
            <div className={styles.buttonContainer}>
              <Button
                type='button'
                size='m'
                className={styles.cancelButton}
                theme='tertiary'
                onClick={handleCancelButtonClick}
              >
                {BUTTON_TEXT.cancel}
              </Button>
              <div>
                <Button
                  type='button'
                  size='m'
                  width='max'
                  theme='secondary'
                  className={styles.submitButton}
                  onClick={() => {}}
                >
                  {BUTTON_TEXT.paymentSchedule}
                </Button>
                <Button
                  type='button'
                  size='m'
                  width='max'
                  className={styles.submitButton}
                  disabled={!isValid}
                  onClick={handleNavigateApply}
                >
                  {BUTTON_TEXT.apply}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
};
