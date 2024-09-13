import classNames from 'classnames';
import { Input, Text } from '@/shared';
import { INSURANCE } from '../../../constants/insuranceConsts';
import { ControlType } from '../../../model/types';
import styles from '../../OfflineCard.module.scss';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '../../components/errorMessage/ErrorMessage';
import { VALIDATION_RULES } from '@/features/createInsuranceApplicationRequest/constants';

export const AddressFieldForm = ({ control }: ControlType) => {
  return (
    <div className={classNames(styles['form__field'], styles['currency'])} id='dateField'>
      <label htmlFor='dateField' className={styles['form__field-label']}>
        <Text tag='p' size='s' weight='regular'>
          {INSURANCE.chooseAddress}
        </Text>
      </label>
      <div className={classNames(styles['form__row'])}>
        <div className={styles['form__field']}>
          <div className={styles['form__row']}>
            <div className={styles['form__client-container']}>
              <Controller
                control={control}
                name='city'
                rules={{
                  required: 'Это поле обязательно для заполнения',
                }}
                render={({ field: { name, onChange, onBlur, value }, fieldState: { error } }) => (
                  <>
                    <Input.Select
                      name={name}
                      options={['Москва', 'Санкт-Петербург']}
                      id='city'
                      required
                      onMySelect={onChange}
                      onBlur={onBlur}
                      className={styles['form__input']}
                      value={value}
                      isError={Boolean(error)}
                      size='m'
                      label={'Город'}
                      white
                    />
                    <ErrorMessage error={error} />
                  </>
                )}
              />
            </div>
            <div className={styles['form__client-container']}>
              <Controller
                control={control}
                name='street'
                rules={VALIDATION_RULES.street}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      isError={Boolean(error)}
                      size='m'
                      label='Улица'
                      className={styles['form__input']}
                      required
                      {...field}
                      chars={/(?![- ']).+/g}
                    />
                    <ErrorMessage error={error} />
                  </>
                )}
              />
            </div>
          </div>
          <div className={styles['form__row']}>
            <div className={styles['form__client-container']}>
              <Controller
                control={control}
                name='building'
                rules={VALIDATION_RULES.house}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      size='m'
                      isError={Boolean(error)}
                      label='Дом'
                      required
                      className={styles['form__input']}
                      {...field}
                      chars={/(?![- /]).+/g}
                    />
                    <ErrorMessage error={error} />
                  </>
                )}
              />
            </div>
            <div className={styles['form__client-container']}>
              <Controller
                control={control}
                name='apartment'
                rules={VALIDATION_RULES.apartment}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      isError={Boolean(error)}
                      size='m'
                      label='Квартира'
                      className={styles['form__input']}
                      {...field}
                      chars={/(?!0)\d+/g}
                      onBlur={(e) => {
                        if (error?.message) {
                          field.onChange(e.target.value.slice());
                        }
                      }}
                    />
                    <ErrorMessage error={error} />
                  </>
                )}
              />
            </div>
          </div>
          <div className={styles['form__row']}>
            <div className={styles['form__client-container']}>
              <Controller
                control={control}
                name='floor'
                rules={VALIDATION_RULES.floor}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      isError={Boolean(error)}
                      size='m'
                      label='Этаж'
                      className={styles['form__input']}
                      {...field}
                      chars={/(?!0)\d+/g}
                      onBlur={(e) => {
                        if (error?.message) {
                          field.onChange(e.target.value.slice(0));
                        }
                      }}
                    />
                    <ErrorMessage error={error} />
                  </>
                )}
              />
            </div>
            <div className={styles['form__client-container']}>
              <Controller
                control={control}
                rules={VALIDATION_RULES.entrance}
                name='entrance'
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      isError={Boolean(error)}
                      size='m'
                      label='Подъезд'
                      className={styles['form__input']}
                      {...field}
                      chars={/(?!0)\d+/g}
                      onBlur={(e) => {
                        if (error?.message) {
                          field.onChange(e.target.value.slice());
                        }
                      }}
                    />
                    <ErrorMessage error={error} />
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
