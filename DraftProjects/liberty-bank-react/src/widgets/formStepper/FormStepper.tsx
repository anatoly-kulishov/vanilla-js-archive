import { forwardRef, useImperativeHandle, useState } from 'react';
import { FormStepperProps, IStepperRefType } from './model';

const FIRST_STEP = 0;

export const FormStepper = forwardRef<IStepperRefType, FormStepperProps>(
  ({ steps, stepperName }, ref) => {
    const [activeStep, setActiveStep] = useState<number>(FIRST_STEP);

    const resetActiveStep = () => setActiveStep(FIRST_STEP);
    useImperativeHandle(ref, () => ({ resetActiveStep }));

    const FormStepComponent = steps[activeStep];

    const setNextStep = () => {
      if (steps.length - 1 > activeStep) {
        setActiveStep(activeStep + 1);
      }
    };

    return <FormStepComponent setNextStep={setNextStep} stepperName={stepperName} />;
  },
);

FormStepper.displayName = 'FormStepper';
