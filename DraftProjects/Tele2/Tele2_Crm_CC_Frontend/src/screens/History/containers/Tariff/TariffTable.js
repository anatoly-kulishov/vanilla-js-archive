/* eslint-disable id-length */
import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'antd'
import styled from 'styled-components'
import { columns } from './tableConfig'

const pagination = { hideOnSinglePage: true }

export default function TariffTable ({ dataSource, scroll, isLoading }) {
  TariffTable.propTypes = {
    dataSource: PropTypes.array,
    isLoading: PropTypes.bool.isRequired,
    scroll: PropTypes.shape({
      x: PropTypes.oneOfType([ PropTypes.number, PropTypes.bool ]),
      y: PropTypes.oneOfType([ PropTypes.number, PropTypes.bool ])
    })
  }

  return (
    <HistoryTable
      scroll={scroll}
      hideOnSinglePage
      showSorterTooltip={false}
      pagination={pagination}
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
    />
  )
}

const HistoryTable = styled(Table)`
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
`
