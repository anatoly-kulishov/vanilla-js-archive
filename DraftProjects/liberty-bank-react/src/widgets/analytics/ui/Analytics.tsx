import { FC } from 'react';
import { Tabs, Text } from '@/shared';
import { CircleDiagram } from '@/shared/ui/circleDiagram/CircleDiagram';
import styles from './Analytics.module.scss';
import { analyticsTitle } from '../constants';

interface AnalyticsProps {
  analyticsData: {
    label: string;
    sectors: number[];
  }[];
}

export const Analytics: FC<AnalyticsProps> = ({ analyticsData }) => {
  const tabs = analyticsData.map((item) => {
    return {
      label: item.label,
      content: <CircleDiagram sectors={item.sectors} />,
    };
  });

  return (
    <div>
      <Text tag={'h3'} weight={'medium'} className={styles.title}>
        {analyticsTitle}
      </Text>
      <div className={styles.bgContainer}>
        <Tabs tabs={tabs} theme='minimalistic' marginBottom='m' />
      </div>
    </div>
  );
};
