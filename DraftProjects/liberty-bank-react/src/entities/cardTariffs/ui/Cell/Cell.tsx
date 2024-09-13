import classNames from 'classnames';
import { CellDescription } from '../CellDescription/CellDescription';
import styles from './Cell.module.scss';

interface Props {
  children?: React.ReactNode;
  text?: string;
  place?: 'bottom';
}

export const Cell = ({ children, text, place }: Props) => {
  return (
    <td className={classNames(styles['cell'], { [styles[`cell_place_${place}`]]: place })}>
      {children}
      {text && <CellDescription text={text} />}
    </td>
  );
};
