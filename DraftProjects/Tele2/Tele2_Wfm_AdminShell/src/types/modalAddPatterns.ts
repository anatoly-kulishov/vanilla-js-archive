import type { FC } from 'react';

declare namespace ModalAddPatterns {
  export type Step = {
    name: string;
    title: string;
    component: FC<StepProps>;
  };

  export type StepNames = 'save' | 'create';

  export type Steps = Record<StepNames, Step>;

  export type StepProps = {
    onChangeStep: (step: StepNames) => void;
    onClose: (newPatternId?: number) => void;
    officeId: number;
  };
}

export default ModalAddPatterns;
