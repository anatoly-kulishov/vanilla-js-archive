import {
  ChangeEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useLayoutEffect,
  useState,
} from 'react';
import { Icon } from '@/shared';
import { getValue } from './utils';
import { IInputSelectProps, isOptionObject, TOption } from './types';
import { InputText } from '../InputText/InputText';
import { InputSelectOption } from './InputSelectOption';
import styles from './InputSelect.module.scss';

export const InputSelect = forwardRef<HTMLInputElement, IInputSelectProps>((props, ref) => {
  const {
    options,
    onMySelect,
    defaultOptionSelected = '',
    value,
    isUsedAnotherValue,
    size = 's',
    enableSearch = false,
    onChange,
    onKeyDown,
    onClick,
    ...rest
  } = props;
  const [isOptionsClosed, setIsOptionsClosed] = useState(true);
  const [optionsSelectFilter, setOptionsSelectFilter] = useState<TOption[]>(options);
  const [selectedOption, setSelectedOption] = useState<TOption>(defaultOptionSelected);

  useLayoutEffect(() => {
    if (value) setSelectedOption(value);
  }, [value]);

  const handleOpenList = () => {
    setIsOptionsClosed((prevState) => !prevState);
    setOptionsSelectFilter(options);
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;
    const { value } = target;
    setSelectedOption(value);
    setIsOptionsClosed(false);
    if (!value.length) setOptionsSelectFilter(options);
    if (enableSearch) {
      setOptionsSelectFilter(
        options.filter((item) =>
          isOptionObject(item) ? item.value.includes(value) : item.includes(value),
        ),
      );
    }
    onChange?.(e);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { key } = e;
    setIsOptionsClosed(false);
    if (key === 'Escape') setIsOptionsClosed(true);
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      // TODO доделать потом
    }
    onKeyDown?.(e);
  };

  const handleClick: MouseEventHandler<HTMLInputElement> = (e) => {
    handleOpenList();
    onClick?.(e);
  };

  const handeSelect = (option: TOption) => {
    setSelectedOption(option);
    setIsOptionsClosed(true);
    onMySelect?.(option);
  };

  return (
    <div className={styles.selectBlock}>
      <InputText
        ref={ref}
        contentRight={
          <Icon
            icon={isOptionsClosed ? 'arrow-down-grey' : 'arrow-up-grey'}
            onClick={handleOpenList}
            className={styles.icon}
          />
        }
        size={size}
        readOnly={!enableSearch}
        value={getValue(selectedOption, isUsedAnotherValue)}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        {...rest}
      />
      {!isOptionsClosed && (
        <ul className={styles.optionsBlock}>
          {optionsSelectFilter.map((opt, index) => (
            <InputSelectOption
              key={isOptionObject(opt) ? `${opt.value}-${index}` : `${opt}-${index}`}
              option={opt}
              selectedOption={selectedOption}
              handeSelect={handeSelect}
            />
          ))}
        </ul>
      )}
    </div>
  );
});

InputSelect.displayName = 'InputSelect';
