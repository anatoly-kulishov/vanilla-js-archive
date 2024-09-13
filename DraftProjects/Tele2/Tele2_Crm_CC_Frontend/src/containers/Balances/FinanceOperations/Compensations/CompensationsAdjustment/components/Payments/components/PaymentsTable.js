import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Table, Spin } from 'antd'
import PropTypes from 'prop-types'

import { formatNumber, formatDate } from 'screens/Finance/helpers/format'
import LoadingSpinner from 'components/LoadingSpinner'

const PaymentsTable = props => {
  PaymentsTable.propTypes = {
    dataSource: PropTypes.array,
    isLoading: PropTypes.bool,
    selectedRows: PropTypes.array,
    onSelectRow: PropTypes.func
  }
  const { dataSource, isLoading, onSelectRow, selectedRows } = props

  const rowSelection = useMemo(() => {
    return {
      type: 'radio',
      selectedRowKeys: selectedRows,
      onSelect: record => {
        onSelectRow({ record, index: dataSource.indexOf(record) })
      }
    }
  })

  return (
    <Spin spinning={isLoading} indicator={<LoadingSpinner spin />}>
      <StyledTable
        dataSource={dataSource}
        pagination={false}
        rowKey={useCallback((_record, index) => index)}
        rowSelection={rowSelection}
        onRow={useCallback((record, index) => ({
          onClick: () => {
            onSelectRow({ record, index })
          }
        }))}
      >
        <Table.Column
          title={<Title>Дата платежа</Title>}
          dataIndex='ExecutionDate'
          ellipsis
          render={useCallback(value => (value ? formatDate(value) : ''))}
        />
        <Table.Column
          title={<Title>Сумма платежа</Title>}
          dataIndex='Sum'
          align='right'
          render={useCallback(value => formatNumber(value))}
        />
        <Table.Column title={<Title>Тип платежа</Title>} dataIndex='Type' ellipsis />
        <Table.Column title={<Title>Тип зачисления</Title>} dataIndex='DocumentType' ellipsis />
      </StyledTable>
    </Spin>
  )
}

export default PaymentsTable

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    padding: 8px;
  }
  .ant-table-row.ant-table-row-level-0 {
    td {
      padding: 8px;
    }
  }
`

const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
`
