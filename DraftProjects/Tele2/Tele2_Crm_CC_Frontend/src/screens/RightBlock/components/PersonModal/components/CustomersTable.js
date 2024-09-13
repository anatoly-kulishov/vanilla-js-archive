/* eslint-disable react-perf/jsx-no-new-array-as-prop */
import React from 'react'
import { Skeleton, Table } from 'antd'
import { array, bool, func } from 'prop-types'

import SkeletonLoader from 'components/SkeletonLoader'
import AvailableActionsColumn from './AvailableActionsColumn'
import CLSCheckDescriptionColumn from './CLSCheckDescription'
import MsisdnColumn from './MsisdnColumn'
import SubscriberStatusColumn from './SubscriberStatusColumn'
import UpsaleColumn from './UpsaleColumn'

const propTypes = {
  tableData: array,
  customerScenarioHistory: array,
  isCustomerScenarioHistoryLoading: bool,
  onClickMarker: func,
  isLoading: bool
}

const CustomersTable = props => {
  const { tableData, customerScenarioHistory, isCustomerScenarioHistoryLoading, onClickMarker, isLoading } = props

  const columns = [
    {
      title: '',
      dataIndex: 'CLSCheckDescription',
      width: '5%',
      render: (__, record) => <CLSCheckDescriptionColumn record={record} />
    },
    {
      title: 'Номер телефона',
      dataIndex: 'Msisdn',
      width: '10%',
      render: (__, record) => (
        <MsisdnColumn
          record={record}
          data={customerScenarioHistory}
          isHistoryLoading={isCustomerScenarioHistoryLoading}
        />
      )
    },

    {
      title: 'Устройство',
      dataIndex: 'MobileDevice',
      width: '10%',
      render: (MobileDevice, record) =>
        record.isLoading ? (
          <SkeletonLoader width={120} component={<Skeleton.Button active size='small' />} />
        ) : (
          MobileDevice
        )
    },
    {
      title: 'Статус SIM',
      dataIndex: 'SubscriberStatus',
      width: '10%',
      render: (__, record) => <SubscriberStatusColumn record={record} />
    },
    {
      title: 'Доступное действие',
      dataIndex: 'Markers',
      width: '20%',
      render: (__, record) => <AvailableActionsColumn record={record} onClickMarker={onClickMarker} />
    },
    {
      title: 'Up$ale',
      dataIndex: 'Upsale',
      render: (__, record) => <UpsaleColumn record={record} onClickMarker={onClickMarker} />
    }
  ]

  return <Table pagination={false} columns={columns} dataSource={tableData} loading={isLoading} />
}

CustomersTable.propTypes = propTypes

export default CustomersTable
