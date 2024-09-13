import { Controller } from 'react-hook-form';
import { INSURANCE } from '../../../constants/insuranceConsts';
import classNames from 'classnames';
import styles from '../../OfflineCard.module.scss';
import { Input, Text } from '@/shared';
import { ControlType } from '../../../model/types';
import { VALIDATION_RULES } from '@/features/createInsuranceApplicationRequest/constants';
import { ErrorMessage } from '../../components/errorMessage/ErrorMessage';

export const ContactFieldForm = ({ control }: ControlType) => {
  return (
    <div className={classNames(styles['form__field'], styles['currency'])} id='contactField'>
      <label htmlFor='contactField' className={styles['form__field-label']}>
        <Text tag='p' size='s' weight='regular'>
          {INSURANCE.contacts}
        </Text>
      </label>
      <div className={styles['form__field']}>
        <div className={styles['form__row']}>
          <div className={styles['form__client-container']}>
            <Controller
              control={control}
              name='name'
              rules={VALIDATION_RULES.firstName}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input.Text
                    white
                    size='m'
                    label='Имя'
                    isError={Boolean(error)}
                    required
                    className={styles['form__input']}
                    {...field}
                  />
                  {<ErrorMessage error={error} />}
                </>
              )}
            />
          </div>
          <div className={styles['form__client-container']}>
            <Controller
              control={control}
              name='surname'
              rules={VALIDATION_RULES.lastName}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input.Text
                    white
                    size='m'
                    label='Фамилия'
                    isError={Boolean(error)}
                    required
                    className={styles['form__input']}
                    {...field}
                    chars={/(?![- /]).{0,30}/g}
                    onBlur={(e) => {
                      if (error?.message) {
                        const validValue =
                          e.target.value.match(/(?![- /]).{0,30}[^- /]/g)?.join('') || '';
                        field.onChange(validValue.slice(0, 30));
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
              name='patronym'
              rules={VALIDATION_RULES.patronymic}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input.Text
                    white
                    size='m'
                    label='Отчество'
                    isError={Boolean(error)}
                    className={styles['form__input']}
                    {...field}
                    chars={/(?![- /]).+/g}
                    onBlur={(e) => {
                      if (error?.message) {
                        const validValue =
                          e.target.value.match(/(?![- /]).{0,30}[^- /]/g)?.join('') || '';
                        field.onChange(validValue.slice(0, 30));
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
              name='mobilePhone'
              rules={VALIDATION_RULES.phoneNumber}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input.Tel
                    white
                    size='m'
                    label='Мобильный телефон'
                    isError={Boolean(error)}
                    required
                    className={styles['form__input']}
                    {...field}
                    mask='+7 (***) *** ** **'
                    chars={/[0-9]/}
                    onBlur={(e) => {
                      if (error?.message) {
                        const validValue = e.target.value.match(/\d/g)?.join('') || '';
                        field.onChange(validValue);
                      }
                    }}
                  />
                  {<ErrorMessage error={error} />}
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
