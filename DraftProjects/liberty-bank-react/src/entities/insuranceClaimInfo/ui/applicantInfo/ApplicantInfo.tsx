import styles from '@/pages/insuranceClaim/InsuranceClaim.module.scss';
import { Input } from '@/shared';
import { ErrorMessage } from '@/features/createInsuranceApplicationRequest/ui/createHomeContentsInsuranceApplication/errorMessage';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { VALIDATION_RULES } from '@/features/createInsuranceApplicationRequest/constants';
import { documentOptions, FIELDS, insurerOptions } from '@/entities/insuranceClaimInfo/constants';

export const ApplicantInfo = () => {
  const { control } = useFormContext();
  const [documentType, insurerBirthdate] = useWatch({
    name: [FIELDS.documentType, FIELDS.insurerBirthdate],
  });

  return (
    <div className={styles['form__column']}>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.insurer}
          rules={{
            required: 'Укажите заявителя',
          }}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => {
            return (
              <div className={styles['form__input']}>
                <Input.Select
                  size='m'
                  onMySelect={onChange}
                  onBlur={onBlur}
                  label='Заявитель'
                  isError={!!error}
                  white
                  required
                  options={insurerOptions}
                  defaultOptionSelected={'Застрахованный'}
                />
                <ErrorMessage error={error} />
              </div>
            );
          }}
        />
        <Controller
          control={control}
          name={FIELDS.documentType}
          rules={VALIDATION_RULES.documentType}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Select
                size='m'
                options={documentOptions}
                label='Тип документа'
                white
                isError={!!error}
                required
                onMySelect={onChange}
                onBlur={onBlur}
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.insurerSurname}
          rules={VALIDATION_RULES.lastName}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text white label='Фамилия' isError={!!error} required {...field} disabled />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        {(documentType === 'Паспорт РФ' || !documentType) && (
          <Controller
            control={control}
            name={FIELDS.passportNumber}
            rules={VALIDATION_RULES.passportNumber}
            render={({ field, fieldState: { error } }) => (
              <div className={styles['form__input']}>
                <Input.Text
                  white
                  label='Серия и номер паспорта'
                  isError={!!error}
                  required
                  mask='** ** ******'
                  {...field}
                  disabled
                />
                <ErrorMessage error={error} />
              </div>
            )}
          />
        )}
        {documentType === 'Удостоверение беженца' && (
          <Controller
            control={control}
            name={FIELDS.passportNumber}
            rules={VALIDATION_RULES.refugeeCertificateNumber}
            render={({ field, fieldState: { error } }) => (
              <div className={styles['form__input']}>
                <Input.Text
                  white
                  label='Номер документа'
                  isError={!!error}
                  required
                  mask='** *******'
                  {...field}
                />
                <ErrorMessage error={error} />
              </div>
            )}
          />
        )}
        {documentType === 'Вид на жительство' && (
          <Controller
            control={control}
            name={FIELDS.passportNumber}
            rules={VALIDATION_RULES.residentCardNumber}
            render={({ field, fieldState: { error } }) => (
              <div className={styles['form__input']}>
                <Input.Text
                  white
                  label='Номер документа'
                  isError={!!error}
                  required
                  mask='**№*******'
                  {...field}
                  disabled
                />
                <ErrorMessage error={error} />
              </div>
            )}
          />
        )}
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.insurerName}
          rules={VALIDATION_RULES.firstName}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text white label='Имя' isError={!!error} required {...field} disabled />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.dateOfIssue}
          rules={{
            deps: [FIELDS.insurerBirthdate, FIELDS.documentType],
            validate: (v: Date) => {
              if (!v) {
                return `Введите дату выдачи ${
                  documentType === 'Паспорт РФ' ? 'паспорта' : 'документа'
                }`;
              }
              if (v > new Date()) return 'Дата не должна быть позже текущей даты';
              if (documentType === 'Паспорт РФ') {
                const checkDate = new Date(v);
                checkDate.setFullYear(v.getFullYear() - 14);
                if (insurerBirthdate && insurerBirthdate > checkDate) {
                  return 'Разница между датой рождения и датой выдачи не должна быть меньше 14 лет';
                }
              }
              if (documentType === 'Удостоверение беженца') {
                const checkDate = new Date();
                checkDate.setFullYear(checkDate.getFullYear() - 3);
                if (v < checkDate)
                  return 'Разница между датой выдачи удостоверения и текущей датой не должна быть больше 3 лет';
              }
              return true;
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Date
                label='Дата выдачи'
                isError={!!error}
                required
                white
                {...field}
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.insurerPatronymic}
          rules={VALIDATION_RULES.patronymic}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text white label='Отчество' isError={!!error} {...field} disabled />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.issuedBy}
          rules={VALIDATION_RULES.issuedBy}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text white label='Кем выдан' isError={!!error} required {...field} disabled />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.insurerBirthdate}
          rules={VALIDATION_RULES.dateOfBirth}
          render={({ fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Date label='Дата рождения' isError={!!error} required white disabled />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.departmentCode}
          rules={{ required: 'Введите код подразделения' }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text
                label='Код подразделения'
                white
                required
                isError={!!error}
                mask='***-***'
                {...field}
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.phoneNumber}
          rules={VALIDATION_RULES.phoneNumber}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Tel
                white
                label='Мобильный телефон'
                isError={!!error}
                required
                mask={'+7 (***) *** ** **'}
                {...field}
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.permanentAddress}
          rules={VALIDATION_RULES.fullAddress}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text
                label='Адрес постоянной регистрации'
                isError={!!error}
                required
                white
                {...field}
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
      <div className={styles['form__row']}>
        <Controller
          control={control}
          name={FIELDS.email}
          rules={VALIDATION_RULES.email}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Email white label='E-mail' isError={!!error} required {...field} disabled />
              <ErrorMessage error={error} />
            </div>
          )}
        />
        <Controller
          control={control}
          name={FIELDS.actualAddress}
          rules={VALIDATION_RULES.fullAddress}
          render={({ field, fieldState: { error } }) => (
            <div className={styles['form__input']}>
              <Input.Text
                label='Адрес фактической регистрации'
                isError={!!error}
                required
                white
                {...field}
                disabled
              />
              <ErrorMessage error={error} />
            </div>
          )}
        />
      </div>
    </div>
  );
};
