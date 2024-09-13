/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { Table } from 'antd'
import DescriptionTable from './DescriptionTable'
import SummaryTable from './SummaryTable'
import { formatNumber } from 'screens/Finance/helpers/format'
import clientTypeEnum from 'screens/Finance/constants/clientTypeEnum'

const DEFAULT_FILTER = 'ALL'
const { SUBSCRIBER } = clientTypeEnum
const localeEmptyText = { emptyText: 'У абонента нет истории по средствам' }

const ResourcesTable = props => {
  const {
    dataSource: { Summary, SummaryCost, SummaryPay },
    history,
    paymentsHistoryFilters,
    digestId,
    fetchDigestId,
    resetDigestId,
    generatePathForSecondCard,
    commonFilters,
    handleCommonFilterChange,
    tableExpandState: { expandedRowKeys },
    tableExpandFunctions: { onExpand, toggleExpandAllFlag }
  } = props
  const { resourcesDatePeriodStart, resourcesDatePeriodFinish } = commonFilters
  const footerData = [
    { RowName: 'Расход за период', RowSum: SummaryCost },
    { RowName: 'Приход за период', RowSum: SummaryPay }
  ]

  const expandableRowsCount = Summary.reduce((count, row) => {
    if (row.Details) {
      return count + 1
    }
    return count
  }, 0)

  useEffect(() => {
    if (expandableRowsCount === expandedRowKeys.length && expandableRowsCount !== 0) {
      toggleExpandAllFlag(true)
    } else {
      toggleExpandAllFlag(false)
    }
  }, [expandedRowKeys])

  const handleRowCostClick = () => {
    handleCommonFilterChange({
      clientType: SUBSCRIBER,
      accrualType: DEFAULT_FILTER,
      accrualTypeKey: DEFAULT_FILTER,
      datePeriodStart: resourcesDatePeriodStart,
      datePeriodFinish: resourcesDatePeriodFinish
    })
    history.push(generatePathForSecondCard(history.location, 'costs') + history.location.search)
  }

  const handleRowPayClick = record => {
    resetDigestId()
    if (record.Details) {
      handleCommonFilterChange({
        clientType: SUBSCRIBER,
        paymentType: DEFAULT_FILTER,
        paymentTypeKey: DEFAULT_FILTER,
        contractName: +record.HistoryTypeId,
        contractNameKey: record.HistoryTypeId,
        datePeriodStart: resourcesDatePeriodStart,
        datePeriodFinish: resourcesDatePeriodFinish
      })
    }
    history.push(generatePathForSecondCard(history.location, 'payments') + history.location.search)
  }

  const tableColumns = [
    {
      dataIndex: 'RowName',
      title: 'Операция',
      ellipsis: true,
      width: '40%',
      render: value => value,
      onCell: record => ({
        className: record.IsNotEmpty && record.RowSum !== null && 'clickable',
        onClick: () => {
          if (record.IsNotEmpty && record.RowSum !== null) {
            if (record.RowType === 0) {
              handleRowPayClick(record)
            } else if (record.RowType === 1) {
              handleRowCostClick()
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
      render: (value, record) => <TableCellSpan color={record.RowSum < 0 && record.RowType === 0 ? 'red' : 'rgba(0, 0, 0, 0.65)'}>{formatNumber(record.RowSum)}</TableCellSpan>
    },
    {
      dataIndex: 'RowCount',
      title: 'Количество',
      width: '15%',
      ellipsis: true,
      render: value => <TableCellSpan>{value}</TableCellSpan>
    },
    {
      dataIndex: 'Comment',
      title: 'Комментарий',
      ellipsis: true,
      width: '30%'
    }
  ]

  return (
    <StyledExpandableTable
      dataSource={Summary}
      locale={localeEmptyText}
      expandable={{
        rowExpandable: record => !!record.Details,
        expandedRowKeys: expandedRowKeys,
        onExpand: onExpand,
        expandedRowRender: record => (
          <DescriptionTable
            isRequestAvailable={record.IsNotEmpty && record.RowSum !== null}
            dataSource={record}
            history={history}
            paymentsHistoryFilters={paymentsHistoryFilters}
            commonFilters={commonFilters}
            handleCommonFilterChange={handleCommonFilterChange}
            fetchDigestId={fetchDigestId}
            digestId={digestId}
            generatePathForSecondCard={generatePathForSecondCard}
          />
        )
      }}
      // rowClassName={record => (record.Details ? '' : 'not-expand')}
      pagination={false}
      rowKey='RowName'
      columns={tableColumns}
      footer={() => Summary.length !== 0 && <SummaryTable dataSource={footerData} columns={tableColumns} />}
    />
  )
}

export default withRouter(ResourcesTable)

ResourcesTable.propTypes = {
  dataSource: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  paymentsHistoryFilters: PropTypes.object.isRequired,
  tableExpandState: PropTypes.object.isRequired,
  tableExpandFunctions: PropTypes.object.isRequired,
  generatePathForSecondCard: PropTypes.func.isRequired,
  digestId: PropTypes.string.isRequired,
  fetchDigestId: PropTypes.func.isRequired,
  resetDigestId: PropTypes.func.isRequired,
  handleCommonFilterChange: PropTypes.func.isRequired,
  commonFilters: PropTypes.object.isRequired
}

const StyledTable = styled(Table)`
  table {
    table-layout: fixed;
  }
  .ant-table-row.highlight.ant-table-row-level-0 {
    background: #fff1f0;
  }
  .ant-table-expanded-row.ant-table-expanded-row-level-1 > td.ant-table-cell {
    padding: 16px 10px 16px 1px;
  }
  .ant-table-thead {
    th {
      word-break: break-word;
      padding: 12px;
      font-size: 13px;
    }
  }
  .ant-table-row.ant-table-row-level-0 {
    font-size: 13px;
    background: rgba(236, 249, 255, 0.6);
    > td {
      padding: 12px;
      cursor: initial;
      word-break: break-word;
      font-weight: normal;
      :nth-child(2) {
        font-weight: bold;
      }
      &.clickable {
        cursor: pointer;
      }
    }
  }
`

const StyledExpandableTable = styled(StyledTable)`
  .not-expand .ant-table-row-expand-icon-cell {
    visibility: hidden;
  }
  .ant-table-footer {
    padding: 0;
  }
`

const TableCellSpan = styled.span`
  color: ${props => (props.color ? props.color : '')};
`
