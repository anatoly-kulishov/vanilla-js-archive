/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { Table, Popconfirm, Spin } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import moment from 'moment/moment'

import LoadingSpinner from 'components/LoadingSpinner'
import AuthenticatedFileLink from 'hocs/AuthenticatedFileLink'

import { ticket } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')
const Column = Table.Column
const dateFormat = 'DD.MM.YYYY, HH:mm:ss'

const columnsView = historyTicketsState => {
  const dataSource = get(historyTicketsState, 'ticketFiles.incidentFile', null)
  // TODO: Remove double commentsGridBlock
  if (Array.isArray(dataSource)) {
    dataSource.map(field => {
      if (!moment(field.createdOn, dateFormat, true).isValid()) {
        field.createdOn = moment(field.createdOn).format(dateFormat)
      }
      return field
    })
    return dataSource
  } else {
    return dataSource && [dataSource]
  }
}

const loadIcon = <LoadingSpinner spin />

const FileName = props => {
  FileName.propTypes = {
    record: PropTypes.object
  }
  const { record } = props
  return (
    <AuthenticatedFileLink
      url={`${http}${pathBe}:${ticket}/ticketsHistory/Download/${record.filePath}`}
      fileName={record.fileName}
    >
      {record.fileName}
    </AuthenticatedFileLink>
  )
}

const DeleteButton = props => {
  DeleteButton.propTypes = {
    record: PropTypes.object,
    ticketDeleteFile: PropTypes.func,
    historyTicketsState: PropTypes.object
  }
  const { record, ticketDeleteFile, historyTicketsState } = props
  return (
    <Popconfirm
      placement='left'
      title={'Подтвердите удаление файла'}
      onConfirm={() => {
        // onDeleteCommentRequest(record, fetchDeleteFile, leftValuesBlockState)
        ticketDeleteFile({
          fileId: record.id,
          filePath: record.filePath,
          requestId: get(historyTicketsState, 'ticket.incidents[0].requestId', null)
        })
      }}
      okText='Удалить'
      cancelText='Отменить'
    >
      <DeleteIcon />
    </Popconfirm>
  )
}

const FilesGridBlock = props => {
  FilesGridBlock.propTypes = {
    historyTicketsState: PropTypes.object,
    ticketDeleteFile: PropTypes.func
  }
  const { historyTicketsState, ticketDeleteFile } = props

  return (
    <Fragment>
      <Spin indicator={loadIcon} spinning={false}>
        <Table
          scroll={{ y: 120 }} // eslint-disable-line
          pagination={false}
          dataSource={columnsView(historyTicketsState)}
          bordered={false}
        >
          <Column
            dataIndex='fileName'
            title='Имя файла'
            width='70%'
            render={(value, record) => <FileName value={value} record={record} />}
          />
          <Column dataIndex='createdOn' title='Дата' width='20%' style={{ align: 'left' }} />
          <Column dataIndex='mbSize' title='Размер' width='10%' style={{ align: 'left' }} />
          <Column
            title=''
            width='5%'
            render={(_value, record) => (
              <DeleteButton
                record={record}
                ticketDeleteFile={ticketDeleteFile}
                historyTicketsState={historyTicketsState}
              />
            )}
          />
        </Table>
      </Spin>
    </Fragment>
  )
}

export default FilesGridBlock

const DeleteIcon = styled(CloseOutlined)`
  cursor: pointer;
`
