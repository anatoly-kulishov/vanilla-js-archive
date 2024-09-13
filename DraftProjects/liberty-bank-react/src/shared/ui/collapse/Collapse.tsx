import { ReactNode, useState } from 'react';
import { Icon, IIconProps, Text } from '..';
import styles from './Collapse.module.scss';

interface CollapseProps {
  title: string;
  children: ReactNode;
  iconAttributes?: IIconProps;
  disabled?: boolean;
  button?: ReactNode;
}

export const Collapse = (props: CollapseProps) => {
  const { title, children, iconAttributes, disabled, button } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen((s) => !s);
  };

  return (
    <div className={styles.collapse} onClick={handleOpen} data-testid={`collapse-${title}`}>
      <div className={styles.head}>
        <div className={styles.wrapper}>
          {iconAttributes && <Icon {...iconAttributes} />}
          <Text tag='h4' weight='medium'>
            {title}
          </Text>
        </div>
        <div className={styles.wrapper}>
          {button ? button : null}
          {disabled ? <Icon icon='lock' /> : <Icon icon={'arrow-down-blue-small'} />}
        </div>
      </div>
      {isOpen && children}
    </div>
  );
};
