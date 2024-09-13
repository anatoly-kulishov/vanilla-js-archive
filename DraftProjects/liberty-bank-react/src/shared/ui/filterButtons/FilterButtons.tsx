import { useState } from 'react';
import classNames from 'classnames';
import style from './FilterButton.module.scss';
import { Text } from '..';

export enum ButtonType {
  default = 'default',
}

interface IFilterItem<Type = string> {
  filter: Type[];
  filterChange: (item: Type) => void;
  activeTab?: number;
  buttonType?: ButtonType;
}

export const FilterButtons = <T,>({
  filter,
  filterChange,
  activeTab = 0,
  buttonType,
}: IFilterItem<T>) => {
  const [filterStatus, setFilterStatus] = useState(activeTab);

  const handleTabClick = (index: number, item: T) => {
    setFilterStatus(index);
    filterChange(item);
  };

  return (
    <ul
      className={classNames(style['filter-container'], style[`filter-container__${buttonType}`])}
      data-testid={'filter-buttons'}
    >
      {filter.map((item, index) => {
        return (
          <li
            onClick={() => handleTabClick(index, item)}
            className={classNames(style['filter-block'], style[`filter-block__${buttonType}`], {
              [style['filter-block_active']]: filterStatus === index,
            })}
            key={String(item)}
            data-testid={'filter_button_' + String(item)}
          >
            <Text
              tag='span'
              size='s'
              weight='medium'
              className={classNames({
                [style['filter-text_active']]: filterStatus === index,
              })}
            >
              {String(item)}
            </Text>
          </li>
        );
      })}
    </ul>
  );
};
