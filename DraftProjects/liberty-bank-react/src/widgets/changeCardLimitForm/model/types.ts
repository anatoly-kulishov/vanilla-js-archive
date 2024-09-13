import type { TSvgIconNames } from '@/shared';

export enum ChangeCardLimitsTypes {
  NON_CASH = 'NON_CASH',
  CASH = 'CASH',
}

export enum ChangeCardLimitsDurations {
  DAY = 'DAY',
  MONTH = 'MONTH',
}
export const changeCardLimitResponseImages: Record<string, TSvgIconNames> = {
  [ChangeCardLimitsTypes.NON_CASH]: 'actions-no-cash',
  [ChangeCardLimitsTypes.CASH]: 'actions-cash',
};
export enum ChangeCardLimitsLimits {
  DAY_OPERATION_LIMIT = 'DAY_OPERATION_LIMIT',
  MONTH_OPERATION_LIMIT = 'MONTH_OPERATION_LIMIT',
  MONTH_OPERATION_SUM = 'MONTH_OPERATION_SUM',
  DAY_OPERATION_SUM = 'DAY_OPERATION_SUM',
  OPERATION_SUM = 'OPERATION_SUM',
}

export interface ChangeCardLimitsFormArgs {
  limitType: ChangeCardLimitsTypes;
  duration: ChangeCardLimitsDurations;
  dayOperationLimit?: number;
  monthOperationLimit?: number;
  dayOperationSumLimit?: number;
  monthOperationSumLimit?: number;
  operationSumLimit: number;
  internetPurchases?: boolean;
  termsAgree: boolean;
}

export type ChangeCardLimitsFormArgsKeys = keyof ChangeCardLimitsFormArgs;

export interface ChangeCardLimitsTypeOption {
  value: ChangeCardLimitsTypes;
  label: string;
}

export interface ChangeCardLimitsDurationOption {
  value: ChangeCardLimitsDurations;
  label: string;
}

export type ChangeCardLimitsFormLimitArgs = keyof Pick<
  ChangeCardLimitsFormArgs,
  | 'dayOperationLimit'
  | 'monthOperationLimit'
  | 'dayOperationSumLimit'
  | 'monthOperationSumLimit'
  | 'operationSumLimit'
>;

export type SingleOperationSumLimitKeys = Record<
  ChangeCardLimitsLimits,
  ChangeCardLimitsFormLimitArgs
>;

export interface ChangeCardLimitsLimit {
  key: ChangeCardLimitsFormLimitArgs;
  placeholder: string;
}
