import classNames from 'classnames';
import { INSURANCE } from '../../../constants/insuranceConsts';
import styles from '../../OfflineCard.module.scss';
import { Input, Text } from '@/shared';
import { Controller } from 'react-hook-form';
import { ControlType } from '../../../model/types';
import { ErrorMessage } from '../../components/errorMessage/ErrorMessage';
import { VALIDATION_RULES } from '@/features/createInsuranceApplicationRequest/constants';

export const DepartamentFieldForm = ({ control }: ControlType) => {
  return (
    <div className={classNames(styles['form__field'], styles['currency'])} id='dateField'>
      <label htmlFor='dateField' className={styles['form__field-label']}>
        <Text tag='p' size='s' weight='regular'>
          {INSURANCE.chooseDepartament}
        </Text>
      </label>
      <div className={classNames(styles['form__row'])}>
        <div className={styles['form__client']}>
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
              name='officeNumber'
              rules={VALIDATION_RULES.office}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input.Text
                    white
                    size='m'
                    className={styles['form__input']}
                    isError={Boolean(error)}
                    label='Номер отделения'
                    {...field}
                    chars={/^\d{0,3}/}
                    onBlur={(e) => {
                      if (error?.message) {
                        field.onChange(e.target.value);
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
