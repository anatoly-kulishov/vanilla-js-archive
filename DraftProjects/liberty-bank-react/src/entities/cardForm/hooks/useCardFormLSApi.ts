import { CardFormLSKeys } from '../model/types';
import { CardFormLSApi } from '../lib/localStorage/CardFormLSApi';
import { FieldValues, UseFormWatch } from 'react-hook-form';
import { useReactHookFormWatch } from '@/shared';

export interface CardFormLSApiMapping {
  name: string;
  key: CardFormLSKeys;
}

export const useCardFormLSApi = <T extends FieldValues>(
  cardLSApi: CardFormLSApi,
  watch: UseFormWatch<T>,
  mapping: CardFormLSApiMapping[],
) => {
  useReactHookFormWatch(
    watch,
    (value, { name }) => {
      const currentValue = name ? value[name] : null;
      const currentMapping = mapping.find((m) => m.name === name);
      const key = currentMapping?.key;

      if (currentValue && key) {
        cardLSApi.setValue(key, currentValue);
      }

      if (!currentValue && key) {
        cardLSApi.clearValue(key);
      }
    },
    [],
  );
};
