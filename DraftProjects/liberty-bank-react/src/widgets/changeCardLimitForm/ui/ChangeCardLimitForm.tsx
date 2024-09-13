import styles from './ChangeCardLimitForm.module.scss';
import {
  CardType,
  FormTemplate,
  Icon,
  InfoFrame,
  Input,
  PATH_PAGE,
  RadioButton,
  Text,
  getAccessToken,
  getCustomerId,
  useChangeLimitsMutation,
} from '@/shared';
import { Controller, SubmitHandler } from 'react-hook-form';
import { ChangeCardLimitsFormArgs, changeCardLimitResponseImages } from '..';
import {
  TEXT,
  changeCardLimitDurationOptions,
  changeCardLimitTypeOptions,
} from '../constants/constants';
import { getLimitCombination } from '../helpers/getLimitCombination';
import { useState } from 'react';
import { useChangeCardLimitForm } from '../hooks/useChangeCardLimitForm';
import { RestrictionsBox } from './RestrictionsBox/RestrictionsBox';
import { useNavigate, useParams } from 'react-router-dom';

export const ChangeCardLimitForm = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const customerId = getCustomerId(accessToken!);
  const [isActive, setIsActive] = useState(false);
  const [changeCardLimits, { isSuccess }] = useChangeLimitsMutation();
  const { control, isValid, isInternetSwitch, handleSubmit, limitType, duration } =
    useChangeCardLimitForm();
  const goSend = () => {
    navigate(PATH_PAGE.myCards, { replace: true });
  };
  const clickHandle: SubmitHandler<ChangeCardLimitsFormArgs> = (data): void => {
    changeCardLimits({
      id: id,
      customerId: customerId,
      operationPerDay: data.dayOperationLimit,
      operationPerMonth: data.monthOperationLimit,
      amountPerOperation: data.operationSumLimit,
      amountPerMonth: data.monthOperationLimit,
      amountPerDay: data.dayOperationSumLimit,
      permitVirtualPayment: data.internetPurchases,
    });
  };
  return (
    <div className={styles.container}>
      {isSuccess ? (
        <div className={styles['info-frame-wrapper']}>
          <InfoFrame
            icon={{
              width: '400',
              height: '400',
              image: 'info-success-card-limit',
            }}
            primaryBtnText={TEXT.GO_SEND}
            underImageTitle={TEXT.SUCCESS_TITLE}
            cardType={CardType.closeBill}
            onPrimaryButtonClick={goSend}
          />
        </div>
      ) : (
        <FormTemplate
          handleSubmitButtonClick={handleSubmit(clickHandle)}
          handleBackButtonClick={() => navigate(-1)}
          formTitle={TEXT.FORM_CHANGE_LIMIT}
          canSubmit={isActive && isValid}
        >
          <div className={styles['limits-selection-step-page__box-wrapper']}>
            <Text tag={'p'} weight='regular'>
              {TEXT.TITLE_TYPE_LIMIT}
            </Text>
            <div className={styles['limits-selection-step-page__type-limit-radio-box']}>
              {changeCardLimitTypeOptions.map((cardLimitTypeOption) => (
                <Controller
                  key={cardLimitTypeOption.value}
                  control={control}
                  name='limitType'
                  render={({ field: { name, onChange, value } }) => (
                    <RadioButton
                      name={name}
                      icon={{
                        width: '24px',
                        height: '24px',
                        icon: changeCardLimitResponseImages[cardLimitTypeOption.value],
                      }}
                      value={cardLimitTypeOption.value}
                      label={cardLimitTypeOption.label}
                      size='s'
                      checked={value === cardLimitTypeOption.value}
                      onChange={(e) => {
                        onChange(e);
                        setIsActive(false);
                      }}
                    />
                  )}
                />
              ))}
            </div>
          </div>
          <div className={styles['limits-selection-step-page__box-wrapper']}>
            <Text tag={'p'} className={styles['limits-selection-step-page__duration-text']}>
              {TEXT.TITLE_DURATION}
            </Text>
            <div className={styles['limits-selection-step-page__duration-radio-box']}>
              {changeCardLimitDurationOptions[limitType].map((durationOption) => (
                <Controller
                  key={durationOption.value}
                  control={control}
                  name='duration'
                  render={({ field: { name, onChange, value } }) => (
                    <RadioButton
                      name={name}
                      hideCircle={limitType === 'CASH'}
                      value={durationOption.value}
                      label={durationOption.label}
                      size='s'
                      checked={durationOption.value === value}
                      onChange={(e) => {
                        onChange(e);
                        setIsActive(false);
                      }}
                    />
                  )}
                />
              ))}
            </div>
          </div>
          <div className={styles['limits-selection-step-page__box-wrapper']}>
            <Text className={styles['limits-selection-step-page__restrictions-text']} tag={'p'}>
              {TEXT.TITLE_RESTRICTIONS}
            </Text>
            <div
              className={styles['limits-selection-step-page__restrictions-input-box']}
              key={limitType + '_' + duration}
            >
              {getLimitCombination(limitType, duration).map((limitField) => (
                <Controller
                  key={limitField.key}
                  control={control}
                  name={limitField.key}
                  render={({ field, fieldState: { invalid } }) => {
                    const { value, ...otherFieldProps } = field;
                    return (
                      <Input.Text
                        white
                        size='m'
                        contentRight={<Icon icon='ruble-small' />}
                        isError={invalid}
                        label={limitField.placeholder}
                        maxLength={50}
                        value={value?.toString() || ''}
                        {...otherFieldProps}
                      />
                    );
                  }}
                />
              ))}
            </div>
          </div>
          <RestrictionsBox
            showSwitch={isInternetSwitch}
            control={control}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </FormTemplate>
      )}
    </div>
  );
};
