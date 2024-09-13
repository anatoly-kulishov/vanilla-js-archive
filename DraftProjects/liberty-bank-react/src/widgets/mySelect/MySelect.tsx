import { Icon, PopUp, Text } from '@/shared';
import { MyInput } from '@/shared/ui/myInput/MyInput';
import classNames from 'classnames';
import { FC, FormEvent, HTMLAttributes, useRef, useState } from 'react';
import styles from './MySelect.module.scss';

export interface InputSelectProps extends HTMLAttributes<HTMLInputElement> {
  options: string[];
  value?: string;
  readOnly?: boolean;
  defaultValue?: string;
  onMySelect?: (value: string) => void;
  placeholder?: string;
  size?: 'm' | 's' | 'l';
  name?: string;
  label?: string;
}

export const MySelect: FC<InputSelectProps> = ({
  options,
  onChange,
  onBlur,
  readOnly,
  onMySelect,
  placeholder,
  label,
  name,
  size = 's',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (onMySelect) {
      onMySelect(optionValue);
    }
  };

  const handleChangeValue: (e: FormEvent<HTMLInputElement>) => void = (e) => {
    setSelectedValue(e.currentTarget.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.inputSelect__content}>
      <Text tag='p' size='m' weight='medium'>
        <label>{label}</label>
      </Text>
      <MyInput
        ref={inputRef}
        name={name}
        type='text'
        size={size}
        value={selectedValue}
        defaultValue={options[0]}
        readOnly={readOnly}
        onChange={handleChangeValue}
        onBlur={onBlur}
        placeholder={placeholder}
        label={label}
        iconButton={
          <button
            className={styles.iconButton}
            onClick={handleToggleOpen}
            type='button'
            data-type='trigger'
          >
            <Icon
              icon={'arrow-down-grey'}
              color={'#4D5F71'}
              className={isOpen ? styles['iconButton_open'] : undefined}
            />
          </button>
        }
      />

      <PopUp inputRef={inputRef} {...{ isOpen, setIsOpen }} className={styles.options__list}>
        <ul>
          {options?.map((option) => (
            <li
              key={option}
              className={classNames(styles.list__item, {
                [styles.selected]: option === selectedValue,
              })}
              onClick={() => handleOptionClick(option)}
            >
              {option}
              {option === selectedValue && <Icon icon={'check-black'} color={'#005AFE'} />}
            </li>
          ))}
        </ul>
      </PopUp>
    </div>
  );
};
