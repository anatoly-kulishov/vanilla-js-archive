import { ChangeCardLimitsDurations, ChangeCardLimitsLimit, ChangeCardLimitsTypes } from '..';
import { changeCardLimitLimitsCombinations } from '../constants/constants';

export const getLimitCombination = (
  type: ChangeCardLimitsTypes,
  duration: ChangeCardLimitsDurations,
): ChangeCardLimitsLimit[] => {
  const key = Array.from(changeCardLimitLimitsCombinations.keys()).find(
    (combination) => combination[1] === duration && combination[0] === type,
  );

  return key ? changeCardLimitLimitsCombinations.get(key) ?? [] : [];
};
