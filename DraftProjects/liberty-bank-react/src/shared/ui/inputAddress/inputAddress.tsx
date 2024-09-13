import { FC, FocusEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Input, PopUp, Icon } from '..';
import { IA_TYPES } from './constants';
import styles from './inputAddress.module.scss';
import { useDebounce } from '../../hooks/useDebounce';
import { fetchAddressSuggest } from './api/fetchAddressSuggest';
import classNames from 'classnames';
import { getAddressForType } from './utils/getAddressForType';
import { InputAddressProps } from './model/types';

type OptionType = {
  value: string;
  id: string;
};

export const InputAddress: FC<InputAddressProps> = ({
  type,
  addressOptions,
  value,
  isError,
  name,
  onBlur,
  onChange,
  onMySelect,
  readOnly,
}): JSX.Element => {
  const [currentValue, setCurrentValue] = useState<string>(value || '');
  const [selectedValue, setSelectedValue] = useState<string>(value || '');
  const debouncedValue = useDebounce(currentValue, 1000);
  const [options, setOptions] = useState<OptionType[] | []>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value) {
      handleClear();
    }
  }, [value]);

  useEffect(() => {
    if (!debouncedValue) {
      setOptions([]);
    } else {
      fetchAddressSuggest(debouncedValue, type, addressOptions)
        .then((res) => res.json())
        .then((data) => setOptions(getAddressForType(data.suggestions, type)));
    }
  }, [debouncedValue]);

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue);
    setCurrentValue(optionValue);
    setIsOpen(false);
    onMySelect?.(optionValue);
    return false;
  };

  const handleChangeValue: (e: FormEvent<HTMLInputElement>) => void = (e) => {
    setIsOpen(true);
    setCurrentValue(e.currentTarget.value.trim());
    onChange?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    setIsOpen(false);
    setCurrentValue(selectedValue);
    onMySelect?.(selectedValue);
    if (inputRef.current) {
      inputRef.current.value = selectedValue;
    }
    onBlur?.(e);
  };

  const handleClear = () => {
    setSelectedValue('');
    setCurrentValue('');
    setIsOpen(false);
    onMySelect?.('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={styles.inputSelect__content}>
      <Input.Text
        white
        size='m'
        disabled={!readOnly && readOnly !== undefined}
        label={IA_TYPES[type]}
        isError={isError}
        required
        ref={inputRef}
        onChange={handleChangeValue}
        onBlur={handleBlur}
        value={currentValue}
        defaultValue={selectedValue}
        name={name}
        contentRight={
          selectedValue ? (
            <button
              className={styles.iconButton}
              onClick={handleClear}
              type='button'
              name='close-button'
              data-type='trigger'
            >
              <Icon icon={'close-button'} width='24' height='24' />
            </button>
          ) : null
        }
      />
      <PopUp inputRef={inputRef} {...{ isOpen, setIsOpen }} className={styles.options__list}>
        <ul>
          {options.length
            ? options.map((option, index) => {
                if (index < 10)
                  return (
                    <li
                      key={option.id}
                      className={classNames(styles.list__item, {
                        [styles.selected]: option.value === currentValue,
                      })}
                      onMouseDown={() => handleOptionClick(option.value)}
                    >
                      {option.value}
                    </li>
                  );
              })
            : null}
        </ul>
      </PopUp>
    </div>
  );
};
