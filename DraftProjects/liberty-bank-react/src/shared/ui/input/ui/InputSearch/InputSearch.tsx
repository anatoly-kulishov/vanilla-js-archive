import { forwardRef, MouseEvent } from 'react';
import { InputText } from '../InputText/InputText';
import { Icon } from '@/shared';
import styles from './InputSearch.module.scss';
import { IInputSearchProps } from './types.ts';

export const InputSearch = forwardRef<HTMLInputElement, IInputSearchProps>((props, ref) => {
  const { onSearch, ...rest } = props;

  const onClick = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    onSearch?.();
  };

  return (
    <InputText
      ref={ref}
      {...rest}
      contentLeft={<Icon icon='search' onClick={onClick} className={styles.icon} />}
    />
  );
});

InputSearch.displayName = 'InputSearch';
