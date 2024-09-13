import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Table } from 'antd'

import { coveragesAndOfficesTableColumns } from './coveragesAndOfficesTableData'

export default function CoveragesAndOfficesTable ({ dataSource }) {
  CoveragesAndOfficesTable.propTypes = {
    dataSource: PropTypes.array
  }

  return (
    <StyledTable showHeader={false} columns={coveragesAndOfficesTableColumns} dataSource={dataSource} />
  )
}
// Workaround until antd fixes their pagination prop
const StyledTable = styled(Table)`
  .ant-pagination {
    display: none;
  }
  tr {
    display: flex;
  }
  tr > td {
    display: flex;
    flex: 1;
    padding: 8px 16px;
  }
  .flag-namе-сolumn {
    flex: 0.5;
  }
  .flag-namе-сolumn > h4 {
    max-width: 184px;
  }
`
