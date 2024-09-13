/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table } from 'antd'
import { formatNumber } from 'screens/Finance/helpers/format'
import clientTypeEnum from 'screens/Finance/constants/clientTypeEnum'

const propTypes = {
  isRequestAvailable: PropTypes.bool.isRequired,
  dataSource: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  paymentsHistoryFilters: PropTypes.object.isRequired,
  generatePathForSecondCard: PropTypes.func.isRequired,
  handleCommonFilterChange: PropTypes.func.isRequired,
  fetchDigestId: PropTypes.func.isRequired,
  commonFilters: PropTypes.object.isRequired
}

const DEFAULT_FILTER = 'ALL'
const { SUBSCRIBER } = clientTypeEnum
const localeEmptyText = { emptyText: 'У абонента нет истории платежей' }

const DescriptionTable = props => {
  const {
    isRequestAvailable,
    dataSource,
    dataSource: { HistoryTypeId },
    history,
    paymentsHistoryFilters,
    fetchDigestId,
    generatePathForSecondCard,
    commonFilters: { resourcesDatePeriodStart, resourcesDatePeriodFinish },
    handleCommonFilterChange
  } = props

  const handleCostClick = record => {
    handleCommonFilterChange({
      clientType: SUBSCRIBER,
      accrualType: findAccrualType(record.ChargeTypeId),
      accrualTypeKey: record.ChargeTypeId,
      datePeriodStart: resourcesDatePeriodStart,
      datePeriodFinish: resourcesDatePeriodFinish,
      BillingServiceId: record.BillingServiceId
    })
    history.push(generatePathForSecondCard(history.location, 'costs') + location.search)
  }

  const handlePayClick = record => {
    fetchDigestId({ digestCode: 'PAY_TYPE', name: record.Name })
    handleCommonFilterChange({
      clientType: SUBSCRIBER,
      paymentType: record.Name,
      contractName: +HistoryTypeId,
      contractNameKey: HistoryTypeId,
      datePeriodStart: resourcesDatePeriodStart,
      datePeriodFinish: resourcesDatePeriodFinish
    })
    history.push(generatePathForSecondCard(history.location, 'payments') + location.search)
  }

  const findAccrualType = typeKey => {
    if (!paymentsHistoryFilters) {
      return DEFAULT_FILTER
    }

    const {
      CHARGE_TYPE: { DigestParams }
    } = paymentsHistoryFilters

    const accrualType = DigestParams.find(value => {
      return value.Key === typeKey.toString()
    })

    return accrualType ? accrualType.Value : DEFAULT_FILTER
  }

  const innerTableColumns = [
    {
      dataIndex: 'Name',
      title: 'Операция',
      width: '40%',
      ellipsis: true,
      onCell: record => ({
        className: (isRequestAvailable && record.Type !== null && 'clickable padding-left-cell') || 'padding-left-cell',
        onClick: () => {
          if (isRequestAvailable && record.Type !== null) {
            if (record.Type === 1) {
              handleCostClick(record)
            } else if (record.Type === 0) {
              handlePayClick(record)
            }
          }
        }
      })
    },
    {
      title: 'Сумма',
      width: '15%',
      align: 'right',
      ellipsis: true,
      render: (value, record) => <TableCellSpan color={record.Sum < 0 && record.Type === 0 ? 'red' : 'rgba(0, 0, 0, 0.65)'}>{formatNumber(record.Sum)}</TableCellSpan>
    },
    {
      dataIndex: 'ProductFamilyCount',
      title: 'Количество',
      width: '15%',
      ellipsis: true,
      render: value => <TableCellSpan>{value}</TableCellSpan>
    },
    {
      dataIndex: 'Comment',
      title: 'Комментарий',
      width: '30%',
      ellipsis: true,
      render: value => <TableCellSpan>{value}</TableCellSpan>
    }
  ]

  return (
    <StyledTable
      dataSource={dataSource.Details}
      locale={localeEmptyText}
      pagination={false}
      showHeader={false}
      columns={innerTableColumns}
      rowKey='Key'
    />
  )
}

DescriptionTable.propTypes = propTypes

export default DescriptionTable

const StyledTable = styled(Table)`
  table {
    table-layout: fixed;
  }
  .ant-table-thead > tr > th.ant-table-expand-icon-th {
    text-align: center;
    font-size: 20px;
    padding: 0;
  }
  .ant-table-row.highlight.ant-table-row-level-0 {
    background: #fff1f0;
  }
  .ant-table-thead {
    th {
      word-break: break-word;
      padding: 12px;
      font-size: 13px;
    }
  }
  .ant-table-expanded-row.ant-table-expanded-row-level-1 td.ant-table-cell {
    padding: 12px 10px 1px 1px !important;
  }
  .ant-table-row.ant-table-row-level-0 {
    font-size: 13px;
    background: transparent !important;
    td {
      padding: 12px;
      cursor: initial;
      word-break: break-word;
      font-weight: normal;
      cursor: pointer;
      :nth-child(2) {
        font-weight: normal !important;
      }
      &.padding-left-cell {
        padding-left: 24px;
      }
    }
  }
`

const TableCellSpan = styled.span`
  color: ${props => (props.color ? props.color : '')};
`
