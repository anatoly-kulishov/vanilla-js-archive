import { FC, useState, useRef } from 'react';
import { Icon, useOutsideClick } from '../..';
import { Button } from '..';
import styles from './dotsButton.module.scss';
import cn from 'classnames';

export interface IMenuLink {
  text: string;
  onClick: () => void;
}
interface IDotsButton {
  elements: IMenuLink[];
  horizontalOrientation?: 'right' | 'left';
  width?: 'xs' | 's' | 'm' | 'auto';
}

export const DotsButton: FC<IDotsButton> = ({
  elements,
  horizontalOrientation = 'left',
  width = 'auto',
}) => {
  const dotsButtonRef = useRef<HTMLDivElement | null>(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleClickOnButton: () => void = () => {
    setIsButtonPressed(!isButtonPressed);
  };

  useOutsideClick(dotsButtonRef, () => setIsButtonPressed(false));

  return (
    <div
      ref={dotsButtonRef}
      className={styles.btn}
      onClick={handleClickOnButton}
      data-testid='dots-button'
    >
      <Icon
        icon={'dots-vertical-union'}
        width='4px'
        height='18px'
        fill={isButtonPressed ? '#005afe' : '#001a34'}
      />
      {isButtonPressed && (
        <div
          className={cn(
            styles.menuList,
            styles[`menuList-width_${width}`],
            horizontalOrientation === 'right' ? styles.right : '',
          )}
        >
          {elements.map((button) => (
            <Button
              className={styles.item}
              key={button.text}
              onClick={button.onClick}
              theme='third'
            >
              {button.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
