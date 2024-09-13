import { FC, ReactNode, useState } from 'react';
import { CountIndicator } from '../countIndicator';
import { useAppSelector } from '../../hooks';
import classNames from 'classnames';
import styles from './Tabs.module.scss';

interface ITabItem {
  label: string;
  content: ReactNode;
  countIndicator?: number;
}

interface ITabsProps {
  tabs: ITabItem[];
  isGrayInactiveBorder?: boolean;
  theme?: 'primary' | 'secondary' | 'minimalistic' | 'black';
  marginBottom?: 'm' | 'l';
  onClick?: (index: number) => void;
  filter?: ReactNode;
  activeTabIndex?: number;
}

export const Tabs: FC<ITabsProps> = (props) => {
  const {
    tabs,
    filter,
    theme = 'primary',
    marginBottom,
    onClick,
    activeTabIndex = 0,
    isGrayInactiveBorder = false,
  } = props;
  const [activeTab, setActiveTab] = useState(activeTabIndex);
  const isTabLabelShown = useAppSelector((state) => !!state.formStepper?.isTabLabelShown);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onClick?.(index);
  };

  return (
    <div className={styles.tabs}>
      {isTabLabelShown && (
        <ul
          className={classNames(styles.tabList, styles[`tabList_${theme}`], {
            [styles[`tabList_${marginBottom}`]]: marginBottom,
          })}
        >
          {tabs.map(({ label, countIndicator }, index) => (
            <li
              key={label}
              className={classNames(
                styles.tabItem,
                styles[`tabItem_${theme}`],
                { [styles.active]: activeTab === index },
                label === '' ? styles['tabItem_none'] : null,
                isGrayInactiveBorder ? styles['tabItem_inactive'] : null,
              )}
              onClick={() => handleTabClick(index)}
              data-testid={'tab_' + label}
              tabIndex={0}
            >
              <div>{label}</div>
              {!!countIndicator && <CountIndicator count={countIndicator} />}
            </li>
          ))}
          {filter}
        </ul>
      )}
      <div className={styles.tabContent}>{tabs[activeTab].content}</div>
    </div>
  );
};
