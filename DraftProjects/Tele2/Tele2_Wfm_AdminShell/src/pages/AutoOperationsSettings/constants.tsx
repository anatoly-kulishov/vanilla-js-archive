import { TableColumnsType } from 'antd';
import EllipsisTooltip from 'components/EllipsisTooltip';
import AutoOperationsSettingsResponses from 'types/response/autoOperationsSettings';

export const filtersMap = new Map([
  ['dealerIdList', 'dIdList'],
  ['partnerId', 'pId'],
  ['employeeActivityIdList', 'emplActvtIdList'],
  ['autoOperationsTypeIdList', 'operTpIdList'],
]);

export const columns: TableColumnsType<AutoOperationsSettingsResponses.Setting> = [
  {
    title: 'Дилер',
    dataIndex: 'dealerName',
    width: '25%',
    key: 'dealerName',
    render: (_, { dealerName = '' }) => <EllipsisTooltip text={dealerName} />,
  },
  {
    title: 'Активность',
    dataIndex: 'employeeActivityName',
    width: '20%',
    key: 'employeeActivityName',
    render: (_, { employeeActivityName = '' }) => <EllipsisTooltip text={employeeActivityName} />,
  },
  {
    title: 'Тип операции',
    dataIndex: 'autoOperationsTypeName',
    width: '15%',
    key: 'autoOperationsTypeName',
    render: (_, { autoOperationsTypeName = '' }) => <EllipsisTooltip text={autoOperationsTypeName} />,
  },
  {
    title: 'Временная задержка, мин',
    dataIndex: 'timeLag',
    width: '20%',
    key: 'timeLag',
  },
];
