import { Skeleton, SkeletonContainer } from '@/shared';
import s from './UserAccountsSkeleton.module.scss';

export const UserAccountsSkeleton = () => {
  return (
    <SkeletonContainer width='100%' height='452px' className={s.container}>
      <div className={s.header}>
        <div className={s.columnLeft}>
          <Skeleton theme='regular' className={s.tab} />
          <Skeleton theme='regular' className={s.tab} />
          <Skeleton theme='regular' className={s.tab} />
          <Skeleton theme='regular' className={s.tab} />
        </div>
        <div className={s.columnRight}>
          <Skeleton theme='regular' className={s.btn} />
          <Skeleton theme='regular' className={s.btn} />
          <Skeleton theme='regular' className={s.btn} />
          <Skeleton theme='regular' className={s.btn} />
        </div>
      </div>
      <div className={s.list}>
        {[...Array(6)].map((_, index) => (
          <Skeleton theme='regular' type='wrapper' key={index} className={s.item}>
            <div className={s.topRow}>
              <Skeleton theme='dark' type='round' className={s.round} />
              <Skeleton theme='dark' className={s.status} />
            </div>
            <Skeleton theme='dark' type='text' />
            <Skeleton theme='dark' type='text' />
          </Skeleton>
        ))}
      </div>
      <div className={s.footer}>
        <Skeleton theme='regular' className={s.text} />
        <Skeleton theme='regular' type='round' className={s.chevron} />
      </div>
    </SkeletonContainer>
  );
};
