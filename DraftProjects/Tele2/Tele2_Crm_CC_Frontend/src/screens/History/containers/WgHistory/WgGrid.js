/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { Table, Spin } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import LoadingSpinner from 'components/LoadingSpinner'

const Column = Table.Column

export default function WgGrid ({ wgHistory }) {
  WgGrid.propTypes = {
    wgHistory: PropTypes.object
  }

  const formatIsoDate = (value) => (value ? moment.utc(value).local().format('DD.MM.YYYY[\n]HH:mm') : '')

  return (
    <div>
      <Spin spinning={wgHistory.wgHistoryLoading} indicator={<LoadingSpinner spin />}>
        <TableHolder>
          <TicketGridTable
            dataSource={wgHistory.wgHistory}
            bordered={false}
            pagination={false}
          >
            <Column
              title='Дата создания'
              key='createdAt'
              dataIndex='createdAt'
              width={150}
              render={formatIsoDate}
            />
            <Column
              title='Номер телефона'
              key='msisdn'
              dataIndex='msisdn'
              width={120}
            />
            <Column
              title='Услуга'
              key='eventid'
              dataIndex='eventid'
              width={140}
              render={current => {
                switch (current) {
                  case 'monthly': return 'Награды в играх каждый месяц'
                  case 'daily': return 'Ежедневные награды в играх'
                  // no default
                }
                return null
              }}
            />
            <Column
              title='Идентификатор задачи'
              key='requestId'
              dataIndex='requestId'
              width={100}
            />
            <Column
              title='Статус'
              key='status_rus'
              dataIndex='status_rus'
              width={100}
            />
            <Column
              title='Обработано задачей'
              key='closedByRequest'
              dataIndex='closedByRequest'
              width={130}
              render={(current, record) => (
                record.status === 'ERROR' && current
              )}
            />
          </TicketGridTable>
        </TableHolder>
      </Spin>
    </div>
  )
}

const TableHolder = styled.div`
  font-size: small;
`
const TicketGridTable = styled(Table)`
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
      word-break: break-word;
    }
  }
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
`
