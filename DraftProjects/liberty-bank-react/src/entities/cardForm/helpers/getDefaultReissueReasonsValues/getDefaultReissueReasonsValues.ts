import { ReissueCardFormPageReissueReasons, ReissueCardFormLSKeys } from '../..';
import { CardFormLSApi } from '../../lib';

export const getDefaultReissueReasonsValues = (cardFormLSApi: CardFormLSApi) => ({
  reason:
    cardFormLSApi.getValue<ReissueCardFormPageReissueReasons>(
      ReissueCardFormLSKeys.REISSUE_REASON,
    ) ?? undefined,
});
