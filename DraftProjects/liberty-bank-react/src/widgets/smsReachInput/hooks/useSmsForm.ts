import { useTimer } from '@/shared';
import { setPromiseTimeout } from '@/shared/lib';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SMS_ATTEMPTS, SMS_SECOND_TIMER, SMS_TIMER } from '../model/constants';
import { SmsFormControls } from '../model/types';

interface Props {
  setCanGoNext: (v: boolean) => void;
  setIsFormLoading: (v: boolean) => void;
}

export const useSmsForm = ({ setCanGoNext, setIsFormLoading }: Props): SmsFormControls => {
  const {
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { sms: '' },
  });

  const sended = useRef(false);

  watch(async (values, { name }) => {
    if (name === 'sms') {
      if (values.sms && values.sms.length > 5 && !sended.current) {
        sended.current = true;
        await setPromiseTimeout(300);
        setIsFormLoading(true);
        // TODO заменить на отправку кода
        const res = await setPromiseTimeout(1000, {
          value: { isSuccess: true },
        });
        if (res?.isSuccess) {
          setIsFormLoading(false);
          setCanGoNext(true);
        } else {
          setError('sms', { message: 'Код неверный' });
          setCanGoNext(false);
          setIsFormLoading(false);
        }
        //
      } else {
        sended.current = false;
      }
    }
  });

  const [attempts, setAttempts] = useState(SMS_ATTEMPTS);
  const { minutes, seconds, start } = useTimer(SMS_TIMER);

  const sendCodeClickHandler = () => {
    setAttempts(attempts - 1);
    if (attempts) {
      start(SMS_TIMER);
    } else {
      setAttempts(SMS_ATTEMPTS);
      start(SMS_SECOND_TIMER);
    }
    // TODO отправить код повторно
  };

  return {
    errors,
    control,
    minutes,
    seconds,
    sendNewCodeClickHandler: sendCodeClickHandler,
  };
};
