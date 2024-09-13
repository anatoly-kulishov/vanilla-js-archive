import { Dispatch, FC, SetStateAction } from 'react';

interface StepPageProps<T> {
  additionalData: T;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setCanGoNext: (v: boolean) => void;
  isFormLoading: boolean;
  setIsFormLoading: (v: boolean) => void;
}

export type StepPage<T> = FC<StepPageProps<T>>;
