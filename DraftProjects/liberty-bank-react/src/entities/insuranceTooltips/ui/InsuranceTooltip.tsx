import { ReactNode, useState } from 'react';
import styles from './InsuranceTooltip.module.scss';
import classNames from 'classnames';

interface PropsTooltip {
  children: ReactNode;
  text: [string, string][];
  component: React.ComponentType<{ text: [string, string][] }>;
  className?: string;
}

export const Tooltip = ({ children, text, component: Component, className }: PropsTooltip) => {
  const [show, setShow] = useState(false);
  const isTooltipCostCalc = Component.name === 'TooltipCostCalc';
  const tooltipContainerClass = classNames({
    [styles['tooltip-container']]: show,
    [(styles['tooltip-container'], styles['left-style'])]: show && !isTooltipCostCalc,
    [styles['none-tooltip']]: !show,
    [className || '']: className,
  });

  return (
    <div
      className={styles['tooltip-trigger']}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <div className={tooltipContainerClass}>
        <Component text={text} />
      </div>
    </div>
  );
};
