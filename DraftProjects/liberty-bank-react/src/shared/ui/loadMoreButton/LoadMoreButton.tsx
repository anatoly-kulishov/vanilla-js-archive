import { FC } from 'react';
import { Button, Icon, Text, TSvgIconNames } from '../';
import styles from './LoadMoreButton.module.scss';

interface ILoadMoreButtonProps {
  text: string;
  iconName: TSvgIconNames;
  width?: string;
  height?: string;
  onClick?: () => void;
}

export const LoadMoreButton: FC<ILoadMoreButtonProps> = ({
  text,
  iconName,
  width,
  height,
  onClick,
}) => {
  return (
    <Button theme='icon' onClick={onClick} className={styles['load-more-button']}>
      <Text tag='p' size='s' weight='medium' className={styles['load-more-button__text']}>
        {text}
      </Text>
      <Icon icon={iconName} height={height} width={width} />
    </Button>
  );
};
