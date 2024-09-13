import { FC, useEffect } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  InputErrorMessage,
  Text,
  changeEmailSchema,
  getAccessToken,
  useChangeEmailMutation,
  trimQuotesReg,
} from '@/shared';
import styles from './PersonalAccountChangeEmail.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotify } from '@/shared/ui/notifications';

interface IChangeEmailForm {
  email: string;
}

const PersonalAccountChangeEmail: FC = () => {
  const notify = useNotify();
  const [changeEmail, { isSuccess }] = useChangeEmailMutation();
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const handleButtonClick = () => navigate(-1);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(changeEmailSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess]);

  const clickHandle: SubmitHandler<IChangeEmailForm> = (data): void => {
    if (accessToken)
      changeEmail({
        email: data.email,
        accessToken: accessToken.replace(trimQuotesReg, ''),
      })
        .unwrap()
        .then(
          () => notify.success(),
          () => notify.error(),
        );
  };

  return (
    <div className={styles.modal}>
      <Text tag='p' size='l' weight='medium'>
        Изменить E-mail
      </Text>
      <form onSubmit={handleSubmit(clickHandle)} className={styles.bgForm}>
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <>
              <Input.Email
                className={styles.input}
                isError={Boolean(errors.email)}
                label={'Новый E-mail'}
                {...field}
              />
              {errors.email?.message && <InputErrorMessage message={errors.email.message} />}
            </>
          )}
        />
        <div className={styles.buttons__block}>
          <Button onClick={handleButtonClick} className={styles.buttonCancell} theme='third'>
            Отмена
          </Button>
          <Button
            className={styles.buttonSubmit}
            size='m'
            type='submit'
            disabled={!isValid}
            onClick={handleSubmit(clickHandle)}
          >
            Отправить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalAccountChangeEmail;
