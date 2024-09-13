import { ChangeCardLimitsFormArgsKeys, SingleOperationSumLimitKeys } from './../model/types';
import {
  ChangeCardLimitsDurationOption,
  ChangeCardLimitsDurations,
  ChangeCardLimitsTypes,
  ChangeCardLimitsTypeOption,
  ChangeCardLimitsLimit,
  ChangeCardLimitsLimits,
} from '../model/types';
import { TSvgIconNames } from '@/shared';

export const TEXT = {
  FORM_CHANGE_LIMIT: 'Изменить лимит',
  NON_CASH_OPERATIONS: 'Безналичные операции',
  CASH_OPERATIONS: 'Снятие наличных',
  DAY_DURATION: 'Сутки',
  TITLE_DURATION: 'Выберите длительность',
  TITLE_TYPE_LIMIT: 'Выберите тип лимита',
  TITLE_RESTRICTIONS: 'Введите ограничения',
  MONTH_DURATION: 'Месяц',
  GO_SEND: 'Перейти в «Мои карты»',
  SUCCESS_TITLE: 'Лимит по карте успешно установлен',
  DAY_OPERATION_SUM_LIMIT_LABEL: 'Сумма одной операции',
  MONTH_OPERATION_SUM_LIMIT_LABEL: 'Количество операций за месяц',
  OPERATION_SUM_LIMIT_LABEL: 'Сумма операций',
  DAY_OPERATION_LIMIT_LABEL: 'Количество операций за сутки',
  MONTH_OPERATION_LIMIT_LABEL: 'Количество операций за месяц',
  CHECKBOX_AGREE: 'Я согласен/ -а с',
  SWITCHER_ONLINE_SHOP: 'Покупки в интернете',
  CHECKBOX_CONDITIONS: 'Условиями установки лимита свыше стандартной суммы',
};

export const nonCashOperations: ChangeCardLimitsTypeOption = {
  value: ChangeCardLimitsTypes.NON_CASH,
  label: TEXT.NON_CASH_OPERATIONS,
};

export const cashOperations: ChangeCardLimitsTypeOption = {
  value: ChangeCardLimitsTypes.CASH,
  label: TEXT.CASH_OPERATIONS,
};

export const changeCardLimitTypeOptions: ChangeCardLimitsTypeOption[] = [
  nonCashOperations,
  cashOperations,
];

export const dayDuration: ChangeCardLimitsDurationOption = {
  value: ChangeCardLimitsDurations.DAY,
  label: TEXT.DAY_DURATION,
};

export const monthDuration: ChangeCardLimitsDurationOption = {
  value: ChangeCardLimitsDurations.MONTH,
  label: TEXT.MONTH_DURATION,
};

export const changeCardLimitDurationNonCashOptions: ChangeCardLimitsDurationOption[] = [
  dayDuration,
  monthDuration,
];
export const changeCardLimitDurationCashOptions: ChangeCardLimitsDurationOption[] = [dayDuration];

export const changeCardLimitDurationOptions: Record<
  ChangeCardLimitsTypes,
  ChangeCardLimitsDurationOption[]
> = {
  [ChangeCardLimitsTypes.NON_CASH]: changeCardLimitDurationNonCashOptions,
  [ChangeCardLimitsTypes.CASH]: changeCardLimitDurationCashOptions,
};

export const changeCardLimitsLimitKey: SingleOperationSumLimitKeys = {
  [ChangeCardLimitsLimits.MONTH_OPERATION_SUM]: 'monthOperationSumLimit',
  [ChangeCardLimitsLimits.DAY_OPERATION_SUM]: 'dayOperationSumLimit',
  [ChangeCardLimitsLimits.OPERATION_SUM]: 'operationSumLimit',
  [ChangeCardLimitsLimits.DAY_OPERATION_LIMIT]: 'dayOperationLimit',
  [ChangeCardLimitsLimits.MONTH_OPERATION_LIMIT]: 'monthOperationLimit',
};
export const changeCardLimitCurrencyImages: Record<string, TSvgIconNames> = {
  ['dayOperationSumLimit']: 'ruble-small',
  ['operationSumLimit']: 'ruble-small',
  ['monthOperationLimit']: 'ruble-small',
};

export const dayOperationSumLimit: ChangeCardLimitsLimit = {
  key: changeCardLimitsLimitKey[ChangeCardLimitsLimits.DAY_OPERATION_SUM],
  placeholder: TEXT.DAY_OPERATION_SUM_LIMIT_LABEL,
};
export const monthOperationSumLimit: ChangeCardLimitsLimit = {
  key: changeCardLimitsLimitKey[ChangeCardLimitsLimits.MONTH_OPERATION_SUM],
  placeholder: TEXT.MONTH_OPERATION_SUM_LIMIT_LABEL,
};

export const operationSumLimit: ChangeCardLimitsLimit = {
  key: changeCardLimitsLimitKey[ChangeCardLimitsLimits.OPERATION_SUM],
  placeholder: TEXT.OPERATION_SUM_LIMIT_LABEL,
};

export const dayOperationLimit: ChangeCardLimitsLimit = {
  key: changeCardLimitsLimitKey[ChangeCardLimitsLimits.DAY_OPERATION_LIMIT],
  placeholder: TEXT.DAY_OPERATION_LIMIT_LABEL,
};

export const monthOperationLimit: ChangeCardLimitsLimit = {
  key: changeCardLimitsLimitKey[ChangeCardLimitsLimits.MONTH_OPERATION_LIMIT],
  placeholder: TEXT.MONTH_OPERATION_LIMIT_LABEL,
};

export const OPERATION_LIMIT_FIELDS: ChangeCardLimitsFormArgsKeys[] = [
  'dayOperationLimit',
  'monthOperationLimit',
  'monthOperationSumLimit',
  'dayOperationSumLimit',
  'operationSumLimit',
];

export type LimitsTypesAndDurations = [ChangeCardLimitsTypes, ChangeCardLimitsDurations];

export const cashDayLimitCombination: LimitsTypesAndDurations = [
  ChangeCardLimitsTypes.CASH,
  ChangeCardLimitsDurations.DAY,
];
export const nonCashDayLimitCombination: LimitsTypesAndDurations = [
  ChangeCardLimitsTypes.NON_CASH,
  ChangeCardLimitsDurations.DAY,
];
export const nonCashMonthLimitCombination: LimitsTypesAndDurations = [
  ChangeCardLimitsTypes.NON_CASH,
  ChangeCardLimitsDurations.MONTH,
];

export const changeCardLimitLimitsCombinations: Map<
  LimitsTypesAndDurations,
  ChangeCardLimitsLimit[]
> = new Map([
  [nonCashDayLimitCombination, [dayOperationLimit, dayOperationSumLimit, operationSumLimit]],
  [cashDayLimitCombination, [operationSumLimit]],
  [nonCashMonthLimitCombination, [monthOperationLimit, operationSumLimit]],
]);
