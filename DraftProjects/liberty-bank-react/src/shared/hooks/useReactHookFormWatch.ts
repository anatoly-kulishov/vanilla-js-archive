import { DependencyList, useEffect } from 'react';
import { FieldValues, UseFormWatch, WatchObserver } from 'react-hook-form';

export const useReactHookFormWatch = <TFieldValues extends FieldValues>(
  watch: UseFormWatch<TFieldValues>,
  callback: WatchObserver<TFieldValues>,
  deps: DependencyList = [],
) => {
  useEffect(() => {
    const subscription = watch(callback);
    return () => subscription.unsubscribe();
  }, [watch, ...deps]);
};
