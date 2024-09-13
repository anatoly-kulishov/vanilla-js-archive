import { Skeleton, SkeletonContainer } from '@/shared';
import s from './CreateCurrentAccountSkeleton.module.scss';

export const CreateCurrentAccountSkeleton = () => {
  return (
    <SkeletonContainer width='580px' height='410px' className={s.container}>
      <Skeleton theme='regular' type='wrapper' className={s.wrapper}>
        <Skeleton theme='dark' type='text' />
        <Skeleton theme='dark' className={s.image} />
        <Skeleton theme='dark' className={s.btn} />
      </Skeleton>
    </SkeletonContainer>
  );
};
