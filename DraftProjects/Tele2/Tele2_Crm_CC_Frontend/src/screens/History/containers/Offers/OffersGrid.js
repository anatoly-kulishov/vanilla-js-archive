/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Table } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

const { Column } = Table
const localeEmptyText = { emptyText: 'У абонента нет истории предложений' }
const pagination = { pageSize: 9 }

export default function OffersGrid ({ history, onModalOpen }) {
  OffersGrid.propTypes = {
    history: PropTypes.arrayOf(PropTypes.object),
    onModalOpen: PropTypes.func.isRequired
  }

  const formatIsoDate = value => {
    return value ? moment.utc(value).local().format('DD.MM.YYYY[\n]HH:mm:ss') : ''
  }

  const renderSms = value => (value ? <SmsIcon /> : null)

  return (
    <OffersTable
      locale={localeEmptyText}
      rowKey='Key'
      dataSource={history}
      pagination={pagination}
      onRow={record => {
        return {
          onClick: () => onModalOpen(record)
        }
      }}
    >
      <Column dataIndex='CreatedOn' title='Дата' width='10%' render={formatIsoDate} />
      <Column dataIndex='Msisdn' title='Номер телефона' width='13%' />
      <Column dataIndex='Name' title='Предложение' width='25%' />
      <Column dataIndex='ResponseTypeName' title='Отклик' width='15%' />
      <Column dataIndex='SendSms' title='SMS' width='7%' render={(value) => renderSms(value)} />
      <Column dataIndex='FullName' title='Автор' width='15%' />
      <Column dataIndex='ContactPoint' title='Точка контакта' width='15%' />
    </OffersTable>
  )
}

const OffersTable = styled(Table)`
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
const SmsIcon = styled(CheckOutlined)`
  font-size: 20px;
  cursor: pointer;
  color: #52c41a;
`
