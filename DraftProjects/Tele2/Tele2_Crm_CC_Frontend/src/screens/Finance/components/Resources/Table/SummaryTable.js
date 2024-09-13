/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table } from 'antd'

const propTypes = {
  dataSource: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}

const localeEmptyText = { emptyText: 'У абонента нет истории по средствам' }

const SummaryTable = props => {
  const { dataSource, columns } = props
  return (
    <StyledTable
      dataSource={dataSource}
      locale={localeEmptyText}
      showHeader={false}
      pagination={false}
      rowClassName='not-expand no-padding'
      expandedRowRender={() => null}
      rowKey='Key'
      columns={columns}
    />
  )
}

SummaryTable.propTypes = propTypes

export default SummaryTable

const StyledTable = styled(Table)`
  .ant-table-tbody > tr > td {
    background: #fff;
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
    td {
      padding: 12px;
      cursor: pointer;
      word-break: break-word;
      font-weight: bold !important;
      :nth-child(2) {
        font-weight: normal !important;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
`
