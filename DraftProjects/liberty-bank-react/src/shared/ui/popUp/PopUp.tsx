import { FC, ReactElement, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './PopUp.module.scss';
import classNames from 'classnames';

interface IModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: ReactElement;
  className?: string;
  position?: 'left' | 'right';
  inputRef?: React.RefObject<HTMLInputElement>;
  stretchToInput?: boolean;
  onClose?: () => void;
}

export const PopUp: FC<IModal> = ({
  isOpen,
  setIsOpen,
  children,
  className,
  position = 'left',
  inputRef,
  onClose,
  stretchToInput = true,
}) => {
  const modalRef = useRef<HTMLInputElement>(null);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as HTMLDivElement) &&
        !(e.target as HTMLElement).closest('[data-type="trigger"]')
      ) {
        closeModal();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [modalRef, isOpen]);

  useEffect(() => {
    const handleResize = () => {
      closeModal();
    };
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    const handleResize = () => {
      closeModal();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('resize', handleResize);

      return () => {
        document.removeEventListener('keydown', handleKeyPress);
        document.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const inputWidth = inputRef?.current?.clientWidth;
  const top = (inputRef?.current?.getBoundingClientRect().bottom || 0) + window.scrollY;
  const left = (inputRef?.current?.getBoundingClientRect().left || 0) + window.scrollX;

  return createPortal(
    <div
      style={{
        width: stretchToInput ? inputWidth : undefined,
        top,
        left,
      }}
      className={classNames(styles.dropdown, { [styles.right]: position === 'right' })}
      ref={modalRef}
    >
      <div className={classNames({ [className as string]: className })}>{children}</div>
    </div>,
    document.querySelector('#modal-root' || 'body')!,
  );
};
