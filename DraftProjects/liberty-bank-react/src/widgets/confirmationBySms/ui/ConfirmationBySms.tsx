import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  InputBox,
  InputErrorMessage,
  Input,
  Text,
  creditSmsSchema,
  useTimer,
} from '@/shared';
import { CONFIRMATION_SMS_TEXT } from '../constants';
import styles from './ConfirmationBySms.module.scss';

interface IConfirmationBySms {
  clickHandle: () => void;
}

export const ConfirmationBySms: FC<IConfirmationBySms> = ({ clickHandle }) => {
  const [attempts, setAttempts] = useState(5);
  const { minutes, seconds, start } = useTimer(60);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { sms: '' },
    resolver: yupResolver(creditSmsSchema),
  });

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
    <div className={styles.body_block}>
      <Text tag={'p'} size={'ml'} weight={'medium'} className={styles.enterSms_title}>
        {CONFIRMATION_SMS_TEXT.enterCode}
      </Text>
      <Text tag={'p'} size={'xs'} weight={'regular'} className={styles.enterSms_title}>
        {CONFIRMATION_SMS_TEXT.verificationCodeHasBeenSent}
      </Text>
      <form onSubmit={handleSubmit(clickHandle)}>
        <Controller
          control={control}
          name='sms'
          render={({ field: { onChange } }) => (
            <InputBox className={styles.enterPhone_input}>
              <Input.SMS isError={Boolean(errors.sms?.message)} onChange={onChange} white />
              {errors.sms?.message && <InputErrorMessage message={errors.sms.message} />}
            </InputBox>
          )}
        />

        {minutes === 0 && seconds === 0 ? (
          <Button className={styles.enterSms_new} theme={'tertiary'} onClick={onClickHandler}>
            {CONFIRMATION_SMS_TEXT.sendSmsAgain}
          </Button>
        ) : (
          <Text tag={'p'} size={'xs'} weight={'regular'}>
            {CONFIRMATION_SMS_TEXT.resendingSmsVia}
            {minutes}:{String(seconds).padStart(2, '0')}
          </Text>
        )}
        <div className={styles.block_button}>
          <Button
            theme='tertiary'
            className={styles.reset_button}
            onClick={() => window.location.reload()}
          >
            {CONFIRMATION_SMS_TEXT.cancel}
          </Button>
          <Button
            width='auto'
            type='submit'
            className={styles.step_button}
            disabled={!Object.keys(errors) || (minutes === 0 && seconds === 0)}
          >
            {CONFIRMATION_SMS_TEXT.next}
          </Button>
        </div>
      </form>
    </div>
  );
};
