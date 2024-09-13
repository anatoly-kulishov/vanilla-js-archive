import { forwardRef, useEffect, useState } from 'react';
import { Icon } from '@/shared';
import { InputText } from '../InputText/InputText.tsx';
import type { IInputPasswordProps } from './types.ts';

export const InputPassword = forwardRef<HTMLInputElement, IInputPasswordProps>((props, ref) => {
  const { isHidden = true, ...rest } = props;
  const [visible, setVisible] = useState<boolean>(isHidden);

  useEffect(() => {
    setVisible(isHidden);
  }, [isHidden]);

  const rightIcon = (
    <Icon
      icon={visible ? 'visibilityOff' : 'visibility'}
      key={'visibility'}
      onClick={() => setVisible((prevState) => !prevState)}
    />
  );

  return (
    <InputText ref={ref} contentRight={rightIcon} type={visible ? 'password' : 'text'} {...rest} />
  );
});

InputPassword.displayName = 'InputPassword';
