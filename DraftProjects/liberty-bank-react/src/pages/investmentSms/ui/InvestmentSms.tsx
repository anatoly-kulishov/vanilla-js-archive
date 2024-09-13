import { BTN_TEXT, Data, TextError } from '../constants';
import styles from './investmentSms.module.scss';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  BackButton,
  Button,
  InputBox,
  InputErrorMessage,
  PATH_PAGE,
  Input,
  Text,
  Wrapper,
  useTimer,
  usePostInvestSmsVerificationMutation,
  usePostInvestSmsVerificationCloseMutation,
  useLazyGetBrokerAccountIdQuery,
} from '@/shared';

const schema = yup.object().shape({
  sms: yup.string().required('Обязательное поле'),
});

const InvestmentSms = () => {
  const [code, setCode] = useState('');
  const [id, setId] = useState<string | undefined>('');
  const [documentId, setDocumentId] = useState<string | undefined>('');
  const navigate = useNavigate();
  const location = useLocation();
  const [postInvestSmsVerification] = usePostInvestSmsVerificationMutation();
  const [getBrokerId] = useLazyGetBrokerAccountIdQuery();
  const [postInvestSmsVerificationClose] = usePostInvestSmsVerificationCloseMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { sms: '' },
  });

  useEffect(() => {
    if (location?.state?.close) {
      getBrokerId().then((data) => setId(data?.data?.brokerAccountId));
    }
    if (location?.state?.documentId) {
      setDocumentId(location?.state?.documentId);
    }
  }, []);

  const [attempts, setAttempts] = useState<number>(5);
  const { minutes, seconds, start } = useTimer(60);

  const clickHandle = (dataSms: { [key: string]: string }) => {
    const { sms } = dataSms;
    const pin = sms;
    if (location?.state?.close) {
      postInvestSmsVerificationClose({ pin, brokerAccountId: id }).then((data) => {
        if ('error' in data) {
          navigate(PATH_PAGE.error, { state: { error: data.error } });
        } else {
          navigate(PATH_PAGE.investmentCheck);
        }
      });
    } else {
      postInvestSmsVerification({ pin, documentId }).then((data) => {
        if ('error' in data) {
          navigate(PATH_PAGE.error, { state: { error: data.error } });
        } else {
          navigate(PATH_PAGE.investmentCheck);
        }
      });
    }
  };

  useEffect(() => {
    if (/\D/.test(code)) {
      setError('sms', { type: 'code', message: TextError });
    } else {
      setError('sms', { type: 'code', message: '' });
    }
  }, [code]);

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
      <BackButton
        click={() => navigate(PATH_PAGE.investmentDocuments)}
        text={BTN_TEXT.back}
        theme={'blue'}
        className={styles['back-button']}
        width='24'
        height='24'
        name='arrow-left-blue'
      />

      <div className={styles['body-block']}>
        <Text tag={'p'} size={'ml'} weight={'medium'} className={styles['enterSms-title']}>
          {Data.title}
        </Text>
        <Text tag={'p'} size={'xs'} weight={'regular'} className={styles['enterSms-title']}>
          {Data.text}
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
                    setCode(e.target.value);
                  }}
                  white
                />
                {errors.sms?.message && <InputErrorMessage message={errors.sms.message} />}
              </InputBox>
            )}
          />
          {minutes === 0 && seconds === 0 ? (
            <Button className={styles['enterSms-new']} theme={'tertiary'} onClick={onClickHandler}>
              {Data.sms}
            </Button>
          ) : (
            <Text tag={'p'} size={'xs'} weight={'regular'}>
              {Data.time} {minutes}:{String(seconds).padStart(2, '0')}
            </Text>
          )}
          <div className={styles['block-button']}>
            <Button
              theme='tertiary'
              className={styles['reset-button']}
              onClick={() => window.location.reload()}
            >
              {BTN_TEXT.cancellation}
            </Button>
            <Button
              width='auto'
              type='submit'
              className={styles['step-button']}
              disabled={!/\d{6}/.test(code) || (minutes === 0 && seconds === 0)}
            >
              {BTN_TEXT.next}
            </Button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default InvestmentSms;
