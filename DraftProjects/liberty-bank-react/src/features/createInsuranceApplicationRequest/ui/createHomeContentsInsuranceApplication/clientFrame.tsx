import { useFormContext, Controller } from 'react-hook-form';
import { Text, Input } from '@/shared';
import {
  HC_DOCUMENT_TYPE,
  HC_CLIENT,
  PHONE_MASK,
  PHONE_LABEL,
  EMAIL_LABEL,
  PASSPORT_LABEL,
  ID_LABEL,
  PASSPORT_MASK,
  PASSPORT_RUS,
  VALIDATION_RULES,
  REFUGEE_CERTIFICATE,
  REFUGEE_CERTIFICATE_MASK,
  RESIDENT_CARD,
  RESIDENT_CARD_MASK,
  HC_ADDRESS,
} from '../../constants';
import styles from '../../shared/styles/styles.module.scss';
import { FormFrameProps } from '../../model/types';
import { FC } from 'react';
import { ErrorMessage } from './errorMessage/errorMessage';
import { InputAddress } from '@/shared/ui/inputAddress';

const ClientFrame: FC<FormFrameProps> = ({
  stepper,
  prevButton,
  nextButton,
  addressVisible = true,
}) => {
  const { control, watch, trigger } = useFormContext();
  const documentType = watch('documentType');
  const dateOfBirth = watch('dateOfBirth');
  const names = {
    region: 'region',
    city: 'city',
    street: 'street',
    house: 'house',
    entrance: 'entrance',
    apartament: 'apartament',
  };

  const region = watch(names.region);
  const city = watch(names.city);
  const street = watch(names.street);

  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>
        <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
          {HC_CLIENT.title}
        </Text>
        {stepper}
      </div>
      <div className={styles['form__body']}>
        <div className={styles['form__column']}>
          <div className={styles['form__row']}>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='lastName'
                rules={VALIDATION_RULES.lastName}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      size='m'
                      label='Фамилия'
                      isError={Boolean(error)}
                      required
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
                name='documentType'
                rules={VALIDATION_RULES.documentType}
                render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
                  <>
                    <Input.Select
                      options={HC_DOCUMENT_TYPE}
                      id='documentSelect'
                      label={HC_CLIENT.documentType}
                      white
                      size='m'
                      isError={Boolean(error)}
                      required
                      onMySelect={onChange}
                      {...{ name, value, onBlur }}
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
                name='firstName'
                rules={VALIDATION_RULES.firstName}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      size='m'
                      label='Имя'
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
              {(documentType === PASSPORT_RUS || !documentType) && (
                <Controller
                  control={control}
                  name='passportNumber'
                  rules={{ ...VALIDATION_RULES.passportNumber }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input.Text
                        type='text'
                        white
                        size='m'
                        label={PASSPORT_LABEL}
                        isError={Boolean(error)}
                        required
                        mask={documentType === PASSPORT_RUS ? PASSPORT_MASK : ''}
                        className={styles['required-field']}
                        {...field}
                      />
                      {<ErrorMessage error={error} />}
                    </>
                  )}
                />
              )}
              {documentType === REFUGEE_CERTIFICATE && (
                <Controller
                  control={control}
                  name='refugeeCertificateNumber'
                  rules={VALIDATION_RULES.refugeeCertificateNumber}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input.Text
                        white
                        size='m'
                        label={ID_LABEL}
                        isError={Boolean(error)}
                        required
                        mask={REFUGEE_CERTIFICATE_MASK}
                        className={styles['required-field']}
                        {...field}
                      />
                      {<ErrorMessage error={error} />}
                    </>
                  )}
                />
              )}
              {documentType === RESIDENT_CARD && (
                <Controller
                  control={control}
                  name='residentCardNumber'
                  rules={VALIDATION_RULES.residentCardNumber}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input.Text
                        white
                        size='m'
                        label={ID_LABEL}
                        isError={Boolean(error)}
                        required
                        mask={RESIDENT_CARD_MASK}
                        className={styles['required-field']}
                        {...field}
                      />
                      {<ErrorMessage error={error} />}
                    </>
                  )}
                />
              )}
            </div>
          </div>

          <div className={styles['form__row']}>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='patronymic'
                rules={VALIDATION_RULES.patronymic}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      size='m'
                      label='Отчество'
                      isError={Boolean(error)}
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
                name='dateOfIssue'
                rules={{
                  deps: ['dateOfBirth', 'documentType'],
                  validate: (v: Date) => {
                    if (!v) {
                      if (documentType === PASSPORT_RUS) return 'Введите дату выдачи паспорта';
                      else return 'Введите дату выдачи документа';
                    }
                    if (v > new Date()) return 'Дата не должна быть позже текущей даты';
                    if (documentType === PASSPORT_RUS) {
                      const checkDate = new Date(v);
                      checkDate.setFullYear(v.getFullYear() - 14);
                      if (dateOfBirth && dateOfBirth > checkDate) {
                        return 'Разница между датой рождения и датой выдачи не должна быть меньше 14 лет';
                      }
                    }
                    if (documentType === REFUGEE_CERTIFICATE) {
                      const checkDate = new Date();
                      checkDate.setFullYear(checkDate.getFullYear() - 3);
                      if (v < checkDate)
                        return 'Разница между датой выдачи удостоверения и текущей датой не должна быть больше 3 лет';
                    }
                    return true;
                  },
                }}
                render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                  <>
                    <Input.Date
                      className={styles['bg_primary']}
                      label={HC_CLIENT.dateOfIssue}
                      size='m'
                      isError={Boolean(error)}
                      value={value && new Date(value)}
                      required
                      white
                      {...{ onChange, onBlur }}
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
                name='dateOfBirth'
                rules={VALIDATION_RULES.dateOfBirth}
                render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
                  <>
                    <Input.Date
                      className={styles['bg_primary']}
                      label={HC_CLIENT.dateOfBirth}
                      size='m'
                      isError={Boolean(error)}
                      required
                      white
                      onChange={(e) => {
                        onChange(e);
                        if (dateOfBirth) trigger('dateOfIssue');
                      }}
                      {...{ name, onBlur, value }}
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='issuedBy'
                rules={VALIDATION_RULES.issuedBy}
                render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      white
                      size='m'
                      label='Кем выдан'
                      isError={Boolean(error)}
                      required
                      className={styles['required-field']}
                      {...{ name, onChange, onBlur, value }}
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
                name='phoneNumber'
                rules={VALIDATION_RULES.phoneNumber}
                render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
                  <>
                    <Input.Tel
                      white
                      size='m'
                      label={PHONE_LABEL}
                      isError={Boolean(error)}
                      required
                      mask={PHONE_MASK}
                      {...{ name, onChange, onBlur, value }}
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
            <div className={styles['form__field']} />
          </div>
          <div className={styles['form__row']}>
            <div className={styles['form__field']}>
              <Controller
                control={control}
                name='email'
                rules={VALIDATION_RULES.email}
                render={({ field: { name, onChange, value, onBlur }, fieldState: { error } }) => (
                  <>
                    <Input.Text
                      type='email'
                      white
                      size='m'
                      label={EMAIL_LABEL}
                      isError={Boolean(error)}
                      required
                      {...{ name, onChange, onBlur, value }}
                    />
                    {<ErrorMessage error={error} />}
                  </>
                )}
              />
            </div>
            <div className={styles['form__field']} />
          </div>
        </div>
        {addressVisible && (
          <div className={styles['form__column']}>
            <label htmlFor='currencyField' className={styles['form__field-label']}>
              <Text tag='p' size='s' weight='medium'>
                {HC_ADDRESS.title}
              </Text>
            </label>
            <div className={styles['form__row']}>
              <div className={styles['form__field']}>
                <Controller
                  control={control}
                  name={names.region}
                  rules={VALIDATION_RULES.region}
                  render={({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => (
                    <>
                      <InputAddress
                        type='region'
                        value={value}
                        isError={Boolean(error)}
                        name={name}
                        onMySelect={onChange}
                        onBlur={onBlur}
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
                  name={names.city}
                  rules={VALIDATION_RULES.city}
                  render={({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => (
                    <>
                      <InputAddress
                        type='city'
                        value={region?.length > 0 ? value : ''}
                        isError={Boolean(error)}
                        name={name}
                        onMySelect={onChange}
                        onBlur={onBlur}
                        addressOptions={{ region, city, street }}
                        readOnly={region?.length > 0}
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
                  name={names.street}
                  rules={VALIDATION_RULES.street}
                  render={({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => (
                    <>
                      <InputAddress
                        type='street'
                        value={city?.length > 0 ? value : ''}
                        isError={Boolean(error)}
                        name={name}
                        onBlur={onBlur}
                        onMySelect={onChange}
                        addressOptions={{ region, city, street }}
                        readOnly={city?.length > 0}
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
            <div className={styles['form__row']}>
              <div className={styles['form__field']}>
                <Controller
                  control={control}
                  name={names.entrance}
                  rules={VALIDATION_RULES.entrance}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input.Number
                        white
                        size='m'
                        label='Подъезд'
                        isError={Boolean(error)}
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
                  name={names.apartament}
                  rules={VALIDATION_RULES.apartament}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input.Text
                        white
                        size='m'
                        label='Квартира'
                        isError={Boolean(error)}
                        {...field}
                      />
                      {<ErrorMessage error={error} />}
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles['form__footer']}>
        <div>{prevButton}</div>
        <div>{nextButton}</div>
      </div>
    </div>
  );
};

export default ClientFrame;
