import { Icon, Text } from '@/shared';
import { isOptionObject, TOption } from './types';
import { DetailedHTMLProps, FC, LiHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './InputSelect.module.scss';

interface IInputSelectOptionProps {
  option: TOption;
  selectedOption: TOption;
  handeSelect: (option: TOption) => void;
}

type LiProps = DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;

export const InputSelectOption: FC<IInputSelectOptionProps> = (props) => {
  const { option, selectedOption, handeSelect } = props;
  const IconActive = <Icon icon={'check-blue'} />;
  const isSelected = (option: TOption): boolean => {
    if (isOptionObject(option))
      return (
        option.value === (isOptionObject(selectedOption) ? selectedOption.value : selectedOption)
      );
    return option === selectedOption;
  };

  const childrenLi: ReactNode[] = [];
  const propsLi: LiProps = {
    className: classNames(styles.optionItem, isSelected(option) && styles.active),
    onClick: () => handeSelect(option),
  };

  if (isOptionObject(option)) {
    const {
      value,
      caption,
      selectedIconType = caption ? 'left' : 'right',
      contentLeft,
      contentRight,
    } = option;
    childrenLi.push(
      selectedIconType === 'left' && isSelected(option) && (
        <div key='left-icon' className={styles.optionItem__iconSelected}>
          {IconActive}
        </div>
      ),
      <div key='content-block' className={styles.optionItem__contentBlock}>
        <div className={styles.optionItem__textValue}>
          {contentLeft && contentLeft}
          {value}
          {contentRight && contentRight}
        </div>
        {caption && (
          <div className={styles.optionItem__decriptionBlock}>
            <Text tag={'span'} size={'s'} className={styles.caption}>
              {caption}
            </Text>
          </div>
        )}
      </div>,
      selectedIconType === 'right' && isSelected(option) && (
        <div className={styles.optionItem__iconSelected}>{IconActive}</div>
      ),
    );
  } else {
    childrenLi.push(
      <div key={option} className={styles.optionItem__textValue}>
        <Text tag={'span'} size={'s'}>
          {option}
        </Text>
      </div>,
      isSelected(option) && <div className={styles.optionItem__contentRight}>{IconActive}</div>,
    );
  }

  return (
    <li data-testid={'selectBase'} {...propsLi}>
      {childrenLi}
    </li>
  );
};
