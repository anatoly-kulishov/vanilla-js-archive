import classNames from 'classnames';
import { Input, Text } from '@/shared';
import { INSURANCE } from '../../../constants/insuranceConsts';
import styles from '../../OfflineCard.module.scss';
import { Controller } from 'react-hook-form';
import { ControlType } from '../../../model/types';
import { VALIDATION_RULES } from '@/features/createInsuranceApplicationRequest/constants';
import { ErrorMessage } from '../../components/errorMessage/ErrorMessage';

export const DateFieldForm = ({ control }: ControlType) => {
  return (
    <div className={classNames(styles['form__field'], styles['currency'])} id='dateField'>
      <label htmlFor='dateField' className={styles['form__field-label']}>
        <Text tag='p' size='s' weight='regular'>
          {INSURANCE.chooseDate}
        </Text>
      </label>
      <div className={classNames(styles['form__row'])}>
        <div className={styles['form__client']}>
          <div className={styles['form__client-container']}>
            <Controller
              control={control}
              name='date'
              rules={VALIDATION_RULES.dateOfMeeting}
              render={({ field: { name, onChange, onBlur, value }, fieldState: { error } }) => (
                <>
                  <Input.Date
                    label={INSURANCE.dateType}
                    required
                    size='m'
                    isError={Boolean(error)}
                    white
                    {...{ name, onChange, onBlur, value }}
                  />
                  <ErrorMessage error={error} />
                </>
              )}
            />
          </div>
          <div className={styles['form__client-container']}>
            <Controller
              control={control}
              name='time'
              rules={VALIDATION_RULES.timeOfMeeting}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input.Text
                    white
                    size='m'
                    isError={Boolean(error)}
                    label='ЧЧ:ММ'
                    required
                    className={styles['form__input']}
                    mask='**:**'
                    {...field}
                    chars={/\d/g}
                  />
                  <ErrorMessage error={error} />
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
