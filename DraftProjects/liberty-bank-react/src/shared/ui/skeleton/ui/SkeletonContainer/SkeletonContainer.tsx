import { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import { getTestIdAttribute } from '@/shared';
import s from './SkeletonContainer.module.scss';

interface Props {
  width: string;
  height: string;
  children: ReactNode;
  shine?: boolean;
  testId?: string;
  className?: string;
}

export const SkeletonContainer = ({
  width,
  height,
  children,
  shine = true,
  testId,
  className,
  ...rest
}: Props) => {
  const containerTestId = getTestIdAttribute('skeleton-container', testId);
  const shineBlockTestId = getTestIdAttribute('skeleton-container-shine', testId);
  const style: CSSProperties = {
    width,
    height,
  };

  return (
    <div
      className={classNames(s.skeletonContainer, className)}
      style={style}
      {...containerTestId}
      {...rest}
    >
      {children}
      {shine && <div className={classNames(s.shine)} {...shineBlockTestId} />}
    </div>
  );
};
