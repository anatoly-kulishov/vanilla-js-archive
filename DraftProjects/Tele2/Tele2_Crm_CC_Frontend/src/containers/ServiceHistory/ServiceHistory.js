/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Table, Spin, Tooltip } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { stringSorter, isoDateSorter } from 'utils/helpers'
import PropTypes from 'prop-types'

const Column = Table.Column

const ServiceHistory = ({ serviceHistory, isServiceHistoryLoading }) => {
  ServiceHistory.propTypes = {
    serviceHistory: PropTypes.array,
    isServiceHistoryLoading: PropTypes.bool
  }

  const loadingIcon = <LoadingIcon spin />

  const formatIsoDate = value => (value ? moment(value).format('DD.MM.YYYY[\n]HH:mm:ss') : '')

  return (
    <Spin spinning={isServiceHistoryLoading} indicator={loadingIcon}>
      <ServiceHistoryTable
        rowKey='Key'
        dataSource={serviceHistory}
        scroll={{ y: 600 }} // eslint-disable-line
        pagination={false}
        showSorterTooltip={false}
      >
        <Column
          dataIndex='CreateDate'
          title='Дата создания'
          width='10%'
          render={formatIsoDate}
          sorter={(cur, next) => isoDateSorter(cur.CreateDate, next.CreateDate)}
        />
        <Column
          dataIndex='ServiceStatus'
          title='Статус'
          width='15%'
          sorter={(cur, next) => stringSorter(cur.ServiceStatus, next.ServiceStatus)}
        />
        <Column
          dataIndex='CscNameShort'
          title='Причина изменения статуса'
          width='10%'
          render={(_value, record) => (
            <Tooltip placement='bottom' title={record.CscName}>
              <div>{record.CscNameShort}</div>
            </Tooltip>
          )}
          sorter={(cur, next) => stringSorter(cur.CscNameShort, next.CscNameShort)}
        />
        <Column
          dataIndex='PhoneNumIpApn'
          title='Доп. номер/IP/APN'
          width='10%'
          sorter={(cur, next) => stringSorter(cur.PhoneNumIpApn, next.PhoneNumIpApn)}
        />
        <Column
          dataIndex='StartDate'
          title='Дата начала'
          width='10%'
          render={formatIsoDate}
          sorter={(cur, next) => isoDateSorter(cur.StartDate, next.StartDate)}
        />
        <Column
          dataIndex='EndDate'
          title='Дата окончания'
          width='10%'
          render={formatIsoDate}
          sorter={(cur, next) => isoDateSorter(cur.EndDate, next.EndDate)}
        />
        <Column
          dataIndex='CreateUser'
          title='Создал'
          width='10%'
          sorter={(cur, next) => stringSorter(cur.CreateUser, next.CreateUser)}
        />
      </ServiceHistoryTable>
    </Spin>
  )
}

export default ServiceHistory

const ServiceHistoryTable = styled(Table)`
  div.ant-table-column-sorters {
    padding: 0;
  }
`

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 24;
`
