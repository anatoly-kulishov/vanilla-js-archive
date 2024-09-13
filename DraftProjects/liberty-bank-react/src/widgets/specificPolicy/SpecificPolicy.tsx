import { PoliciesBtn, Requisites } from '@/entities';
import { StatusLabel, Text } from '@/shared';
import { FC } from 'react';
import styles from './SpecificPolicy.module.scss';

interface ISpecificPolicy {
  productId: number;
  policyStatus: string;
  title: string;
  subTitle: string;
  reqisites: string[];
  userData: string[];
}

export const SpecificPolicy: FC<ISpecificPolicy> = ({
  policyStatus,
  productId,
  title,
  subTitle,
  reqisites,
  userData,
}) => {
  return (
    <>
      <div className={styles['title-container']}>
        <div className={styles['title']}>
          <Text tag='h2' size='m' weight='medium'>
            {title}
          </Text>
          <StatusLabel
            type={policyStatus === 'ACTIVE' ? 'success' : 'error'}
            text={policyStatus === 'ACTIVE' ? 'Активный' : 'Неактивный'}
            size='m'
          />
        </div>
        <Text tag='h2' size='m' weight='medium'>
          {subTitle}
        </Text>
        <PoliciesBtn productId={productId} docNumber={userData[0]} />
      </div>
      <Requisites requisitesName={reqisites} requisitesResult={userData} />
    </>
  );
};
