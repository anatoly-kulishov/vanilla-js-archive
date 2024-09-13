import {
  Button,
  InputBox,
  InputErrorMessage,
  Text,
  Input,
  Wrapper,
  useTimer,
  useVerificationByCodeMutation,
} from '@/shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import styles from './SmsValidation.module.scss';
import { TEXT } from './constants';
import { userData } from './mocks';

const schema = yup.object().shape({
  sms: yup.string().required('Обязательное поле'),
});

interface Props {
  setIsValidSms?: React.Dispatch<React.SetStateAction<boolean>>;
  nextPage?: string;
}

const SmsValidation = ({ setIsValidSms }: Props) => {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  const [verificationByCode] = useVerificationByCodeMutation();
  const phone = userData.phone;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { sms: '' },
  });

  const [attempts, setAttempts] = useState<number>(5);
  const { minutes, seconds, start } = useTimer(60);

  const clickHandle = (dataSms: { [key: string]: string }) => {
    const { sms } = dataSms;
    if (phone) {
      verificationByCode({ mobilePhone: phone, verificationCode: sms }).then(() => {
        // TODO пока верификация не сделана должным образом
        if (setIsValidSms) {
          setIsValidSms(true);
        }
        // if ('error' in data) {
        //   navigate(PATH_PAGE.error, { state: { error: data.error } });
        // } else {
        //   navigate(nextPage);
        // }
      });
    }
  };

  const handleCancelForm = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (/\D/.test(pin)) {
      setError('sms', { type: 'code', message: TEXT.errorMessage });
    } else {
      setError('sms', { type: 'code', message: '' });
    }
  }, [pin]);

  const onClickHandler = (): void => {
    setAttempts(attempts - 1);
    if (attempts) {
      start(30);
    } else {
      setAttempts(3);
      start(600);
    }
  };

  return (
    <Wrapper size='l'>
      <div className={styles['body-block']}>
        <Text tag={'p'} size={'ml'} weight={'medium'} className={styles['enterSms-title']}>
          {TEXT.smsHeader}
        </Text>
        <Text tag={'p'} size={'xs'} weight={'regular'} className={styles['enterSms-title']}>
          {TEXT.codeHeader}
        </Text>
        <form onSubmit={handleSubmit(clickHandle)}>
          <Controller
            control={control}
            name='sms'
            render={({ field: { onChange } }) => (
              <InputBox className={styles['enterPhone-input']}>
                <Input.SMS
                  isError={Boolean(errors.sms?.message)}
                  onChange={(e) => {
                    onChange(e);
                    setPin(e.target.value);
                  }}
                  white
                />
                {errors.sms?.message && <InputErrorMessage message={errors.sms.message} />}
              </InputBox>
            )}
          />

          {minutes === 0 && seconds === 0 ? (
            <Button className={styles['enterSms-new']} theme={'tertiary'} onClick={onClickHandler}>
              {TEXT.sendCode}
            </Button>
          ) : (
            <Text tag={'p'} size={'xs'} weight={'regular'}>
              {TEXT.resendCode}
              {minutes}:{String(seconds).padStart(2, '0')}
            </Text>
          )}
          <div className={styles['block-button']}>
            <Button theme='tertiary' className={styles['reset-button']} onClick={handleCancelForm}>
              {TEXT.cancelForm}
            </Button>
            <Button
              width='auto'
              type='submit'
              className={styles['step-button']}
              disabled={!/\d{6}/.test(pin) || (minutes === 0 && seconds === 0)}
            >
              {TEXT.submitForm}
            </Button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default SmsValidation;
