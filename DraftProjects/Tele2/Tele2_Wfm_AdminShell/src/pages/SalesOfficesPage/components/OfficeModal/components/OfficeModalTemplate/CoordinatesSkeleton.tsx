import { Skeleton } from 'antd';
import { FC } from 'react';
import cn from '@t2crm/wfm-utils/lib/utils/cn';

const className = cn('coordinates-skeleton');
const CoordinatesSkeleton: FC = () => (
  <div className={className()}>
    <Skeleton.Input active style={{ width: 150 }} />
    <Skeleton.Input active style={{ width: 150 }} />
  </div>
);

export default CoordinatesSkeleton;
