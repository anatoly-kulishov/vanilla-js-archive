import { ReissueCardFormPageReissueReasons } from '@/entities/cardForm';
import { object, string } from 'yup';

export const cardReissueReasonsSelectionFormSchema = object().shape({
  reason: string<ReissueCardFormPageReissueReasons>().required(),
});
