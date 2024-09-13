import { memo } from 'react';
import styles from './Map.module.scss';

// eslint-disable-next-line react/display-name
export const MapWrapper = memo(
  () => <div id='map-container' className={styles['map-wrapper']} />,
  () => true,
);
