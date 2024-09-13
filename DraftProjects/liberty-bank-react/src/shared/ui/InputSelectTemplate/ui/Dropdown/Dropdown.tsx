import { type ReactNode } from 'react';
import s from './Dropdown.module.scss';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

interface Props {
  className?: string;
  children: ReactNode;
  top: number;
  left: number;
  width: number;
}

export const Dropdown = ({ children, top, left, width }: Props) => {
  return createPortal(
    <div
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
      }}
      className={classNames(s.dropdown)}
    >
      {children}
    </div>,
    document.querySelector('#modal-root')!,
  );
};
