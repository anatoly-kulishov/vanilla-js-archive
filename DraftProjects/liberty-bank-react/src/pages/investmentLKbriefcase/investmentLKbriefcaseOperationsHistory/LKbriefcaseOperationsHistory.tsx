import { Text, Tabs } from '@/shared';
import { TITLE } from './consts';
import LKbriefcaseOperationsHistoryAssets from './LKbriefcaseOperationsHistoryAssets/LKbriefcaseOperationsHistoryAssets';
import LKbriefcaseOperationsHistoryBalance from './LKbriefcaseOperationsHistoryBalance/LKbriefcaseOperationsHistoryBalance';

export default function LKbriefcaseOperationsHistory() {
  const tabs = [
    {
      label: 'Операции по активам',
      content: <LKbriefcaseOperationsHistoryAssets />,
    },
    {
      label: 'Операции по балансу',
      content: <LKbriefcaseOperationsHistoryBalance />,
    },
  ];

  return (
    <div>
      <Text tag={'h2'} weight={'medium'}>
        {TITLE}
      </Text>
      <Tabs tabs={tabs} theme='primary' marginBottom='m' />
    </div>
  );
}
