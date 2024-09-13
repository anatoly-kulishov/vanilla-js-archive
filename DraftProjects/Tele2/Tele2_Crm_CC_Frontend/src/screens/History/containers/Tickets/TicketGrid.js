/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { Table, Spin } from 'antd'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import LoadingSpinner from 'components/LoadingSpinner'
import { stringSorter, isoDateSorter, numSorter } from 'utils/helpers'

const Column = Table.Column
const pagination = { pageSize: 9 }

export default function TicketGrid ({ historyTicketsState, historyTicketsState: { isTicketGridLoading }, openModalInfoHandle }) {
  TicketGrid.propTypes = {
    openModalInfoHandle: PropTypes.func,
    historyTicketsState: PropTypes.object
  }
  const ticketsIncidents = get(historyTicketsState, 'ticketGrid.incidents', null)

  return (
    <div>
      <Spin spinning={isTicketGridLoading} indicator={<LoadingSpinner spin />}>
        <TableHolder>
          <TicketGridTable
            pagination={pagination}
            dataSource={ticketsIncidents}
            bordered={false}
            showSorterTooltip={false}
            onRow={record => ({
              onClick: () => openModalInfoHandle(record.requestId, record.number)
            })}
          >
            <Column
              title='Причина, категория'
              key='techServiceServiceName'
              dataIndex='techServiceServiceName'
              width={150}
              flex
              onFilter={(value, record) => record.techServiceServiceName.indexOf(value) === 0}
              sorter={(cur, next) => stringSorter(cur.techServiceServiceName, next.techServiceServiceName)}
            />
            <Column
              title='Номер телефона'
              key='abonentNumber'
              dataIndex='abonentNumber'
              align='left'
              width={130}
              flex
              sorter={(cur, next) => numSorter(cur.abonentNumber, next.abonentNumber)}
            />
            <Column
              title='Номер заявки'
              key='number'
              dataIndex='number'
              align='left'
              width={120}
              flex
              sorter={(cur, next) => stringSorter(cur.number, next.number)}
            />
            <Column
              title='Статус'
              key='statusOfIncidentName'
              dataIndex='statusOfIncidentName'
              align='left'
              width={100}
              flex
              sorter={(cur, next) => stringSorter(cur.statusOfIncidentName, next.statusOfIncidentName)}
            />
            <Column
              title='Открытие'
              key='registeredOn'
              dataIndex='registeredOn'
              align='left'
              width={100}
              flex
              sorter={(cur, next) => isoDateSorter(cur.registeredOn, next.registeredOn)}
            />
            <Column
              title='Закрытие'
              key='closureDate'
              dataIndex='closureDate'
              align='left'
              width={100}
              flex
              sorter={(cur, next) => isoDateSorter(cur.closureDate, next.closureDate)}
            />
            <Column
              title='Автор'
              key='umbCreatedByName'
              dataIndex='umbCreatedByName'
              align='left'
              width={100}
              flex
              onFilter={(value, record) => record.umbCreatedByName.indexOf(value) === 0}
              sorter={(cur, next) => stringSorter(cur.umbCreatedByName, next.umbCreatedByName)}
            />
            <Column
              title='Точка контакта'
              key='pointOfSale'
              dataIndex='pointOfSale'
              align='left'
              width={100}
              flex
              onFilter={(value, record) => record.pointOfSale.indexOf(value) === 0}
              sorter={(cur, next) => stringSorter(cur.pointOfSale, next.pointOfSale)}
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
  div.ant-table-column-sorters {
    padding: 0;
  }
`
