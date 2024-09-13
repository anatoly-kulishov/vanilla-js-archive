import * as React from 'react';
import { Wrapper } from '..';
import styles from './BodyBlock.module.scss';

type PropsWithChildren = {
  children?: React.ReactNode;
};

export const BodyBlock: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper size='l'>
      <div className={styles['body-block']}>{children}</div>
    </Wrapper>
  );
};
