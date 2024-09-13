/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table } from 'antd'
import { numSorter, stringSorter, isoDateSorter } from 'utils/helpers'
import { formatNumber, formatDate } from 'screens/Finance/helpers/format'
import invoicesStatusEnum from 'screens/Finance/constants/invoicesStatusEnum'

const localeEmptyText = { emptyText: 'У абонента нет истории платежей' }

const InvoicesTable = ({ invoicesHistory, handleInvoicesDetailsOpening }) => {
  const { ClientInvoices: history } = invoicesHistory

  const getRowHighlight = record => {
    const {
      PAID_OFF,
      TO_PAY,
      TERMINATED,
      MIGRATED,
      PARTIALLY_PAID_OFF
    } = invoicesStatusEnum

    switch (record.StatusId) {
      case PAID_OFF:
        return 'highlight-green'
      case TO_PAY:
      case TERMINATED:
      case MIGRATED:
        return 'highlight-red'
      case PARTIALLY_PAID_OFF:
        return 'highlight-yellow'
    }
    return 'usual'
  }

  return (
    <StyledTable
      locale={localeEmptyText}
      rowKey='Key'
      dataSource={history}
      pagination={false}
      showSorterTooltip={false}
      bordered
      rowClassName={record => getRowHighlight(record)}
      onRow={record => ({
        onClick: () => handleInvoicesDetailsOpening(record)
      })}
    >
      <Table.Column
        dataIndex='InvoiceNum'
        title='Номер счета'
        sorter={(cur, next) => numSorter(cur.InvoiceNum, next.InvoiceNum)}
        render={value => <Cell className='ellipsis' title={value}>{value}</Cell>}
      />
      <Table.Column
        dataIndex='TypeName'
        title='Тип счета'
        sorter={(cur, next) => stringSorter(cur.TypeName, next.TypeName)}
        render={value => <Cell className='ellipsis' title={value}>{value}</Cell>}
      />
      <Table.Column
        dataIndex='SubTypeName'
        title='Статус счета'
        sorter={(cur, next) => stringSorter(cur.SubTypeName, next.SubTypeName)}
        render={value => <Cell className='ellipsis' title={value}>{value}</Cell>}
      />
      <Table.Column
        dataIndex='InvoiceDate'
        title='Дата счета'
        onCell={() => ({ className: 'date' })}
        sorter={(cur, next) => isoDateSorter(cur.InvoiceDate, next.InvoiceDate)}
        render={value => (
          <Cell title={value ? formatDate(value) : ''}>
            {value ? formatDate(value) : ''}
          </Cell>
        )}
      />
      <Table.Column
        dataIndex='InvoiceSum'
        title='Сумма счета'
        onCell={() => ({ className: 'sum' })}
        sorter={(cur, next) => numSorter(cur.InvoiceSum, next.InvoiceSum)}
        render={value => <Cell title={formatNumber(value)}>{formatNumber(value)}</Cell>}
      />
    </StyledTable>
  )
}

export default InvoicesTable

InvoicesTable.propTypes = {
  invoicesHistory: PropTypes.object,
  handleInvoicesDetailsOpening: PropTypes.func
}

const StyledTable = styled(Table)`
.ant-table-row.ant-table-row-level-0.highlight-red {
    background: rgba(245, 34, 45, 0.15);
  }
  .ant-table-row.ant-table-row-level-0.highlight-yellow {
    background: rgba(255, 222, 3, 0.2);
  }
  .ant-table-row.ant-table-row-level-0.highlight-green {
    background: rgba(82, 196, 26, 0.2);
  }
  .ant-table-thead {
    th {
      word-break: break-word;
      padding: 12px;
      font-size: 13px;
      word-spacing: 100vw;
      div.ant-table-column-sorters {
        padding: 0;
      }
    }
  }
  .ant-table-row.ant-table-row-level-0 {
    font-size: 13px;
    td {
      padding: 6px 12px;
      cursor: pointer;
      word-break: break-word;

      /* fix for ellipsis cells in antd table */
      /* min-width: 122px; min-width for Date cell without ellisizing */
      max-width: 0;
      &.sum, &.date {
        min-width: 122px;
        word-wrap: normal;
        white-space: nowrap;
      }
      &.sum {
        text-align: right;
      }
    }
  }
  div.ant-table-column-sorters {
    padding: 0;
  }
`

const Cell = styled.div`
  &.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
