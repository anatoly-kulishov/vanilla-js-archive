import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './SortButton.module.scss';
import { Icon, TSvgIconNames } from '@/shared';

interface ISortButton {
  children: ReactNode;
  array: string[][];
  sortParam: number;
  setFunc: Dispatch<SetStateAction<string[][]>>;
}
export const SortButton: FC<ISortButton> = ({
  children,
  array,
  sortParam,
  setFunc,
}: ISortButton) => {
  const [isSort, setIsSort] = useState<'asc' | 'desc' | ''>('');
  const svgName: TSvgIconNames =
    isSort === 'asc' ? 'sortUp' : isSort === 'desc' ? 'sortDown' : 'sortDefault';
  function sort() {
    setIsSort(isSort === 'asc' ? 'desc' : 'asc');
    return [...array].sort((a, b) => {
      if (isSort === 'asc') {
        return Number(a[sortParam]) - Number(b[sortParam]);
      } else {
        return Number(b[sortParam]) - Number(a[sortParam]);
      }
    });
  }
  const rootEl = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const onClick = (e: Event) => {
      const { current: target } = rootEl;
      const eventTarget = e.target as HTMLElement;
      if (
        target &&
        e.target &&
        eventTarget.tagName === 'BUTTON' &&
        !target.contains(e.target as HTMLElement)
      ) {
        setIsSort('');
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return (
    <button onClick={() => setFunc(sort())} className={styles['sort-button']} ref={rootEl}>
      {children}
      <Icon icon={svgName} height='30' width='30' className={styles['sort-svg']} />
    </button>
  );
};
