import { SmsReachInput } from '@/widgets/smsReachInput';
import { useSmsForm } from '@/widgets/smsReachInput/hooks/useSmsForm';
import { StepPage } from '@/widgets/stepForm';
import { useEffect } from 'react';
import { StepFormAdditionalData } from '../../../model';

export const SmsStepPage: StepPage<StepFormAdditionalData> = ({
  setCanGoNext,
  setIsFormLoading,
}) => {
  useEffect(() => {
    setIsFormLoading(false);
  }, []);

  const smsFormControls = useSmsForm({ setCanGoNext, setIsFormLoading });

  return (
    <div>
      <SmsReachInput smsFormControls={smsFormControls} />
    </div>
  );
};
