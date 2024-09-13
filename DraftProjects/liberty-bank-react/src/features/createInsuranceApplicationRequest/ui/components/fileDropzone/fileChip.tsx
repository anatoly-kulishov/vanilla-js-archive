import { FC } from 'react';
import { Icon } from '@/shared';
import styles from './fileChip.module.scss';
import useMockQuery from '../../../api/useMockQuery';
import classNames from 'classnames';

interface Props {
  file: File;
  onRemove: (_: React.MouseEvent<HTMLButtonElement>, file: File) => void;
  preventUpload?: boolean;
}

export const FileChip: FC<Props> = ({ file, onRemove, preventUpload }) => {
  // TODO: написать логику загрузки файлов на бэк

  const { isLoading } = useMockQuery();

  if (isLoading && !preventUpload)
    return (
      <li className={classNames(styles['file-item'], styles['file-item_loading'])}>
        <div>
          {file.name}
          <div className={styles['progress-bar']}>
            <div className={styles['scale']} />
          </div>
        </div>
        <button type='button' onClick={(e) => onRemove(e, file)}>
          <Icon icon={'close-blue'} color={'#001A3480'} />
        </button>
      </li>
    );

  return (
    <li className={styles['file-item']}>
      <Icon icon={'clip'} widthAndHeight={'16px'} />
      <span className={styles['file-item__name']}>{file.name}</span>
      <button type='button' onClick={(e) => onRemove(e, file)}>
        <Icon icon={'close-blue'} color={'#001A3480'} />
      </button>
    </li>
  );
};
