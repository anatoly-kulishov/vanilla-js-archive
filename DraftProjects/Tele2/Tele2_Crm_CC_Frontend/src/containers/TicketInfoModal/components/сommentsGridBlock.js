import React from 'react'
import { Table, Spin } from 'antd'
import styled from 'styled-components'
import { get } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'

const dateFormat = 'DD.MM.YYYY, HH:mm:ss'

const CommentsGrid = (props) => {
  CommentsGrid.propTypes = {
    isTicketCommentsLoading: PropTypes.bool,
    historyTicketsState: PropTypes.object
  }
  const { historyTicketsState, isTicketCommentsLoading } = props

  const columnsView = () => {
    const dataSource = get(historyTicketsState, 'ticketComments.sortedBpmIncidentComment', null)
    // let formatDataSource = dataSource
    // TODO: Remove double filesGridBlock
    if (Array.isArray(dataSource)) {
      dataSource.map(field => {
        if (!moment(field.createdOn, dateFormat, true).isValid()) {
          field.createdOn = moment(field.createdOn).format(dateFormat)
        }
        return field
      })
      return dataSource
    } else {
      // moment(dataSource.createdOn).format(dateFormat)
      return dataSource && [dataSource]
    }
  }

  Table.columns = [
    {
      title: 'Дата',
      key: 'Date',
      dataIndex: 'createdOn',
      align: 'left',
      flex: true,
      width: 100
    },
    {
      title: 'Автор',
      key: 'Author',
      dataIndex: 'umbAuthorName',
      align: 'left',
      flex: true,
      width: 200
    },
    {
      title: 'Текст',
      key: 'Text',
      dataIndex: 'bodyOfCommentary',
      align: 'left',
      flex: true,
      width: 250
    }
    // {
    //   title: "",
    // //   className: "classNameOfColumn",
    //   render: () => <div onClick={() => onDeleteCommentRequest()}><Icon type="close" /></div>,
    //   width: 5,
    //   align: 'right',
    // }
  ]

  return (
    <div>
      <TableHolder>
        <Spin
          spinning={isTicketCommentsLoading}
        >
          <Table
            scroll={{ y: 120 }} // eslint-disable-line
            pagination={false}
            columns={Table.columns}
            dataSource={columnsView()}
            bordered={false}
          />
        </Spin>

      </TableHolder>
    </div>
  )
}

const CommentsGridBlock = (props) => {
  CommentsGridBlock.propTypes = {
    historyTicketsState: PropTypes.object,
    isTicketCommentsLoading: PropTypes.bool
  }
  const { historyTicketsState, isTicketCommentsLoading } = props
  return (
    <CommentsGrid historyTicketsState={historyTicketsState} isTicketCommentsLoading={isTicketCommentsLoading} />
  )
}

export default CommentsGridBlock

const TableHolder = styled.div`
`
