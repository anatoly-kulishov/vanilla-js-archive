import { TransferActionItem } from './transferActionItem/TransferActionItem';
import { ActionItem } from '../model/types';
import styles from './TransfersActionsList.module.scss';

interface Props {
  actionItems: ActionItem[];
}

export const TransfersActionsList = ({ actionItems }: Props) => {
  return (
    <ul className={styles.list}>
      {actionItems.map(({ href, icon, title }) => (
        <li key={title} className={styles.item}>
          <TransferActionItem href={href} icon={icon} title={title} />
        </li>
      ))}
    </ul>
  );
};
