import { KeyboardEventHandler, useEffect, useState, type ReactNode } from 'react';
import classNames from 'classnames';
import { useResizeObserver, KEYS, Icon } from '@/shared';
import { SelectOption } from '../../model/types';
import { Dropdown } from '../Dropdown/Dropdown';
import s from './InputSelectTemplate.module.scss';

interface Props {
  className?: string;
  defaultContainer: ReactNode;
  value?: SelectOption;
  options?: SelectOption[];
  onChange?: (option: SelectOption) => void;
}

export const InputSelectTemplate = ({
  className,
  defaultContainer,
  value,
  options,
  onChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optionIndex, setOptionIndex] = useState<null | number>(null);
  const {
    targetRef: selectContainerRef,
    width,
    height,
    top,
    left,
  } = useResizeObserver<HTMLButtonElement>();
  const dropdownTop = top + height + 10;

  const onSelectClick = () => {
    setIsOpen((o) => !o);
  };

  const handleChange = (index: number) => {
    setOptionIndex(index);
    if (onChange && options) {
      onChange(options[index]);
    }
  };

  const handleChangeAndDropdownClose = (index: number) => {
    handleChange(index);
    setIsOpen(false);
  };

  const handleKeyEvents: KeyboardEventHandler<HTMLElement> = (e) => {
    switch (e.key) {
      case KEYS.ESCAPE_KEY:
        e.preventDefault();
        if (isOpen) {
          onSelectClick();
        }
        break;
      case KEYS.SPACE_BAR_KEY:
        e.preventDefault();
        if (!isOpen) {
          onSelectClick();
        }
        break;
      case KEYS.ARROW_UP_KEY:
        e.preventDefault();
        if (options) {
          optionIndex !== null
            ? handleChange(optionIndex - 1 >= 0 ? optionIndex - 1 : options.length - 1)
            : handleChange(options.length - 1);
        }
        break;
      case KEYS.ARROW_DOWN_KEY:
        e.preventDefault();
        if (options) {
          optionIndex !== null
            ? handleChange(optionIndex === options.length - 1 ? 0 : optionIndex + 1)
            : handleChange(0);
        }
        break;
      case KEYS.HOME_KEY:
        e.preventDefault();
        handleChange(0);
        break;
      case KEYS.END_KEY:
        e.preventDefault();
        if (options) handleChange(options.length - 1);
        break;
      case KEYS.ENTER_KEY:
        e.preventDefault();
        if (options && optionIndex !== null) handleChangeAndDropdownClose(optionIndex);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Node && !selectContainerRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectContainerRef]);

  return (
    <>
      <button
        type='button'
        onClick={onSelectClick}
        onKeyDown={handleKeyEvents}
        className={classNames(s.selectContainer, className)}
        ref={selectContainerRef}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        {value?.content?.({ selected: false, isInContainer: true }) ?? defaultContainer}
        <div className={classNames(s.icon, { [s.icon_active]: isOpen })}>
          <Icon icon='arrow-down-grey' width='24px' height={`${height}px`} />
        </div>
      </button>
      {isOpen && (
        <Dropdown top={dropdownTop} left={left} width={width}>
          <ul
            onKeyDown={handleKeyEvents}
            className={s.dropdown}
            aria-activedescendant={value?.value}
            aria-labelledby={value?.value}
            tabIndex={0}
            role='listbox'
          >
            {options?.map((o, i) => {
              return (
                <li
                  key={o.value}
                  value={o.value}
                  role='option'
                  aria-selected={optionIndex === i}
                  tabIndex={0}
                  onClick={() => handleChangeAndDropdownClose(i)}
                  onKeyDown={handleKeyEvents}
                >
                  {o.content?.({ selected: o.value === value?.value })}
                </li>
              );
            })}
          </ul>
        </Dropdown>
      )}
    </>
  );
};
