import {
  DeliveryStepPage,
  DeliveryTypeStepPage,
  ReissueCardPageFlowName,
  ReissueCardPageFlows,
  ReissueReasonStepPage,
  // TODO: Тут и ниже этап с СМС аутентификацией отключён до создания SMS Service
  /* SmsStepPage, */
} from '@/entities/cardForm';

export const reissueCardPageFlows: ReissueCardPageFlows = {
  [ReissueCardPageFlowName.DEFAULT]: [
    ReissueReasonStepPage,
    DeliveryTypeStepPage,
    DeliveryStepPage,
    /* SmsStepPage, */
  ],
};
