import { useFormContext, Controller } from 'react-hook-form';
import { Text, Input, Icon } from '@/shared';
import { VALIDATION_RULES, HC_HOME, CurrencyTypes, CURRENCY_ICONS } from '../../constants';
import styles from '../../shared/styles/styles.module.scss';
import { FormFrameProps } from '../../model/types';
import { FC } from 'react';
import { ErrorMessage } from '../../ui/createHomeContentsInsuranceApplication/errorMessage';
import classNames from 'classnames';

const DetailsOfHomeFrame: FC<FormFrameProps> = ({
  stepper,
  prevButton,
  submitButton,
  title = HC_HOME.title,
}) => {
  const { control, watch } = useFormContext();
  const currency: CurrencyTypes = watch('contractCurrency');

  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>
        <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
          {title}
        </Text>
        {stepper}
      </div>
      <div className={styles['form__body']}>
        <div className={styles['form__column']}>
          <div className={styles['form__row']}>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='yearOfConstruction'
                rules={VALIDATION_RULES.yearOfConstruction}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Number
                      white
                      size='m'
                      label='Год постройки'
                      isError={Boolean(error)}
                      required
                      maxLength={4}
                      {...field}
                    />
                    <ErrorMessage error={error} />
                  </>
                )}
              />
            </div>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='buildingArea'
                rules={VALIDATION_RULES.buildingArea}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Number
                      id='buildingArea'
                      label={HC_HOME.buildingArea}
                      white
                      size='m'
                      isError={Boolean(error)}
                      required
                      {...field}
                      min={0}
                      contentRight={<Icon icon={'square-metres'} />}
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
          </div>
          <div className={styles['form__row']}>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='actualCost'
                rules={VALIDATION_RULES.actualCost}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Number
                      id='actualCost'
                      label={HC_HOME.actualCost}
                      white
                      size='m'
                      isError={Boolean(error)}
                      required
                      {...field}
                      min={0}
                      contentRight={<Icon icon={CURRENCY_ICONS[currency]} />}
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='insuranceAmount'
                rules={VALIDATION_RULES.insuranceAmount}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Number
                      id='insuranceAmount'
                      label={HC_HOME.insuranceAmount}
                      white
                      size='m'
                      isError={Boolean(error)}
                      required
                      {...field}
                      min={0}
                      max={9999999999}
                      thousandsSeparator
                      contentRight={<Icon icon={CURRENCY_ICONS[currency]} />}
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <div className={styles['form__column']}>
          <label htmlFor='currencyField' className={styles['form__field-label']}>
            <Text tag='p' size='s' weight='medium'>
              {HC_HOME.subtitle}
            </Text>
          </label>
          <div className={classNames(styles['form__row'])}>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='regionOfBuilding'
                rules={VALIDATION_RULES.region}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      size='m'
                      label='Область/край'
                      isError={Boolean(error)}
                      required
                      {...field}
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='cityOfBuilding'
                rules={VALIDATION_RULES.city}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      size='m'
                      label='Город'
                      isError={Boolean(error)}
                      required
                      {...field}
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
          </div>
          <div className={classNames(styles['form__row'])}>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='streetOfBuilding'
                rules={VALIDATION_RULES.street}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      size='m'
                      label='Улица'
                      isError={Boolean(error)}
                      required
                      {...field}
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='houseOfBuilding'
                rules={VALIDATION_RULES.house}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      size='m'
                      label='Дом'
                      isError={Boolean(error)}
                      required
                      {...field}
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
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

export default DetailsOfHomeFrame;
