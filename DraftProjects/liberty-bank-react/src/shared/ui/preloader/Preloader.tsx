import classNames from 'classnames';
import styles from './Preloader.module.scss';

interface Props {
  className?: string;
  minimized?: boolean;
}

export const Preloader = ({ className, minimized = false }: Props) => {
  return (
    <div
      className={classNames(styles['preloader-container'], className, {
        [styles['minimized']]: minimized,
      })}
      data-testid='preloader'
    >
      <div className={styles['preloader']} />
    </div>
  );
};
