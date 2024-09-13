import { useState } from 'react';
import classNames from 'classnames';
import style from './selectOptions.module.scss';
import { Button, Text } from '..';

export enum ButtonTheme {
  default = 'default',
}

interface IOptionItem<Type = string> {
  options: Type[];
  optionsChange: (item: Type) => void;
  optionsType: 'one' | 'many';
  activeTab?: number[];
  buttonTheme?: ButtonTheme;
  className?: string;
  textWidth?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'ml' | 'xss' | 'sxs';
}

// TODO добавить разные варианты кнопок и настраиваемость
export const SelectOptions = <T,>({
  options,
  optionsChange,
  activeTab = [0],
  buttonTheme,
  optionsType,
  className,
  textWidth = 'xl',
}: IOptionItem<T>) => {
  const [optionsStatus, setOptionsStatus] = useState(activeTab);

  const handleTabClick = (index: number, item: T) => {
    if (optionsType === 'many') {
      optionsStatus.includes(index)
        ? setOptionsStatus(optionsStatus.filter((i) => i !== index))
        : setOptionsStatus([...optionsStatus, index]);
    } else {
      setOptionsStatus([index]);
    }
    optionsChange(item);
  };

  return (
    <ul
      className={classNames(
        style['option-container'],
        style.currenciesValue,
        style[`option-container__${buttonTheme}`],
        className,
      )}
    >
      {options.map((item, index) => {
        return (
          <Button
            size='s'
            theme='primary'
            onClick={() => handleTabClick(index, item)}
            className={classNames(style['option-block'], style[`option-block__${buttonTheme}`], {
              [style['option-block_active']]: optionsStatus.includes(index),
            })}
            key={String(item)}
          >
            <Text
              tag='span'
              size={textWidth}
              weight='bold'
              className={classNames({
                [style['option-text_active']]: optionsStatus.includes(index),
              })}
            >
              {String(item)}
            </Text>
          </Button>
        );
      })}
    </ul>
  );
};
