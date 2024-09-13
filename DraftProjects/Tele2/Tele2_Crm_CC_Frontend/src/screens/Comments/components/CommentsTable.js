/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { Popover, Table, Tooltip } from 'antd'
import moment from 'moment'
import styled from 'styled-components'
import { stringSorter, isoDateSorter } from 'utils/helpers'
import PropTypes from 'prop-types'

const Column = Table.Column

const formatIsoDate = value => {
  return value ? moment(value).format('DD.MM.YYYY[\n]HH:mm') : ''
}

const renderPopover = (value, record) => {
  const titleText = `Комментарий "${value}"`

  return (
    <CommentPopover
      placement='bottom'
      title={<ContentTitle>{titleText}</ContentTitle>}
      content={<ContentPopover>{record.Text}</ContentPopover>}
      trigger='click'
    >
      <Tooltip placement='top' title={<ContentTooltip>{record.Text}</ContentTooltip>}>
        <Content>{value}</Content>
      </Tooltip>
    </CommentPopover>
  )
}

const renderAppointment = (value, record) => (record.AppointmentType === 0 ? record.Msisdn : value)

const CommentsTable = props => {
  CommentsTable.propTypes = {
    comments: PropTypes.object
  }
  const { comments, isWebSellerView } = props
  return (
    <CommentsGrid
      locale={{ emptyText: 'У абонента нет комментариев' }}
      rowKey='Key'
      dataSource={comments}
      pagination={false}
      showSorterTooltip={false}
      rowClassName={(value, record) => (value.Popup ? 'highlight' : 'usual')}
    >
      <Column
        dataIndex='Appointment'
        title='Назначение'
        width='15%'
        render={(value, record) => renderAppointment(value, record)}
        sorter={(cur, next) => stringSorter(cur.Appointment, next.Appointment)}
      />
      {!isWebSellerView && (
        <Column
          dataIndex='Type'
          title='Тип комментария'
          width='15%'
          sorter={(cur, next) => stringSorter(cur.Type, next.Type)}
        />
      )}
      <Column
        dataIndex='Subject'
        title='Тема комментария'
        width='40%'
        sorter={(cur, next) => stringSorter(cur.Subject, next.Subject)}
        render={(value, record) => renderPopover(value, record)}
      />
      {!isWebSellerView && (
        <Column
          dataIndex='CreatedBy'
          title='Автор'
          width='15%'
          sorter={(cur, next) => stringSorter(cur.CreatedBy, next.CreatedBy)}
        />
      )}
      <Column
        dataIndex='CreatedOn'
        title={'Дата'}
        width='15%'
        sorter={(cur, next) => isoDateSorter(cur.CreatedOn, next.CreatedOn)}
        render={formatIsoDate}
      />
    </CommentsGrid>
  )
}

export default CommentsTable

const CommentsGrid = styled(Table)`
  .ant-table-row.highlight.ant-table-row-level-0 {
    background: rgb(255, 241, 240);
  }
  tr {
    &:hover td {
      background: #fffbe6;
    }
  }
`
const Content = styled.div`
  width: 300px;
`
const ContentPopover = styled.div`
  width: 600px;
`
const ContentTitle = styled.div`
  width: 600px;
  word-break: break-all;
`
const CommentPopover = styled(Popover)`
  .ant-popover-inner-content {
    overflow: auto;
  }
`
const ContentTooltip = styled.div`
  word-break: break-all;
`
