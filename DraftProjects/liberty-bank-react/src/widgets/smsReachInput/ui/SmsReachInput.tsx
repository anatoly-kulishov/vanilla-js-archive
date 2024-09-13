import { Button, InputBox, InputErrorMessage, Input, Text } from '@/shared';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import { TEXT } from '../model/constants';
import { SmsFormControls } from '../model/types';
import styles from './SmsReachInput.module.scss';

interface Props {
  className?: string;
  smsFormControls: SmsFormControls;
}

export const SmsReachInput = ({
  className,
  smsFormControls: { control, errors, minutes, seconds, sendNewCodeClickHandler },
}: Props) => {
  return (
    <div className={classNames(styles.smsReachInput, className)}>
      <Text tag={'p'} size={'ml'} weight={'medium'} className={styles.smsInputTitle}>
        {TEXT.TITLE}
      </Text>
      <Text tag={'p'} size={'xs'} weight={'regular'} className={styles.smsInputSubtitle}>
        {TEXT.SUBTITLE}
      </Text>
      <Controller
        control={control}
        name='sms'
        render={({ field: { onChange } }) => (
          <InputBox className={styles.smsInputBox}>
            <Input.SMS
              isError={Boolean(errors.sms?.message)}
              onChange={onChange}
              className={styles.smsInputWrapper}
              white
            />
            {errors.sms?.message && <InputErrorMessage message={errors.sms.message} />}
          </InputBox>
        )}
      />
      {minutes === 0 && seconds === 0 ? (
        <Button
          className={styles.sendNewCodeButton}
          theme={'tertiary'}
          size={'xs'}
          onClick={sendNewCodeClickHandler}
        >
          {TEXT.SEND_AGAIN}
        </Button>
      ) : (
        <Text tag={'p'} size={'xs'} weight={'regular'} className={styles.sendNewCodeText}>
          {TEXT.SEND_AGAIN_TIMER}
          {minutes}:{String(seconds).padStart(2, '0')}
        </Text>
      )}
    </div>
  );
};
