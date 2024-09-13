/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { Table, Tooltip } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CoordinatesProps } from 'constants/tickets'

const Column = Table.Column

const renderFullAdress = (_value, record) => {
  return (
    <Tooltip placement='bottom' title={record.Address}>
      <EllipsisText>{record.Address}</EllipsisText>
    </Tooltip>
  )
}
const CoordinatesTable = ({ coordinates, setGeoposition }) => {
  CoordinatesTable.propTypes = {
    coordinates: PropTypes.arrayOf(CoordinatesProps),
    setGeoposition: PropTypes.func
  }

  return (
    <StyledTable
      dataSource={coordinates}
      pagination={false}
      onRow={(_record, rowIndex) => {
        return {
          onClick: () => setGeoposition(rowIndex)
        }
      }}
    >
      <Column
        dataIndex='Address'
        title='Адрес и координаты'
        width='50%'
        render={(value, record) => renderFullAdress(value, record)}
      />
      <Column
        dataIndex='Latitude'
        width='25%'
      />
      <Column
        dataIndex='Longitude'
        width='25%'
      />
    </StyledTable>
  )
}

export default CoordinatesTable

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
    padding: 10px 10px;
    white-space: nowrap;
  }
`
const EllipsisText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`
