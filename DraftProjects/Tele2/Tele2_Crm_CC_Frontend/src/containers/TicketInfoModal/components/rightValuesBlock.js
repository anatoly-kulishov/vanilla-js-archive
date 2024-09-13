import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import { get } from 'lodash'
import PropTypes from 'prop-types'

const RightBlockGrid = (props) => {
  RightBlockGrid.propTypes = {
    historyTicketsState: PropTypes.object
  }
  const { historyTicketsState } = props
  const columnsView = () => {
    const ticketChecklistDataSource = get(historyTicketsState, 'ticketChecklist.incidentCheckList', null)
    if (Array.isArray(ticketChecklistDataSource)) {
      return ticketChecklistDataSource
    } else {
      return ticketChecklistDataSource && [ticketChecklistDataSource]
    }
  }

  Table.columns = [
    {
      title: 'Вопрос',
      key: 'Question',
      dataIndex: 'parameterName',
      align: 'left',
      flex: true,
      width: 200
      // style: { whitespace: 'pre-wrap', overflow: 'auto'}
    },
    {
      title: 'Ответ',
      key: 'Answer',
      dataIndex: 'value',
      align: 'left',
      flex: true,
      width: 200
    }
  ]

  return (
    <div>
      <TableHolder>
        <TableInfo
          pagination={false}
          scroll={{ y: 400 }} // eslint-disable-line
          columns={Table.columns}
          dataSource={columnsView()}
          bordered={false}
        />
      </TableHolder>
    </div>
  )
}

const RightValuesBlock = (props) => {
  RightValuesBlock.propTypes = {
    historyTicketsState: PropTypes.object
  }
  const { historyTicketsState } = props
  return (
    <MainTable>
      <RightBlockGrid historyTicketsState={historyTicketsState} />
    </MainTable>
  )
}

export default RightValuesBlock

const MainTable = styled.div`
  margin-bottom: 5px;
  display: flex;
  width: 50%;
  flex-wrap: wrap;
  & > div > div > .ant-form-item {
    margin-bottom: 0;
  }
`
const TableHolder = styled.div`
`

const TableInfo = styled(Table)`
  font-size: 12px;
`
