import styles from './MyCollapse.module.scss';
import { Icon, IIconProps, Text } from '../..';
import { ReactNode, useState } from 'react';

interface CollapseProps {
  title: string;
  children: ReactNode;
  onItemClick?: (itemValue: string) => void;
  iconAttributes?: IIconProps;
  button?: ReactNode;
}

export const MyCollapse = (props: CollapseProps) => {
  const { title, children } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((state) => !state);
  };

  return (
    <div className={styles.collapse} onClick={handleOpen}>
      <div className={styles.head}>
        <div className={styles.wrapper}>
          <Text tag='h4' weight='medium'>
            {title}
          </Text>
        </div>
        <div className={styles.wrapper}>
          <Icon icon='arrow-down-blue-small' className={isOpen ? styles.rotate : styles.arrow} />
        </div>
      </div>
      {isOpen && children}
    </div>
  );
};
