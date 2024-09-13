import { FC } from 'react';
import styles from './Stepper.module.scss';
import classNames from 'classnames';

interface Props {
  className?: string;
  currentIndex: number;
  maxIndex: number;
}

export const Stepper: FC<Props> = ({ className, currentIndex, maxIndex }) => {
  return (
    <div className={classNames(className, styles['stepper'])}>
      {Array.from(Array(maxIndex).keys()).map((stepIndex) => {
        return (
          <div
            className={classNames(styles['stepper__step'], {
              [styles['stepper__step--active']]: stepIndex <= currentIndex,
            })}
            key={stepIndex}
          />
        );
      })}
    </div>
  );
};
