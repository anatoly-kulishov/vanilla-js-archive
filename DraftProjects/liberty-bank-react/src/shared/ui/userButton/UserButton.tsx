import { FC, useState, MouseEvent, useRef, useEffect } from 'react';
import { Text } from '../text';
import { Button, Icon, TSvgIconNames } from '..';
import { Link } from 'react-router-dom';
import styles from './UserButton.module.scss';
import classNames from 'classnames';
import { PATH_PAGE } from '../..';

export interface IItemsProps {
  to: string;
  label: string;
  icon: TSvgIconNames;
  onClick?: () => void;
}
type TMessage = 'message' | 'mail' | 'all';
export interface IUserButtonProps {
  valueFullName: string;
  message?: TMessage;
  menuItems: IItemsProps[];
}

export const UserButton: FC<IUserButtonProps> = (props) => {
  const { valueFullName, message, menuItems } = props;
  const [openUserContent, setOpenUserContent] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const openListUser = () => {
    setOpenUserContent((item) => !item);
  };

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (menuRef.current && !menuRef.current.contains(e.target as HTMLDivElement)) {
        setOpenUserContent(false);
      }
    };

    if (openUserContent) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [menuRef, openUserContent]);

  const menuItemClick = (
    linkTo: string,
    evt: MouseEvent<HTMLAnchorElement>,
    itemClick?: () => void,
  ) => {
    if (linkTo === PATH_PAGE.customer.logout && itemClick) {
      evt.preventDefault();
      itemClick();
    }
    openListUser();
  };

  const strWithOneSpace = valueFullName
    .split(' ')
    .filter((el) => el !== '')
    .join(' ');
  const valueName = strWithOneSpace.split(' ')[1];

  const renderButton = (iconName: TSvgIconNames) => (
    <Button theme='icon' className={styles.user__button}>
      <Icon icon={iconName} name={iconName} />
    </Button>
  );

  return (
    <div className={styles.header__content_user}>
      {message === 'message' && renderButton('bell')}
      {message === 'mail' && renderButton('mail')}
      {message === 'all' && (
        <>
          {renderButton('mail')}
          {renderButton('bell')}
        </>
      )}
      <Button
        theme='icon'
        className={classNames(styles.user__button, styles.avatar_button)}
        onClick={openListUser}
      >
        <Text tag={'h3'} size={'s'} className={styles.user__name}>
          {valueName ? valueName : 'Аноним'}
        </Text>
        <Icon icon={'user-image'} />
      </Button>
      <div className={styles.user__general} ref={menuRef}>
        {openUserContent && (
          <Button theme='icon' className={styles.user__menu_name} onClick={openListUser}>
            <Text tag='p' size='s' weight='regular'>
              {valueFullName ? valueFullName : 'Аноним'}
            </Text>
            <Icon icon={'user-image'} />
          </Button>
        )}
        {openUserContent &&
          menuItems.map(({ to, icon, label, onClick }) => {
            return (
              <Link key={label} to={to} onClick={(evt) => menuItemClick(to, evt, onClick)}>
                <Icon icon={icon} />
                {label}
              </Link>
            );
          })}
      </div>
    </div>
  );
};
