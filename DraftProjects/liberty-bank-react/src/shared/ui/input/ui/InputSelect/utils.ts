import { isOptionObject, TOption } from './types';

export const getValue = (option: TOption, isUsedAnotherValue?: boolean): string => {
  if (isOptionObject(option)) {
    if (isUsedAnotherValue && option.anotherValue) {
      return option.anotherValue;
    }
    return option.value;
  }
  return option;
};
