import React from 'react'
import PropTypes from 'prop-types'
import { SubscriptionProps } from 'constants/activeSubscriptions'
import { Table, Tooltip } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import { stringSorter, isoDateSorter, numSorter } from 'utils/helpers'

const Column = Table.Column

const formatIsoDate = value => {
  return value ? moment(value).format('DD.MM.YYYY[\n]HH:mm:ss') : ''
}

const providerNameSorter = (cur, next) => stringSorter(cur.ProviderName, next.ProviderName)
const nameSorter = (cur, next) => stringSorter(cur.Name, next.Name)
const paymentCostSorter = (cur, next) => stringSorter(cur.PaymentCost, next.PaymentCost)
const totalPaymentSorter = (cur, next) => stringSorter(cur.TotalPayment, next.TotalPayment)
const subscriptionStartTimeSorter = (cur, next) => isoDateSorter(cur.SubscriptionStartTime, next.SubscriptionStartTime)
const subscriptionEndTimeSorter = (cur, next) => isoDateSorter(cur.SubscriptionEndTime, next.SubscriptionEndTime)
const serviceNumberSorter = (cur, next) => numSorter(cur.ServiceNumber, next.ServiceNumber)
const serviceDescriptionSorter = (cur, next) => numSorter(cur.ServiceDescription, next.ServiceDescription)

const renderDescription = (value, record) => (
  <Tooltip placement='top' title={`Для подключения: ${record.SubscribeText}`}>
    <DescriptionTooltip>{value}</DescriptionTooltip>
  </Tooltip>
)

const text = { emptyText: 'У абонента нет активных подписок' }

const getRowHighlight = record => {
  if (record.SubscriptionTypeId === 2) {
    return 'highlight-blue'
  }
  return 'usual'
}

const scroll = { y: 250 }

const OldSubscriptionsTable = ({ oldSubscriptions, rowSelection, expandable }) => {
  return (
    <OldSubscriptionsGrid
      locale={text}
      rowKey='Key'
      dataSource={oldSubscriptions}
      scroll={scroll}
      pagination={false}
      showSorterTooltip={false}
      className='serviceGrid'
      rowClassName={getRowHighlight}
      rowSelection={rowSelection}
      expandable={expandable}
    >
      <Column dataIndex='ProviderName' title='Провайдер' width='15%' sorter={providerNameSorter} />
      <Column dataIndex='Name' title='Название' width='15%' render={renderDescription} sorter={nameSorter} />
      <Column dataIndex='PaymentCost' title='Стоимость за единицу' width='10%' sorter={paymentCostSorter} />
      <Column dataIndex='TotalPayment' title='Итого оплачено' width='10%' sorter={totalPaymentSorter} />
      <Column
        dataIndex='SubscriptionStartTime'
        title='Дата подключения'
        render={formatIsoDate}
        width='10%'
        sorter={subscriptionStartTimeSorter}
      />
      <Column
        dataIndex='SubscriptionEndTime'
        title='Дата отключения'
        render={formatIsoDate}
        width='10%'
        sorter={subscriptionEndTimeSorter}
      />
      <Column
        // dataIndex="SubscribeText"
        title='Как подключалась'
        width='10%'
      />
      <Column dataIndex='ServiceNumber' title='К-номер' width='10%' sorter={serviceNumberSorter} />
      <Column dataIndex='ServiceDescription' title='Заметка' width='10%' sorter={serviceDescriptionSorter} />
    </OldSubscriptionsGrid>
  )
}

export default OldSubscriptionsTable

OldSubscriptionsTable.propTypes = {
  oldSubscriptions: PropTypes.arrayOf(SubscriptionProps),
  rowSelection: PropTypes.object,
  expandable: PropTypes.object
}

const OldSubscriptionsGrid = styled(Table)`
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
const DescriptionTooltip = styled.div`
  cursor: pointer;
`
