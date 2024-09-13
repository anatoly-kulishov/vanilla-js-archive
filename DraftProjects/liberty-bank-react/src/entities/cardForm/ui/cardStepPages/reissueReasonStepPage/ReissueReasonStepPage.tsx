import { RadioButton, Text } from '@/shared';
import { StepPage } from '@/widgets/stepForm';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useReissueReasonStepPage } from '../../../hooks/useReissueReasonStepPage';
import {
  REISSUE_REASON_STEP_PAGE,
  ReissueCardStepFormAdditionalData,
  reissueCardFormLSApi,
  reissueReasons,
} from '../../../model';
import styles from './ReissueReasonStepPage.module.scss';

export const ReissueReasonStepPage: StepPage<ReissueCardStepFormAdditionalData> = ({
  setCanGoNext,
  setIsFormLoading,
}) => {
  const { control, isValid } = useReissueReasonStepPage(reissueCardFormLSApi);

  useEffect(() => {
    setIsFormLoading(false);
  }, []);

  useEffect(() => {
    setCanGoNext(isValid);
  }, [isValid]);

  return (
    <div className={styles['reissue-reason-step-page']}>
      <Text tag='p'>{REISSUE_REASON_STEP_PAGE.CHOOSE_A_REASON}</Text>
      <div className={styles['reissue-reason-step-page__inputs-wrapper']}>
        {reissueReasons.map((reason) => (
          <Controller
            key={reason.value}
            control={control}
            name='reason'
            render={({ field: { name, onChange, value } }) => (
              <RadioButton
                name={name}
                value={reason.value}
                label={reason.label}
                size='s'
                checked={value === reason.value}
                onChange={onChange}
              />
            )}
          />
        ))}
      </div>
    </div>
  );
};
