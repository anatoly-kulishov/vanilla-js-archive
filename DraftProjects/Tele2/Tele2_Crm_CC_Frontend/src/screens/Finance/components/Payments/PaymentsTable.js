/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table } from 'antd'
import { isNil } from 'lodash'
import historyTypeEnum from 'screens/Finance/constants/historyTypeEnum'
import pPayStatusIdEnum from 'screens/Finance/constants/pPayStatusIdEnum'
import { numSorter, stringSorter, isoDateSorter } from 'utils/helpers'
import { formatNumber, formatDate } from 'screens/Finance/helpers/format'
import { cardModes } from 'constants/cardModes'

const localeEmptyText = { emptyText: 'У абонента нет истории платежей' }
const scrollY = { y: 400 }

export const PaymentsTable = ({ paymentsHistory, handlePaymentDetailsOpening, isEnrollments, isLoading, chooseRecord, selectedRowKeys, cardMode }) => {
  const { History } = paymentsHistory
  const {
    PAYMENT,
    PROMISE_PAY
  } = historyTypeEnum
  const {
    PAID_OFF,
    PAID_OFF_AHEAD,
    ENROLLED,
    CHARGED_BY_DATE,
    CHARGED_BY_DATE_WITH_DEBT,
    CHARGED_BY_DATE_DEBT_UNDEFINED
  } = pPayStatusIdEnum

  const getRowHighlight = record => {
    if (record.HistoryType === PAYMENT) {
      if (record.DeleteDate) {
        return 'highlight-red'
      }
      return record.IsBillingPeriod ? 'highlight-yellow' : 'highlight-green'
    } else if (record.HistoryType === PROMISE_PAY) {
      switch (record.StatusId) {
        case ENROLLED:
          if (record.DeleteDate) {
            return 'highlight-red'
          }
          return 'highlight-purple'
        case PAID_OFF:
        case PAID_OFF_AHEAD:
          return 'highlight-green'
        case CHARGED_BY_DATE_WITH_DEBT:
        case CHARGED_BY_DATE:
        case CHARGED_BY_DATE_DEBT_UNDEFINED:
          return 'highlight-red'
      }
    }
    return 'usual'
  }

  const summaryColumns = [
    { dataIndex: 'label', width: '90%' },
    { dataIndex: 'value', width: '116px', align: 'right', className: 'padded' }
  ]

  const dataSource = [{ label: 'Сумма за период', value: formatNumber(paymentsHistory.TotalSum) }]

  const isLeon = cardMode === cardModes.leon

  return (
    <StyledTable
      tableLayout='fixed'
      locale={localeEmptyText}
      rowKey='Key'
      dataSource={History}
      pagination={false}
      showSorterTooltip={false}
      bordered
      loading={isLoading}
      scroll={scrollY}
      rowClassName={record => getRowHighlight(record)}
      onRow={record => ({
        onClick: () => !isEnrollments && handlePaymentDetailsOpening(record)
      })}
      size='small'
      footer={isNil(isEnrollments) ? () => (
        <Summary
          tableLayout='fixed'
          showHeader={false}
          pagination={false}
          dataSource={dataSource}
          columns={summaryColumns}
        />
      ) : null}
    >
      {!isEnrollments && (
        <Table.Column
          dataIndex='Msisdn'
          title='Номер абонента'
          width='103px'
          sorter={(cur, next) => numSorter(cur.Msisdn, next.Msisdn)}
        />)}
      {!isEnrollments && <Table.Column
        dataIndex='Type'
        title='Тип платежа'
        width='20%'
        sorter={(cur, next) => stringSorter(cur.Type, next.Type)}
      />}
      <Table.Column
        dataIndex='DocumentType'
        title='Тип зачисления'
        sorter={(cur, next) => stringSorter(cur.CompensationTypeName, next.CompensationTypeName)}
      />
      <Table.Column
        dataIndex='BalanceName'
        title='Баланс'
        sorter={(cur, next) => stringSorter(cur.BalanceName, next.BalanceName)}
      />
      {!isEnrollments && <Table.Column
        dataIndex='Office'
        title='Касса или Банк'
        sorter={(cur, next) => stringSorter(cur.Office, next.Office)}
      />}
      <Table.Column
        dataIndex='ExecutionDate'
        title='Дата платежа'
        sorter={(cur, next) => isoDateSorter(cur.ExecutionDate, next.ExecutionDate)}
        render={value => value ? formatDate(value) : ''}
      />
      <Table.Column
        align='right'
        dataIndex='Sum'
        title='Сумма платежа'
        sorter={(cur, next) => numSorter(cur.Sum, next.Sum)}
        render={value => formatNumber(value)}
      />
      {isLeon && <Table.Column
        align='right'
        dataIndex='CardMasked'
        title='Номер карты'
      />}
      {isLeon && <Table.Column
        align='right'
        dataIndex='PaymentTypeDescription'
        title='Периодичность платежа'
      />}
    </StyledTable>
  )
}

PaymentsTable.propTypes = {
  paymentsHistory: PropTypes.object,
  handlePaymentDetailsOpening: PropTypes.func,
  isEnrollments: PropTypes.bool,
  isLoading: PropTypes.bool
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
  .ant-table-row.ant-table-row-level-0.highlight-purple {
    background: rgba(224,240,255, 1);
  }
`

const Summary = styled(Table)`
  .padded {
    padding-right: 28px !important;
    font-weight: bold;
  }
`
