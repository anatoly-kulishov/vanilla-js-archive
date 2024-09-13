import { FC } from 'react';
import { Text } from '..';
import styles from './ApplicationMenu.module.scss';

export interface IMenuItem {
  id: number;
  preposition?: string;
  amount: string;
  point: string;
}

export interface IApplicationMenu {
  menuList: IMenuItem[];
}

export const ApplicationMenu: FC<IApplicationMenu> = ({ menuList }) => {
  return (
    <ul className={styles.list}>
      {menuList.map(({ id, preposition, amount, point }) => (
        <li className={styles.item} key={id}>
          <Text tag='p' size='xs' className={styles.point}>
            {point}
          </Text>

          <div className={styles.amount_wrapper}>
            {preposition && (
              <Text tag='span' size='m' weight='medium' className={styles.amount}>
                {preposition}
              </Text>
            )}

            <Text tag='span' size='m' weight='medium' className={styles.amount}>
              {amount}
            </Text>
          </div>
        </li>
      ))}
    </ul>
  );
};
