import React from 'react'
import { Table, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import { SubscriptionProps } from 'constants/activeSubscriptions'
import styled from 'styled-components'
import moment from 'moment'
import { stringSorter, isoDateSorter, numSorter } from 'utils/helpers'

const Column = Table.Column
const localeText = { emptyText: 'У абонента нет активных подписок' }
const scrollY = { y: 250 } // eslint-disable-line

const formatIsoDate = (value) => {
  return value ? moment(value).format('DD.MM.YYYY[\n]HH:mm:ss') : ''
}

const renderDiscription = (value, record) => (
  <Tooltip placement='top' title={`Для подключения: ${record.SubscribeText}`}>
    <DiscriptionTooltip>{value}</DiscriptionTooltip>
  </Tooltip>
)

const sortProvider = (cur, next) => stringSorter(cur.ProviderName, next.ProviderName)
const columnNameRender = (value, record) => renderDiscription(value, record)
const columnNameSorter = (cur, next) => stringSorter(cur.Name, next.Name)

const paymentCostSorter = (cur, next) => stringSorter(cur.PaymentCost, next.PaymentCost)
const totalPaymentSorter = (cur, next) => stringSorter(cur.TotalPayment, next.TotalPayment)

const subscriptionStartTimeSorter = (cur, next) => isoDateSorter(cur.SubscriptionStartTime, next.SubscriptionStartTime)
const unsubscribeTextSorter = (cur, next) => isoDateSorter(cur.SubscriptionStartTime, next.SubscriptionStartTime)
const serviceNumberSorter = (cur, next) => numSorter(cur.ServiceNumber, next.ServiceNumber)
const serviceDescriptionSorter = (cur, next) => numSorter(cur.ServiceDescription, next.ServiceDescription)

const getRowHighlight = record => {
  if (record.SubscriptionTypeId === 2) {
    return 'highlight-blue'
  }
  return 'usual'
}

const ActiveSubscriptionsTable = ({ activeSubscriptions, rowSelection }) => {
  return (
    <ActiveSubscriptionsGrid
      locale={localeText}
      rowKey='Key'
      dataSource={activeSubscriptions}
      scroll={scrollY}
      pagination={false}
      showSorterTooltip={false}
      className={'serviceGrid'}
      rowSelection={rowSelection}
      rowClassName={getRowHighlight}
    >
      <Column
        dataIndex='ProviderName'
        title='Провайдер'
        width='15%'
        sorter={sortProvider}
      />
      <Column
        dataIndex='Name'
        title='Название'
        width='15%'
        render={columnNameRender}
        sorter={columnNameSorter}
      />
      <Column
        dataIndex='PaymentCost'
        title='Стоимость за единицу'
        width='10%'
        sorter={paymentCostSorter}
      />
      <Column
        dataIndex='TotalPayment'
        title='Итого оплачено'
        width='10%'
        sorter={totalPaymentSorter}
      />
      <Column
        dataIndex='SubscriptionStartTime'
        title='Дата подключения'
        width='10%'
        render={formatIsoDate}
        sorter={subscriptionStartTimeSorter}
      />
      <Column
        dataIndex='UnsubscribeText'
        title='Как отключить'
        width='10%'
        sorter={unsubscribeTextSorter}
      />
      <Column
        // dataIndex="SubscribeText"
        title='Как подключалась'
        width='10%'
      />
      <Column
        dataIndex='ServiceNumber'
        title='К-номер'
        width='10%'
        sorter={serviceNumberSorter}
      />
      <Column
        dataIndex='ServiceDescription'
        title='Заметка'
        width='10%'
        sorter={serviceDescriptionSorter}
      />
    </ActiveSubscriptionsGrid>
  )
}

export default ActiveSubscriptionsTable

ActiveSubscriptionsTable.propTypes = {
  oldSubscriptions: PropTypes.arrayOf(SubscriptionProps), // eslint-disable-line
  rowSelection: PropTypes.object,
  activeSubscriptions: PropTypes.object
}

const ActiveSubscriptionsGrid = styled(Table)`
.ant-table-thead {
  th {
    word-break: break-word;
    padding: 8px 8px;
    font-size: 12px;
  }
}
.ant-table-row.ant-table-row-level-0.highlight-blue {
  background: rgb(217, 244, 255);
}
.ant-table-row.ant-table-row-level-0 {
  font-size: 13px;
  td {
    word-break: break-word;
    padding: 8px 8px;
  }
}
div.ant-table-column-sorters {
  padding: 0;
}

@media (max-width: 1440px) {
  .ant-table-thead {
    th {
      padding: 4px 4px;
      font-size: 11px;
    }
  }
  .ant-table-row.ant-table-row-level-0 {
    font-size: 12px;
    td {
      padding: 4px 4px;
    }
  }
  div.ant-table-column-sorters {
    .ant-table-column-sorter {
      margin-left: 4px;
    }
    .ant-table-column-sorter-up,
    .ant-table-column-sorter-down {
      font-size: 8px;
    }
  }
}
`
const DiscriptionTooltip = styled.div`
  cursor: pointer;
`
