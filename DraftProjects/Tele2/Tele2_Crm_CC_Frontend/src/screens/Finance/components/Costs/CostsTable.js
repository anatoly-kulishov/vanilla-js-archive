/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table } from 'antd'
import { isNull } from 'lodash'
import { numSorter, stringSorter, isoDateSorter } from 'utils/helpers'
import { formatNumber, formatDate } from 'screens/Finance/helpers/format'

const localeEmptyText = { emptyText: 'У абонента нет истории списаний' }
const summaryColumns = [
  { dataIndex: 'label', width: '90%' },
  { dataIndex: 'value', width: '116px', align: 'right', className: 'padded' }
]
const scrollY = { y: 400 }

const CostsTable = ({ costsHistory, handleCostsDetailsOpening, isOnlyPayable }) => {
  const { History, ChargeTotalCount, ChargeTotalSum } = costsHistory

  const getRowHighlight = record => {
    if (record.DeleteDate) {
      return 'highlight-red'
    } else if (record.IsBillingPeriod === false) {
      return 'highlight-green'
    } else if (record.IsBillingPeriod === true) {
      return 'highlight-yellow'
    }
    return 'usual'
  }

  const columnWidths = {
    Msisdn: '103px',
    ServiceName: '30%',
    ChargeTypeName: '30%',
    BalanceName: '30%',
    ChargeDate: '122px',
    Sum: '100px'
  }

  const filteredDataSource = isOnlyPayable ? History.filter(item => item.Sum !== 0) : History

  return (
    <StyledTable
      tableLayout='fixed'
      locale={localeEmptyText}
      rowKey='Key'
      dataSource={filteredDataSource}
      pagination={false}
      bordered
      showSorterTooltip={false}
      scroll={scrollY}
      onRow={record => ({
        onClick: () => handleCostsDetailsOpening(record)
      })}
      rowClassName={record => getRowHighlight(record)}
      footer={() => (
        <Summary
          tableLayout='fixed'
          showHeader={false}
          pagination={false}
          dataSource={[
            { label: 'Сумма за период', value: formatNumber(ChargeTotalSum) },
            { label: 'Итоговое количество', value: !isNull(ChargeTotalCount) && ChargeTotalCount.toLocaleString(), width: '100px' }
          ]}
          columns={summaryColumns}
        />
      )}
    >
      <Table.Column
        ellipsis
        dataIndex='Msisdn'
        title='Номер абонента'
        width={columnWidths.Msisdn}
        onCell={() => ({ className: 'msisdn' })}
        onHeaderCell={record => ({ className: record.className + ' msisdn' })}
        sorter={(cur, next) => numSorter(cur.Msisdn, next.Msisdn)}
      />
      <Table.Column
        ellipsis
        dataIndex='ServiceName'
        title='Услуга'
        width={columnWidths.ServiceName}
        sorter={(cur, next) => stringSorter(cur.ServiceName, next.ServiceName)}
      />
      <Table.Column
        ellipsis
        dataIndex='ChargeTypeName'
        title='Тип списания'
        width={columnWidths.ChargeTypeName}
        sorter={(cur, next) => stringSorter(cur.ChargeTypeName, next.ChargeTypeName)}
      />
      <Table.Column
        ellipsis
        dataIndex='BalanceName'
        title='Баланс'
        width={columnWidths.BalanceName}
        sorter={(cur, next) => stringSorter(cur.BalanceName, next.BalanceName)}
      />
      <Table.Column
        ellipsis
        dataIndex='ChargeDate'
        title='Дата списания'
        width={columnWidths.ChargeDate}
        onCell={() => ({ className: 'date' })}
        onHeaderCell={record => ({ className: record.className + ' date' })}
        sorter={(cur, next) => isoDateSorter(cur.ChargeDate, next.ChargeDate)}
        render={value => value ? formatDate(value) : ''}
      />
      <Table.Column
        ellipsis
        dataIndex='Sum'
        title='Сумма списания'
        width={columnWidths.Sum}
        onCell={() => ({ className: 'sum' })}
        onHeaderCell={(record) => ({ className: record.className + ' sum' })}
        sorter={(cur, next) => numSorter(cur.Sum, next.Sum)}
        render={value => formatNumber(value)}
      />
    </StyledTable>
  )
}

export default CostsTable

CostsTable.propTypes = {
  costsHistory: PropTypes.object,
  handleCostsDetailsOpening: PropTypes.func,
  isOnlyPayable: PropTypes.bool
}

const StyledTable = styled(Table)`
  .ant-table-footer {
    padding: 0;
  }
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
      padding: 6px 12px;
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
      /* max-width: 0; */
      &.sum {
        text-align: right;
      }
    }
  }
  div.ant-table-column-sorters {
    padding: 0;
  }
`

const Summary = styled(Table)`
  .padded {
    padding-right: 28px !important;
    font-weight: bold;
  }
`
