/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { Table, Popover, Tooltip, Spin } from 'antd'
import { MessageOutlined, CheckOutlined } from '@ant-design/icons'

import LoadingSpinner from 'components/LoadingSpinner'

const localeEmptyText = { emptyText: 'У абонента нет истории причин обращения' }
const pagination = { defaultPageSize: 9 }

export default function InteractionsGrid ({
  history,
  onOpenInteraction,
  fetchLinkedInteractions,
  linkedInteractions,
  isLinkedInteractionsLoading
}) {
  InteractionsGrid.propTypes = {
    history: PropTypes.arrayOf(PropTypes.object),
    onOpenInteraction: PropTypes.func.isRequired,
    linkedInteractions: PropTypes.array,
    isLinkedInteractionsLoading: PropTypes.bool,
    fetchLinkedInteractions: PropTypes.func
  }
  const [expandedRowKeys, setExpandedRowKeys] = useState([])

  const formatIsoDate = (value) => {
    return value ? moment.utc(value).local().format('DD.MM.YYYY[\n]HH:mm') : ''
  }

  const renderComments = value =>
    value ? (
      <Popover placement='top' title={'Комментарий'} content={value}>
        <CheckIcon />
      </Popover>
    ) : null

  const renderSms = (value) =>
    value ? <SmsIcon /> : null

  const renderReason = (value, record) => (
    <Tooltip placement='top' title={record.CategoryName}>
      {value}
    </Tooltip>
  )

  const onExpand = (expanded, record) => {
    if (expanded) {
      fetchLinkedInteractions({ LinkedHandlingId: record.HandlingId })
      setExpandedRowKeys([record.InteractionNoteId])
    } else {
      setExpandedRowKeys([])
    }
  }

  const columns = [
    {
      dataIndex: 'CreatedOn',
      title: 'Дата',
      width: '10%',
      render: formatIsoDate
    },
    {
      dataIndex: 'Msisdn',
      title: 'Номер телефона',
      width: '12%'
    },
    {
      dataIndex: 'ReasonName',
      title: 'Причина обращения',
      width: '25%'
    },
    {
      dataIndex: 'CategoryShortName',
      title: 'Категория',
      width: '7%',
      render: (value, record) => renderReason(value, record)
    },
    {
      dataIndex: 'RegisteringCaseName',
      title: 'Сценарий',
      width: '10%'
    },
    {
      dataIndex: 'CommentText',
      title: 'Комм.',
      width: '7%',
      render: (value) => renderComments(value)
    },
    {
      dataIndex: 'SmsTemplateId',
      title: 'SMS',
      width: '6%',
      render: (value) => renderSms(value)
    },
    {
      dataIndex: 'UserFIO',
      title: 'Автор',
      width: '13%'
    },
    {
      dataIndex: 'ContactPoint',
      title: 'Точка контакта',
      width: '10%'
    }
  ]

  return (
    <StyledGrid
      locale={localeEmptyText}
      rowKey='InteractionNoteId'
      dataSource={history}
      columns={columns}
      pagination={pagination}
      rowClassName={value => (value.IsClosedHandling ? 'usual' : 'highlight')}
      onRow={record => ({ onClick: () => onOpenInteraction(record) })}
      expandable={{
        expandedRowKeys,
        onExpand,
        rowExpandable: record => record.IsLinkedInteractionExists,
        expandedRowRender: record => (
          <Spin spinning={isLinkedInteractionsLoading} indicator={<LoadingSpinner spin />} >
            <Table
              dataSource={linkedInteractions}
              columns={columns}
              showHeader={false} pagination={false}
              onRow={record => ({ onClick: () => onOpenInteraction(record) })}
            />
          </Spin>
        )
      }}
    />
  )
}

const StyledGrid = styled(Table)`
  .ant-table-row.highlight.ant-table-row-level-0 {
    background: #fffbe6;
  }
  .ant-table-thead {
    th {
      word-break: break-word;
      padding: 12px;
      font-size: 12px;
    }
  }
  .ant-table-row.ant-table-row-level-0 {
    font-size: 13px;
    td {
      padding: 12px;
      cursor: pointer;
      word-break: break-word;
    }
  }
  .ant-table-expanded-row.ant-table-expanded-row-level-1 {
    >.ant-table-cell {
      padding-left: 8px;
    }
  }
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
`
const CheckIcon = styled(MessageOutlined)`
  font-size: 20px;
  cursor: pointer;
`
const SmsIcon = styled(CheckOutlined)`
  font-size: 20px;
  cursor: pointer;
  color: #52c41a;
`
