import { FC, HTMLAttributes } from 'react';
import styles from './Stepper.module.scss';
import classnames from 'classnames';

interface StepperProps extends HTMLAttributes<HTMLElement> {
  totalSteps: number;
  currentStep: number;
}

export const Stepper: FC<StepperProps> = ({ totalSteps, currentStep }) => {
  return (
    <ul className={styles.stepper}>
      {Array(totalSteps)
        .fill(null)
        .map((_, i) => (
          <li
            key={`step-${i}`}
            className={classnames(
              styles.step,
              styles[`step-${i < currentStep ? 'filled' : 'unfilled'}`],
            )}
          />
        ))}
    </ul>
  );
};
