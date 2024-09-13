import React, { FC } from 'react';
import classNames from 'classnames';
import { InputErrorMessage } from '..';
import { ILabelBox } from './model/types.ts';
import styles from './Input.module.scss';

export const LabelBox: FC<ILabelBox> = ({
  id,
  label,
  children,
  required = false,
  fieldValue,
  className,
  isContentLeft = false,
  error,
}) => {
  const labeledChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, { required, id });
  });

  return (
    <div className={classNames(styles.labelBox, { [className as string]: className })}>
      <label className={styles.outerLabel} htmlFor={id}>
        {label}
        {required && <span className={styles.star}>*</span>}
      </label>
      <div className={styles.inputLabelWrapperContainer}>
        <div
          className={classNames(styles.inputLabelWrapper, {
            [styles.contentLeft]: isContentLeft,
          })}
        >
          {labeledChildren}
          <span data-testid='dimension'>{fieldValue}</span>
        </div>
      </div>

      {error && <InputErrorMessage message={error} classNameProp={styles.labelBoxError} />}
    </div>
  );
};
