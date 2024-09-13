import { FC, useState } from 'react';
import styles from './InputSelect.module.scss';
import classNames from 'classnames';
import { Icon, Input, CURRENCY, CurrencyCode } from '@/shared';

export interface SelectOption {
  value: string;
  text: string;
  currency: CurrencyCode;
  balance: number;
}

interface Props {
  className?: string;
  emptyOptionsText?: string;
  name: string;
  value: string;
  setValue: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

export const InputSelect: FC<Props> = ({
  className,
  name,
  value,
  setValue,
  options,
  emptyOptionsText,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (selectedValue: SelectOption) => {
    setValue(selectedValue.value);
    setIsOpen(false);
  };

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames(styles.inputSelect__content, className)}>
      <Input.Text
        className={styles.inputSelectInput}
        contentRight={
          <button
            className={styles.iconButton}
            onClick={handleToggleOpen}
            disabled={!options.length}
          >
            <Icon icon={isOpen ? 'arrow-up-grey' : 'arrow-down-grey'} widthAndHeight='24px' />
          </button>
        }
        name={name}
        size='s'
        placeholder='312'
        value={
          options.length > 0
            ? options.find((v) => v.value === value)?.text ?? placeholder
            : emptyOptionsText
        }
        readOnly={true}
        white
      />
      {isOpen && (
        <ul
          className={classNames(styles.options__list, {
            [styles.boxShadow]: true,
          })}
        >
          {options?.map((option) => (
            <li
              key={option.value}
              className={classNames(styles.list__item, {
                [styles.selected]: option.value === value,
              })}
              onClick={() => handleOptionClick(option)}
            >
              <div className={styles.itemContentWrapper}>
                <div className={styles.itemContentColumn}>
                  <Icon icon={CURRENCY[option.currency].icon} />
                  {option.text}
                </div>
                {option.balance.toLocaleString('ru-RU', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                  style: 'currency',
                  currency: option.currency,
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
