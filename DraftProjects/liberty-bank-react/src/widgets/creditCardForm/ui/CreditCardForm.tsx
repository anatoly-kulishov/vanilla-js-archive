import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { calculateInputMaxLength, createInputPlaceholder } from '@/entities';
import {
  Button,
  CardType,
  Checkbox,
  ICreditCardFormData,
  InfoFrame,
  Input,
  LabelBox,
  Link,
  PATH_PAGE,
  Text,
  getAccessToken,
  getCustomerId,
  usePostCreditCardOrderMutation,
} from '@/shared';
import { BUTTON_TEXT, INPUT_VALUES, LABELS, MODAL_TEXT, TEXT } from '../constants';
import { IPostCreditCardOrder } from './types';
import styles from './CreditCardForm.module.scss';

export const CreditCardForm: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [postCreditCardOrder, { error, isSuccess }] =
    usePostCreditCardOrderMutation<IPostCreditCardOrder>();
  const accessToken = getAccessToken();

  const methods = useForm<ICreditCardFormData>({ mode: 'onChange' });

  const {
    formState: { isValid, errors },
    handleSubmit,
    control,
  } = methods;

  const onCancelButtonClick = () => {
    navigate(-1);
  };

  const onSubmitForm = (dataForm: ICreditCardFormData) => {
    if (accessToken && id) {
      postCreditCardOrder({
        customerId: getCustomerId(accessToken),
        creditCardProductId: id,
        averageMonthlyIncome: Number(dataForm.averageMonthlyIncome),
        amount: Number(dataForm.amount),
      });
    }
  };

  if (error) {
    if (error?.status === 409) {
      return (
        <div className={styles.frameWrapper}>
          <InfoFrame
            title={TEXT.titleError}
            cardType={CardType.closeBill}
            icon={{ width: '227', height: '200', image: 'send-application-fail' }}
            primaryBtnText={TEXT.backToProducts}
            onPrimaryButtonClick={() => navigate(PATH_PAGE.cardProducts)}
          />
        </div>
      );
    }
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      <div className={styles.form}>
        <Text tag='h3' weight='medium'>
          {TEXT.title} Liberty Card Classic
        </Text>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className={styles.formFrame}>
            <div className={styles.segmentOne}>
              <LabelBox
                id='amount'
                label={LABELS.limitLabel}
                className={styles.smallWrapper}
                fieldValue='RUB'
                required
                error={errors.amount?.message}
              >
                <Controller
                  name='amount'
                  control={control}
                  rules={{
                    required: 'Поле обязательно для заполнения',
                    pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                    min: {
                      value: INPUT_VALUES.min,
                      message: 'Введённый лимит меньше допустимого',
                    },
                    max: {
                      value: INPUT_VALUES.max,
                      message: 'Введённый лимит больше допустимого',
                    },
                    validate: {
                      noLeadingZero: (value) =>
                        !value.startsWith('0') || 'Сумма не может начинаться с 0',
                    },
                  }}
                  render={({ field }) => (
                    <Input.Text
                      id='amount'
                      placeholder={createInputPlaceholder(INPUT_VALUES.min, INPUT_VALUES.max)}
                      size='l'
                      className={styles.smallWrapper__input}
                      isError={!!errors.amount}
                      maxLength={calculateInputMaxLength(INPUT_VALUES.max)}
                      white
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
                id='averageMonthlyIncome'
                label={LABELS.monthlyIncomeLabel}
                fieldValue='RUB'
                required
                className={styles.smallWrapper}
                error={errors.averageMonthlyIncome?.message}
              >
                <Controller
                  name='averageMonthlyIncome'
                  control={control}
                  rules={{
                    required: 'Поле обязательно для заполнения',
                    pattern: { value: /^[\d\s]*$/, message: 'Пожалуйста, вводите цифры' },
                    minLength: {
                      value: 4,
                      message: 'Недостаточно символов',
                    },
                    maxLength: 13,
                    validate: {
                      noLeadingZero: (value) =>
                        !value.startsWith('0') || 'Сумма не может начинаться с 0',
                    },
                  }}
                  render={({ field }) => (
                    <Input.Text
                      id='averageMonthlyIncome'
                      placeholder='0'
                      size='l'
                      className={styles.smallWrapper__input}
                      isError={!!errors.averageMonthlyIncome}
                      maxLength={13}
                      white
                      mask='*** *** *** ***'
                      isReverseMask
                      chars={/[0-9]/}
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))}
                    />
                  )}
                />
              </LabelBox>
            </div>
            <div className={styles.segmentTwo}>
              <Controller
                control={control}
                name='checkboxConditions'
                rules={{ required: true }}
                render={({ field: { name, value, onChange } }) => (
                  <Checkbox name={name} checked={!!value} onChange={onChange} />
                )}
              />

              <Text tag='h5' className={styles.link}>
                {TEXT.conditions}

                <Link to='/' size='xs'>
                  {TEXT.link}
                </Link>

                <span className={styles.star}> *</span>
              </Text>
            </div>
            <div className={styles.segmentThree}>
              <Button
                type='button'
                size='m'
                className={styles.cancelButton}
                theme='tertiary'
                onClick={onCancelButtonClick}
              >
                {BUTTON_TEXT.cancel}
              </Button>

              <Button type='submit' size='m' className={styles.submitButton} disabled={!isValid}>
                {BUTTON_TEXT.send}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {isSuccess && (
        <InfoFrame
          subTitle={MODAL_TEXT.title}
          icon={{ width: '205', height: '200', image: 'current-bill' }}
          primaryBtnText={MODAL_TEXT.btn}
          cardType={CardType.openBill}
          onPrimaryButtonClick={() => navigate(PATH_PAGE.cardRequests)}
        />
      )}
    </>
  );
};
