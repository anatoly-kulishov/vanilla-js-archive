import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { NotifyContext, NotifyActionContext } from './Provider';
import { Icon, Text } from '../..';
import { DEFAULT } from './const';
import styles from './Notifications.module.scss';

export const Notifications = () => {
  const value = useContext(NotifyContext);
  const { remove } = useContext(NotifyActionContext);

  return createPortal(
    <div className={styles.notifications}>
      {value.map(({ type, title, label, id }) => (
        <div key={id} className={styles.notification}>
          <Icon icon={type} widthAndHeight={'48'} />
          <div className={styles.text}>
            <Text tag='p' size='xs' weight='regular' className={styles.title}>
              {title || DEFAULT[type].title}
            </Text>
            <Text tag='p' size='xs' weight='light' className={styles.label}>
              {label || DEFAULT[type].label}
            </Text>
          </div>
          <div className={styles.cross} onClick={() => remove(id)}>
            <Icon icon={'cross'} />
          </div>
        </div>
      ))}
    </div>,
    document.querySelector('#modal-root' || 'body')!,
  );
};
