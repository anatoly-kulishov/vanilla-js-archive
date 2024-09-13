import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import {
  API_ERROR,
  Button,
  Input,
  InputBox,
  InputErrorMessage,
  Text,
  changePasswordSchema,
  passwordValidationMessages,
  trimQuotesReg,
  useChangePasswordMutation,
  getAccessToken,
} from '@/shared';
import styles from './ChangePassword.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useNotify } from '@/shared/ui/notifications';

interface IChangePasswordForm {
  oldPassword: string;
  password: string;
}

export const ChangePassword = () => {
  const notify = useNotify();
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const [changePassword] = useChangePasswordMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(changePasswordSchema),
    defaultValues: { oldPassword: '', password: '', confirmPassword: '' },
  });

  const clickHandle: SubmitHandler<IChangePasswordForm> = (data): void => {
    if (accessToken) {
      changePassword({
        password: data.oldPassword,
        newPassword: data.password,
        accessToken: accessToken.replace(trimQuotesReg, ''),
      })
        .unwrap()
        .then(() => {
          notify.success();
          navigate(-1);
        })
        .catch((e) => {
          e.data?.message === API_ERROR.WRONG_PASSWORD
            ? setError('oldPassword', { message: 'Неверный пароль' })
            : notify.error();
        });
    }
  };

  return (
    <div className={styles.changePassword}>
      <Text tag='h3' weight='medium'>
        Изменить пароль
      </Text>
      <form onSubmit={handleSubmit(clickHandle)} className={styles.form}>
        <div className={styles.inputs}>
          <Controller
            control={control}
            name='oldPassword'
            render={({ field }) => (
              <InputBox className={styles.inputBox}>
                <Input.Password
                  isError={Boolean(errors.oldPassword)}
                  label={'Старый пароль'}
                  white
                  {...field}
                />
                {errors.oldPassword?.message && (
                  <InputErrorMessage message={errors.oldPassword.message} />
                )}
              </InputBox>
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field }) => (
              <InputBox className={styles.inputBox}>
                <Input.Password
                  isError={Boolean(errors.password)}
                  label={'Новый пароль'}
                  white
                  {...field}
                />
                {errors.password?.type === 'required' && errors.password?.message && (
                  <InputErrorMessage message={errors.password.message} />
                )}

                {errors.password?.type !== 'required' &&
                  dirtyFields.password &&
                  passwordValidationMessages.map((message, index) => {
                    let isValid = true;

                    if (errors.password) {
                      const errorArr = JSON.parse(errors.password?.message || '[]');
                      isValid = !!errorArr[index];
                    }
                    return <InputErrorMessage key={message} message={message} isValid={isValid} />;
                  })}
                {errors.confirmPassword?.type === 'oneOf' && (
                  <InputErrorMessage
                    key={errors.confirmPassword.message}
                    message={errors.confirmPassword.message || ''}
                    isValid={!errors.confirmPassword}
                  />
                )}
              </InputBox>
            )}
          />
          <Controller
            control={control}
            name='confirmPassword'
            render={({ field }) => (
              <InputBox className={styles.inputBox}>
                <Input.Password
                  label='Подтвердите новый пароль'
                  isError={!!errors.confirmPassword}
                  white
                  {...field}
                />
              </InputBox>
            )}
          />
        </div>
        <div className={styles.buttons}>
          <Button className={styles.cancel} theme='third' onClick={() => navigate(-1)}>
            Отмена
          </Button>
          <Button
            className={styles.submit}
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
