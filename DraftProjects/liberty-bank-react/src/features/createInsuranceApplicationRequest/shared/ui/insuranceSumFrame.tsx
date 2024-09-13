import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormFrameProps } from '../../model/types';
import { Icon, Input, Text } from '@/shared';
import {
  CURRENCY_ICONS,
  CurrencyTypes,
  HC_HOME,
  RESULT_TITLE,
  VALIDATION_RULES,
} from '../../constants';
import styles from '../../shared/styles/styles.module.scss';
import { ErrorMessage } from '../../ui/createHomeContentsInsuranceApplication/errorMessage';
import classNames from 'classnames';
import { INSURANCE_SUM_GROUP } from '@/features';

export const InsuranceSumFrame: FC<FormFrameProps> = ({ stepper, prevButton, submitButton }) => {
  const { control, watch } = useFormContext();
  const currency: CurrencyTypes = watch('contractCurrency');

  return (
    <div className={styles['form__container_small']}>
      <div className={styles['form__header']}>
        <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
          {RESULT_TITLE}
        </Text>
        {stepper}
      </div>
      <div className={styles['form__body']}>
        <div className={styles['form__column']}>
          <div className={classNames(styles['form__row'], styles['width-550'])}>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='insuranceSum'
                rules={VALIDATION_RULES.insuranceAmount}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Select
                      options={INSURANCE_SUM_GROUP.options}
                      id='insuranceSum'
                      required
                      isError={Boolean(error)}
                      onMySelect={field.onChange}
                      size='m'
                      label={HC_HOME.insuranceSum}
                      white
                      {...field}
                    />

                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
            <div className={styles['form__select-currency']}>
              <Icon icon={CURRENCY_ICONS[currency]} widthAndHeight={'40px'} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles['form__footer']}>
        <div>{prevButton}</div>
        <div>{submitButton}</div>
      </div>
    </div>
  );
};
