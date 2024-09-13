import { MouseEvent } from 'react';
import styles from './NewsFilter.module.scss';
import type { Filters } from '../News';

interface Props {
  filterValue: string;
  changeFilterValue: (f: Filters['category']) => void;
  filters: {
    category: string;
    text: string;
  }[];
}

export function NewsFilter({ filterValue, changeFilterValue, filters }: Props) {
  function handleClick(e: MouseEvent<HTMLUListElement>) {
    const selectedFilter = (e.target as HTMLLIElement).dataset.filter as Filters['category'];
    if (selectedFilter) {
      changeFilterValue(selectedFilter);
    }
  }

  return (
    <ul onClick={handleClick} role='list' className={styles.filters}>
      {filters.map((f) => (
        <li
          className={styles['list-item']}
          key={f.category}
          aria-selected={filterValue === f.category}
          data-filter={f.category}
        >
          {f.text}
        </li>
      ))}
    </ul>
  );
}
