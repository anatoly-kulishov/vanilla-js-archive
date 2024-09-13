import { TableColumnsType } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import EllipsisTooltip from 'components/EllipsisTooltip';
import NotificationSettingsResponses from 'types/response/notificationSettings';

export const notificationsFiltersMap = new Map([
  ['partnerId', 'pId'],
  ['dealerIdList', 'dIdList'],
  ['notificationConditionIdList', 'notifCondIdList'],
  ['textField', 'txtFld'],
  ['isActive', 'isActv'],
]);

export const notificationStatuses: DefaultOptionType[] = [
  { value: 'true', label: 'Активно' },
  { value: 'false', label: 'Неактивно' },
  { value: 'all', label: 'Все' },
];

type ColumnsType = TableColumnsType<NotificationSettingsResponses.Setting>;
export const notificationsSettingsColumns: ColumnsType = [
  {
    title: 'Дилер',
    dataIndex: 'dealerName',
    key: 'dealerName',
    render: (_, { dealerName = '' }) => <EllipsisTooltip text={dealerName} />,
  },
  {
    title: 'Условие',
    dataIndex: 'notificationConditionName',
    key: 'notificationConditionName',
    render: (_, { notificationConditionName = '' }) => <EllipsisTooltip text={notificationConditionName} />,
  },
  {
    title: 'Временная задержка, мин',
    dataIndex: 'timeLag',
    key: 'timeLag',
  },
];

export const MAX_TOPIC_LENGTH = 255;
export const MAX_TIME_LAG_LENGTH = 4;
export const MAX_TEXT_LENGTH = 500;
