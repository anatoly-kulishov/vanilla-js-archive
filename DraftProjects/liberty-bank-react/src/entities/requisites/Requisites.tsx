import { FC } from 'react';
import { CopyButton, Text } from '@/shared';

import styles from './Requisites.module.scss';

interface IProps {
  requisitesResult: string[];
  requisitesName: string[];
}

export const Requisites: FC<IProps> = ({ requisitesResult, requisitesName }) => {
  return (
    <ul>
      {requisitesName.map((require, index) => {
        const withCopyButton =
          require === 'Номер счета' ||
          require === 'Корр. счет' ||
          require === 'ИНН' ||
          require === 'Брокерский счет' ||
          require === 'Депозитарный счет';

        return (
          <li className={styles['requisites-list__item']} key={require + requisitesResult[index]}>
            <div className={styles['requisites-list__with-copy-wrapper']}>
              <Text
                tag='span'
                weight='medium'
                size='s'
                className={styles['requisites-list__requisite-name']}
              >
                {require}
              </Text>
              {withCopyButton && <CopyButton value={requisitesResult[index]} />}
            </div>
            <div className={styles['requisites-list__rigth-copy-wrapper']}>
              <Text tag='span' weight='medium' size='s'>
                {requisitesResult[index]}
              </Text>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
