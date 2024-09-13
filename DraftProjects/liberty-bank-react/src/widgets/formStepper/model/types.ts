import { FC } from 'react';

export type FormStepperName = 'reset' | 'registration';

export interface FormStepProps {
  setNextStep: () => void;
  stepperName: FormStepperName;
}

export interface FormStepperProps {
  steps: FC<FormStepProps>[];
  stepperName: FormStepperName;
}

export interface FormStepperSliceState {
  isTabLabelShown?: boolean;
  phone?: string;
  password?: string;
  document?: string;
  sms?: string;
  sessionToken?: string;
}

export interface IStepperRefType {
  resetActiveStep: () => void;
}
