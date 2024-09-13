import { FC, ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '../icon';
import styles from './Tooltip.module.scss';

interface ITooltipProps {
  children: ReactNode;
  positionX?: 'left' | 'right';
  positionY?: 'top' | 'bottom';
  width?: number;
  className?: string;
  normalTextWrapping?: boolean;
  elementTooltip?: ReactNode | string;
  showDelay?: number;
  hideDelay?: number;
}

export const Tooltip: FC<ITooltipProps> = ({
  children,
  positionX = 'right',
  positionY = 'bottom',
  className,
  width,
  normalTextWrapping,
  elementTooltip,
  showDelay = 0,
  hideDelay = 0,
}) => {
  const [show, setShow] = useState(false);
  const refShowTimeout = useRef<NodeJS.Timeout>();
  const refHideTimeout = useRef<NodeJS.Timeout>();

  const onMouseEnterHandler = () => {
    clearTimeout(refHideTimeout.current);
    refShowTimeout.current = setTimeout(() => {
      setShow(true);
    }, showDelay);
  };

  const onMouseLeaveHandler = () => {
    clearTimeout(refShowTimeout.current);
    refHideTimeout.current = setTimeout(() => {
      setShow(false);
    }, hideDelay);
  };

  return (
    <div
      className={classNames(styles['container'], className)}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <span className={styles['info-circle']} data-testid='tooltip-element'>
        {elementTooltip ? elementTooltip : <Icon icon='info-circle' />}
      </span>
      {show && (
        <div className={classNames(styles.content_wrapper, styles[positionX], styles[positionY])}>
          <div
            className={classNames(styles['content'], {
              [styles['normal-wrapping']]: normalTextWrapping,
            })}
            style={width ? { width: `${width}px` } : {}}
            data-testid='tooltip'
          >
            <div className={styles.arrow} />
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
