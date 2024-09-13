/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { stringSorter, isoDateSorter } from 'utils/helpers'
import { Table, Spin, Tooltip } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const Column = Table.Column
const pagination = { pageSize: 9 }

export default function ServiceGrid ({
  serviceHistoryState: {
    serviceHistory,
    isServiceHistoryLoading
  }
}) {
  ServiceGrid.propTypes = {
    serviceHistoryState: PropTypes.object
  }

  const loadingIcon = <LoadingIcon spin />

  const formatIsoDate = value => {
    return value ? moment(value).format('DD.MM.YYYY[\n]HH:mm:ss') : ''
  }

  const renderFullName = (value, record) => {
    return (
      <Tooltip placement='bottom' title={record.CscName}>
        <div>{record.CscNameShort}</div>
      </Tooltip>
    )
  }

  return (
    <Fragment>
      <Spin spinning={isServiceHistoryLoading} indicator={loadingIcon}>
        <ServiceTable
          rowKey='Key'
          dataSource={serviceHistory}
          scroll={{ y: 600 }} // eslint-disable-line
          pagination={pagination}
          showSorterTooltip={false}
        >
          <Column
            dataIndex='BillingServiceName'
            title='Название услуги'
            width='12%'
            sorter={(cur, next) => stringSorter(cur.BillingServiceName, next.BillingServiceName)}
          />
          <Column
            dataIndex='CreateDate'
            title='Дата'
            width='12%'
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
            width='12%'
            render={(value, record) => renderFullName(value, record)}
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
            width='12%'
            render={formatIsoDate}
            sorter={(cur, next) => isoDateSorter(cur.StartDate, next.StartDate)}
          />
          <Column
            dataIndex='EndDate'
            title='Дата окончания'
            width='12%'
            render={formatIsoDate}
            sorter={(cur, next) => isoDateSorter(cur.EndDate, next.EndDate)}
          />
          <Column
            dataIndex='CreateUser'
            title='Создал'
            width='12%'
            sorter={(cur, next) => stringSorter(cur.CreateUser, next.CreateUser)}
          />
        </ServiceTable>
      </Spin>
    </Fragment>
  )
}

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 24px;
`
const ServiceTable = styled(Table)`
  .ant-table-thead {
    th {
      word-break: break-word;
      padding: 12px;
      font-size: 12px;
    }
  }
  .ant-table-row.ant-table-row-level-0 {
    font-size: 13px;
    td {
      padding: 12px;
      cursor: pointer;
    }
  }
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
  div.ant-table-column-sorters {
    padding: 0;
  }
`
