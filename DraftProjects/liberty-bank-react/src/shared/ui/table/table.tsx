import { ReactNode } from 'react';
import styles from './table.module.scss';

interface HeadCell {
  value: number | string;
  name?: ReactNode | null;
  tcStyle?: string;
}

export interface TableData {
  content: Record<string, ReactNode>[];
  head: {
    columns: HeadCell[];
  } | null;
  tHeadStyle?: string;
  tBodyStyle?: string;
}

export const Table = ({ content, head, tHeadStyle = '', tBodyStyle = '' }: TableData) => {
  const headColumns =
    head === null
      ? Object.keys(content[0]).map((value) => ({ value: value }) as HeadCell)
      : head.columns;

  return (
    <table className={styles.table}>
      {head && (
        <thead className={`${styles.table_head} ${tHeadStyle}`}>
          <tr className={styles.table_row}>
            {head.columns.map((headerCell) => (
              <th
                key={headerCell.value}
                className={`${styles.default_cell} ${headerCell.tcStyle || ''}`}
              >
                {headerCell.name !== null && (headerCell.name || headerCell.value)}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className={`${styles.table_body} ${tBodyStyle}`}>
        {content.map((row, index) => (
          <tr key={index} className={styles.table_row}>
            {headColumns.map(({ value: colName, tcStyle }, index) => (
              <td key={index} className={`${styles.default_cell} ${tcStyle || ''}`}>
                {row[colName] || null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
