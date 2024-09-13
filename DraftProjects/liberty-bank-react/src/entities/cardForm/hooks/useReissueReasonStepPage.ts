import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { cardReissueReasonsSelectionFormSchema } from '@/shared';
import { getDefaultReissueReasonsValues } from '../helpers/getDefaultReissueReasonsValues/getDefaultReissueReasonsValues';
import { useCardFormLSApi } from './useCardFormLSApi';
import { ReissueCardFormArgs, ReissueCardFormLSKeys } from '..';
import { CardFormLSApi } from '../lib';

export const useReissueReasonStepPage = (cardFormLSApi: CardFormLSApi) => {
  const {
    control,
    watch,
    formState: { isValid },
  } = useForm<ReissueCardFormArgs>({
    defaultValues: getDefaultReissueReasonsValues(cardFormLSApi),
    resolver: yupResolver(cardReissueReasonsSelectionFormSchema),
  });

  useCardFormLSApi(cardFormLSApi, watch, [
    {
      key: ReissueCardFormLSKeys.REISSUE_REASON,
      name: 'reason',
    },
  ]);

  return {
    control,
    isValid,
  };
};
