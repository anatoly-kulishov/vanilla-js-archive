import { ChangeCardLimitsDurations, ChangeCardLimitsTypes } from '..';

export const getDefaultChangeCardLimitValues = () => ({
  limitType: ChangeCardLimitsTypes.NON_CASH,
  duration: ChangeCardLimitsDurations.DAY,
  dayOperationLimit: undefined,
  monthOperationLimit: undefined,
  dayOperationSumLimit: undefined,
  monthOperationSumLimit: undefined,
  operationSumLimit: undefined,
  internetPurchases: false,
  termsAgree: false,
});
