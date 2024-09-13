/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import moment from 'moment'

const { Column } = Table
const pagination = { pageSize: 9 }
const localeEmptyText = { emptyText: 'У абонента нет истории SMS от оператора' }

const formatIsoDate = (value) => (value ? moment.utc(value).local().format('DD.MM.YYYY[\n]HH:mm') : '')

export default function OperatorSmsGrid ({ onOpenSms, history }) {
  OperatorSmsGrid.propTypes = {
    onOpenSms: PropTypes.func.isRequired,
    history: PropTypes.arrayOf(PropTypes.object)
  }

  return (
    <SmsGrid
      locale={localeEmptyText}
      rowKey='Key'
      dataSource={history}
      pagination={pagination}
      rowClassName={value => (value.Cancel ? 'highlight' : 'usual')}
      onRow={record => ({
        onClick: () => onOpenSms(record)
      })}
    >
      <Column dataIndex='Msisdn' title='Номер телефона' width='12%' />
      <Column dataIndex='SmsTemplateName' title='Название шаблона SMS' width='25%' />
      <Column dataIndex='CreatedOn' title='Дата создания' width='10%' render={formatIsoDate} />
      <Column dataIndex='PlannedDate' title='Дата отправки' width='10%' render={formatIsoDate} />
      <Column dataIndex='Status' title='Статус' width='10%' />
      <Column dataIndex='ScriptInforming' title='Причина отправки' width='13%' />
      <Column dataIndex='CreatedBy' title='Автор' width='10%' />
    </SmsGrid>
  )
}

const SmsGrid = styled(Table)`
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
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
`
