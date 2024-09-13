import { Controller, useFormContext, useWatch } from 'react-hook-form';
import styles from '../../../shared/styles/styles.module.scss';
import { Input, Text } from '@/shared';
import classNames from 'classnames';
import { HC_ADDRESS, VALIDATION_RULES } from '../../../constants';
import { ErrorMessage } from '../../createHomeContentsInsuranceApplication/errorMessage';
import { FC, useEffect } from 'react';
import { InputAddress } from '@/shared/ui/inputAddress';

type RegistrationAddressFieldProps = {
  namePrefix?: string;
};

type NamesType = {
  [key: string]: string;
};

export const RegistrationAddressField: FC<RegistrationAddressFieldProps> = ({ namePrefix }) => {
  const { control, setValue } = useFormContext();

  const names: NamesType = {
    region: 'region',
    city: 'city',
    street: 'street',
    house: 'house',
    entrance: 'entrance',
    apartament: 'apartament',
  };

  if (namePrefix) {
    for (const key in names) {
      names[key] = `${namePrefix}.${key}`;
    }
  }

  const [region, city, street] = useWatch({
    defaultValue: {
      [names.region]: sessionStorage.getItem('region') as string,
      [names.city]: sessionStorage.getItem('city') as string,
      [names.street]: sessionStorage.getItem('street') as string,
    },
    name: [names.region, names.city, names.street],
  });

  useEffect(() => {
    if (!region) {
      setValue(names.city, '');
      setValue(names.street, '');
    }
    if (!city) {
      setValue(names.street, '');
    }
    sessionStorage.setItem('region', region as string);
    sessionStorage.setItem('city', city as string);
    sessionStorage.setItem('street', street as string);
  }, [region, city, street]);

  return (
    <div className={styles['form__column']}>
      <label htmlFor='currencyField' className={styles['form__field-label']}>
        <Text tag='p' size='s' weight='medium'>
          {HC_ADDRESS.title}
        </Text>
      </label>
      <div className={classNames(styles['form__row'])}>
        <div className={styles['form__field']}>
          <Controller
            control={control}
            name={names.region}
            rules={VALIDATION_RULES.region}
            render={({ field: { value, name, onChange, onBlur }, fieldState: { error } }) => (
              <>
                <InputAddress
                  type='region'
                  isError={Boolean(error)}
                  name={name}
                  onMySelect={onChange}
                  onBlur={onBlur}
                  addressOptions={{ region, city, street }}
                  value={value}
                />
                {<ErrorMessage error={error} />}
              </>
            )}
          />
        </div>
        <div className={styles['form__field']}>
          <Controller
            control={control}
            name={names.city}
            rules={VALIDATION_RULES.city}
            render={({ field: { value, name, onChange, onBlur }, fieldState: { error } }) => (
              <>
                <InputAddress
                  readOnly={Boolean(region)}
                  type='city'
                  isError={Boolean(error)}
                  name={name}
                  value={value}
                  onMySelect={onChange}
                  onBlur={onBlur}
                  addressOptions={{ region, city, street }}
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
            name={names.street}
            rules={VALIDATION_RULES.street}
            render={({ field: { value, name, onChange, onBlur }, fieldState: { error } }) => (
              <>
                <InputAddress
                  readOnly={Boolean(region && city)}
                  type='street'
                  isError={Boolean(error)}
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  onMySelect={onChange}
                  addressOptions={{ region, city, street }}
                />
                {<ErrorMessage error={error} />}
              </>
            )}
          />
        </div>
        <div className={styles['form__field']}>
          <Controller
            control={control}
            name={names.house}
            rules={VALIDATION_RULES.house}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input.Text
                  white
                  size='m'
                  isError={Boolean(error)}
                  label='Дом'
                  required
                  chars={/[0-9]/}
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
            name={names.entrance}
            rules={VALIDATION_RULES.entrance}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input.Text
                  white
                  size='m'
                  isError={Boolean(error)}
                  label='Подъезд'
                  required
                  {...field}
                  chars={/[0-9]/}
                />
                {<ErrorMessage error={error} />}
              </>
            )}
          />
        </div>
        <div className={styles['form__field']}>
          <Controller
            control={control}
            name={names.apartament}
            rules={{ ...VALIDATION_RULES.entrance, required: 'Введите название квартиры' }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input.Text
                  white
                  size='m'
                  isError={Boolean(error)}
                  label='Квартира'
                  required
                  {...field}
                  chars={/[0-9]/}
                />
                {<ErrorMessage error={error} />}
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};
