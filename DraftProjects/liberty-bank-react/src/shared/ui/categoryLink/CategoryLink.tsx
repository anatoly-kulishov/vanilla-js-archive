import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Switch, Text, TSvgIconNames } from '..';
import { ICardInfo } from '../../api';
import styles from './CategoryLink.module.scss';
import { CardAction } from '@/widgets/cardsInfoCategories/constants/constants';
import { modalInfo } from '@/widgets/cardsInfoCategories/model/types';

export interface CategoryLinkProps {
  name: string;
  modalType?: CardAction;
  openModal?: (value: modalInfo) => void;
  icon: TSvgIconNames;
  linkStatus?: string;
  dir: string;
  color: string;
  state?: ICardInfo;
  hasSwitcher?: boolean;
  switcherIsOn?: boolean;
  handleSwitcher?: (() => void) | ((e: ChangeEvent<HTMLInputElement>) => void);
}

export const CategoryLink = ({
  icon,
  name,
  linkStatus,
  dir,
  color,
  modalType,
  state,
  openModal,
  hasSwitcher,
  switcherIsOn,
  handleSwitcher,
}: CategoryLinkProps) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (modalType) {
      openModal?.({ isModal: true, link: modalType });
    } else if (linkStatus) {
      navigate(linkStatus, { state: state });
    }
  };

  return (
    <Button theme='tertiary' onClick={handleButtonClick} data-testid={'category-link'}>
      <div className={styles['category']}>
        <div className={styles['frame']}>
          <div className={styles['icon']}>
            <Icon icon={icon} widthAndHeight={'56px'} color={color} />
          </div>
          <div className={styles['name-container']}>
            <Text className={styles['name']} tag='p' size='s' weight='medium'>
              {name}
            </Text>
          </div>
        </div>
        {hasSwitcher && (
          <div className={styles['switcher']} data-testid={'switcher'}>
            <Switch name={`${dir}-${icon}`} checked={switcherIsOn} onChange={handleSwitcher} />
          </div>
        )}
      </div>
    </Button>
  );
};
