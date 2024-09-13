/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { Table, Spin } from 'antd'

import LoadingSpinner from 'components/LoadingSpinner'
import { stringSorter, isoDateSorter } from 'utils/helpers'

const Column = Table.Column

const formatIsoDate = value => (value ? moment(value).format('DD.MM.YYYY HH:mm') : '')

const pagination = { pageSize: 9 }
const scrollY = { y: 600 }

export default function OffersCbmTable ({ history, isLoading, openModal }) {
  OffersCbmTable.propTypes = {
    history: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
    openModal: PropTypes.func.isRequired
  }
  return (
    <Spin spinning={isLoading} indicator={<LoadingSpinner spin />}>
      <StyleTable
        rowKey='Key'
        dataSource={history}
        scroll={scrollY}
        pagination={pagination}
        showSorterTooltip={false}
        onRow={record => ({
          onClick: () => openModal(record)
        })}
      >
        <Column
          dataIndex='DeliveryTime'
          title='Дата отправки нотификации'
          width='15%'
          render={formatIsoDate}
          sorter={(cur, next) => isoDateSorter(cur.CreateDate, next.CreateDate)}
        />
        <Column
          dataIndex='OfferName'
          title='Предложение'
          width='20%'
          sorter={(cur, next) => stringSorter(cur.CscNameShort, next.CscNameShort)}
        />
        <Column
          dataIndex='Delivery'
          title='Статус нотификации'
          width='20%'
          sorter={(cur, next) => stringSorter(cur.PhoneNumIpApn, next.PhoneNumIpApn)}
        />
        <Column
          dataIndex='ResultTime'
          title='Дата отклика'
          width='15%'
          render={formatIsoDate}
          sorter={(cur, next) => isoDateSorter(cur.PhoneNumIpApn, next.PhoneNumIpApn)}
        />
        <Column
          dataIndex='Channel'
          title='Канал'
          width='10%'
          sorter={(cur, next) => stringSorter(cur.PhoneNumIpApn, next.PhoneNumIpApn)}
        />
        <Column
          dataIndex='Take'
          title='Признак выполнения предложения абонентом'
          width='20%'
          sorter={(cur, next) => stringSorter(cur.PhoneNumIpApn, next.PhoneNumIpApn)}
        />
      </StyleTable>
    </Spin>
  )
}

const StyleTable = styled(Table)`
  .ant-table-thead {
    th {
      word-break: break-word;
      padding: 12px;
    }
  }
  .ant-table-row.ant-table-row-level-0 {
    td {
      padding: 12px;
      cursor: pointer;
      word-break: break-word;
    }
  }
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
  div.ant-table-column-sorters {
    padding: 0;
  }
`
