import { ChangeCardLimitsDurations, ChangeCardLimitsTypes } from '@/widgets';
import { boolean, number, object, string } from 'yup';

export const changeCardLimitFormScheme = object().shape({
  limitType: string<ChangeCardLimitsTypes>().required(),
  duration: string<ChangeCardLimitsDurations>().required(),
  dayOperationLimit: number(),
  monthOperationLimit: number(),
  dayOperationSumLimit: number(),
  monthOperationSumLimit: number(),
  operationSumLimit: number().required(),
  internetPurchases: boolean(),
  termsAgree: boolean().required(),
});
