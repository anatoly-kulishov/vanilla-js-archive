import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { RadioButton, Text } from '../../../../shared';
import { INSURANCE } from '../../constants/insuranceConsts';
import styles from '../OfflineCard.module.scss';
import { Controller, useFormContext } from 'react-hook-form';
import { ContactFieldForm, DateFieldForm, DepartamentFieldForm, AddressFieldForm } from '../shared';

interface InsuranceFrameProps {
  submitBtn: ReactNode;
}

export const InsuranceFrame: FC<InsuranceFrameProps> = ({ submitBtn }) => {
  const { control } = useFormContext();

  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>
        <Controller
          control={control}
          name='type'
          render={({ field: { value: location } }) => {
            switch (location) {
              case INSURANCE.office:
                return (
                  <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
                    {INSURANCE.descriptionOnOffice}
                  </Text>
                );
              default:
                return (
                  <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
                    {INSURANCE.descriptionOnHome}
                  </Text>
                );
            }
          }}
        />
      </div>
      <div className={styles['form__body']}>
        <div className={classNames(styles['form__field'], styles['currency'])} id='locationField'>
          <label htmlFor='locationField' className={styles['form__field-label']}>
            <Text tag='p' size='s' weight='regular'>
              {INSURANCE.chooseLocation}
            </Text>
          </label>
          <div className={classNames(styles['form__row'])}>
            <Controller
              control={control}
              name='type'
              render={({ field: { name, onChange, value } }) => (
                <RadioButton
                  name={name}
                  value={INSURANCE.home}
                  label={'Из дома'}
                  onChange={onChange}
                  checked={value === INSURANCE.home}
                  className={styles['radio-group']}
                  size='s'
                />
              )}
            />
            <Controller
              control={control}
              name='type'
              render={({ field: { name, onChange, value } }) => (
                <RadioButton
                  name={name}
                  value={INSURANCE.office}
                  label={'В отделении банка'}
                  checked={value === INSURANCE.office}
                  onChange={onChange}
                  size='s'
                />
              )}
            />
          </div>
        </div>
        <Controller
          control={control}
          name='type'
          render={({ field: { value: location } }) => {
            switch (location) {
              case INSURANCE.office: {
                return (
                  <>
                    <ContactFieldForm control={control} />
                    <DepartamentFieldForm control={control} />
                  </>
                );
              }
              default: {
                return (
                  <>
                    <AddressFieldForm control={control} />
                    <ContactFieldForm control={control} />
                  </>
                );
              }
            }
          }}
        />
        <DateFieldForm control={control} />
      </div>
      <div className={styles['form__footer']}>{submitBtn}</div>
    </div>
  );
};
