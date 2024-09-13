import { ReactNode } from 'react';
import classNames from 'classnames';
import { getTestIdAttribute } from '@/shared';
import s from './Skeleton.module.scss';

interface Props {
  theme?: 'light' | 'regular' | 'dark';
  type?: 'title' | 'text' | 'caption' | 'wrapper' | 'round';
  children?: ReactNode;
  testId?: string;
  className?: string;
}

export const Skeleton = ({ theme, type, children, testId, className, ...rest }: Props) => {
  const skeletonTestId = getTestIdAttribute('skeleton-element', testId);

  return (
    <div
      className={classNames({ [s[`${theme}`]]: theme }, { [s[`${type}`]]: type }, className)}
      {...skeletonTestId}
      {...rest}
    >
      {children}
    </div>
  );
};
