import { FC } from 'react';
import classNames from 'classnames';
import { StatusLabelType } from './model/types';
import styles from './StatusLabel.module.scss';

interface IStatusLabel {
  type: StatusLabelType;
  text: string;
  size?: 'xxs' | 'xs' | 's' | 'm';
  width?: 'adjustable' | 'fixed';
  'data-testid'?: string;
}

export const StatusLabel: FC<IStatusLabel> = ({
  type,
  text,
  size = 'xs',
  width = 'adjustable',
  'data-testid': dataTestId,
}) => {
  return (
    <p
      className={classNames(
        styles.label,
        styles[type],
        styles[`link-size_${size}`],
        styles[`label-width_${width}`],
      )}
      data-testid={dataTestId}
    >
      {text}
    </p>
  );
};
