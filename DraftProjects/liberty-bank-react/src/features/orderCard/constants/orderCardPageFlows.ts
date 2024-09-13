import {
  AccountSelectionStepPage,
  DeliveryStepPage,
  DeliveryTypeStepPage,
  OrderCardPageFlowName,
  OrderCardPageFlows,
  // TODO: Тут и ниже этап с СМС аутентификацией отключён до создания SMS Service
  /* SmsStepPage, */
} from '@/entities/cardForm';

export const orderCardPageFlows: OrderCardPageFlows = {
  [OrderCardPageFlowName.DEFAULT]: [
    AccountSelectionStepPage,
    DeliveryTypeStepPage,
    DeliveryStepPage,
    /* SmsStepPage, */
  ],
  [OrderCardPageFlowName.VIRTUAL]: [AccountSelectionStepPage /* , SmsStepPage */],
};
