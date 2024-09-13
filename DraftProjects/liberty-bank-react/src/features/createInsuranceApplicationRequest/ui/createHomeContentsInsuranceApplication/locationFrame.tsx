import { useFormContext, Controller } from 'react-hook-form';
import { Text, RadioButton, Input } from '@/shared';
import { HC_BUILDING_MATERIAL, HC_LOCATION, VALIDATION_RULES } from '../../constants';
import styles from '../../shared/styles/styles.module.scss';
import { FC } from 'react';
import { FormFrameProps } from '../../model/types';
import { ErrorMessage } from './errorMessage/errorMessage';
import { AddressFieldForm } from '@/features/offlineCard/ui/shared';

const LocationFrame: FC<FormFrameProps> = ({ stepper, prevButton, submitButton }) => {
  const { control } = useFormContext();
  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>
        <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
          {HC_LOCATION.title}
        </Text>
        {stepper}
      </div>
      <div className={styles['form__body']}>
        <div className={styles['form__field']}>
          <Controller
            control={control}
            name='constructionMaterial'
            rules={VALIDATION_RULES.constructionMaterial}
            render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
              <>
                <Input.Select
                  name={name}
                  options={Object.keys(HC_BUILDING_MATERIAL)}
                  id='constructionMaterial'
                  className={styles['bg_primary']}
                  label={HC_LOCATION.buildingMaterial}
                  required
                  white
                  onMySelect={onChange}
                  onBlur={onBlur}
                  value={value}
                  size='m'
                  isError={Boolean(error)}
                />
                <ErrorMessage error={error} />
              </>
            )}
          />
        </div>
        <AddressFieldForm control={control} />
        <div className={styles['form__field']}>
          <label className={styles['form__field-label']}>
            <Text tag='p' size='s' weight='medium'>
              {HC_LOCATION.alarmTitle}
            </Text>
          </label>
          <div className={styles['form__row']}>
            <Controller
              control={control}
              name='isSecuritySystem'
              render={({ field: { name, onChange, value } }) => (
                <RadioButton
                  name={name}
                  value={HC_LOCATION.alarmTrue}
                  label={HC_LOCATION.alarmTrue}
                  onChange={onChange}
                  checked={value === HC_LOCATION.alarmTrue}
                  size='s'
                />
              )}
            />
            <Controller
              control={control}
              name='isSecuritySystem'
              render={({ field: { name, onChange, value } }) => (
                <RadioButton
                  name={name}
                  value={HC_LOCATION.alarmFalse}
                  label={HC_LOCATION.alarmFalse}
                  checked={value === HC_LOCATION.alarmFalse}
                  onChange={onChange}
                  size='s'
                />
              )}
            />
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

export default LocationFrame;
