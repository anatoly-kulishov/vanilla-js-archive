import classNames from 'classnames';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { Icon, TSvgIconNames } from '../icon';
import styles from './BackButton.module.scss';

interface Props {
  text?: string;
  theme?: 'primary' | 'secondary' | 'third' | 'fourth' | 'blue' | 'blue-no-arrow';
  className?: string;
  iconColor?: string;
  name?: Extract<
    TSvgIconNames,
    'back-btn' | 'arrow-left-black' | 'arrow-left-blue' | 'arrow-left-white'
  >;
  height?: string;
  width?: string;
  click?: () => void;
}

export const BackButton: FC<Props> = ({
  click,
  name = 'arrow',
  width = '16',
  height = '16',
  text,
  theme = 'primary',
  className,
  ...rest
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => navigate(-1);

  return (
    <Button
      theme='icon'
      onClick={click || handleButtonClick}
      className={className}
      {...rest}
      data-testid={'back_button'}
    >
      {theme === 'primary' && (
        <Icon icon={'back-btn'} widthAndHeight={'36px'} className={styles[`themeColor_${theme}`]} />
      )}
      {theme === 'blue' && (
        <Icon
          icon={'arrow-left-blue'}
          width={width}
          height={height}
          className={styles[`themeColor_${theme}`]}
        />
      )}
      {(theme === 'secondary' || theme === 'third' || theme === 'fourth') && (
        <Icon
          icon={name as TSvgIconNames}
          width={width}
          height={height}
          className={styles[`themeColor_${theme}`]}
        />
      )}
      <span className={classNames(styles[`theme_${theme}`], styles[`themeColor_${theme}`])}>
        {text}
      </span>
    </Button>
  );
};
