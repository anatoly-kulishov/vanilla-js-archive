import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { calculateInputMaxLength, createInputPlaceholder } from '@/entities';
import {
  Button,
  Text,
  Checkbox,
  Link,
  CardType,
  InfoFrame,
  PATH_PAGE,
  usePostDepositOrderMutation,
  IInfoDepositForm,
  IDepositFormData,
  Icon,
  TSvgIconNames,
  CURRENCY,
  usePostProfitCalculationMutation,
  formatNumberWithSpaces,
  Chips,
  LabelBox,
  Input,
  Spinner,
} from '@/shared';
import { failedOpenedCredit, infoFrameText, successOpenedCredit, DEPOSIT_FORM } from '../constants';
import { formatPostData } from '../formatPostData';
import styles from './DepositForm.module.scss';

interface IDepositForm {
  infoDepositForm: IInfoDepositForm;
}

export const DepositForm: FC<IDepositForm> = ({ infoDepositForm }) => {
  const [submitted, setSubmitted] = useState(false);

  const [postDepositOrder, { isSuccess: isSuccessDepositOrder, isLoading }] =
    usePostDepositOrderMutation();
  const [postProfitCalculation, { data: calculatedData }] = usePostProfitCalculationMutation();

  const navigate = useNavigate();
  const {
    id,
    currencyCodes,
    amountMax,
    maxDurationMonths,
    amountMin,
    minDurationMonths,
    name,
    autoRenewal,
  } = infoDepositForm;

  const methods = useForm<IDepositFormData>({
    mode: 'all',
    defaultValues: {
      selectedCurrency: currencyCodes[0],
    },
  });

  const {
    register,
    control,
    formState: { isValid, errors },
    handleSubmit,
    getValues,
    watch,
  } = methods;

  const [watchAmount, watchTerm, selectedCurrency] = watch(['amount', 'term', 'selectedCurrency']);
  const depositId = String(id);
  const isValidInputs = !(errors.amount || errors.term);

  const handleMyDepositsButtonClick = () => {
    navigate(PATH_PAGE.myDeposits);
  };

  const handleDepositProductsButtonClick = () => {
    navigate(PATH_PAGE.depositProducts);
  };

  const handleReapplyButtonClick = () => {
    setSubmitted(false);
  };

  const handleBackButtonClick = () => {
    navigate(PATH_PAGE.depositProducts);
  };

  const onSubmit = (data: IDepositFormData) => {
    const inputData = formatPostData(data, depositId);
    postDepositOrder(inputData);
    setSubmitted(true);
  };

  const requestProfitCalculation = () => {
    postProfitCalculation({
      depositProductId: Number(id),
      initialSum: Number(getValues('amount')),
      termTime: Number(getValues('term')),
      isCapitalisation: true,
      currencyCode: selectedCurrency,
    });
  };

  useEffect(() => {
    requestProfitCalculation();
  }, [watchAmount, watchTerm]);

  if (isLoading) {
    return (
      <div className={styles.resultForm}>
        <InfoFrame cardType={CardType.applicationSent}>
          <Spinner />
        </InfoFrame>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className={styles.resultForm}>
        {isSuccessDepositOrder ? (
          <InfoFrame
            title={infoFrameText.titleSuccess}
            primaryBtnText={infoFrameText.requestStatus}
            onPrimaryButtonClick={handleMyDepositsButtonClick}
            cardType={CardType.applicationSent}
            icon={successOpenedCredit}
          />
        ) : (
          <InfoFrame
            title={infoFrameText.titleFailed}
            primaryBtnText={infoFrameText.reapply}
            onPrimaryButtonClick={handleReapplyButtonClick}
            secondaryBtnText={infoFrameText.creditList}
            onSecondaryButtonClick={handleDepositProductsButtonClick}
            cardType={CardType.applicationDeclined}
            icon={failedOpenedCredit}
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Text tag='h2' size='m' weight='medium' className={styles.title}>
        {DEPOSIT_FORM.title} {name}
      </Text>

      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.topPart}>
            <div className={styles.topPart__title}>
              <Icon icon={CURRENCY[selectedCurrency].icon as TSvgIconNames} widthAndHeight='64' />
              <Text tag='h2' weight='medium' data-testid='depositName'>
                {name}
              </Text>
            </div>

            <div className={styles.calculation}>
              <div className={styles.calculation__container}>
                <Text tag='p' size='xl' weight='bold' data-testid='currencyCodeAmountDeposit'>
                  {calculatedData?.finalSum && isValidInputs
                    ? formatNumberWithSpaces(Math.trunc(calculatedData.finalSum))
                    : '--'}{' '}
                  {selectedCurrency}
                </Text>
                <Text tag='h5' weight='regular' className={styles.calculation__title}>
                  {DEPOSIT_FORM.amountDeposit}
                </Text>
              </div>

              <div className={styles.calculation__container}>
                {calculatedData?.moneyProfit && isValidInputs ? (
                  <Text tag='p' size='xl' weight='bold' className={styles.calculation__validFields}>
                    {formatNumberWithSpaces(Math.trunc(calculatedData.moneyProfit))}{' '}
                    {selectedCurrency}
                  </Text>
                ) : (
                  <Text tag='p' size='xl' weight='bold' data-testid='currencyCodeProfit'>
                    -- {selectedCurrency}
                  </Text>
                )}

                <Text tag='h5' weight='regular' className={styles.calculation__title}>
                  {DEPOSIT_FORM.profitDeposit}
                </Text>
              </div>

              <div className={styles.calculation__container}>
                {calculatedData?.percentProfit && isValidInputs ? (
                  <Text tag='p' size='xl' weight='bold' className={styles.calculation__validFields}>
                    {calculatedData.percentProfit} %
                  </Text>
                ) : (
                  <Text tag='p' size='xl' weight='bold'>
                    -- %
                  </Text>
                )}

                <Text tag='h5' weight='regular' className={styles.calculation__title}>
                  {DEPOSIT_FORM.profitOnDepositPercentage}
                </Text>
              </div>
            </div>
          </div>

          <div className={styles.middlePart}>
            <LabelBox
              id='amount'
              label={DEPOSIT_FORM.amountInputLabel}
              className={styles.smallWrapper}
              error={errors.amount?.message}
              fieldValue={selectedCurrency}
              required
            >
              <Controller
                name='amount'
                control={control}
                rules={{
                  required: 'Поле обязательно для заполнения',
                  min: {
                    value: amountMin,
                    message: 'Введённая сумма меньше допустимой',
                  },
                  max: {
                    value: amountMax,
                    message: 'Введённая сумма больше допустимой',
                  },
                  pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                }}
                render={({ field }) => (
                  <Input.Text
                    id='amount'
                    white
                    size='l'
                    placeholder={createInputPlaceholder(amountMin, amountMax)}
                    className={styles.smallWrapper__input}
                    isError={!!errors.amount}
                    maxLength={calculateInputMaxLength(amountMax)}
                    dataTestId='inputForAmountDeposit'
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
              id='term'
              label={DEPOSIT_FORM.termInputLabel}
              className={styles.smallWrapper}
              error={errors.term?.message}
              fieldValue='мес.'
              required
            >
              <Controller
                name='term'
                control={control}
                rules={{
                  required: 'Поле обязательно для заполнения',
                  min: {
                    value: minDurationMonths,
                    message: 'Введённый срок меньше допустимого',
                  },
                  max: {
                    value: maxDurationMonths,
                    message: 'Введённый срок больше допустимого',
                  },
                  pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                }}
                render={({ field }) => (
                  <Input.Text
                    id='term'
                    white
                    size='l'
                    placeholder={createInputPlaceholder(minDurationMonths, maxDurationMonths)}
                    className={styles.smallWrapper__input}
                    isError={!!errors.term}
                    maxLength={calculateInputMaxLength(maxDurationMonths)}
                    dataTestId='inputForDurationMonth'
                    mask='*** *** ***'
                    isReverseMask
                    chars={/[0-9]/}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))}
                  />
                )}
              />
            </LabelBox>

            {currencyCodes.length > 1 && (
              <LabelBox id='currencies' label='Валюта'>
                <Chips
                  values={currencyCodes}
                  type='radio'
                  {...register('selectedCurrency')}
                  viewType='dots'
                />
              </LabelBox>
            )}
          </div>

          <div className={styles.bottomPart}>
            <div className={styles.conditionsWrapper}>
              <Controller
                name='checkboxConditions'
                rules={{ required: true }}
                render={({ field: { name, value, onChange } }) => (
                  <Checkbox name={name} checked={Boolean(value)} onChange={onChange} />
                )}
              />

              <Text tag='span' size='xs'>
                {DEPOSIT_FORM.conditions}
              </Text>

              <Link to='/' size='xs'>
                <Text tag='span' size='xs' className={styles.link}>
                  {DEPOSIT_FORM.conditionsLink1}
                </Text>
              </Link>

              <Text tag='span' size='xs'>
                и
              </Text>

              <Link to='/' size='xs'>
                <Text tag='span' size='xs' className={styles.link}>
                  {DEPOSIT_FORM.conditionsLink2}
                </Text>
              </Link>
              <span className={styles.star}>*</span>
            </div>

            {autoRenewal && (
              <div className={styles.conditionsWrapper}>
                <Controller
                  name='checkboxProlongation'
                  render={({ field: { name, value, onChange } }) => (
                    <Checkbox name={name} checked={Boolean(value)} onChange={onChange} />
                  )}
                  defaultValue={false}
                />

                <Text tag='span' size='xs'>
                  {DEPOSIT_FORM.prolongation}
                </Text>
              </div>
            )}
          </div>

          <div className={styles.buttonContainer}>
            <Button
              type='submit'
              size='m'
              className={styles.buttonContainer__cancelButton}
              theme='tertiary'
              onClick={handleBackButtonClick}
            >
              {DEPOSIT_FORM.buttonBack}
            </Button>

            <Button
              type='submit'
              size='m'
              width='max'
              className={styles.submitButton}
              disabled={!isValid}
            >
              {DEPOSIT_FORM.buttonSend}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
