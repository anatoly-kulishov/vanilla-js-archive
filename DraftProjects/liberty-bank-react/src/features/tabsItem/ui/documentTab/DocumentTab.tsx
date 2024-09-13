import { useEffect, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AUTH_API_ERROR,
  AUTH_TYPE,
  AuthDocumentSchema,
  Button,
  ERROR_MESSAGE,
  IAPIError,
  Input,
  InputErrorMessage,
  Link,
  MAX_INPUT_LENGTH,
  PATH_PAGE,
  useLoginMutation,
} from '@/shared';
import { IDocumentFormInputs } from '../../model/form';
import styles from './DocumentTab.module.scss';

export const DocumentTab: FC = () => {
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: { document: '', password: '' },
    resolver: yupResolver(AuthDocumentSchema),
  });
  const [showAuthErr, setShowAuthErr] = useState(false);
  const navigate = useNavigate();
  const changeInputDocument = watch('document');
  const changeInputPassword = watch('password');
  const [login, { isSuccess, error, isError }] = useLoginMutation();
  const errMsg = error && 'data' in error ? (error.data as IAPIError).message : '';

  useEffect(() => {
    if (isSuccess) {
      navigate(PATH_PAGE.root);
    }
  }, [isSuccess]);

  useEffect(() => {
    setShowAuthErr(false);
  }, [changeInputDocument, changeInputPassword]);

  useEffect(() => {
    if (isError && !showAuthErr) {
      setShowAuthErr(true);
    }
  }, [isError]);

  const clickHandle: SubmitHandler<IDocumentFormInputs> = (userData): void => {
    login({
      password: userData.password,
      login: userData.document,
      type: AUTH_TYPE.DOC,
    });
  };

  const handleClickReset: () => void = () => resetField('document');

  return (
    <form onSubmit={handleSubmit(clickHandle)}>
      <div className={styles['document-container']}>
        <Controller
          control={control}
          name='document'
          render={({ field }) => (
            <Input.Tel
              label='Серия и номер паспорта/ВНЖ'
              {...field}
              isError={
                Boolean(errors.document) ||
                (showAuthErr && errMsg === AUTH_API_ERROR.INCORREACT_LOGIN)
              }
              clearable={{ onClear: handleClickReset }}
              maxLength={MAX_INPUT_LENGTH}
            />
          )}
        />
        {errors.document?.message && <InputErrorMessage message={errors.document?.message} />}
        {showAuthErr && errMsg === AUTH_API_ERROR.INCORREACT_LOGIN && (
          <InputErrorMessage
            message={ERROR_MESSAGE.INCORREACT_DOCUMENT}
            classNameProp={styles.errorMessage}
          />
        )}
      </div>
      <div className={styles['password-container']}>
        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <Input.Password
              label='Пароль'
              {...field}
              isError={
                Boolean(errors.password) ||
                (showAuthErr && errMsg === AUTH_API_ERROR.WRONG_PASSWORD)
              }
              maxLength={MAX_INPUT_LENGTH}
            />
          )}
        />
        {errors.password?.message && <InputErrorMessage message={errors.password?.message} />}
        {showAuthErr && errMsg === AUTH_API_ERROR.WRONG_PASSWORD && (
          <InputErrorMessage
            message={ERROR_MESSAGE.WRONG_PASSWORD}
            classNameProp={styles.errorMessage}
          />
        )}
      </div>

      <div className={styles['reset-link-container']}>
        <Link to={PATH_PAGE.reset} size='xs'>
          Забыли пароль?
        </Link>
      </div>
      <Button size='l' type='submit' width='max' disabled={!isValid}>
        Вперед
      </Button>
    </form>
  );
};
