import classNames from 'classnames';
import { Link, Text } from '@/shared';
import styles from './AccordionItem.module.scss';
import { useLayoutEffect, useRef, useState } from 'react';
import { PATH } from '../../../constants';

export interface INewsItem {
  title: string;
  description: string;
  id: string;
  tagType: string;
  instant: number;
  image: string;
}

interface AccordionItemProps {
  onClick: () => void;
  isOpen: boolean;
  item: INewsItem;
}

export const AccordionItem = ({ item, onClick, isOpen }: AccordionItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [currentHeight, setCurrentHeight] = useState<number | string | undefined>();
  useLayoutEffect(() => {
    setCurrentHeight(isOpen ? itemRef.current?.scrollHeight : 0);
  }, [isOpen]);
  return (
    <li
      onClick={() => onClick()}
      className={classNames(styles['accordion-item'], isOpen ? styles['open'] : styles['close'])}
    >
      <div className={styles['accordion-header']}>
        <Text tag='p' weight='semibold' size='s' className={styles['accordion-header-text']}>
          {item.title}
        </Text>
      </div>
      <div className={styles['accordion-collapse']} style={{ height: currentHeight }}>
        <div className={styles['accordion-body']} ref={itemRef}>
          <Text tag='p' weight='regular' size='s' className={styles['accordion-text']}>
            {item.description}
          </Text>
          <Link to={PATH.singleNews + item.id}>
            <Text tag='p' weight='regular' size='s'>
              Продолжить
            </Text>
          </Link>
          <div className={styles['info-block-under']}>
            <Text tag='span' size='s'>
              Акции
            </Text>
          </div>
        </div>
      </div>
    </li>
  );
};
