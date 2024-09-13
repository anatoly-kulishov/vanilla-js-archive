import { Button, TableColumnsType } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import isNil from 'lodash.isnil';

import EllipsisTooltip from 'components/EllipsisTooltip';
import OfficesResponse from 'types/response/offices';
import getAddress from '@t2crm/wfm-utils/lib/utils/getAddress';
import IconTooltip from 'components/IconTooltip';
import prepareExclamationTooltip from '../components/SalesOfficesTable/helper';

type UseColumnsProps = {
  onEditOffice: (id: number) => void;
};

const renderExclamation = (tooltipTitle: string) => (
  <IconTooltip
    title={tooltipTitle}
    type="error"
  />
);

const useColumns = ({
  onEditOffice,
}: UseColumnsProps): TableColumnsType<OfficesResponse.OfficeByIdInfo> => ([
  {
    key: 'exclamationCircle',
    width: '5%',
    render: (_, {
      workTimePatternId,
      managerEmployeeId,
      officeCoordinateLatitude: latitude,
      officeCoordinateLongitude: longidute,
    }) => {
      const isMissingCoordinates = isNil(latitude) || isNil(longidute);
      const isNullable = [workTimePatternId, managerEmployeeId].some(isNil) || isMissingCoordinates;

      if (isNullable) {
        const tooltipTitle = prepareExclamationTooltip(
          !!workTimePatternId, !!managerEmployeeId, !isMissingCoordinates,
        );

        return renderExclamation(tooltipTitle);
      }

      return <></>;
    },
  },
  {
    title: 'ИД офиса',
    dataIndex: 'officeId',
    key: 'officeId',
    width: '15%',
  },
  {
    title: 'Дилер',
    dataIndex: 'dealerId',
    key: 'dealerId',
    width: '15%',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
    width: '30%',
    render: (_, { address }) => <EllipsisTooltip text={getAddress(address)} />,
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    width: '15%',
    render: (_, { status }) => <EllipsisTooltip text={status} />,
  },
  {
    width: '5%',
    render: (_, { officeId }) => (
      <Button
        title="Редактировать"
        type="text"
        icon={<EditOutlined id="edit" size={40} />}
        onClick={() => onEditOffice(officeId)}
      />
    ),
  },
]);

export default useColumns;
